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
import DashboardLayout from "../../../../layouts/dashboard-layout"

// Sample job data for editing
const job = {
  id: 1,
  title: "Senior Frontend Developer",
  department: "engineering",
  team: "Frontend Team",
  location: "San Francisco, CA",
  type: "full-time",
  experience: "senior",
  remote: true,
  remoteRegions: "us-only",
  status: "published",
  datePosted: "2023-05-01",
  dateExpires: "2023-06-01",
  salary: {
    min: 120000,
    max: 150000,
    currency: "usd",
    visible: true,
  },
  benefits:
    "Health insurance, 401(k) matching, flexible working hours, professional development budget, home office stipend",
  summary:
    "We are looking for an experienced Frontend Developer to join our team and help us build beautiful, responsive web applications using modern JavaScript frameworks.",
  description: `## About the Role

As a Senior Frontend Developer at our company, you will be responsible for building and maintaining web applications using modern JavaScript frameworks. You will work closely with our design and backend teams to create seamless user experiences.

## What You'll Do

- Develop new user-facing features using React.js
- Build reusable components and front-end libraries for future use
- Translate designs and wireframes into high-quality code
- Optimize components for maximum performance across devices and browsers
- Collaborate with back-end developers and designers`,
  requirements: `- 3+ years of experience with React.js
- Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model
- Experience with TypeScript and modern JavaScript libraries and frameworks
- Familiarity with RESTful APIs and modern authorization mechanisms
- Experience with common front-end development tools such as Babel, Webpack, NPM, etc.
- Good understanding of asynchronous request handling, partial page updates, and AJAX`,
  responsibilities: `- Implement responsive design and ensure cross-browser compatibility
- Participate in code reviews and provide constructive feedback to other developers
- Work with product managers to understand requirements and provide technical solutions
- Debug issues reported by users and implement fixes
- Stay up-to-date with emerging trends and technologies in frontend development`,
  skills: "React, TypeScript, JavaScript, HTML, CSS, Redux, Webpack, Git",
  education: "Bachelor's degree in Computer Science or related field, or equivalent practical experience",
  certifications: "",
  applicationMethod: "internal",
  applicationUrl: "",
  applicationEmail: "",
  requiredDocuments: {
    resume: true,
    coverLetter: false,
    portfolio: true,
  },
  visibility: {
    website: true,
    jobBoards: true,
    internal: false,
  },
  notifications: {
    applications: true,
    expiry: true,
  },
}

export default function EditJobPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [jobStatus, setJobStatus] = useState(job.status)
  const [isRemote, setIsRemote] = useState(job.remote)
  const [salaryVisible, setSalaryVisible] = useState(job.salary.visible)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Job Updated",
        description: "Your job listing has been successfully updated.",
      })
      router.push(`/dashboard/jobs/${params.id}`)
    }, 1500)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link
              href={`/dashboard/jobs/${params.id}`}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Job Details
            </Link>
            <h2 className="text-2xl font-bold">Edit Job</h2>
            <p className="text-muted-foreground">Update the details of this job posting</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.push(`/dashboard/jobs/${params.id}`)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? "Saving..." : "Save Changes"}
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
                  <CardDescription>Update the basic details about the job position</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">
                          Job Title <span className="text-red-500">*</span>
                        </Label>
                        <Input id="title" defaultValue={job.title} required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="department">
                          Department <span className="text-red-500">*</span>
                        </Label>
                        <Select defaultValue={job.department} required>
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
                        <Input id="team" defaultValue={job.team} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="type">
                          Employment Type <span className="text-red-500">*</span>
                        </Label>
                        <Select defaultValue={job.type} required>
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
                        <Select defaultValue={job.experience} required>
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
                  <CardDescription>Update where the job is located and the compensation details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remote"
                        checked={isRemote}
                        onCheckedChange={(checked) => setIsRemote(checked as boolean)}
                      />
                      <Label htmlFor="remote">This is a remote position</Label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">
                          Location <span className="text-red-500">*</span>
                        </Label>
                        <Input id="location" defaultValue={job.location} required />
                      </div>

                      {isRemote && (
                        <div className="space-y-2">
                          <Label htmlFor="remote-regions">Remote Regions</Label>
                          <Select defaultValue={job.remoteRegions}>
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
                      )}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Salary Visibility</Label>
                      <RadioGroup
                        defaultValue={salaryVisible ? "visible" : "hidden"}
                        className="flex flex-col space-y-1"
                        onValueChange={(value) => setSalaryVisible(value === "visible")}
                      >
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
                        <Input id="salary-min" type="number" defaultValue={job.salary.min.toString()} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="salary-max">Maximum Salary</Label>
                        <Input id="salary-max" type="number" defaultValue={job.salary.max.toString()} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="salary-currency">Currency</Label>
                        <Select defaultValue={job.salary.currency}>
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
                      <Textarea id="benefits" defaultValue={job.benefits} rows={3} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="description" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                  <CardDescription>Update the detailed description of the job position</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="summary">
                        Summary <span className="text-red-500">*</span>
                      </Label>
                      <Textarea id="summary" defaultValue={job.summary} rows={3} required />
                      <p className="text-xs text-muted-foreground">
                        This will appear at the top of the job posting. Keep it concise and engaging.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Full Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea id="description" defaultValue={job.description} rows={10} required />
                      <p className="text-xs text-muted-foreground">
                        You can use Markdown formatting for headings, lists, and emphasis.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requirements">
                        Requirements <span className="text-red-500">*</span>
                      </Label>
                      <Textarea id="requirements" defaultValue={job.requirements} rows={5} required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="responsibilities">
                        Responsibilities <span className="text-red-500">*</span>
                      </Label>
                      <Textarea id="responsibilities" defaultValue={job.responsibilities} rows={5} required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills & Qualifications</CardTitle>
                  <CardDescription>Update the skills and qualifications required for the job</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="skills">
                        Required Skills <span className="text-red-500">*</span>
                      </Label>
                      <Textarea id="skills" defaultValue={job.skills} rows={3} required />
                      <p className="text-xs text-muted-foreground">
                        Enter skills separated by commas. These will be used for matching candidates.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="education">Education Requirements (Optional)</Label>
                      <Textarea id="education" defaultValue={job.education} rows={2} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="certifications">Certifications (Optional)</Label>
                      <Textarea id="certifications" defaultValue={job.certifications} rows={2} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Application Settings</CardTitle>
                  <CardDescription>Update how candidates can apply for this job</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Application Method</Label>
                      <RadioGroup defaultValue={job.applicationMethod} className="flex flex-col space-y-1">
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
                      <Input id="application-url" defaultValue={job.applicationUrl} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="application-email">Application Email (Optional)</Label>
                      <Input id="application-email" type="email" defaultValue={job.applicationEmail} />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Required Documents</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="require-resume" defaultChecked={job.requiredDocuments.resume} />
                          <Label htmlFor="require-resume">Resume/CV</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="require-cover-letter" defaultChecked={job.requiredDocuments.coverLetter} />
                          <Label htmlFor="require-cover-letter">Cover Letter</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="require-portfolio" defaultChecked={job.requiredDocuments.portfolio} />
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
                  <CardDescription>Update when and how the job will be published</CardDescription>
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
                          <Label htmlFor="published">Published</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="closed" id="closed" />
                          <Label htmlFor="closed">Closed</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry-date">Expiry Date (Optional)</Label>
                        <Input id="expiry-date" type="date" defaultValue={job.dateExpires} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiry-time">Expiry Time (Optional)</Label>
                        <Input id="expiry-time" type="time" defaultValue="23:59" />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Job Visibility</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="visibility-website" defaultChecked={job.visibility.website} />
                          <Label htmlFor="visibility-website">Company Website</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="visibility-job-boards" defaultChecked={job.visibility.jobBoards} />
                          <Label htmlFor="visibility-job-boards">External Job Boards</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="visibility-internal" defaultChecked={job.visibility.internal} />
                          <Label htmlFor="visibility-internal">Internal Employees Only</Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Notifications</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="notify-applications" defaultChecked={job.notifications.applications} />
                          <Label htmlFor="notify-applications">Notify me when someone applies</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="notify-expiry" defaultChecked={job.notifications.expiry} />
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
            <Button variant="outline" onClick={() => router.push(`/dashboard/jobs/${params.id}`)}>
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
