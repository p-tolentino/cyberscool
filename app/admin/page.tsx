import AdminPanel from "@/components/admin-panel"
import { AdminLogin } from "@/components/admin/admin-login"
import {
  getOrientationDates,
  getProspects,
  checkAdminSession,
  getReferrers,
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

  const [dates, registrations, referrers] = await Promise.all([
    getOrientationDates(),
    getProspects(),
    getReferrers(),
  ])
  const safeDates = dates || []
  const safeRegs = registrations || []

  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  const thisMonthEnrollments = safeRegs.filter((r) => {
    const enrolledAt = new Date(r.enrolled_at)
    const isThisMonth =
      enrolledAt.getMonth() === currentMonth &&
      enrolledAt.getFullYear() === currentYear

    const isEnrolled = r.is_enrolled === true
    return isThisMonth && isEnrolled
  }).length

  const stats = {
    thisMonthEnrollments,
    activeDates: safeDates.filter((d) => d.is_active).length,
    pendingEmails: safeRegs.filter((r) => !r.email_sent).length,
    pendingContact: safeRegs.filter((r) => !r.contacted).length,
  }

  return (
    <AdminPanel
      dates={safeDates}
      registrations={safeRegs}
      referrers={referrers}
      stats={stats}
    />
  )
}
