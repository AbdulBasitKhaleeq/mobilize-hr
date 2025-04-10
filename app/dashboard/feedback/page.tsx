"use client"

import { Search, Filter, User, Star, ThumbsUp, ThumbsDown, MessageSquare, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import DashboardLayout from "../../layouts/dashboard-layout"
import { useRouter } from "next/navigation"

// Sample feedback data
const feedbacks = [
  {
    id: 1,
    candidate: {
      name: "James Wilson",
      position: "Senior Frontend Developer",
    },
    interviewer: "Alex Thompson",
    date: "2023-05-08",
    stage: "Technical Interview",
    rating: 4,
    strengths: ["Strong React knowledge", "Problem-solving skills", "Communication"],
    weaknesses: ["Limited experience with TypeScript"],
    notes:
      "James demonstrated excellent React knowledge and problem-solving abilities. His communication was clear and concise. He has limited experience with TypeScript but showed a willingness to learn.",
    recommendation: "advance",
  },
  {
    id: 2,
    candidate: {
      name: "Sophia Garcia",
      position: "Product Manager",
    },
    interviewer: "Maria Rodriguez",
    date: "2023-05-07",
    stage: "First Interview",
    rating: 5,
    strengths: ["Product strategy", "Leadership skills", "Market analysis"],
    weaknesses: ["Could improve technical knowledge"],
    notes:
      "Sophia is an exceptional candidate with strong product strategy skills and leadership abilities. Her market analysis was insightful. She could benefit from improving her technical knowledge, but this is not a major concern for the role.",
    recommendation: "advance",
  },
  {
    id: 3,
    candidate: {
      name: "Daniel Lee",
      position: "UX/UI Designer",
    },
    interviewer: "Chris Johnson",
    date: "2023-05-06",
    stage: "Portfolio Review",
    rating: 3,
    strengths: ["Visual design skills", "Attention to detail"],
    weaknesses: ["User research methodology", "Information architecture"],
    notes:
      "Daniel has good visual design skills but needs to improve his user research methodology and information architecture understanding. His portfolio showed attention to detail but lacked depth in user-centered design processes.",
    recommendation: "consider",
  },
  {
    id: 4,
    candidate: {
      name: "Olivia Martinez",
      position: "DevOps Engineer",
    },
    interviewer: "Sam Wilson",
    date: "2023-05-05",
    stage: "Technical Interview",
    rating: 2,
    strengths: ["AWS knowledge"],
    weaknesses: ["CI/CD pipeline experience", "Kubernetes knowledge", "Problem-solving"],
    notes:
      "Olivia has some AWS knowledge but lacks experience with CI/CD pipelines and Kubernetes. Her problem-solving skills were below expectations for this role.",
    recommendation: "reject",
  },
  {
    id: 5,
    candidate: {
      name: "William Brown",
      position: "Data Scientist",
    },
    interviewer: "Jessica Chen",
    date: "2023-05-04",
    stage: "Technical Interview",
    rating: 4,
    strengths: ["Machine learning expertise", "Python skills", "Data visualization"],
    weaknesses: ["SQL optimization"],
    notes:
      "William demonstrated strong machine learning expertise and Python skills. His data visualization abilities were impressive. He could improve on SQL optimization, but this is a minor concern.",
    recommendation: "advance",
  },
]

export default function FeedbackPage() {
  const router = useRouter()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Interviewer Notes & Feedback</h2>
            <p className="text-muted-foreground">Review and manage feedback from interviewers</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button size="sm">Add Feedback</Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search feedback..." className="w-full pl-9" />
          </div>
          <div className="flex items-center gap-2">
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
            <Select defaultValue="recent">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="rating-high">Highest Rating</SelectItem>
                <SelectItem value="rating-low">Lowest Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-6">
          {feedbacks.map((feedback) => (
            <Card key={feedback.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{feedback.candidate.name}</h3>
                        <Badge
                          variant="outline"
                          className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
                        >
                          {feedback.stage}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{feedback.candidate.position}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <div className="text-sm text-muted-foreground">
                          Interviewed by {feedback.interviewer} on {new Date(feedback.date).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="font-medium">Overall Rating:</span>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <svg
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < feedback.rating
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
                        </div>

                        <div>
                          <div className="flex items-start gap-2">
                            <ThumbsUp className="h-4 w-4 text-green-500 mt-1" />
                            <div>
                              <span className="font-medium">Strengths:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {feedback.strengths.map((strength, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
                                  >
                                    {strength}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-start gap-2">
                            <ThumbsDown className="h-4 w-4 text-red-500 mt-1" />
                            <div>
                              <span className="font-medium">Areas for Improvement:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {feedback.weaknesses.map((weakness, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200"
                                  >
                                    {weakness}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-start gap-2">
                            <MessageSquare className="h-4 w-4 text-muted-foreground mt-1" />
                            <div>
                              <span className="font-medium">Notes:</span>
                              <p className="text-sm mt-1">{feedback.notes}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-3">
                    <Badge
                      variant="outline"
                      className={
                        feedback.recommendation === "advance"
                          ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                          : feedback.recommendation === "consider"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
                            : "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
                      }
                    >
                      {feedback.recommendation === "advance"
                        ? "Advance to Next Stage"
                        : feedback.recommendation === "consider"
                          ? "Consider Further"
                          : "Reject"}
                    </Badge>

                    <div className="flex items-center gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/dashboard/feedback/${feedback.id}`)}
                      >
                        View Details
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/dashboard/feedback/${feedback.id}/edit`)}>
                            Edit Feedback
                          </DropdownMenuItem>
                          <DropdownMenuItem>Share Feedback</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete Feedback</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
