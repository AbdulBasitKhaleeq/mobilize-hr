"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ChevronLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import DashboardLayout from "../../../../layouts/dashboard-layout"
import { userService, User, UserRole, UserStatus } from "@/lib/firebase/db"
import { useAuth } from "@/contexts/AuthContext"

export default function EditUserPage() {
  const { id } = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { user: currentUser } = useAuth()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    role: "interviewer" as UserRole,
    department: "",
    status: "active" as UserStatus,
  })

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
        setFormData({
          name: fetchedUser.name,
          role: fetchedUser.role,
          department: fetchedUser.department,
          status: fetchedUser.status,
        })
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      setIsSaving(true)
      await userService.updateUser(user.id, formData)
      
      toast({
        title: "Success",
        description: "User updated successfully",
      })
      router.push(`/dashboard/users/${user.id}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
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

  if (!canEdit) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">You don't have permission to edit users.</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Button variant="ghost" onClick={() => router.back()} className="mb-2">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to User
            </Button>
            <h2 className="text-2xl font-bold">Edit User</h2>
            <p className="text-muted-foreground">Update user information and permissions</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.push(`/dashboard/users/${id}`)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Edit the user's basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value: UserRole) => setFormData({ ...formData, role: value })}
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="hr_manager">HR Manager</SelectItem>
                        <SelectItem value="interviewer">Interviewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: UserStatus) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
              <CardDescription>Select what this user can access and modify</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: "canViewUsers", label: "View Users", description: "View user profiles and information" },
                    { id: "canEditUsers", label: "Edit Users", description: "Modify user information" },
                    { id: "canDeleteUsers", label: "Delete Users", description: "Remove users from the system" },
                    { id: "canCreateUsers", label: "Create Users", description: "Add new users to the system" },
                    { id: "canViewDepartments", label: "View Departments", description: "View department information" },
                    { id: "canEditDepartments", label: "Edit Departments", description: "Modify department information" },
                    { id: "canDeleteDepartments", label: "Delete Departments", description: "Remove departments" },
                    { id: "canCreateDepartments", label: "Create Departments", description: "Add new departments" },
                  ].map((permission) => (
                    <div key={permission.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={permission.id}
                        checked={user.permissions[permission.id as keyof typeof user.permissions]}
                        onCheckedChange={(checked) => {
                          setUser({
                            ...user,
                            permissions: {
                              ...user.permissions,
                              [permission.id]: checked,
                            },
                          })
                        }}
                      />
                      <div>
                        <Label htmlFor={permission.id} className="font-medium">
                          {permission.label}
                        </Label>
                        <p className="text-sm text-muted-foreground">{permission.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  )
}
