"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, MessageSquare, Star, User, Calendar, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import DashboardLayout from "../../../../layouts/dashboard-layout"

// Sample applicant data
const applicant = {
  id: 1,
  name: "Sarah Johnson",
  position: "Senior Frontend Developer",
}

// Sample feedback data
const feedbackList = [
  {
    id: 1,
    interviewId: 1,
    interviewType: "Technical Interview",
    interviewer: {
      name: "Alex Thompson",
      position: "Engineering Manager",
    },
    date: "2023-05-15",
    overallRating: 4,
    ratings: {
      technicalSkills: 4,
      communicationSkills: 5,
      problemSolving: 4,
      cultureFit: 4,
    },
    strengths: [
      "Strong React knowledge and experience",
      "Excellent communication skills",
      "Good problem-solving approach",
    ],
    weaknesses: ["Limited experience with TypeScript", "Could improve on system design knowledge"],
    technicalAssessment:
      "Sarah demonstrated strong knowledge of React, including hooks, context, and performance optimization. She was able to solve the coding challenge efficiently and explained her thought process clearly. Her understanding of JavaScript fundamentals is solid.",
    behavioralAssessment:
      "Sarah communicated her ideas clearly and was able to collaborate effectively during the pair programming exercise. She asked good clarifying questions and was receptive to feedback.",
    additionalNotes: "Would be a good fit for the team. Recommend moving forward to the next stage.",
    recommendation: "advance",
  },
  {
    id: 2,
    interviewId: 2,
    interviewType: "Behavioral Interview",
    interviewer: {
      name: "Maria Rodriguez",
      position: "HR Manager",
    },
    date: "2023-05-17",
    overallRating: 5,
    ratings: {
      technicalSkills: 0, // Not rated in behavioral interview
      communicationSkills: 5,
      problemSolving: 5,
      cultureFit: 5,
    },
    strengths: [
      "Excellent communication skills",
      "Strong team player",
      "Good conflict resolution approach",
      "Aligns well with company values",
    ],
    weaknesses: ["Could provide more specific examples in some scenarios"],
    technicalAssessment: "",
    behavioralAssessment:
      "Sarah demonstrated excellent interpersonal skills and a collaborative mindset. She provided thoughtful responses to situational questions and showed good judgment in handling difficult scenarios. Her previous experience working in diverse teams is a plus.",
    additionalNotes: "Would be a great cultural fit for the team. Highly recommend.",
    recommendation: "advance",
  },
]

export default function ApplicantFeedbackPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = (feedbackId: number) => {
    setIsDeleting(true)

    // Simulate deletion
    setTimeout(() => {
      setIsDeleting(false)
      toast({
        title: "Feedback Deleted",
        description: "The feedback has been successfully deleted.",
      })
      // In a real app, you would filter out the deleted feedback
    }, 1500)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link
              href={`/dashboard/applicants/${params.id}`}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Applicant
            </Link>
            <h2 className="text-2xl font-bold">Interview Feedback</h2>
            <p className="text-muted-foreground">Review all feedback for {applicant.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => router.push(`/dashboard/applicants/${params.id}/schedule`)}>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Interview
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {feedbackList.length > 0 ? (
            feedbackList.map((feedback) => (
              <Card key={feedback.id} className="overflow-hidden">
                <CardHeader className="bg-muted/20 pb-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{feedback.interviewType}</CardTitle>
                        <CardDescription>
                          Feedback by {feedback.interviewer.name}, {feedback.interviewer.position}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= feedback.overallRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
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
                          ? "Advance"
                          : feedback.recommendation === "consider"
                            ? "Consider"
                            : "Reject"}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Feedback</DropdownMenuItem>
                          <DropdownMenuItem>Print Feedback</DropdownMenuItem>
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
                                  This action cannot be undone. This will permanently delete the feedback from the
                                  system.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(feedback.id)}
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
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(feedback.date).toLocaleDateString()}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Strengths</h3>
                      <ul className="space-y-1 list-disc pl-5">
                        {feedback.strengths.map((strength, index) => (
                          <li key={index} className="text-sm">
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-medium">Areas for Improvement</h3>
                      <ul className="space-y-1 list-disc pl-5">
                        {feedback.weaknesses.map((weakness, index) => (
                          <li key={index} className="text-sm">
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Ratings</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {feedback.ratings.technicalSkills > 0 && (
                        <div className="space-y-1">
                          <div className="text-sm">Technical Skills</div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= feedback.ratings.technicalSkills
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="space-y-1">
                        <div className="text-sm">Communication</div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= feedback.ratings.communicationSkills
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm">Problem Solving</div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= feedback.ratings.problemSolving
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm">Culture Fit</div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= feedback.ratings.cultureFit
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {feedback.technicalAssessment && (
                    <div className="space-y-2">
                      <h3 className="font-medium">Technical Assessment</h3>
                      <p className="text-sm">{feedback.technicalAssessment}</p>
                    </div>
                  )}

                  {feedback.behavioralAssessment && (
                    <div className="space-y-2">
                      <h3 className="font-medium">Behavioral Assessment</h3>
                      <p className="text-sm">{feedback.behavioralAssessment}</p>
                    </div>
                  )}

                  {feedback.additionalNotes && (
                    <div className="space-y-2">
                      <h3 className="font-medium">Additional Notes</h3>
                      <p className="text-sm">{feedback.additionalNotes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Feedback Yet</h3>
                <p className="text-muted-foreground text-center mb-6">
                  There is no interview feedback for this applicant yet.
                </p>
                <Button onClick={() => router.push(`/dashboard/applicants/${params.id}/schedule`)}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Interview
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
