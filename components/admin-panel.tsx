"use client"

import { AdminHeader } from "@/components/admin/admin-header"
import { StatsCards } from "@/components/admin/stats-cards"
import { OrientationDatesTable } from "@/components/admin/orientation-dates-table"
import { RegistrationsTable } from "@/components/admin/registrations-table"
import type { OrientationDate, Registration } from "@/lib/supabase/types"

interface AdminPanelProps {
  dates: OrientationDate[]
  registrations: Registration[]
  stats: {
    thisMonthSignups: number
    activeDates: number
    pendingEmails: number
    pendingContact: number
  }
}

export default function AdminPanel({
  dates,
  registrations,
  stats,
}: AdminPanelProps) {
  return (
    <div className="bg-background">
      <AdminHeader />
      <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
        <StatsCards
          thisMonthSignups={stats.thisMonthSignups}
          activeDates={stats.activeDates}
          pendingEmails={stats.pendingEmails}
          pendingContact={stats.pendingContact}
        />
        <OrientationDatesTable dates={dates} />
        <RegistrationsTable registrations={registrations} dates={dates} />
      </main>
    </div>
  )
}
