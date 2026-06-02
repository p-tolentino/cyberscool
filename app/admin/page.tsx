import { StatsCards } from "@/components/admin/stats-cards"
import { OrientationDatesTable } from "@/components/admin/orientation-dates-table"
import { RegistrationsTable } from "@/components/admin/registrations-table"
import {
  getOrientationDates,
  getProspects,
  getReferrers,
} from "../actions/admin"

export async function generateMetadata() {
  return {
    title: "Dashboard | CybersCool Defcon Inc.",
    description:
      "Manage orientation dates and view registrations for CybersCool Defcon Inc. programs.",
  }
}

export default async function AdminPage() {
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
    <>
      <StatsCards
        thisMonthEnrollments={stats.thisMonthEnrollments}
        activeDates={stats.activeDates}
        pendingEmails={stats.pendingEmails}
        pendingContact={stats.pendingContact}
      />
      <RegistrationsTable
        registrations={safeRegs}
        referrers={referrers}
      />
      <OrientationDatesTable dates={safeDates} />
    </>
  )
}
