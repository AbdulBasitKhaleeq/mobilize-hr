"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Video, Phone, Building, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import DashboardLayout from "../../../../layouts/dashboard-layout"

// Sample applicant data
const applicant = {
  id: 1,
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  position: "Senior Frontend Developer",
  jobId: 1,
}

// Sample interviewers data
const interviewers = [
  { id: 1, name: "Alex Thompson", position: "Engineering Manager", available: true },
  { id: 2, name: "Maria Rodriguez", position: "Senior Frontend Developer", available: true },
  { id: 3, name: "David Kim", position: "Technical Lead", available: true },
  { id: 4, name: "Jessica Chen", position: "HR Manager", available: false },
  { id: 5, name: "Robert Johnson", position: "CTO", available: true },
]

export default function ScheduleInterviewPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [interviewType, setInterviewType] = useState("technical")
  const [interviewMethod, setInterviewMethod] = useState("video")
  const [selectedInterviewers, setSelectedInterviewers] = useState<number[]>([])
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [duration, setDuration] = useState("60")

  const handleInterviewerToggle = (interviewerId: number) => {
    setSelectedInterviewers((prev) =>
      prev.includes(interviewerId) ? prev.filter((id) => id !== interviewerId) : [...prev, interviewerId],
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!date || !time || selectedInterviewers.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields and select at least one interviewer.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Interview Scheduled",
        description: "The interview has been successfully scheduled.",
      })
      router.push(`/dashboard/applicants/${params.id}`)
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
            <h2 className="text-2xl font-bold">Schedule Interview</h2>
            <p className="text-muted-foreground">
              Schedule an interview with {applicant.name} for {applicant.position}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.push(`/dashboard/applicants/${params.id}`)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? "Scheduling..." : "Schedule Interview"}
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interview Details</CardTitle>
              <CardDescription>Set up the basic details for the interview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Interview Type</Label>
                  <RadioGroup
                    value={interviewType}
                    onValueChange={setInterviewType}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="screening" id="screening" />
                      <Label htmlFor="screening">Initial Screening</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="technical" id="technical" />
                      <Label htmlFor="technical">Technical Interview</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="behavioral" id="behavioral" />
                      <Label htmlFor="behavioral">Behavioral Interview</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="final" id="final" />
                      <Label htmlFor="final">Final Interview</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Interview Method</Label>
                  <RadioGroup
                    value={interviewMethod}
                    onValueChange={setInterviewMethod}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="video" id="video" />
                      <Label htmlFor="video" className="flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        Video Call
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="phone" id="phone" />
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Call
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="in-person" id="in-person" />
                      <Label htmlFor="in-person" className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        In-Person
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {interviewMethod === "video" && (
                  <div className="space-y-2">
                    <Label htmlFor="video-platform">Video Platform</Label>
                    <Select defaultValue="zoom">
                      <SelectTrigger id="video-platform">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zoom">Zoom</SelectItem>
                        <SelectItem value="teams">Microsoft Teams</SelectItem>
                        <SelectItem value="meet">Google Meet</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {interviewMethod === "in-person" && (
                  <div className="space-y-2">
                    <Label htmlFor="location">Interview Location</Label>
                    <Input id="location" placeholder="e.g. Company HQ, Conference Room 3" />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">
                      Date <span className="text-red-500">*</span>
                    </Label>
                    <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">
                      Time <span className="text-red-500">*</span>
                    </Label>
                    <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interviewers</CardTitle>
              <CardDescription>Select who will conduct the interview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>
                    Select Interviewers <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {interviewers.map((interviewer) => (
                      <div
                        key={interviewer.id}
                        className={`p-4 border rounded-lg ${!interviewer.available ? "opacity-50" : ""}`}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id={`interviewer-${interviewer.id}`}
                            checked={selectedInterviewers.includes(interviewer.id)}
                            onCheckedChange={() => handleInterviewerToggle(interviewer.id)}
                            disabled={!interviewer.available}
                          />
                          <div>
                            <Label htmlFor={`interviewer-${interviewer.id}`} className="font-medium">
                              {interviewer.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">{interviewer.position}</p>
                            {!interviewer.available && <p className="text-xs text-red-500 mt-1">Not available</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Provide any additional details for the interview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Interview Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a brief description of what the interview will cover"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preparation">Preparation Instructions for Candidate</Label>
                  <Textarea
                    id="preparation"
                    placeholder="Any specific instructions or materials the candidate should prepare"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Internal Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any notes for the interviewers (not visible to the candidate)"
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="send-invite" defaultChecked />
                  <Label htmlFor="send-invite">Send calendar invites to all participants</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="send-reminder" defaultChecked />
                  <Label htmlFor="send-reminder">Send reminder 24 hours before the interview</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.push(`/dashboard/applicants/${params.id}`)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Scheduling..." : "Schedule Interview"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
