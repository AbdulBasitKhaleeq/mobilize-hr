import { Skeleton } from "@/components/ui/skeleton"
import DashboardLayout from "@/app/layouts/dashboard-layout"

export default function SettingsLoading() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-10 w-96" />

        <Skeleton className="h-[500px] w-full" />
      </div>
    </DashboardLayout>
  )
}
