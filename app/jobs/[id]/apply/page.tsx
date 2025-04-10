"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import PublicLayout from "../../../layouts/public-layout"

// Sample job data for skill matching
const jobSkills = ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Redux", "Responsive Design"]

export default function JobApplicationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null)
  const [resumeAnalysis, setResumeAnalysis] = useState<{
    extractedSkills: string[]
    matchScore: number
    missingSkills: string[]
    suggestions: string
  } | null>(null)

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
      // Trigger AI analysis when resume is uploaded
      setTimeout(() => analyzeResume(), 500)
    }
  }

  const handleCoverLetterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverLetterFile(e.target.files[0])
    }
  }

  const analyzeResume = () => {
    if (!resumeFile) return

    // Simulate AI analysis with a loading state
    toast({
      title: "Analyzing Resume",
      description: "Our AI is analyzing your resume to match it with the job requirements...",
    })

    // Simulate API call delay
    setTimeout(() => {
      // Mock AI analysis result
      const mockAnalysis = {
        extractedSkills: ["React", "JavaScript", "HTML", "CSS", "Node.js", "Git"],
        matchScore: 78,
        missingSkills: ["TypeScript", "Redux"],
        suggestions:
          "Consider highlighting your React experience more prominently. Add examples of TypeScript projects if you have them.",
      }

      setResumeAnalysis(mockAnalysis)

      toast({
        title: "Resume Analysis Complete",
        description: `Your resume has a ${mockAnalysis.matchScore}% match with this job.`,
      })
    }, 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted.",
      })
      router.push(`/jobs/${params.id}/apply/success`)
    }, 2000)
  }

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/jobs/${params.id}`}
            className="text-sm text-muted-foreground hover:text-primary mb-2 inline-block"
          >
            ← Back to Job Details
          </Link>
          <h1 className="text-3xl font-bold mb-8">Apply for Senior Frontend Developer</h1>

          <Card>
            <CardHeader>
              <CardTitle>Application Form</CardTitle>
              <CardDescription>Please fill out the form below to apply for this position.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">
                        First Name
                      </label>
                      <Input id="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone
                    </label>
                    <Input id="phone" type="tel" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-medium">
                      Current Location
                    </label>
                    <Input id="location" placeholder="City, State, Country" required />
                  </div>
                </div>

                <Separator />

                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Resume & Cover Letter</h3>
                  <div className="space-y-2">
                    <label htmlFor="resume" className="text-sm font-medium">
                      Resume
                    </label>
                    <div className="flex items-center gap-4">
                      <Input id="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} required />
                      {resumeFile && <div className="text-sm text-muted-foreground">{resumeFile.name}</div>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Accepted formats: PDF, DOC, DOCX. Max size: 5MB
                    </p>
                    {resumeAnalysis && (
                      <div className="mt-4 p-4 border rounded-lg bg-muted/20">
                        <h4 className="text-sm font-medium mb-2">AI Resume Analysis</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">Match Score</span>
                              <span className="text-sm font-medium">{resumeAnalysis.matchScore}%</span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  resumeAnalysis.matchScore >= 90
                                    ? "bg-green-500"
                                    : resumeAnalysis.matchScore >= 70
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                                style={{ width: `${resumeAnalysis.matchScore}%` }}
                              />
                            </div>
                          </div>

                          <div className="text-xs space-y-1">
                            <div>
                              <span className="font-medium">Detected Skills:</span>{" "}
                              <span className="text-muted-foreground">{resumeAnalysis.extractedSkills.join(", ")}</span>
                            </div>

                            {resumeAnalysis.missingSkills.length > 0 && (
                              <div>
                                <span className="font-medium">Missing Skills:</span>{" "}
                                <span className="text-muted-foreground">{resumeAnalysis.missingSkills.join(", ")}</span>
                              </div>
                            )}

                            <div>
                              <span className="font-medium">Suggestions:</span>{" "}
                              <span className="text-muted-foreground">{resumeAnalysis.suggestions}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="coverLetter" className="text-sm font-medium">
                      Cover Letter (Optional)
                    </label>
                    <div className="flex items-center gap-4">
                      <Input id="coverLetter" type="file" accept=".pdf,.doc,.docx" onChange={handleCoverLetterChange} />
                      {coverLetterFile && <div className="text-sm text-muted-foreground">{coverLetterFile.name}</div>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Accepted formats: PDF, DOC, DOCX. Max size: 5MB
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Additional Information</h3>
                  <div className="space-y-2">
                    <label htmlFor="experience" className="text-sm font-medium">
                      Years of Experience
                    </label>
                    <Select>
                      <SelectTrigger id="experience">
                        <SelectValue placeholder="Select years of experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="linkedin" className="text-sm font-medium">
                      LinkedIn Profile (Optional)
                    </label>
                    <Input id="linkedin" placeholder="https://linkedin.com/in/yourprofile" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="portfolio" className="text-sm font-medium">
                      Portfolio/Website (Optional)
                    </label>
                    <Input id="portfolio" placeholder="https://yourwebsite.com" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="additionalInfo" className="text-sm font-medium">
                      Additional Information (Optional)
                    </label>
                    <Textarea
                      id="additionalInfo"
                      placeholder="Tell us anything else you'd like us to know about your application"
                      rows={4}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting Application..." : "Submit Application"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  )
}
