import AdminPanel from "@/components/admin-panel"
import { AdminLogin } from "@/components/admin/admin-login"
import {
  getOrientationDates,
  getProspects,
  checkAdminSession,
} from "../actions/admin"

export async function generateMetadata() {
  return {
    title: "Admin Dashboard | CybersCool Defcon",
    description:
      "Manage orientation dates and view registrations for CybersCool Defcon programs.",
  }
}

export default async function AdminPage() {
  const isAuthenticated = await checkAdminSession()

  if (!isAuthenticated) {
    return <AdminLogin />
  }

  const dates = await getOrientationDates()
  const registrations = await getProspects()
  const safeDates = dates || []
  const safeRegs = registrations || []

  const stats = {
    thisMonthSignups: safeRegs.filter(
      (r) =>
        new Date(r.created_at).getMonth() === new Date().getMonth() &&
        new Date(r.created_at).getFullYear() === new Date().getFullYear()
    ).length,
    activeDates: safeDates.filter((d) => d.is_active).length,
    pendingEmails: safeRegs.filter((r) => !r.email_sent).length,
    pendingContact: safeRegs.filter((r) => !r.contacted).length,
  }

  return (
    <AdminPanel
      dates={safeDates}
      registrations={safeRegs}
      stats={stats}
    />
  )
}
