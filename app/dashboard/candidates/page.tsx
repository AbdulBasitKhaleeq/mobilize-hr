import { Search, Filter, Download, Star, User, MoreHorizontal } from "lucide-react"
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

// Sample candidate data
const candidates = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    position: 'Senior Frontend Developer',
    status: 'Interview',
    rating: 4.5,
    appliedDate: '2023-05-01',
    tags: ['React', 'TypeScript'],
    matchScore: 92,
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    position: 'Product Manager',
    status: 'Resume Screening',
    rating: 4.0,
    appliedDate: '2023-05-02',
    tags: ['Product Strategy', 'Agile'],
    matchScore: 88,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',\
    email: '  \'Agile\'],
    matchScore: 88,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@example.com',
    position: 'UX/UI Designer',
    status: 'Offer',
    rating: 4.8,
    appliedDate: '2023-05-03',
    tags: ['Figma', 'User Testing'],
    matchScore: 95,
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david.kim@example.com',
    position: 'DevOps Engineer',
    status: 'Interview',
    rating: 3.9,
    appliedDate: '2023-05-04',
    tags: ['AWS', 'Kubernetes'],
    matchScore: 82,
  },
  {
    id: 5,
    name: 'Lisa Patel',
    email: 'lisa.patel@example.com',
    position: 'Data Scientist',
    status: 'Rejected',
    rating: 3.5,
    appliedDate: '2023-05-05',
    tags: ['Python', 'Machine Learning'],
    matchScore: 75,
  },
]

export default function CandidatesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Candidate Profiles</h2>
            <p className="text-muted-foreground">View and manage all candidate profiles in your talent pool</p>
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
            <Button size="sm">Add Candidate</Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search candidates..." className="w-full pl-9" />
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="new">New Application</SelectItem>
                    <SelectItem value="screening">Resume Screening</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="recent">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                    <SelectItem value="match">Best Match</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Match Score</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidates.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">{candidate.name}</div>
                          <div className="text-sm text-muted-foreground">{candidate.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{candidate.position}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          candidate.status === "Interview"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
                            : candidate.status === "Offer"
                              ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                              : candidate.status === "Rejected"
                                ? "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
                                : "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
                        }
                      >
                        {candidate.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{candidate.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              candidate.matchScore >= 90
                                ? "bg-green-500"
                                : candidate.matchScore >= 80
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${candidate.matchScore}%` }}
                          />
                        </div>
                        <span className="text-sm">{candidate.matchScore}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(candidate.appliedDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {candidate.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                          <DropdownMenuItem>Send Email</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Reject Candidate</DropdownMenuItem>
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
