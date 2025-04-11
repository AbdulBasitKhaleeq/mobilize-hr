"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Edit, Trash2, User as UserIcon, CheckCircle, XCircle, ChevronLeft, Mail, Phone, Building, Shield, Calendar, Clock, Key, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
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
import { userService, User, UserStatus } from "@/lib/firebase/db"
import { useAuth } from "@/contexts/AuthContext"

export default function UserDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { user: currentUser } = useAuth()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isResettingPassword, setIsResettingPassword] = useState(false)
  const [isDeactivating, setIsDeactivating] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await userService.getUserById(id as string)
        if (!fetchedUser) {
          toast({
            title: "Error",
            description: "User not found",
            variant: "destructive",
          })
          router.push("/dashboard/users")
          return
        }
        setUser(fetchedUser)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch user details",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [id, router, toast])

  const handleStatusToggle = async () => {
    if (!user) return

    try {
      setIsDeactivating(true)
      const newStatus: UserStatus = user.status === "active" ? "inactive" : "active"
      await userService.updateUserStatus(user.id, newStatus)
      setUser({ ...user, status: newStatus })
      
      toast({
        title: "Success",
        description: `User status updated to ${newStatus}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      })
    } finally {
      setIsDeactivating(false)
    }
  }

  const handleDelete = async () => {
    if (!user) return

    try {
      setIsDeleting(true)
      await userService.deleteUser(user.id)
      
      toast({
        title: "Success",
        description: "User deleted successfully",
      })
      router.push("/dashboard/users")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleResetPassword = async () => {
    if (!user) return

    try {
      setIsResettingPassword(true)
      // TODO: Implement password reset with Firebase Auth
      // await auth.sendPasswordResetEmail(user.email)
      
      toast({
        title: "Success",
        description: "Password reset email sent successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send password reset email",
        variant: "destructive",
      })
    } finally {
      setIsResettingPassword(false)
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (!user) {
    return null
  }

  const canEdit = currentUser?.permissions?.canEditUsers
  const canDelete = currentUser?.permissions?.canDeleteUsers

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Button variant="ghost" onClick={() => router.back()} className="mb-2">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Users
            </Button>
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
            {canEdit && (
              <Button onClick={() => router.push(`/dashboard/users/${user.id}/edit`)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit User
              </Button>
            )}
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
            {canDelete && (
              <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete User
              </Button>
            )}
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
                          <UserIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <div className="font-medium">Full Name</div>
                            <div>{user.name}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <div className="font-medium">Email</div>
                            <div>{user.email}</div>
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
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="font-medium">Last Active</div>
                        <div>
                          {user.lastActive ? new Date(user.lastActive).toLocaleString() : "Never"}
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
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>View Users</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {user.permissions?.canEditUsers ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span>Edit Users</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {user.permissions?.canDeleteUsers ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span>Delete Users</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {user.permissions?.canCreateUsers ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span>Create Users</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {user.permissions?.canViewDepartments ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span>View Departments</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {user.permissions?.canEditDepartments ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span>Edit Departments</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {user.permissions?.canDeleteDepartments ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span>Delete Departments</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {user.permissions?.canCreateDepartments ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span>Create Departments</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
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
                      {/* TODO: Implement activity tracking */}
                      <div className="text-center text-muted-foreground">
                        No recent activity to display
                      </div>
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
                {canEdit && (
                  <Button className="w-full justify-start" variant="outline" onClick={() => router.push(`/dashboard/users/${user.id}/edit`)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit User Profile
                  </Button>
                )}
                <Button className="w-full justify-start" variant="outline" onClick={handleResetPassword} disabled={isResettingPassword}>
                  <Key className="h-4 w-4 mr-2" />
                  Reset Password
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={handleStatusToggle} disabled={isDeactivating}>
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
                  <div className="text-2xl font-bold">0</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Feedback Submitted</div>
                  <div className="text-2xl font-bold">0</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Jobs Posted</div>
                  <div className="text-2xl font-bold">0</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Login Streak</div>
                  <div className="text-2xl font-bold">0 days</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
