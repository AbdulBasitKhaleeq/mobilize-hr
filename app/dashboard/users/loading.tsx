import { Skeleton } from "@/components/ui/skeleton"
import DashboardLayout from "@/app/layouts/dashboard-layout"

export default function UsersLoading() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-80" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>

        <Skeleton className="h-[500px] w-full" />
      </div>
    </DashboardLayout>
  )
}
