"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Download,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import DashboardLayout from "../../../layouts/dashboard-layout"

// Sample applicant data
const applicant = {
  id: 1,
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  position: "Senior Frontend Developer",
  jobId: 1,
  status: "review",
  stage: "Application Review",
  appliedDate: "2023-05-08",
  matchScore: 92,
  resume: "/path/to/resume.pdf",
  coverLetter: "/path/to/cover-letter.pdf",
  portfolio: "https://sarahjohnson.portfolio.com",
  education: [
    {
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science in Computer Science",
      startDate: "2014-09-01",
      endDate: "2018-05-31",
    },
    {
      institution: "Stanford University",
      degree: "Master of Science in Software Engineering",
      startDate: "2018-09-01",
      endDate: "2020-05-31",
    },
  ],
  experience: [
    {
      company: "TechStart Inc.",
      position: "Frontend Developer",
      startDate: "2020-06-01",
      endDate: "2022-12-31",
      description:
        "Developed and maintained web applications using React, TypeScript, and Redux. Collaborated with designers and backend developers to implement new features and improve user experience.",
    },
    {
      company: "WebSolutions LLC",
      position: "Junior Developer",
      startDate: "2018-07-01",
      endDate: "2020-05-31",
      description:
        "Assisted in the development of responsive web applications. Implemented UI components and fixed bugs in existing codebase.",
    },
  ],
  skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Redux", "Node.js", "Git", "Responsive Design"],
  languages: ["English (Native)", "Spanish (Intermediate)"],
  references: [
    {
      name: "John Smith",
      position: "Engineering Manager at TechStart Inc.",
      email: "john.smith@techstart.com",
      phone: "+1 (555) 987-6543",
    },
  ],
  notes: [
    {
      id: 1,
      author: "Alex Thompson",
      date: "2023-05-09",
      content: "Strong technical skills and excellent communication. Recommended for technical interview.",
    },
    {
      id: 2,
      author: "Maria Rodriguez",
      date: "2023-05-10",
      content: "Resume shows relevant experience. Portfolio projects are impressive.",
    },
  ],
  interviews: [
    {
      id: 1,
      type: "Technical Interview",
      date: "2023-05-15",
      time: "10:00 AM",
      duration: 60,
      interviewers: ["Alex Thompson", "David Kim"],
      location: "Video Call (Zoom)",
      status: "scheduled",
    },
  ],
  aiInsights: {
    skillMatch: 92,
    experienceMatch: 88,
    cultureFit: 90,
    strengths: ["Frontend Development", "React Expertise", "Problem Solving"],
    gaps: ["Limited Backend Experience", "No AWS Experience"],
    recommendation: "Strong candidate for the position. Recommended for technical interview.",
  },
}

export default function ApplicantDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isRejecting, setIsRejecting] = useState(false)

  const handleReject = () => {
    setIsRejecting(true)

    // Simulate rejection
    setTimeout(() => {
      setIsRejecting(false)
      toast({
        title: "Applicant Rejected",
        description: "The applicant has been rejected and will be notified.",
      })
      router.push("/dashboard/applicants")
    }, 1500)
  }

  const handleAdvance = (stage: string) => {
    toast({
      title: "Applicant Advanced",
      description: `The applicant has been advanced to the ${stage} stage.`,
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link
              href="/dashboard/applicants"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Applicants
            </Link>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">{applicant.name}</h2>
              <Badge
                variant="outline"
                className={
                  applicant.status === "new"
                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
                    : applicant.status === "review"
                      ? "bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200"
                      : applicant.status === "interview"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
                        : applicant.status === "offer"
                          ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
                }
              >
                {applicant.stage}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {applicant.position} • Applied on {new Date(applicant.appliedDate).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/dashboard/applicants/${applicant.id}/schedule`}>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Interview
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4 mr-2" />
                  Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleAdvance("Technical Interview")}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Advance to Interview
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAdvance("Offer Extended")}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Extend Offer
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem className="text-red-600" onSelect={(e) => e.preventDefault()}>
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject Applicant
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Reject this applicant?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will mark the applicant as rejected and optionally send them a notification email. This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleReject}
                        className="bg-red-600 hover:bg-red-700"
                        disabled={isRejecting}
                      >
                        {isRejecting ? "Rejecting..." : "Reject Applicant"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="resume">Resume</TabsTrigger>
                <TabsTrigger value="interviews">Interviews</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Applicant Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-2">
                          <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <div className="font-medium">Email</div>
                            <div>
                              <a href={`mailto:${applicant.email}`} className="text-primary hover:underline">
                                {applicant.email}
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <div className="font-medium">Phone</div>
                            <div>{applicant.phone}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <div className="font-medium">Location</div>
                            <div>{applicant.location}</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-2">
                          <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <div className="font-medium">Applied Date</div>
                            <div>{new Date(applicant.appliedDate).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <div className="font-medium">Documents</div>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {applicant.resume && (
                                <Button variant="outline" size="sm" className="h-7 gap-1">
                                  <FileText className="h-3.5 w-3.5" />
                                  Resume
                                  <Download className="h-3.5 w-3.5 ml-1" />
                                </Button>
                              )}
                              {applicant.coverLetter && (
                                <Button variant="outline" size="sm" className="h-7 gap-1">
                                  <FileText className="h-3.5 w-3.5" />
                                  Cover Letter
                                  <Download className="h-3.5 w-3.5 ml-1" />
                                </Button>
                              )}
                              {applicant.portfolio && (
                                <Button variant="outline" size="sm" className="h-7 gap-1" asChild>
                                  <a href={applicant.portfolio} target="_blank" rel="noopener noreferrer">
                                    <FileText className="h-3.5 w-3.5" />
                                    Portfolio
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-3">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {applicant.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {applicant.languages.map((language, index) => (
                          <Badge key={index} variant="outline">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Work Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {applicant.experience.map((exp, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">{exp.position}</h4>
                              <div className="text-muted-foreground">{exp.company}</div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(exp.startDate).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                              })}{" "}
                              -{" "}
                              {new Date(exp.endDate).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                              })}
                            </div>
                          </div>
                          <p className="text-sm">{exp.description}</p>
                          {index < applicant.experience.length - 1 && <Separator className="mt-4" />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {applicant.education.map((edu, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">{edu.degree}</h4>
                              <div className="text-muted-foreground">{edu.institution}</div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(edu.startDate).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                              })}{" "}
                              -{" "}
                              {new Date(edu.endDate).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                              })}
                            </div>
                          </div>
                          {index < applicant.education.length - 1 && <Separator className="mt-4" />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {applicant.references.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>References</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {applicant.references.map((ref, index) => (
                          <div key={index} className="space-y-2">
                            <div>
                              <h4 className="font-semibold">{ref.name}</h4>
                              <div className="text-muted-foreground">{ref.position}</div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:gap-4">
                              <div className="flex items-center gap-1">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <a href={`mailto:${ref.email}`} className="text-primary hover:underline">
                                  {ref.email}
                                </a>
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{ref.phone}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="resume" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Preview</CardTitle>
                    <CardDescription>View and download the applicant's resume</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center p-4 border rounded-lg bg-muted/20 min-h-[500px]">
                      <div className="text-center flex flex-col items-center justify-center">
                        <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">Resume Preview</h3>
                        <p className="text-muted-foreground mb-4">
                          Preview not available. Please download the resume to view it.
                        </p>
                        <Button>
                          <Download className="h-4 w-4 mr-2" />
                          Download Resume
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {applicant.coverLetter && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Cover Letter</CardTitle>
                      <CardDescription>View and download the applicant's cover letter</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center p-4 border rounded-lg bg-muted/20 min-h-[300px]">
                        <div className="text-center flex flex-col items-center justify-center">
                          <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">Cover Letter Preview</h3>
                          <p className="text-muted-foreground mb-4">
                            Preview not available. Please download the cover letter to view it.
                          </p>
                          <Button>
                            <Download className="h-4 w-4 mr-2" />
                            Download Cover Letter
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="interviews" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Scheduled Interviews</CardTitle>
                      <CardDescription>View and manage upcoming interviews</CardDescription>
                    </div>
                    <Link href={`/dashboard/applicants/${applicant.id}/schedule`}>
                      <Button size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule New
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    {applicant.interviews.length > 0 ? (
                      <div className="space-y-4">
                        {applicant.interviews.map((interview) => (
                          <Card key={interview.id}>
                            <CardContent className="p-4">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex items-start gap-4">
                                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <Calendar className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold">{interview.type}</h3>
                                    <div className="text-sm text-muted-foreground">
                                      with {interview.interviewers.join(", ")}
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                      <Badge
                                        variant="outline"
                                        className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
                                      >
                                        {interview.status === "scheduled" ? "Scheduled" : "Completed"}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col items-start md:items-end gap-1">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>{new Date(interview.date).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                      {interview.time} ({interview.duration} min)
                                    </span>
                                  </div>
                                  <div className="text-sm text-muted-foreground">{interview.location}</div>
                                </div>
                              </div>
                              <div className="flex justify-end mt-4 gap-2">
                                <Button variant="outline" size="sm">
                                  Reschedule
                                </Button>
                                <Button variant="outline" size="sm">
                                  Add Feedback
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Interviews Scheduled</h3>
                        <p className="text-muted-foreground mb-4">
                          There are no interviews scheduled for this applicant yet.
                        </p>
                        <Link href={`/dashboard/applicants/${applicant.id}/schedule`}>
                          <Button>Schedule Interview</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Notes & Feedback</CardTitle>
                      <CardDescription>Internal notes and feedback about the applicant</CardDescription>
                    </div>
                    <Link href={`/dashboard/applicants/${applicant.id}/add-feedback`}>
                      <Button size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Add Feedback
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    {applicant.notes.length > 0 ? (
                      <div className="space-y-4">
                        {applicant.notes.map((note) => (
                          <div key={note.id} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div className="font-medium">{note.author}</div>
                              <div className="text-sm text-muted-foreground">
                                {new Date(note.date).toLocaleDateString()}
                              </div>
                            </div>
                            <p className="text-sm">{note.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Notes Yet</h3>
                        <p className="text-muted-foreground mb-4">
                          There are no notes or feedback for this applicant yet.
                        </p>
                        <Link href={`/dashboard/applicants/${applicant.id}/add-feedback`}>
                          <Button>Add First Feedback</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium">Match Score</h3>
                    <span className="text-sm font-bold">{applicant.matchScore}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        applicant.matchScore >= 90
                          ? "bg-green-500"
                          : applicant.matchScore >= 80
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${applicant.matchScore}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">Applied for</div>
                  <div className="font-medium">{applicant.position}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">Current Stage</div>
                  <Badge
                    variant="outline"
                    className={
                      applicant.status === "new"
                        ? "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
                        : applicant.status === "review"
                          ? "bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200"
                          : applicant.status === "interview"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
                            : applicant.status === "offer"
                              ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                              : "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
                    }
                  >
                    {applicant.stage}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">Applied on</div>
                  <div>{new Date(applicant.appliedDate).toLocaleDateString()}</div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button className="w-full justify-start" variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                    <Button className="w-full justify-start" variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Interview
                    </Button>
                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/dashboard/applicants/${applicant.id}/add-feedback`)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Add Feedback
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Skills Match</h3>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: `${applicant.aiInsights.skillMatch}%` }} />
                    </div>
                    <span className="text-sm font-medium">{applicant.aiInsights.skillMatch}%</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Experience Match</h3>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500"
                        style={{ width: `${applicant.aiInsights.experienceMatch}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{applicant.aiInsights.experienceMatch}%</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Culture Fit</h3>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: `${applicant.aiInsights.cultureFit}%` }} />
                    </div>
                    <span className="text-sm font-medium">{applicant.aiInsights.cultureFit}%</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-start gap-2">
                    <ThumbsUp className="h-4 w-4 text-green-500 mt-1" />
                    <div>
                      <h3 className="text-sm font-medium">Strengths</h3>
                      <ul className="text-sm mt-1 space-y-1">
                        {applicant.aiInsights.strengths.map((strength, index) => (
                          <li key={index}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-2">
                    <ThumbsDown className="h-4 w-4 text-red-500 mt-1" />
                    <div>
                      <h3 className="text-sm font-medium">Potential Gaps</h3>
                      <ul className="text-sm mt-1 space-y-1">
                        {applicant.aiInsights.gaps.map((gap, index) => (
                          <li key={index}>{gap}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">AI Recommendation</h3>
                  <p className="text-sm">{applicant.aiInsights.recommendation}</p>
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
