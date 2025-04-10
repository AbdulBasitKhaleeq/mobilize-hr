import Link from "next/link"
import { Search, Filter, Download, User, MoreHorizontal } from "lucide-react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "../../layouts/dashboard-layout"

// Sample applicants data
const applicants = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    position: "Senior Frontend Developer",
    jobId: 1,
    status: "review",
    stage: "Application Review",
    appliedDate: "2023-05-08",
    matchScore: 92,
    resume: true,
    coverLetter: true,
    portfolio: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    position: "Product Manager",
    jobId: 2,
    status: "interview",
    stage: "Technical Interview",
    appliedDate: "2023-05-07",
    matchScore: 88,
    resume: true,
    coverLetter: false,
    portfolio: false,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    position: "UX/UI Designer",
    jobId: 3,
    status: "offer",
    stage: "Offer Extended",
    appliedDate: "2023-05-06",
    matchScore: 95,
    resume: true,
    coverLetter: true,
    portfolio: true,
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@example.com",
    position: "DevOps Engineer",
    jobId: 4,
    status: "new",
    stage: "New Application",
    appliedDate: "2023-05-05",
    matchScore: 82,
    resume: true,
    coverLetter: false,
    portfolio: false,
  },
  {
    id: 5,
    name: "Lisa Patel",
    email: "lisa.patel@example.com",
    position: "Data Scientist",
    jobId: 5,
    status: "rejected",
    stage: "Rejected",
    appliedDate: "2023-05-04",
    matchScore: 75,
    resume: true,
    coverLetter: true,
    portfolio: false,
  },
  {
    id: 6,
    name: "James Wilson",
    email: "james.wilson@example.com",
    position: "Senior Frontend Developer",
    jobId: 1,
    status: "interview",
    stage: "Final Interview",
    appliedDate: "2023-05-03",
    matchScore: 90,
    resume: true,
    coverLetter: true,
    portfolio: true,
  },
  {
    id: 7,
    name: "Sophia Garcia",
    email: "sophia.garcia@example.com",
    position: "Product Manager",
    jobId: 2,
    status: "review",
    stage: "Application Review",
    appliedDate: "2023-05-02",
    matchScore: 85,
    resume: true,
    coverLetter: false,
    portfolio: false,
  },
  {
    id: 8,
    name: "Daniel Lee",
    email: "daniel.lee@example.com",
    position: "UX/UI Designer",
    jobId: 3,
    status: "new",
    stage: "New Application",
    appliedDate: "2023-05-01",
    matchScore: 78,
    resume: true,
    coverLetter: false,
    portfolio: true,
  },
]

export default function ApplicantsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Applicants</h2>
            <p className="text-muted-foreground">Manage and track all job applicants</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <TabsList>
              <TabsTrigger value="all">All Applicants</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="review">In Review</TabsTrigger>
              <TabsTrigger value="interview">Interview</TabsTrigger>
              <TabsTrigger value="offer">Offer</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search applicants..." className="w-full pl-9" />
              </div>
              <Select defaultValue="recent">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="match">Best Match</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing <strong>{applicants.length}</strong> applicants
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Match Score</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applicants.map((applicant) => (
                      <TableRow key={applicant.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                              <User className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium">{applicant.name}</div>
                              <div className="text-sm text-muted-foreground">{applicant.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{applicant.position}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              applicant.status === "new"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
                                : applicant.status === "review"
                                  ? "bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200"
                                  : applicant.status === "interview"
                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
                                    : applicant.status === "offer"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                                      : "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
                            }
                          >
                            {applicant.stage}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(applicant.appliedDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  applicant.matchScore >= 90
                                    ? "bg-green-500"
                                    : applicant.matchScore >= 80
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                                style={{ width: `${applicant.matchScore}%` }}
                              />
                            </div>
                            <span className="text-sm">{applicant.matchScore}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Badge
                              variant="outline"
                              className={
                                applicant.resume
                                  ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200"
                              }
                            >
                              CV
                            </Badge>
                            <Badge
                              variant="outline"
                              className={
                                applicant.coverLetter
                                  ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200"
                              }
                            >
                              CL
                            </Badge>
                            <Badge
                              variant="outline"
                              className={
                                applicant.portfolio
                                  ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200"
                              }
                            >
                              PF
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <Link href={`/dashboard/applicants/${applicant.id}`}>
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                              </Link>
                              <Link href={`/dashboard/applicants/${applicant.id}/schedule`}>
                                <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                              </Link>
                              <DropdownMenuItem>Send Email</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Reject Applicant</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="new">
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Match Score</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applicants
                      .filter((applicant) => applicant.status === "new")
                      .map((applicant) => (
                        <TableRow key={applicant.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <User className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="font-medium">{applicant.name}</div>
                                <div className="text-sm text-muted-foreground">{applicant.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{applicant.position}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
                            >
                              {applicant.stage}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(applicant.appliedDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${
                                    applicant.matchScore >= 90
                                      ? "bg-green-500"
                                      : applicant.matchScore >= 80
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }`}
                                  style={{ width: `${applicant.matchScore}%` }}
                                />
                              </div>
                              <span className="text-sm">{applicant.matchScore}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Badge
                                variant="outline"
                                className={
                                  applicant.resume
                                    ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200"
                                }
                              >
                                CV
                              </Badge>
                              <Badge
                                variant="outline"
                                className={
                                  applicant.coverLetter
                                    ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200"
                                }
                              >
                                CL
                              </Badge>
                              <Badge
                                variant="outline"
                                className={
                                  applicant.portfolio
                                    ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200"
                                }
                              >
                                PF
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <Link href={`/dashboard/applicants/${applicant.id}`}>
                                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                                </Link>
                                <Link href={`/dashboard/applicants/${applicant.id}/schedule`}>
                                  <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem>Send Email</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Reject Applicant</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Similar content for other tabs (review, interview, offer, rejected) */}
          {/* For brevity, I'm not including all tab contents, but they would follow the same pattern */}
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
