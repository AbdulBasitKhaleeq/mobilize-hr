import Link from "next/link"
import {
  Briefcase,
  FileText,
  Calendar,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  XCircle,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "../layouts/dashboard-layout"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,284</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500 font-medium">12%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500 font-medium">5%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                <span className="text-red-500 font-medium">3%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Time to Hire (Avg)</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18 days</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500 font-medium">2 days</span> faster than last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Applications received in the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Sarah Johnson",
                    position: "Senior Frontend Developer",
                    date: "2 hours ago",
                    status: "new",
                  },
                  {
                    name: "Michael Chen",
                    position: "Product Manager",
                    date: "5 hours ago",
                    status: "new",
                  },
                  {
                    name: "Emily Rodriguez",
                    position: "UX/UI Designer",
                    date: "1 day ago",
                    status: "reviewed",
                  },
                  {
                    name: "David Kim",
                    position: "DevOps Engineer",
                    date: "2 days ago",
                    status: "interviewed",
                  },
                  {
                    name: "Lisa Patel",
                    position: "Data Scientist",
                    date: "3 days ago",
                    status: "rejected",
                  },
                ].map((application, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">{application.name}</div>
                        <div className="text-sm text-muted-foreground">{application.position}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-sm text-muted-foreground">{application.date}</div>
                      <div>
                        {application.status === "new" && (
                          <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">New</div>
                        )}
                        {application.status === "reviewed" && (
                          <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Reviewed</div>
                        )}
                        {application.status === "interviewed" && (
                          <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Interviewed</div>
                        )}
                        {application.status === "rejected" && (
                          <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Rejected</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link href="/dashboard/applicants">
                  <Button variant="outline" size="sm">
                    View All Applications
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
              <CardDescription>Scheduled interviews for the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "James Wilson",
                    position: "Senior Frontend Developer",
                    date: "Today, 2:00 PM",
                    interviewer: "Alex Thompson",
                  },
                  {
                    name: "Sophia Garcia",
                    position: "Product Manager",
                    date: "Today, 4:30 PM",
                    interviewer: "Maria Rodriguez",
                  },
                  {
                    name: "Daniel Lee",
                    position: "UX/UI Designer",
                    date: "Tomorrow, 10:00 AM",
                    interviewer: "Chris Johnson",
                  },
                  {
                    name: "Olivia Martinez",
                    position: "DevOps Engineer",
                    date: "Tomorrow, 3:00 PM",
                    interviewer: "Sam Wilson",
                  },
                  {
                    name: "William Brown",
                    position: "Data Scientist",
                    date: "May 15, 11:30 AM",
                    interviewer: "Jessica Chen",
                  },
                ].map((interview, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">{interview.name}</div>
                        <div className="text-sm text-muted-foreground">{interview.position}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{interview.date}</div>
                      <div className="text-xs text-muted-foreground">with {interview.interviewer}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link href="/dashboard/interviews">
                  <Button variant="outline" size="sm">
                    View All Interviews
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Hiring Pipeline Overview</CardTitle>
              <CardDescription>Current status of all applications in the hiring process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  {
                    stage: "New Applications",
                    count: 156,
                    icon: FileText,
                    color: "bg-blue-100 text-blue-800",
                  },
                  {
                    stage: "Resume Screening",
                    count: 89,
                    icon: CheckCircle2,
                    color: "bg-purple-100 text-purple-800",
                  },
                  {
                    stage: "Interview",
                    count: 68,
                    icon: Calendar,
                    color: "bg-yellow-100 text-yellow-800",
                  },
                  {
                    stage: "Offer",
                    count: 24,
                    icon: Briefcase,
                    color: "bg-green-100 text-green-800",
                  },
                  {
                    stage: "Rejected",
                    count: 132,
                    icon: XCircle,
                    color: "bg-red-100 text-red-800",
                  },
                ].map((stage, index) => (
                  <Card key={index} className="border-none shadow-none">
                    <CardContent className="p-4">
                      <div className={`${stage.color} w-10 h-10 rounded-full flex items-center justify-center mb-3`}>
                        <stage.icon className="h-5 w-5" />
                      </div>
                      <div className="text-2xl font-bold">{stage.count}</div>
                      <div className="text-sm text-muted-foreground">{stage.stage}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
