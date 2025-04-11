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
import DashboardLayout from "../../../layouts/dashboard-layout"
import { jobService, Job, JobStatus, JobType, ExperienceLevel, userService } from "@/lib/firebase/db"
import type { User, UserRole, UserStatus, UserPermissions } from "@/lib/firebase/db"
import { useAuth } from "@/contexts/AuthContext"
import { Badge } from "@/components/ui/badge"

interface FirebaseUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  status: UserStatus;
  createdAt: Date;
  lastActiveAt: Date;
  permissions: UserPermissions;
}

export default function CreateJobPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [interviewers, setInterviewers] = useState<FirebaseUser[]>([])
  const [hrManagers, setHrManagers] = useState<FirebaseUser[]>([])
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
    salaryVisible: true,
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [interviewerUsers, hrManagerUsers] = await Promise.all([
          userService.getUsers({ role: 'interviewer', status: 'active' }),
          userService.getUsers({ role: 'hr_manager', status: 'active' })
        ])
        setInterviewers(interviewerUsers?.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
          status: user.status,
          createdAt: user.createdAt,
          lastActiveAt: user.lastActiveAt,
          permissions: {
            canViewUsers: user.permissions.canViewUsers,
            canEditUsers: user.permissions.canEditUsers,
            canDeleteUsers: user.permissions.canDeleteUsers,
            canCreateUsers: user.permissions.canCreateUsers,
            canViewDepartments: user.permissions.canViewDepartments,
            canEditDepartments: user.permissions.canEditDepartments,
            canDeleteDepartments: user.permissions.canDeleteDepartments,
            canCreateDepartments: user.permissions.canCreateDepartments,
          },
        })))
        setHrManagers(hrManagerUsers?.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
          status: user.status,
          createdAt: user.createdAt,
          lastActiveAt: user.lastActiveAt,
          permissions: {
            canViewUsers: user.permissions.canViewUsers,
            canEditUsers: user.permissions.canEditUsers,
            canDeleteUsers: user.permissions.canDeleteUsers,
            canCreateUsers: user.permissions.canCreateUsers,
            canViewDepartments: user.permissions.canViewDepartments,
            canEditDepartments: user.permissions.canEditDepartments,
            canDeleteDepartments: user.permissions.canDeleteDepartments,
            canCreateDepartments: user.permissions.canCreateDepartments,
          },
        })))
      } catch (error) {
        console.error('Error fetching users:', error)
        toast({
          title: 'Error',
          description: 'Failed to fetch users',
          variant: 'destructive',
        })
      }
    }

    fetchUsers()
  }, [toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      setIsSubmitting(true)
      const jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt' | 'applicationsCount'> = {
        title: formData.title,
        description: formData.description,
        requirements: formData.requirements,
        responsibilities: formData.responsibilities,
        location: formData.location,
        salaryMin: formData.salaryMin,
        salaryMax: formData.salaryMax,
        salaryCurrency: formData.salaryCurrency,
        salaryVisible: formData.salaryVisible,
        type: formData.type,
        status: 'draft',
        createdBy: user.uid,
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

      await jobService.createJob(jobData)
      router.push('/dashboard/jobs')
    } catch (error) {
      console.error('Error creating job:', error)
      toast({
        title: 'Error',
        description: 'Failed to create job. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, ""],
    })
  }

  const removeRequirement = (index: number) => {
    setFormData({
      ...formData,
      requirements: formData.requirements.filter((_, i) => i !== index),
    })
  }

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...formData.requirements]
    newRequirements[index] = value
    setFormData({
      ...formData,
      requirements: newRequirements,
    })
  }

  const addResponsibility = () => {
    setFormData({
      ...formData,
      responsibilities: [...formData.responsibilities, ""],
    })
  }

  const removeResponsibility = (index: number) => {
    setFormData({
      ...formData,
      responsibilities: formData.responsibilities.filter((_, i) => i !== index),
    })
  }

  const updateResponsibility = (index: number, value: string) => {
    const newResponsibilities = [...formData.responsibilities]
    newResponsibilities[index] = value
    setFormData({
      ...formData,
      responsibilities: newResponsibilities,
    })
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
                        <Input 
                          id="title" 
                          placeholder="e.g. Senior Frontend Developer" 
                          required
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="department">
                          Department <span className="text-red-500">*</span>
                        </Label>
                        <Select 
                          required
                          value={formData.department}
                          onValueChange={(value) => setFormData({ ...formData, department: value })}
                        >
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
                        <Input 
                          id="team" 
                          placeholder="e.g. Frontend Team"
                          value={formData.team}
                          onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="type">
                          Employment Type <span className="text-red-500">*</span>
                        </Label>
                        <Select 
                          required
                          value={formData.type}
                          onValueChange={(value: JobType) => setFormData({ ...formData, type: value })}
                        >
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
                          required
                          value={formData.experienceLevel}
                          onValueChange={(value: ExperienceLevel) => setFormData({ ...formData, experienceLevel: value })}
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
                  <CardDescription>Specify where the job is located and the compensation details</CardDescription>
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
                        <Input 
                          id="location" 
                          placeholder="e.g. San Francisco, CA" 
                          required
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="remote-regions">Remote Regions (Optional)</Label>
                        <Select
                          value={formData.remoteRegions}
                          onValueChange={(value) => setFormData({ ...formData, remoteRegions: value })}
                        >
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
                      <RadioGroup 
                        value={formData.salaryVisible ? "visible" : "hidden"}
                        onValueChange={(value) => setFormData({ ...formData, salaryVisible: value === "visible" })}
                        className="flex flex-col space-y-1"
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
                        <Input 
                          id="salary-min" 
                          type="number" 
                          placeholder="e.g. 80000"
                          value={formData.salaryMin}
                          onChange={(e) => setFormData({ ...formData, salaryMin: parseInt(e.target.value) })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="salary-max">Maximum Salary</Label>
                        <Input 
                          id="salary-max" 
                          type="number" 
                          placeholder="e.g. 120000"
                          value={formData.salaryMax}
                          onChange={(e) => setFormData({ ...formData, salaryMax: parseInt(e.target.value) })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="salary-currency">Currency</Label>
                        <Select
                          value={formData.salaryCurrency}
                          onValueChange={(value) => setFormData({ ...formData, salaryCurrency: value })}
                        >
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
                        value={formData.benefits}
                        onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
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
                  <CardDescription>Write a detailed description of the job position</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the job position..."
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Requirements</Label>
                        <Button type="button" variant="outline" size="sm" onClick={addRequirement}>
                          Add Requirement
                        </Button>
                      </div>
                      {formData.requirements.map((requirement, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            placeholder="Enter a requirement..."
                            value={requirement}
                            onChange={(e) => updateRequirement(index, e.target.value)}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeRequirement(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Responsibilities</Label>
                        <Button type="button" variant="outline" size="sm" onClick={addResponsibility}>
                          Add Responsibility
                        </Button>
                      </div>
                      {formData.responsibilities.map((responsibility, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            placeholder="Enter a responsibility..."
                            value={responsibility}
                            onChange={(e) => updateResponsibility(index, e.target.value)}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeResponsibility(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Settings</CardTitle>
                  <CardDescription>Configure additional settings for the job posting</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value: JobStatus) => setFormData({ ...formData, status: value })}
                      >
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Interviewers</Label>
                      <Select
                        value=""
                        onValueChange={(value) => {
                          if (!formData.interviewers.includes(value)) {
                            setFormData({
                              ...formData,
                              interviewers: [...formData.interviewers, value],
                            })
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select interviewers" />
                        </SelectTrigger>
                        <SelectContent>
                          {interviewers.map((user) => {
                            const id = (user as any).id
                            return (
                              <SelectItem key={id} value={id}>
                                {user.name}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.interviewers.map((interviewerId) => {
                          const interviewer = interviewers.find(u => (u as any).id === interviewerId)
                          return (
                            <Badge key={interviewerId} variant="secondary">
                              {interviewer?.name || 'Unknown User'}
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 ml-1"
                                onClick={() => {
                                  setFormData({
                                    ...formData,
                                    interviewers: formData.interviewers.filter((id) => id !== interviewerId),
                                  })
                                }}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          )
                        })}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>HR Managers</Label>
                      <Select
                        value=""
                        onValueChange={(value) => {
                          if (!formData.hrManagers.includes(value)) {
                            setFormData({
                              ...formData,
                              hrManagers: [...formData.hrManagers, value],
                            })
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select HR managers" />
                        </SelectTrigger>
                        <SelectContent>
                          {hrManagers.map((user) => {
                            const id = (user as any).id
                            return (
                              <SelectItem key={id} value={id}>
                                {user.name}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.hrManagers.map((hrManagerId) => {
                          const hrManager = hrManagers.find(u => (u as any).id === hrManagerId)
                          return (
                            <Badge key={hrManagerId} variant="secondary">
                              {hrManager?.name || 'Unknown User'}
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 ml-1"
                                onClick={() => {
                                  setFormData({
                                    ...formData,
                                    hrManagers: formData.hrManagers.filter((id) => id !== hrManagerId),
                                  })
                                }}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </DashboardLayout>
  )
}
