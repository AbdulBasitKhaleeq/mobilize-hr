"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { jobService, Job, JobType, ExperienceLevel, JobStatus } from "@/lib/firebase/db"
import { useAuth } from "@/contexts/AuthContext"
import { Badge } from "@/components/ui/badge"
import { userService } from "@/lib/firebase/db"

export default function EditJobPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [job, setJob] = useState<Job | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    team: "",
    type: "full-time" as JobType,
    experienceLevel: "mid" as ExperienceLevel,
    location: "",
    isRemote: false,
    remoteRegions: "",
    salaryMin: 0,
    salaryMax: 0,
    salaryCurrency: "usd",
    benefits: "",
    summary: "",
    description: "",
    requirements: [""],
    responsibilities: [""],
    skills: "",
    education: "",
    certifications: "",
    status: "draft" as JobStatus,
    interviewers: [] as string[],
    hrManagers: [] as string[],
  })

  const [users, setUsers] = useState<Array<{ id: string; name: string }>>([])

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobData = await jobService.getJobById(params.id)
        if (!jobData) {
          toast({
            title: "Error",
            description: "Job not found",
            variant: "destructive",
          })
          router.push("/dashboard/jobs")
          return
        }
        setJob(jobData)
        setFormData({
          title: jobData.title,
          department: jobData.department,
          team: jobData.team || "",
          type: jobData.type,
          experienceLevel: jobData.experienceLevel,
          location: jobData.location,
          isRemote: jobData.isRemote,
          remoteRegions: jobData.remoteRegions || "",
          salaryMin: jobData.salaryMin || 0,
          salaryMax: jobData.salaryMax || 0,
          salaryCurrency: jobData.salaryCurrency || "usd",
          benefits: jobData.benefits || "",
          summary: jobData.summary || "",
          description: jobData.description,
          requirements: jobData.requirements,
          responsibilities: jobData.responsibilities,
          skills: jobData.skills.join(", "),
          education: jobData.education || "",
          certifications: jobData.certifications || "",
          status: jobData.status,
          interviewers: jobData.interviewers as string[],
          hrManagers: jobData.hrManagers as string[],
        })
      } catch (error) {
        console.error("Error fetching job:", error)
        toast({
          title: "Error",
          description: "Failed to fetch job data",
          variant: "destructive",
        })
        router.push("/dashboard/jobs")
      } finally {
        setIsLoading(false)
      }
    }

    fetchJob()
  }, [params.id, router, toast])

  useEffect(() => {
    // Fetch users for interviewers and HR managers
    const fetchUsers = async () => {
      try {
        const usersData = await userService.getUsers()
        setUsers(usersData)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

    fetchUsers()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      setIsSubmitting(true)
      const jobData: Partial<Job> = {
        title: formData.title,
        description: formData.description,
        requirements: formData.requirements,
        responsibilities: formData.responsibilities,
        location: formData.location,
        salaryMin: formData.salaryMin,
        salaryMax: formData.salaryMax,
        salaryCurrency: formData.salaryCurrency,
        type: formData.type,
        status: formData.status,
        interviewers: formData.interviewers,
        hrManagers: formData.hrManagers,
        department: formData.department,
        team: formData.team,
        experienceLevel: formData.experienceLevel,
        isRemote: formData.isRemote,
        remoteRegions: formData.remoteRegions,
        benefits: formData.benefits,
        summary: formData.summary,
        skills: formData.skills.split(',').map(skill => skill.trim()),
        education: formData.education,
        certifications: formData.certifications
      }

      await jobService.updateJob(params.id, jobData)
      router.push(`/dashboard/jobs/${params.id}`)
    } catch (error) {
      console.error('Error updating job:', error)
      setError('Failed to update job. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, ""],
    });
  };

  const removeRequirement = (index: number) => {
    setFormData({
      ...formData,
      requirements: formData.requirements.filter((_, i) => i !== index),
    });
  };

  const addResponsibility = () => {
    setFormData({
      ...formData,
      responsibilities: [...formData.responsibilities, ""],
    });
  };

  const removeResponsibility = (index: number) => {
    setFormData({
      ...formData,
      responsibilities: formData.responsibilities.filter((_, i) => i !== index),
    });
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading job data...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!job) {
    return null
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
                        <Select 
                          value={formData.experienceLevel}
                          onValueChange={(value: ExperienceLevel) => setFormData({ ...formData, experienceLevel: value })}
                          required
                        >
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
                        checked={formData.isRemote}
                        onCheckedChange={(checked) => setFormData({ ...formData, isRemote: checked as boolean })}
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

                      {formData.isRemote && (
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

                    <div className="space-y-4">
                      <div>
                        <Label>Salary Range</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="salaryMin">Minimum</Label>
                            <Input
                              id="salaryMin"
                              type="number"
                              value={formData.salaryMin}
                              onChange={(e) => setFormData({ ...formData, salaryMin: parseInt(e.target.value) })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="salaryMax">Maximum</Label>
                            <Input
                              id="salaryMax"
                              type="number"
                              value={formData.salaryMax}
                              onChange={(e) => setFormData({ ...formData, salaryMax: parseInt(e.target.value) })}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="salaryCurrency">Currency</Label>
                        <Select
                          value={formData.salaryCurrency}
                          onValueChange={(value) => setFormData({ ...formData, salaryCurrency: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="usd">USD</SelectItem>
                            <SelectItem value="eur">EUR</SelectItem>
                            <SelectItem value="gbp">GBP</SelectItem>
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
                      <Textarea 
                        id="summary" 
                        value={formData.summary}
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
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
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                      <div className="space-y-2">
                        {formData.requirements.map((requirement, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={requirement}
                              onChange={(e) => {
                                const newRequirements = [...formData.requirements];
                                newRequirements[index] = e.target.value;
                                setFormData({ ...formData, requirements: newRequirements });
                              }}
                              placeholder={`Requirement ${index + 1}`}
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => removeRequirement(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button variant="outline" onClick={addRequirement}>
                          Add Requirement
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="responsibilities">
                        Responsibilities <span className="text-red-500">*</span>
                      </Label>
                      <div className="space-y-2">
                        {formData.responsibilities.map((responsibility, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={responsibility}
                              onChange={(e) => {
                                const newResponsibilities = [...formData.responsibilities];
                                newResponsibilities[index] = e.target.value;
                                setFormData({ ...formData, responsibilities: newResponsibilities });
                              }}
                              placeholder={`Responsibility ${index + 1}`}
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => removeResponsibility(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button variant="outline" onClick={addResponsibility}>
                          Add Responsibility
                        </Button>
                      </div>
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
                      <Textarea 
                        id="skills" 
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        rows={3} 
                        required 
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter skills separated by commas. These will be used for matching candidates.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="education">Education Requirements (Optional)</Label>
                      <Textarea 
                        id="education" 
                        value={formData.education}
                        onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                        rows={2} 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="certifications">Certifications (Optional)</Label>
                      <Textarea 
                        id="certifications" 
                        value={formData.certifications}
                        onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
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
                  <CardTitle>Publication Settings</CardTitle>
                  <CardDescription>Update when and how the job will be published</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Job Status</Label>
                      <RadioGroup 
                        value={formData.status} 
                        onValueChange={(value: JobStatus) => setFormData({ ...formData, status: value })}
                        className="flex flex-col space-y-1"
                      >
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

                    <div className="space-y-4">
                      <div>
                        <Label>Interviewers</Label>
                        <Select
                          value={formData.interviewers[0] || ""}
                          onValueChange={(value) => {
                            if (!formData.interviewers.includes(value)) {
                              setFormData({
                                ...formData,
                                interviewers: [...formData.interviewers, value],
                              });
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select interviewer" />
                          </SelectTrigger>
                          <SelectContent>
                            {users.map((user) => (
                              <SelectItem key={user.id} value={user.id}>
                                {user.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {formData.interviewers.map((interviewerId) => {
                            const interviewer = users.find((u) => u.id === interviewerId);
                            return (
                              <Badge key={interviewerId} variant="secondary">
                                {interviewer?.name}
                                <button
                                  className="ml-1 hover:text-destructive"
                                  onClick={() => {
                                    setFormData({
                                      ...formData,
                                      interviewers: formData.interviewers.filter(
                                        (id) => id !== interviewerId
                                      ),
                                    });
                                  }}
                                >
                                  ×
                                </button>
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <Label>HR Managers</Label>
                        <Select
                          value={formData.hrManagers[0] || ""}
                          onValueChange={(value) => {
                            if (!formData.hrManagers.includes(value)) {
                              setFormData({
                                ...formData,
                                hrManagers: [...formData.hrManagers, value],
                              });
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select HR manager" />
                          </SelectTrigger>
                          <SelectContent>
                            {users.map((user) => (
                              <SelectItem key={user.id} value={user.id}>
                                {user.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {formData.hrManagers.map((hrManagerId) => {
                            const hrManager = users.find((u) => u.id === hrManagerId);
                            return (
                              <Badge key={hrManagerId} variant="secondary">
                                {hrManager?.name}
                                <button
                                  className="ml-1 hover:text-destructive"
                                  onClick={() => {
                                    setFormData({
                                      ...formData,
                                      hrManagers: formData.hrManagers.filter(
                                        (id) => id !== hrManagerId
                                      ),
                                    });
                                  }}
                                >
                                  ×
                                </button>
                              </Badge>
                            );
                          })}
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
