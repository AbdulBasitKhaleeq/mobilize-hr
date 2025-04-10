"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import DashboardLayout from "../../../layouts/dashboard-layout"

export default function CreateJobPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [jobStatus, setJobStatus] = useState("draft")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Job Created",
        description: "Your job listing has been successfully created.",
      })
      router.push("/dashboard/jobs")
    }, 1500)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link
              href="/dashboard/jobs"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Job Listings
            </Link>
            <h2 className="text-2xl font-bold">Create New Job</h2>
            <p className="text-muted-foreground">Create a new job posting for your company</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.push("/dashboard/jobs")}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? "Creating..." : "Create Job"}
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="details" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="details">Job Details</TabsTrigger>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter the basic details about the job position</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">
                          Job Title <span className="text-red-500">*</span>
                        </Label>
                        <Input id="title" placeholder="e.g. Senior Frontend Developer" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="department">
                          Department <span className="text-red-500">*</span>
                        </Label>
                        <Select required>
                          <SelectTrigger id="department">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="product">Product</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="sales">Sales</SelectItem>
                            <SelectItem value="support">Customer Support</SelectItem>
                            <SelectItem value="hr">Human Resources</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="operations">Operations</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="team">Team (Optional)</Label>
                        <Input id="team" placeholder="e.g. Frontend Team" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="type">
                          Employment Type <span className="text-red-500">*</span>
                        </Label>
                        <Select required>
                          <SelectTrigger id="type">
                            <SelectValue placeholder="Select employment type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                            <SelectItem value="temporary">Temporary</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">
                          Experience Level <span className="text-red-500">*</span>
                        </Label>
                        <Select required>
                          <SelectTrigger id="experience">
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entry">Entry Level</SelectItem>
                            <SelectItem value="mid">Mid Level</SelectItem>
                            <SelectItem value="senior">Senior Level</SelectItem>
                            <SelectItem value="lead">Lead / Manager</SelectItem>
                            <SelectItem value="executive">Executive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Location & Salary</CardTitle>
                  <CardDescription>Specify where the job is located and the compensation details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remote" />
                      <Label htmlFor="remote">This is a remote position</Label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">
                          Location <span className="text-red-500">*</span>
                        </Label>
                        <Input id="location" placeholder="e.g. San Francisco, CA" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="remote-regions">Remote Regions (Optional)</Label>
                        <Select>
                          <SelectTrigger id="remote-regions">
                            <SelectValue placeholder="Select remote regions" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us-only">US Only</SelectItem>
                            <SelectItem value="north-america">North America</SelectItem>
                            <SelectItem value="europe">Europe</SelectItem>
                            <SelectItem value="asia">Asia</SelectItem>
                            <SelectItem value="worldwide">Worldwide</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Salary Visibility</Label>
                      <RadioGroup defaultValue="visible" className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="visible" id="salary-visible" />
                          <Label htmlFor="salary-visible">Display salary range on job posting</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="hidden" id="salary-hidden" />
                          <Label htmlFor="salary-hidden">Keep salary range hidden</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="salary-min">Minimum Salary</Label>
                        <Input id="salary-min" type="number" placeholder="e.g. 80000" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="salary-max">Maximum Salary</Label>
                        <Input id="salary-max" type="number" placeholder="e.g. 120000" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="salary-currency">Currency</Label>
                        <Select defaultValue="usd">
                          <SelectTrigger id="salary-currency">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="usd">USD ($)</SelectItem>
                            <SelectItem value="eur">EUR (€)</SelectItem>
                            <SelectItem value="gbp">GBP (£)</SelectItem>
                            <SelectItem value="cad">CAD ($)</SelectItem>
                            <SelectItem value="aud">AUD ($)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="benefits">Benefits (Optional)</Label>
                      <Textarea
                        id="benefits"
                        placeholder="e.g. Health insurance, 401(k), Flexible working hours, etc."
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="description" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                  <CardDescription>Provide a detailed description of the job position</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="summary">
                        Summary <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="summary"
                        placeholder="Provide a brief summary of the job position"
                        rows={3}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        This will appear at the top of the job posting. Keep it concise and engaging.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Full Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Provide a detailed description of the job position"
                        rows={10}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        You can use Markdown formatting for headings, lists, and emphasis.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requirements">
                        Requirements <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="requirements"
                        placeholder="List the requirements for the job position"
                        rows={5}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="responsibilities">
                        Responsibilities <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="responsibilities"
                        placeholder="List the responsibilities for the job position"
                        rows={5}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills & Qualifications</CardTitle>
                  <CardDescription>Specify the skills and qualifications required for the job</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="skills">
                        Required Skills <span className="text-red-500">*</span>
                      </Label>
                      <Textarea id="skills" placeholder="e.g. React, TypeScript, Node.js, etc." rows={3} required />
                      <p className="text-xs text-muted-foreground">
                        Enter skills separated by commas. These will be used for matching candidates.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="education">Education Requirements (Optional)</Label>
                      <Textarea
                        id="education"
                        placeholder="e.g. Bachelor's degree in Computer Science or related field"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="certifications">Certifications (Optional)</Label>
                      <Textarea
                        id="certifications"
                        placeholder="e.g. AWS Certified Solutions Architect, PMP, etc."
                        rows={2}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Application Settings</CardTitle>
                  <CardDescription>Configure how candidates can apply for this job</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Application Method</Label>
                      <RadioGroup defaultValue="internal" className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="internal" id="internal" />
                          <Label htmlFor="internal">Use internal application form</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="external" id="external" />
                          <Label htmlFor="external">Redirect to external application URL</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="email" id="email" />
                          <Label htmlFor="email">Receive applications via email</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="application-url">External Application URL (Optional)</Label>
                      <Input id="application-url" placeholder="e.g. https://yourcompany.com/careers/apply" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="application-email">Application Email (Optional)</Label>
                      <Input id="application-email" type="email" placeholder="e.g. careers@yourcompany.com" />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Required Documents</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="require-resume" defaultChecked />
                          <Label htmlFor="require-resume">Resume/CV</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="require-cover-letter" />
                          <Label htmlFor="require-cover-letter">Cover Letter</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="require-portfolio" />
                          <Label htmlFor="require-portfolio">Portfolio</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Publication Settings</CardTitle>
                  <CardDescription>Configure when and how the job will be published</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Job Status</Label>
                      <RadioGroup value={jobStatus} onValueChange={setJobStatus} className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="draft" id="draft" />
                          <Label htmlFor="draft">Save as Draft</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="published" id="published" />
                          <Label htmlFor="published">Publish Immediately</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="scheduled" id="scheduled" />
                          <Label htmlFor="scheduled">Schedule Publication</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {jobStatus === "scheduled" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="publish-date">Publication Date</Label>
                          <Input id="publish-date" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="publish-time">Publication Time</Label>
                          <Input id="publish-time" type="time" />
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry-date">Expiry Date (Optional)</Label>
                        <Input id="expiry-date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiry-time">Expiry Time (Optional)</Label>
                        <Input id="expiry-time" type="time" />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Job Visibility</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="visibility-website" defaultChecked />
                          <Label htmlFor="visibility-website">Company Website</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="visibility-job-boards" defaultChecked />
                          <Label htmlFor="visibility-job-boards">External Job Boards</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="visibility-internal" />
                          <Label htmlFor="visibility-internal">Internal Employees Only</Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Notifications</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="notify-applications" defaultChecked />
                          <Label htmlFor="notify-applications">Notify me when someone applies</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="notify-expiry" defaultChecked />
                          <Label htmlFor="notify-expiry">Notify me before job expires</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end mt-6 gap-2">
            <Button variant="outline" onClick={() => router.push("/dashboard/jobs")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Job"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
