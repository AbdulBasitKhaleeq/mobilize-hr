"use client"

import {
  Calendar,
  Clock,
  Filter,
  Search,
  User,
  Video,
  Phone,
  Building,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "../../layouts/dashboard-layout"
import { useRouter } from "next/navigation"

// Sample interview data
const interviews = [
  {
    id: 1,
    candidate: {
      name: "James Wilson",
      position: "Senior Frontend Developer",
    },
    date: "2023-05-10",
    time: "14:00",
    duration: 60,
    type: "video",
    interviewers: ["Alex Thompson", "Maria Rodriguez"],
    stage: "Technical Interview",
    status: "scheduled",
  },
  {
    id: 2,
    candidate: {
      name: "Sophia Garcia",
      position: "Product Manager",
    },
    date: "2023-05-10",
    time: "16:30",
    duration: 45,
    type: "video",
    interviewers: ["Maria Rodriguez"],
    stage: "First Interview",
    status: "scheduled",
  },
  {
    id: 3,
    candidate: {
      name: "Daniel Lee",
      position: "UX/UI Designer",
    },
    date: "2023-05-11",
    time: "10:00",
    duration: 60,
    type: "in-person",
    interviewers: ["Chris Johnson"],
    stage: "Portfolio Review",
    status: "scheduled",
  },
  {
    id: 4,
    candidate: {
      name: "Olivia Martinez",
      position: "DevOps Engineer",
    },
    date: "2023-05-11",
    time: "15:00",
    duration: 45,
    type: "phone",
    interviewers: ["Sam Wilson"],
    stage: "Initial Screening",
    status: "scheduled",
  },
  {
    id: 5,
    candidate: {
      name: "William Brown",
      position: "Data Scientist",
    },
    date: "2023-05-15",
    time: "11:30",
    duration: 60,
    type: "video",
    interviewers: ["Jessica Chen"],
    stage: "Technical Interview",
    status: "scheduled",
  },
  {
    id: 6,
    candidate: {
      name: "Emma Davis",
      position: "Marketing Specialist",
    },
    date: "2023-05-09",
    time: "13:00",
    duration: 45,
    type: "video",
    interviewers: ["Robert Johnson"],
    stage: "First Interview",
    status: "completed",
    feedback: {
      rating: 4,
      strengths: ["Communication skills", "Marketing knowledge"],
      weaknesses: ["Limited experience with SEO"],
      notes: "Strong candidate with good potential. Recommend moving forward.",
      recommendation: "advance",
    },
  },
  {
    id: 7,
    candidate: {
      name: "Noah Taylor",
      position: "Backend Developer",
    },
    date: "2023-05-08",
    time: "11:00",
    duration: 60,
    type: "video",
    interviewers: ["Alex Thompson", "David Kim"],
    stage: "Technical Interview",
    status: "completed",
    feedback: {
      rating: 3,
      strengths: ["Technical knowledge", "Problem-solving"],
      weaknesses: ["Communication could be improved"],
      notes: "Good technical skills but needs improvement in communication.",
      recommendation: "consider",
    },
  },
]

export default function InterviewsPage() {
  const router = useRouter()
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Interview Tracking</h2>
            <p className="text-muted-foreground">Schedule, manage, and track candidate interviews</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button size="sm">Schedule Interview</Button>
          </div>
        </div>

        <Tabs defaultValue="upcoming">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search interviews..." className="w-full pl-9" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="screening">Initial Screening</SelectItem>
                  <SelectItem value="first">First Interview</SelectItem>
                  <SelectItem value="technical">Technical Interview</SelectItem>
                  <SelectItem value="final">Final Interview</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="upcoming" className="space-y-6">
            {interviews
              .filter((interview) => interview.status === "scheduled")
              .map((interview) => (
                <Card key={interview.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <User className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{interview.candidate.name}</h3>
                          <p className="text-muted-foreground">{interview.candidate.position}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge
                              variant="outline"
                              className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
                            >
                              {interview.stage}
                            </Badge>
                            {interview.type === "video" && (
                              <Badge
                                variant="outline"
                                className="bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200"
                              >
                                <Video className="h-3 w-3 mr-1" />
                                Video
                              </Badge>
                            )}
                            {interview.type === "phone" && (
                              <Badge
                                variant="outline"
                                className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                              >
                                <Phone className="h-3 w-3 mr-1" />
                                Phone
                              </Badge>
                            )}
                            {interview.type === "in-person" && (
                              <Badge
                                variant="outline"
                                className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
                              >
                                <Building className="h-3 w-3 mr-1" />
                                In-Person
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-start md:items-end gap-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(interview.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {interview.time} ({interview.duration} min)
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">with {interview.interviewers.join(", ")}</div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/dashboard/interviews/${interview.id}`)}
                      >
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                          <DropdownMenuItem>Add to Calendar</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Cancel Interview</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {interviews
              .filter((interview) => interview.status === "completed")
              .map((interview) => (
                <Card key={interview.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <User className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{interview.candidate.name}</h3>
                          <p className="text-muted-foreground">{interview.candidate.position}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge
                              variant="outline"
                              className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
                            >
                              {interview.stage}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                            >
                              Completed
                            </Badge>
                          </div>
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-1">Feedback Summary</h4>
                            <div className="text-sm">
                              <div className="flex items-center gap-1 mb-1">
                                <span className="font-medium">Rating:</span>
                                <div className="flex">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <svg
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < interview.feedback!.rating
                                          ? "text-yellow-400 fill-yellow-400"
                                          : "text-gray-300 fill-gray-300"
                                      }`}
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                  ))}
                                </div>
                              </div>
                              <div className="mb-1">
                                <span className="font-medium">Strengths:</span>{" "}
                                {interview.feedback!.strengths.join(", ")}
                              </div>
                              <div className="mb-1">
                                <span className="font-medium">Areas for Improvement:</span>{" "}
                                {interview.feedback!.weaknesses.join(", ")}
                              </div>
                              <div>
                                <span className="font-medium">Recommendation:</span>{" "}
                                <Badge
                                  variant="outline"
                                  className={
                                    interview.feedback!.recommendation === "advance"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                                      : interview.feedback!.recommendation === "consider"
                                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
                                        : "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
                                  }
                                >
                                  {interview.feedback!.recommendation === "advance"
                                    ? "Advance to Next Stage"
                                    : interview.feedback!.recommendation === "consider"
                                      ? "Consider Further"
                                      : "Reject"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-start md:items-end gap-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(interview.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {interview.time} ({interview.duration} min)
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">with {interview.interviewers.join(", ")}</div>
                        <div className="mt-4">
                          <Button variant="outline" size="sm">
                            View Full Feedback
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="calendar">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h3 className="text-lg font-medium">May 2023</h3>
                    <Button variant="outline" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Today
                    </Button>
                    <Select defaultValue="week">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="View" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">Day</SelectItem>
                        <SelectItem value="week">Week</SelectItem>
                        <SelectItem value="month">Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center font-medium py-2">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 35 }).map((_, i) => {
                    const day = i - 1 + 1 // Adjust for May starting on Monday
                    const isCurrentMonth = day > 0 && day <= 31
                    const isToday = day === 10 // Assuming today is May 10
                    const hasInterviews = [10, 11, 15].includes(day)

                    return (
                      <div
                        key={i}
                        className={`min-h-24 p-1 border rounded-md ${
                          isCurrentMonth ? "bg-background" : "bg-muted/30 text-muted-foreground"
                        } ${isToday ? "border-primary" : "border-border"}`}
                      >
                        {isCurrentMonth && (
                          <>
                            <div className={`text-right p-1 ${isToday ? "font-bold" : ""}`}>{day}</div>
                            {hasInterviews && (
                              <div className="space-y-1">
                                {interviews
                                  .filter(
                                    (interview) =>
                                      new Date(interview.date).getDate() === day &&
                                      new Date(interview.date).getMonth() === 4, // May is month 4 (0-indexed)
                                  )
                                  .map((interview) => (
                                    <div
                                      key={interview.id}
                                      className="text-xs p-1 rounded bg-primary/10 text-primary truncate"
                                    >
                                      {interview.time} - {interview.candidate.name}
                                    </div>
                                  ))}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
