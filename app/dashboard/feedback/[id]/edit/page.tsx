"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Save, Star, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import DashboardLayout from "../../../../layouts/dashboard-layout"

// Sample feedback data for editing
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
  technicalSkills: 4,
  communicationSkills: 5,
  problemSolving: 4,
  cultureFit: 4,
  strengths: ["Strong React knowledge", "Problem-solving skills", "Communication"],
  weaknesses: ["Limited experience with TypeScript"],
  technicalAssessment:
    "James showed strong technical skills in React, JavaScript, and CSS. He was able to solve the coding challenges efficiently and explained his thought process clearly. His understanding of state management and component lifecycle is excellent.",
  behavioralAssessment:
    "James communicated effectively throughout the interview. He provided clear examples of past work and demonstrated good teamwork skills. He was receptive to feedback and asked thoughtful questions.",
  additionalNotes: "Would be a good addition to the frontend team. Recommend moving forward with the hiring process.",
  recommendation: "advance",
}

export default function EditFeedbackPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [overallRating, setOverallRating] = useState(feedback.rating)
  const [technicalSkills, setTechnicalSkills] = useState(feedback.technicalSkills)
  const [communicationSkills, setCommunicationSkills] = useState(feedback.communicationSkills)
  const [problemSolving, setProblemSolving] = useState(feedback.problemSolving)
  const [cultureFit, setCultureFit] = useState(feedback.cultureFit)
  const [recommendation, setRecommendation] = useState(feedback.recommendation)
  const [strengths, setStrengths] = useState(feedback.strengths.join(", "))
  const [weaknesses, setWeaknesses] = useState(feedback.weaknesses.join(", "))
  const [technicalAssessment, setTechnicalAssessment] = useState(feedback.technicalAssessment)
  const [behavioralAssessment, setBehavioralAssessment] = useState(feedback.behavioralAssessment)
  const [additionalNotes, setAdditionalNotes] = useState(feedback.additionalNotes)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Feedback Updated",
        description: "Your interview feedback has been successfully updated.",
      })
      router.push(`/dashboard/feedback/${params.id}`)
    }, 1500)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link
              href={`/dashboard/feedback/${params.id}`}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Feedback Details
            </Link>
            <h2 className="text-2xl font-bold">Edit Feedback</h2>
            <p className="text-muted-foreground">
              Update feedback for {feedback.stage} with {feedback.candidate.name}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.push(`/dashboard/feedback/${params.id}`)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interview Details</CardTitle>
              <CardDescription>Review the interview information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{feedback.candidate.name}</h3>
                  <p className="text-muted-foreground">{feedback.candidate.position}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium">Interview Type</div>
                  <div className="text-muted-foreground">{feedback.stage}</div>
                </div>
                <div>
                  <div className="font-medium">Date</div>
                  <div className="text-muted-foreground">{new Date(feedback.date).toLocaleDateString()}</div>
                </div>
                <div className="md:col-span-2">
                  <div className="font-medium">Interviewer</div>
                  <div className="text-muted-foreground">{feedback.interviewer}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ratings</CardTitle>
              <CardDescription>Rate the candidate's performance in different areas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="overall-rating">Overall Rating</Label>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Star
                          key={rating}
                          className={`h-5 w-5 cursor-pointer ${
                            rating <= overallRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"
                          }`}
                          onClick={() => setOverallRating(rating)}
                        />
                      ))}
                    </div>
                  </div>
                  <Slider
                    id="overall-rating"
                    min={1}
                    max={5}
                    step={1}
                    value={[overallRating]}
                    onValueChange={(value) => setOverallRating(value[0])}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="technical-skills">Technical Skills</Label>
                    <span className="text-sm font-medium">{technicalSkills}/5</span>
                  </div>
                  <Slider
                    id="technical-skills"
                    min={1}
                    max={5}
                    step={1}
                    value={[technicalSkills]}
                    onValueChange={(value) => setTechnicalSkills(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="communication-skills">Communication Skills</Label>
                    <span className="text-sm font-medium">{communicationSkills}/5</span>
                  </div>
                  <Slider
                    id="communication-skills"
                    min={1}
                    max={5}
                    step={1}
                    value={[communicationSkills]}
                    onValueChange={(value) => setCommunicationSkills(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="problem-solving">Problem Solving</Label>
                    <span className="text-sm font-medium">{problemSolving}/5</span>
                  </div>
                  <Slider
                    id="problem-solving"
                    min={1}
                    max={5}
                    step={1}
                    value={[problemSolving]}
                    onValueChange={(value) => setProblemSolving(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="culture-fit">Culture Fit</Label>
                    <span className="text-sm font-medium">{cultureFit}/5</span>
                  </div>
                  <Slider
                    id="culture-fit"
                    min={1}
                    max={5}
                    step={1}
                    value={[cultureFit]}
                    onValueChange={(value) => setCultureFit(value[0])}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feedback Details</CardTitle>
              <CardDescription>Provide detailed feedback about the candidate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="strengths">Strengths</Label>
                  <Input
                    id="strengths"
                    value={strengths}
                    onChange={(e) => setStrengths(e.target.value)}
                    placeholder="Comma-separated list of strengths"
                  />
                  <p className="text-xs text-muted-foreground">Enter strengths separated by commas</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weaknesses">Areas for Improvement</Label>
                  <Input
                    id="weaknesses"
                    value={weaknesses}
                    onChange={(e) => setWeaknesses(e.target.value)}
                    placeholder="Comma-separated list of areas for improvement"
                  />
                  <p className="text-xs text-muted-foreground">Enter areas for improvement separated by commas</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="technical-assessment">Technical Assessment</Label>
                  <Textarea
                    id="technical-assessment"
                    value={technicalAssessment}
                    onChange={(e) => setTechnicalAssessment(e.target.value)}
                    placeholder="Provide details about the candidate's technical abilities"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="behavioral-assessment">Behavioral Assessment</Label>
                  <Textarea
                    id="behavioral-assessment"
                    value={behavioralAssessment}
                    onChange={(e) => setBehavioralAssessment(e.target.value)}
                    placeholder="Provide details about the candidate's behavioral traits and soft skills"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional-notes">Additional Notes</Label>
                  <Textarea
                    id="additional-notes"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Any other observations or comments"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendation</CardTitle>
              <CardDescription>What is your recommendation for this candidate?</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={recommendation} onValueChange={setRecommendation} className="space-y-3">
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="advance" id="advance" className="mt-1" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="advance" className="font-medium">
                      Advance to Next Stage
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      The candidate performed well and should move forward in the hiring process.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="consider" id="consider" className="mt-1" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="consider" className="font-medium">
                      Consider Further
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      The candidate showed potential but may need additional evaluation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="reject" id="reject" className="mt-1" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="reject" className="font-medium">
                      Reject
                    </Label>
                    <p className="text-sm text-muted-foreground">The candidate is not a good fit for this position.</p>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.push(`/dashboard/feedback/${params.id}`)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
