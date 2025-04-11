"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { PlusCircle, Search, Filter, MoreHorizontal, Eye, Edit, Trash2, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import DashboardLayout from "../../layouts/dashboard-layout"
import { jobService, Job, JobStatus } from "@/lib/firebase/db"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/AuthContext"

export default function JobListingsPage() {
  const { toast } = useToast()
  const { user } = useAuth()
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<JobStatus | "all">("all")

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchedJobs = await jobService.getJobs(
          statusFilter !== "all" ? { status: statusFilter } : undefined
        )
        setJobs(fetchedJobs)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch jobs",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [statusFilter, toast])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return

    try {
      const searchResults = await jobService.searchJobs(searchTerm)
      setJobs(searchResults)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search jobs",
        variant: "destructive",
      })
    }
  }

  const handleStatusChange = async (jobId: string, newStatus: JobStatus) => {
    try {
      await jobService.updateJobStatus(jobId, newStatus)
      setJobs(jobs.map(job => 
        job.id === jobId ? { ...job, status: newStatus } : job
      ))
      toast({
        title: "Success",
        description: `Job status updated to ${newStatus}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update job status",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (jobId: string) => {
    try {
      await jobService.deleteJob(jobId)
      setJobs(jobs.filter(job => job.id !== jobId))
      toast({
        title: "Success",
        description: "Job deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete job",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Job Listings</h2>
            <p className="text-muted-foreground">Manage your company's job postings</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard/jobs/new">
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Job
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <form onSubmit={handleSearch} className="relative w-full sm:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search jobs..." 
                  className="w-full pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
              <div className="flex items-center gap-2">
                <Select value={statusFilter} onValueChange={(value: JobStatus | "all") => setStatusFilter(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">
                    <div className="flex items-center space-x-1">
                      <span>Job Title</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <div className="flex items-center space-x-1">
                      <span>Applications</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center space-x-1">
                      <span>Posted Date</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>{job.department}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.type}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          job.status === "published"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                            : job.status === "draft"
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
                              : "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
                        }
                      >
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{job.applicationsCount}</TableCell>
                    <TableCell>{job.postedAt ? new Date(job.postedAt).toLocaleDateString() : "-"}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link href={`/dashboard/jobs/${job.id}`}>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                          </Link>
                          <Link href={`/dashboard/jobs/${job.id}/edit`}>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuSeparator />
                          {job.status === "published" ? (
                            <DropdownMenuItem onClick={() => handleStatusChange(job.id, "closed")}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Close Job
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDelete(job.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
