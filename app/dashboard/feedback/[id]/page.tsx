"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Star, User, Calendar, ThumbsUp, ThumbsDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
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

// Sample feedback data
const feedback = {
  id: 1,
  candidate: {
    id: 1,
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
  technicalAssessment:
    "James showed strong technical skills in React, JavaScript, and CSS. He was able to solve the coding challenges efficiently and explained his thought process clearly. His understanding of state management and component lifecycle is excellent.",
  behavioralAssessment:
    "James communicated effectively throughout the interview. He provided clear examples of past work and demonstrated good teamwork skills. He was receptive to feedback and asked thoughtful questions.",
  additionalNotes: "Would be a good addition to the frontend team. Recommend moving forward with the hiring process.",
}

export default function FeedbackDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)

    // Simulate deletion
    setTimeout(() => {
      setIsDeleting(false)
      toast({
        title: "Feedback Deleted",
        description: "The feedback has been successfully deleted.",
      })
      router.push("/dashboard/feedback")
    }, 1500)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link
              href="/dashboard/feedback"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Feedback
            </Link>
            <h2 className="text-2xl font-bold">Feedback Details</h2>
            <p className="text-muted-foreground">
              {feedback.stage} for {feedback.candidate.name}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.push(`/dashboard/feedback/${params.id}/edit`)}>
              Edit Feedback
            </Button>
            <Button variant="outline" onClick={() => router.push(`/dashboard/applicants/${feedback.candidate.id}`)}>
              View Applicant
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => window.print()}>Print Feedback</DropdownMenuItem>
                <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                <DropdownMenuItem>Share Feedback</DropdownMenuItem>
                <DropdownMenuSeparator />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem className="text-red-600" onSelect={(e) => e.preventDefault()}>
                      Delete Feedback
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this feedback?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the feedback from the system.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700"
                        disabled={isDeleting}
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Card>
          <CardHeader className="bg-muted/20 pb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{feedback.candidate.name}</h3>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
                      {feedback.stage}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{feedback.candidate.position}</p>
                </div>
              </div>
              <div>
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
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{new Date(feedback.date).toLocaleDateString()}</span>
              <span className="mx-1">•</span>
              <span>Interviewed by {feedback.interviewer}</span>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">Overall Rating:</span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${
                        i < feedback.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
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

              <div className="space-y-4">
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
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Technical Assessment</h3>
                <p className="text-sm">{feedback.technicalAssessment}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Behavioral Assessment</h3>
                <p className="text-sm">{feedback.behavioralAssessment}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Additional Notes</h3>
                <p className="text-sm">{feedback.additionalNotes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
