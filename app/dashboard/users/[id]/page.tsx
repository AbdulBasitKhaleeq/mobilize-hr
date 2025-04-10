"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  User,
  Mail,
  Phone,
  Building,
  Shield,
  Calendar,
  Clock,
  Edit,
  Key,
  Lock,
  XCircle,
  CheckCircle,
} from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import DashboardLayout from "../../../layouts/dashboard-layout"

// Sample user data
const user = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  role: "admin",
  department: "Management",
  status: "active",
  joinDate: "2022-03-15",
  lastActive: "2023-05-20T10:30:00",
  permissions: [
    "manage_users",
    "manage_jobs",
    "manage_applicants",
    "manage_interviews",
    "view_reports",
    "edit_settings",
  ],
  recentActivity: [
    {
      id: 1,
      action: "Created new job posting",
      target: "Senior Frontend Developer",
      date: "2023-05-20T09:45:00",
    },
    {
      id: 2,
      action: "Updated user permissions",
      target: "Maria Rodriguez",
      date: "2023-05-19T14:30:00",
    },
    {
      id: 3,
      action: "Reviewed applicant",
      target: "Sarah Johnson",
      date: "2023-05-18T11:15:00",
    },
    {
      id: 4,
      action: "Scheduled interview",
      target: "David Kim",
      date: "2023-05-17T16:20:00",
    },
  ],
}

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isDeactivating, setIsDeactivating] = useState(false)
  const [isResettingPassword, setIsResettingPassword] = useState(false)
  const [newEmail, setNewEmail] = useState(user.email)
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false)
  const [isChangingEmail, setIsChangingEmail] = useState(false)

  const handleStatusToggle = () => {
    setIsDeactivating(true)

    // Simulate status update
    setTimeout(() => {
      setIsDeactivating(false)
      toast({
        title: "User Status Updated",
        description: `User has been ${user.status === "active" ? "deactivated" : "activated"}.`,
      })
    }, 1500)
  }

  const handleResetPassword = () => {
    setIsResettingPassword(true)

    // Simulate password reset
    setTimeout(() => {
      setIsResettingPassword(false)
      toast({
        title: "Password Reset Email Sent",
        description: "A password reset link has been sent to the user's email.",
      })
    }, 1500)
  }

  const handleEmailChange = () => {
    setIsChangingEmail(true)

    // Validate email
    if (!newEmail || !newEmail.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      setIsChangingEmail(false)
      return
    }

    // Simulate email change
    setTimeout(() => {
      setIsChangingEmail(false)
      setIsEmailDialogOpen(false)
      toast({
        title: "Email Updated",
        description: `User's email has been updated to ${newEmail}.`,
      })
    }, 1500)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link
              href="/dashboard/users"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Users
            </Link>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <Badge
                variant="outline"
                className={
                  user.status === "active"
                    ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                    : "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
                }
              >
                {user.status === "active" ? "Active" : "Inactive"}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {user.role === "admin" ? "Admin" : user.role === "hr_manager" ? "HR Manager" : "Interviewer"} •{" "}
              {user.department}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/dashboard/users/${params.id}/edit`}>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit User
              </Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">
                  {user.status === "active" ? (
                    <>
                      <XCircle className="h-4 w-4 mr-2" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Activate
                    </>
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {user.status === "active" ? "Deactivate this user?" : "Activate this user?"}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {user.status === "active"
                      ? "This will prevent the user from accessing the system. They will not be able to log in until their account is reactivated."
                      : "This will allow the user to access the system again. They will be able to log in with their credentials."}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleStatusToggle}
                    className={user.status === "active" ? "bg-red-600 hover:bg-red-700" : ""}
                    disabled={isDeactivating}
                  >
                    {isDeactivating ? "Processing..." : user.status === "active" ? "Deactivate User" : "Activate User"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="permissions">Permissions</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Information</CardTitle>
                    <CardDescription>Basic information about the user</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-2">
                          <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <div className="font-medium">Full Name</div>
                            <div>{user.name}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <div className="font-medium">Email</div>
                            <div className="flex items-center gap-2">
                              <span>{user.email}</span>
                              <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-6 px-2">
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Change Email Address</DialogTitle>
                                    <DialogDescription>Update the email address for this user.</DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="new-email">New Email Address</Label>
                                      <Input
                                        id="new-email"
                                        type="email"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
                                      Cancel
                                    </Button>
                                    <Button onClick={handleEmailChange} disabled={isChangingEmail}>
                                      {isChangingEmail ? "Updating..." : "Update Email"}
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <div className="font-medium">Phone</div>
                            <div>{user.phone}</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-2">
                          <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <div className="font-medium">Role</div>
                            <div>
                              <Badge
                                variant="outline"
                                className={
                                  user.role === "admin"
                                    ? "bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200"
                                    : user.role === "hr_manager"
                                      ? "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
                                      : "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                                }
                              >
                                {user.role === "admin"
                                  ? "Admin"
                                  : user.role === "hr_manager"
                                    ? "HR Manager"
                                    : "Interviewer"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <div className="font-medium">Department</div>
                            <div>{user.department}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <div className="font-medium">Join Date</div>
                            <div>{new Date(user.joinDate).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="font-medium">Last Active</div>
                        <div>
                          {new Date(user.lastActive).toLocaleDateString()} at{" "}
                          {new Date(user.lastActive).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Account Security</CardTitle>
                    <CardDescription>Manage user's account security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Password</div>
                          <div className="text-sm text-muted-foreground">Last changed: Never</div>
                        </div>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Key className="h-4 w-4 mr-2" />
                            Reset Password
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Reset User's Password?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will send a password reset link to the user's email address. They will be able to set
                              a new password by following the link.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleResetPassword} disabled={isResettingPassword}>
                              {isResettingPassword ? "Sending..." : "Send Reset Link"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Two-Factor Authentication</div>
                          <div className="text-sm text-muted-foreground">Not enabled</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable 2FA
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="permissions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Permissions</CardTitle>
                    <CardDescription>Manage what this user can access and modify</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { id: "manage_users", label: "Manage Users", description: "Create, edit, and delete users" },
                          {
                            id: "manage_jobs",
                            label: "Manage Jobs",
                            description: "Create, edit, and delete job postings",
                          },
                          {
                            id: "manage_applicants",
                            label: "Manage Applicants",
                            description: "View and process job applicants",
                          },
                          {
                            id: "manage_interviews",
                            label: "Manage Interviews",
                            description: "Schedule and manage interviews",
                          },
                          { id: "view_reports", label: "View Reports", description: "Access analytics and reports" },
                          {
                            id: "edit_settings",
                            label: "Edit Settings",
                            description: "Modify system settings",
                          },
                        ].map((permission) => (
                          <div
                            key={permission.id}
                            className={`p-4 border rounded-lg ${
                              user.permissions.includes(permission.id) ? "bg-muted/20" : ""
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5">
                                <div
                                  className={`h-5 w-5 rounded-md border flex items-center justify-center ${
                                    user.permissions.includes(permission.id)
                                      ? "bg-primary border-primary text-primary-foreground"
                                      : "border-muted-foreground"
                                  }`}
                                >
                                  {user.permissions.includes(permission.id) && <CheckCircle className="h-3.5 w-3.5" />}
                                </div>
                              </div>
                              <div>
                                <div className="font-medium">{permission.label}</div>
                                <p className="text-sm text-muted-foreground">{permission.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="ml-auto">
                      Edit Permissions
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>User's recent actions in the system</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {user.recentActivity.map((activity, index) => (
                        <div key={activity.id} className="flex items-start gap-4">
                          <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                            <Clock className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                              <div>
                                <div className="font-medium">{activity.action}</div>
                                <div className="text-sm text-muted-foreground">{activity.target}</div>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {new Date(activity.date).toLocaleDateString()} at{" "}
                                {new Date(activity.date).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                            </div>
                            {index < user.recentActivity.length - 1 && <Separator className="mt-4" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Activity
                    </Button>
                  </CardFooter>
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
                <Link href={`/dashboard/users/${params.id}/edit`}>
                  <Button className="w-full justify-start" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit User Profile
                  </Button>
                </Link>
                <Button className="w-full justify-start" variant="outline">
                  <Key className="h-4 w-4 mr-2" />
                  Reset Password
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  {user.status === "active" ? (
                    <>
                      <XCircle className="h-4 w-4 mr-2" />
                      Deactivate User
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Activate User
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-1">Interviews Conducted</div>
                  <div className="text-2xl font-bold">24</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Feedback Submitted</div>
                  <div className="text-2xl font-bold">18</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Jobs Posted</div>
                  <div className="text-2xl font-bold">7</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Login Streak</div>
                  <div className="text-2xl font-bold">12 days</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
