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
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import DashboardLayout from "../../../../layouts/dashboard-layout"

// Sample applicant data
const applicant = {
  id: 1,
  name: "Sarah Johnson",
  position: "Senior Frontend Developer",
  email: "sarah.johnson@example.com",
}

// Sample interview types
const interviewTypes = [
  { value: "initial", label: "Initial Screening" },
  { value: "technical", label: "Technical Interview" },
  { value: "behavioral", label: "Behavioral Interview" },
  { value: "cultural", label: "Cultural Fit Interview" },
  { value: "final", label: "Final Interview" },
]

export default function AddApplicantFeedbackPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [overallRating, setOverallRating] = useState(3)
  const [technicalSkills, setTechnicalSkills] = useState(3)
  const [communicationSkills, setCommunicationSkills] = useState(3)
  const [problemSolving, setProblemSolving] = useState(3)
  const [cultureFit, setCultureFit] = useState(3)
  const [recommendation, setRecommendation] = useState("consider")
  const [interviewType, setInterviewType] = useState("technical")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Feedback Submitted",
        description: "Your feedback has been successfully submitted.",
      })
      router.push(`/dashboard/applicants/${params.id}/feedback`)
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
            <h2 className="text-2xl font-bold">Add Feedback</h2>
            <p className="text-muted-foreground">Provide feedback for {applicant.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.push(`/dashboard/applicants/${params.id}`)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Applicant Information</CardTitle>
                  <CardDescription>Review the applicant information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{applicant.name}</h3>
                      <p className="text-muted-foreground">{applicant.position}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="interview-type">Interview Type</Label>
                      <Select value={interviewType} onValueChange={setInterviewType}>
                        <SelectTrigger id="interview-type">
                          <SelectValue placeholder="Select interview type" />
                        </SelectTrigger>
                        <SelectContent>
                          {interviewTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                                rating <= overallRating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300 fill-gray-300"
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
                      <Textarea
                        id="strengths"
                        placeholder="What were the candidate's key strengths?"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weaknesses">Areas for Improvement</Label>
                      <Textarea
                        id="weaknesses"
                        placeholder="What areas could the candidate improve on?"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="technical-assessment">Technical Assessment</Label>
                      <Textarea
                        id="technical-assessment"
                        placeholder="Provide details about the candidate's technical abilities"
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="behavioral-assessment">Behavioral Assessment</Label>
                      <Textarea
                        id="behavioral-assessment"
                        placeholder="Provide details about the candidate's behavioral traits and soft skills"
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additional-notes">Additional Notes</Label>
                      <Textarea id="additional-notes" placeholder="Any other observations or comments" rows={3} />
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
                        <p className="text-sm text-muted-foreground">
                          The candidate is not a good fit for this position.
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Submission Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="share-team" defaultChecked />
                      <Label htmlFor="share-team">Share feedback with hiring team</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notify-hr" defaultChecked />
                      <Label htmlFor="notify-hr">Notify HR manager of submission</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="private-notes" />
                      <Label htmlFor="private-notes">Keep additional notes private</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/dashboard/applicants/${params.id}`)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </Button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Feedback Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Be Specific</h3>
                  <p className="text-sm text-muted-foreground">
                    Provide concrete examples of the candidate's performance during the interview.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Be Objective</h3>
                  <p className="text-sm text-muted-foreground">
                    Focus on observable behaviors and skills rather than personal impressions.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Be Comprehensive</h3>
                  <p className="text-sm text-muted-foreground">
                    Cover all relevant aspects of the candidate's performance, both technical and non-technical.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Be Constructive</h3>
                  <p className="text-sm text-muted-foreground">
                    Even when identifying weaknesses, frame them in a constructive manner.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rating Scale Reference</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <div className="font-medium">5 - Exceptional</div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i <= 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-medium">4 - Above Average</div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-medium">3 - Average</div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i <= 3 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-medium">2 - Below Average</div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i <= 2 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-medium">1 - Poor</div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i <= 1 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
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
