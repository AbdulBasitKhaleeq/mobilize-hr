"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Edit, Trash2, Eye, ArrowUpRight, Clock, MapPin, Briefcase, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

// Sample job data
const job = {
  id: 1,
  title: "Senior Frontend Developer",
  department: "Engineering",
  team: "Frontend Team",
  location: "San Francisco, CA",
  type: "Full-time",
  experience: "Senior Level",
  remote: true,
  remoteRegions: "US Only",
  status: "Published",
  datePosted: "2023-05-01",
  dateExpires: "2023-06-01",
  salary: {
    min: 120000,
    max: 150000,
    currency: "USD",
    visible: true,
  },
  benefits:
    "Health insurance, 401(k) matching, flexible working hours, professional development budget, home office stipend",
  summary:
    "We are looking for an experienced Frontend Developer to join our team and help us build beautiful, responsive web applications using modern JavaScript frameworks.",
  description: `
## About the Role

As a Senior Frontend Developer at our company, you will be responsible for building and maintaining web applications using modern JavaScript frameworks. You will work closely with our design and backend teams to create seamless user experiences.

## What You'll Do

- Develop new user-facing features using React.js
- Build reusable components and front-end libraries for future use
- Translate designs and wireframes into high-quality code
- Optimize components for maximum performance across devices and browsers
- Collaborate with back-end developers and designers
  `,
  requirements: `
- 3+ years of experience with React.js
- Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model
- Experience with TypeScript and modern JavaScript libraries and frameworks
- Familiarity with RESTful APIs and modern authorization mechanisms
- Experience with common front-end development tools such as Babel, Webpack, NPM, etc.
- Good understanding of asynchronous request handling, partial page updates, and AJAX
  `,
  responsibilities: `
- Implement responsive design and ensure cross-browser compatibility
- Participate in code reviews and provide constructive feedback to other developers
- Work with product managers to understand requirements and provide technical solutions
- Debug issues reported by users and implement fixes
- Stay up-to-date with emerging trends and technologies in frontend development
  `,
  skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Redux", "Webpack", "Git"],
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
  applications: 24,
  views: 342,
  clicks: 128,
}

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)

    // Simulate deletion
    setTimeout(() => {
      setIsDeleting(false)
      toast({
        title: "Job Deleted",
        description: "The job listing has been successfully deleted.",
      })
      router.push("/dashboard/jobs")
    }, 1500)
  }

  const handleCloseJob = () => {
    toast({
      title: "Job Closed",
      description: "The job listing has been closed and is no longer accepting applications.",
    })
    router.push("/dashboard/jobs")
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
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">{job.title}</h2>
              <Badge
                variant="outline"
                className={
                  job.status === "Published"
                    ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                    : job.status === "Draft"
                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
                      : "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
                }
              >
                {job.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {job.department} • {job.location}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/jobs/${job.id}`} target="_blank">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </Link>
            <Link href={`/dashboard/jobs/${job.id}/edit`}>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
            {job.status === "Published" ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Close Job
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Close this job listing?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will mark the job as closed and it will no longer accept applications. You can reopen it
                      later if needed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCloseJob}>Close Job</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the job listing and remove it from our
                      servers.
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
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="details" className="space-y-6">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-2">
                          <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <div className="font-medium">Job Type</div>
                            <div>{job.type}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <div className="font-medium">Department</div>
                            <div>
                              {job.department}
                              {job.team ? ` - ${job.team}` : ""}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <div className="font-medium">Location</div>
                            <div>
                              {job.location}
                              {job.remote && (
                                <Badge variant="outline" className="ml-2">
                                  Remote {job.remoteRegions ? `(${job.remoteRegions})` : ""}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-2">
                          <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <div className="font-medium">Posted Date</div>
                            <div>{new Date(job.datePosted).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <div className="font-medium">Expires</div>
                            <div>{new Date(job.dateExpires).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <svg
                            className="h-5 w-5 text-muted-foreground mt-0.5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <div>
                            <div className="font-medium">Salary Range</div>
                            <div>
                              {job.salary.visible
                                ? `${job.salary.currency} ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}`
                                : "Hidden"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-2">Summary</h3>
                      <p>{job.summary}</p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {job.benefits && (
                      <div>
                        <h3 className="font-medium mb-2">Benefits</h3>
                        <p>{job.benefits}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Application Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-2">Application Method</h3>
                        <p>
                          {job.applicationMethod === "internal"
                            ? "Internal application form"
                            : job.applicationMethod === "external"
                              ? "External application URL"
                              : "Email applications"}
                        </p>
                        {job.applicationMethod === "external" && job.applicationUrl && (
                          <div className="mt-1">
                            <a
                              href={job.applicationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline inline-flex items-center"
                            >
                              {job.applicationUrl}
                              <ArrowUpRight className="h-3 w-3 ml-1" />
                            </a>
                          </div>
                        )}
                        {job.applicationMethod === "email" && job.applicationEmail && (
                          <div className="mt-1">
                            <a href={`mailto:${job.applicationEmail}`} className="text-primary hover:underline">
                              {job.applicationEmail}
                            </a>
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Required Documents</h3>
                        <ul className="space-y-1">
                          <li className="flex items-center">
                            <span className={job.requiredDocuments.resume ? "text-green-600" : "text-red-600"}>
                              {job.requiredDocuments.resume ? "✓" : "✗"}
                            </span>
                            <span className="ml-2">Resume/CV</span>
                          </li>
                          <li className="flex items-center">
                            <span className={job.requiredDocuments.coverLetter ? "text-green-600" : "text-red-600"}>
                              {job.requiredDocuments.coverLetter ? "✓" : "✗"}
                            </span>
                            <span className="ml-2">Cover Letter</span>
                          </li>
                          <li className="flex items-center">
                            <span className={job.requiredDocuments.portfolio ? "text-green-600" : "text-red-600"}>
                              {job.requiredDocuments.portfolio ? "✓" : "✗"}
                            </span>
                            <span className="ml-2">Portfolio</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-2">Job Visibility</h3>
                        <ul className="space-y-1">
                          <li className="flex items-center">
                            <span className={job.visibility.website ? "text-green-600" : "text-red-600"}>
                              {job.visibility.website ? "✓" : "✗"}
                            </span>
                            <span className="ml-2">Company Website</span>
                          </li>
                          <li className="flex items-center">
                            <span className={job.visibility.jobBoards ? "text-green-600" : "text-red-600"}>
                              {job.visibility.jobBoards ? "✓" : "✗"}
                            </span>
                            <span className="ml-2">External Job Boards</span>
                          </li>
                          <li className="flex items-center">
                            <span className={job.visibility.internal ? "text-green-600" : "text-red-600"}>
                              {job.visibility.internal ? "✓" : "✗"}
                            </span>
                            <span className="ml-2">Internal Employees Only</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Notifications</h3>
                        <ul className="space-y-1">
                          <li className="flex items-center">
                            <span className={job.notifications.applications ? "text-green-600" : "text-red-600"}>
                              {job.notifications.applications ? "✓" : "✗"}
                            </span>
                            <span className="ml-2">New Applications</span>
                          </li>
                          <li className="flex items-center">
                            <span className={job.notifications.expiry ? "text-green-600" : "text-red-600"}>
                              {job.notifications.expiry ? "✓" : "✗"}
                            </span>
                            <span className="ml-2">Job Expiry</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="description" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: job.description.replace(/\n/g, "<br />") }} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: job.requirements.replace(/\n/g, "<br />") }} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Responsibilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: job.responsibilities.replace(/\n/g, "<br />") }} />
                    </div>
                  </CardContent>
                </Card>

                {job.education && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Education & Certifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {job.education && (
                          <div>
                            <h3 className="font-medium mb-1">Education</h3>
                            <p>{job.education}</p>
                          </div>
                        )}
                        {job.certifications && (
                          <div>
                            <h3 className="font-medium mb-1">Certifications</h3>
                            <p>{job.certifications}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="applications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Applications Overview</CardTitle>
                    <CardDescription>View and manage applications for this job posting</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-6">
                          <div className="text-3xl font-bold">{job.applications}</div>
                          <div className="text-sm text-muted-foreground">Total Applications</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6">
                          <div className="text-3xl font-bold">8</div>
                          <div className="text-sm text-muted-foreground">In Review</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6">
                          <div className="text-3xl font-bold">5</div>
                          <div className="text-sm text-muted-foreground">Interviews Scheduled</div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="text-center p-12">
                      <h3 className="text-lg font-medium mb-2">View All Applications</h3>
                      <p className="text-muted-foreground mb-4">
                        Go to the applications page to view and manage all applications for this job.
                      </p>
                      <Link href="/dashboard/applications">
                        <Button>View Applications</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Performance</CardTitle>
                    <CardDescription>Analytics and performance metrics for this job posting</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-6">
                          <div className="text-3xl font-bold">{job.views}</div>
                          <div className="text-sm text-muted-foreground">Total Views</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6">
                          <div className="text-3xl font-bold">{job.clicks}</div>
                          <div className="text-sm text-muted-foreground">Apply Clicks</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6">
                          <div className="text-3xl font-bold">{Math.round((job.applications / job.clicks) * 100)}%</div>
                          <div className="text-sm text-muted-foreground">Conversion Rate</div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="text-center p-12">
                      <h3 className="text-lg font-medium mb-2">Detailed Analytics</h3>
                      <p className="text-muted-foreground mb-4">
                        View detailed analytics and performance metrics for this job posting.
                      </p>
                      <Button variant="outline">View Detailed Analytics</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Job
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <svg
                    className="h-4 w-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  Share Job
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <svg
                    className="h-4 w-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Export as PDF
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <svg
                    className="h-4 w-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Schedule Interview
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Job Posting Quality</h3>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: "85%" }} />
                    </div>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your job posting is well-written and includes most key elements.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Suggested Improvements</h3>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-start gap-2">
                      <svg
                        className="h-4 w-4 text-amber-500 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Add more specific details about day-to-day responsibilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="h-4 w-4 text-amber-500 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Include information about company culture and values</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Candidate Matching</h3>
                  <p className="text-xs text-muted-foreground">
                    Based on your job requirements, we've identified 15 potential candidates in your talent pool.
                  </p>
                  <Button variant="link" className="text-xs p-0 h-auto mt-1">
                    View matching candidates
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button variant="outline" className="w-full text-xs">
                  View Full AI Analysis
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
