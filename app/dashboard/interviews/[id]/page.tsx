"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  Calendar,
  Clock,
  User,
  Video,
  Phone,
  Building,
  MoreHorizontal,
  MessageSquare,
  FileText,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import DashboardLayout from "../../../layouts/dashboard-layout"

// Sample interview data
const interview = {
  id: 1,
  candidate: {
    id: 1,
    name: "James Wilson",
    position: "Senior Frontend Developer",
    email: "james.wilson@example.com",
    phone: "+1 (555) 123-4567",
  },
  date: "2023-05-10",
  time: "14:00",
  duration: 60,
  type: "video",
  interviewers: [
    {
      id: 1,
      name: "Alex Thompson",
      position: "Engineering Manager",
      email: "alex.thompson@company.com",
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      position: "Senior Developer",
      email: "maria.rodriguez@company.com",
    },
  ],
  stage: "Technical Interview",
  status: "scheduled",
  location: "Zoom Meeting",
  meetingLink: "https://zoom.us/j/123456789",
  meetingId: "123 456 789",
  passcode: "123456",
  description:
    "This technical interview will focus on frontend development skills, particularly React, JavaScript, and CSS. The candidate will be asked to solve coding problems and discuss their approach to frontend architecture.",
  questions: [
    "Explain your experience with React hooks and context API",
    "How do you approach performance optimization in React applications?",
    "Describe a challenging technical problem you've solved recently",
    "How do you stay updated with the latest frontend technologies?",
  ],
  notes:
    "Prepare coding exercises related to state management and component optimization. Review the candidate's portfolio projects before the interview.",
  feedback: null, // No feedback yet
}

export default function InterviewDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isCancelling, setIsCancelling] = useState(false)

  const handleCancel = () => {
    setIsCancelling(true)

    // Simulate cancellation
    setTimeout(() => {
      setIsCancelling(false)
      toast({
        title: "Interview Cancelled",
        description: "The interview has been successfully cancelled.",
      })
      router.push("/dashboard/interviews")
    }, 1500)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link
              href="/dashboard/interviews"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Interviews
            </Link>
            <h2 className="text-2xl font-bold">Interview Details</h2>
            <p className="text-muted-foreground">
              {interview.stage} with {interview.candidate.name}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.push(`/dashboard/interviews/feedback/${params.id}`)}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Add Feedback
            </Button>
            <Button variant="outline" onClick={() => router.push(`/dashboard/interviews/${params.id}/edit`)}>
              Edit Interview
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => window.print()}>Print Details</DropdownMenuItem>
                <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                <DropdownMenuItem>Add to Calendar</DropdownMenuItem>
                <DropdownMenuSeparator />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem className="text-red-600" onSelect={(e) => e.preventDefault()}>
                      Cancel Interview
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel this interview?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will cancel the scheduled interview and notify all participants. Are you sure you want to
                        proceed?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep Interview</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleCancel}
                        className="bg-red-600 hover:bg-red-700"
                        disabled={isCancelling}
                      >
                        {isCancelling ? "Cancelling..." : "Cancel Interview"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Interview Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{interview.candidate.name}</h3>
                    <p className="text-muted-foreground">{interview.candidate.position}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="font-medium">Date & Time</div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(interview.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>
                        {interview.time} ({interview.duration} min)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="font-medium">Interview Type</div>
                    <div className="flex items-center gap-2">
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
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
                        {interview.stage}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="font-medium">Location</div>
                    <div className="text-muted-foreground">{interview.location}</div>
                    {interview.type === "video" && (
                      <div className="text-sm">
                        <a
                          href={interview.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Join Meeting
                        </a>
                        <div className="text-muted-foreground mt-1">
                          Meeting ID: {interview.meetingId} • Passcode: {interview.passcode}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="font-medium">Status</div>
                    <Badge
                      variant="outline"
                      className={
                        interview.status === "scheduled"
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
                          : interview.status === "completed"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                            : "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
                      }
                    >
                      {interview.status === "scheduled"
                        ? "Scheduled"
                        : interview.status === "completed"
                          ? "Completed"
                          : "Cancelled"}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium">Description</h3>
                  <p className="text-sm">{interview.description}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Suggested Questions</h3>
                  <ul className="space-y-1 list-disc pl-5">
                    {interview.questions.map((question, index) => (
                      <li key={index} className="text-sm">
                        {question}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Preparation Notes</h3>
                  <p className="text-sm">{interview.notes}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interviewers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {interview.interviewers.map((interviewer) => (
                    <div key={interviewer.id} className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">{interviewer.name}</div>
                        <div className="text-sm text-muted-foreground">{interviewer.position}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <a
                            href={`mailto:${interviewer.email}`}
                            className="text-xs text-primary hover:underline flex items-center"
                          >
                            <Mail className="h-3 w-3 mr-1" />
                            {interviewer.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {interview.feedback ? (
              <Card>
                <CardHeader>
                  <CardTitle>Interview Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>Feedback content would go here if available</div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Interview Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Feedback Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Feedback has not been submitted for this interview yet.
                    </p>
                    <Button onClick={() => router.push(`/dashboard/interviews/feedback/${params.id}`)}>
                      Add Feedback
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Candidate Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="font-medium">Contact Information</div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${interview.candidate.email}`} className="text-primary hover:underline">
                      {interview.candidate.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{interview.candidate.phone}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="font-medium">Quick Actions</div>
                  <div className="grid grid-cols-1 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => router.push(`/dashboard/applicants/${interview.candidate.id}`)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      View Candidate Profile
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => router.push(`/dashboard/applicants/${interview.candidate.id}/feedback`)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      View All Feedback
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      View Resume
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interview Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="review-resume" className="rounded text-primary" />
                    <label htmlFor="review-resume" className="text-sm">
                      Review candidate's resume
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="prepare-questions" className="rounded text-primary" />
                    <label htmlFor="prepare-questions" className="text-sm">
                      Prepare interview questions
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="test-equipment" className="rounded text-primary" />
                    <label htmlFor="test-equipment" className="text-sm">
                      Test video/audio equipment
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="review-job" className="rounded text-primary" />
                    <label htmlFor="review-job" className="text-sm">
                      Review job description
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="send-reminder" className="rounded text-primary" />
                    <label htmlFor="send-reminder" className="text-sm">
                      Send reminder to candidate
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
