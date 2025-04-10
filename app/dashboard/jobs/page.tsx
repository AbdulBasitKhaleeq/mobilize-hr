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

// Sample job listings data
const jobListings = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    status: "Published",
    applications: 24,
    datePosted: "2023-05-01",
    dateExpires: "2023-06-01",
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "New York, NY",
    type: "Full-time",
    status: "Published",
    applications: 18,
    datePosted: "2023-05-02",
    dateExpires: "2023-06-02",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    status: "Published",
    applications: 32,
    datePosted: "2023-05-03",
    dateExpires: "2023-06-03",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Austin, TX",
    type: "Full-time",
    status: "Draft",
    applications: 0,
    datePosted: null,
    dateExpires: null,
  },
  {
    id: 5,
    title: "Data Scientist",
    department: "Data",
    location: "Boston, MA",
    type: "Full-time",
    status: "Published",
    applications: 15,
    datePosted: "2023-05-05",
    dateExpires: "2023-06-05",
  },
  {
    id: 6,
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Chicago, IL",
    type: "Part-time",
    status: "Closed",
    applications: 28,
    datePosted: "2023-04-10",
    dateExpires: "2023-05-10",
  },
  {
    id: 7,
    title: "Customer Support Representative",
    department: "Support",
    location: "Remote",
    type: "Full-time",
    status: "Published",
    applications: 42,
    datePosted: "2023-05-07",
    dateExpires: "2023-06-07",
  },
]

export default function JobListingsPage() {
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
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search jobs..." className="w-full pl-9" />
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
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
                {jobListings.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>{job.department}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.type}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          job.status === "Published"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                            : job.status === "Draft"
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
                              : "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
                        }
                      >
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{job.applications}</TableCell>
                    <TableCell>{job.datePosted ? new Date(job.datePosted).toLocaleDateString() : "-"}</TableCell>
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
                          {job.status === "Published" ? (
                            <DropdownMenuItem>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Close Job
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-red-600">
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
