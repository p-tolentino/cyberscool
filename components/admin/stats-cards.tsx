"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  UserX,
  CalendarCheck,
  CalendarX,
  MailCheck,
  MailQuestion,
  Phone,
  PhoneCall,
  GraduationCap,
} from "lucide-react"

interface StatsCardsProps {
  thisMonthEnrollments: number
  activeDates: number
  pendingEmails: number
  pendingContact: number
}

export function StatsCards({
  thisMonthEnrollments,
  activeDates,
  pendingEmails,
  pendingContact,
}: StatsCardsProps) {
  const signupsIcon = thisMonthEnrollments > 0 ? GraduationCap : UserX
  const signupsColor =
    thisMonthEnrollments > 0
      ? "bg-brand-purple/10 text-brand-purple dark:bg-purple-950/30 dark:text-purple-400"
      : "bg-muted text-muted-foreground"

  const activeIcon = activeDates > 0 ? CalendarCheck : CalendarX
  const activeColor =
    activeDates > 0
      ? "bg-brand-teal/10 text-brand-teal dark:bg-cyan-950/30 dark:text-cyan-400"
      : "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400"

  const emailIcon = pendingEmails > 0 ? MailQuestion : MailCheck
  const emailColor =
    pendingEmails > 0
      ? "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
      : "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400"

  const phoneIcon = pendingContact > 0 ? PhoneCall : Phone
  const phoneColor =
    pendingContact > 0
      ? "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
      : "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400"

  const stats = [
    {
      label: "Monthly Enrollments",
      value: thisMonthEnrollments,
      icon: signupsIcon,
      color: signupsColor,
    },
    {
      label: "Active Dates",
      value: activeDates,
      icon: activeIcon,
      color: activeColor,
    },
    {
      label: "Pending Emails",
      value: pendingEmails,
      icon: emailIcon,
      color: emailColor,
    },
    {
      label: "Pending Contact",
      value: pendingContact,
      icon: phoneIcon,
      color: phoneColor,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-2 sm:gap-3 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.label}
            className="shadow-sm transition-shadow hover:shadow-md"
          >
            <CardContent className="px-3 sm:px-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <p className="min-w-6 text-center font-heading text-base font-bold sm:min-w-12 sm:text-xl">
                    {stat.value.toLocaleString()}
                  </p>
                  <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                    {stat.label}
                  </p>
                </div>
                <div
                  className={`flex size-8 items-center justify-center rounded-lg ${stat.color}`}
                >
                  <Icon className="size-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
