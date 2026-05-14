"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Users,
  CalendarCheck,
  CalendarX,
  MailCheck,
  MailQuestion,
  Phone,
  PhoneCall,
} from "lucide-react"

interface StatsCardsProps {
  thisMonthSignups: number
  activeDates: number
  pendingEmails: number
  pendingContact: number
}

export function StatsCards({
  thisMonthSignups,
  activeDates,
  pendingEmails,
  pendingContact,
}: StatsCardsProps) {
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
      label: "This Month's Signups",
      value: thisMonthSignups,
      icon: Users,
      color:
        "bg-brand-purple/10 text-brand-purple dark:bg-purple-950/30 dark:text-purple-400",
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
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.label}
            className="shadow-sm transition-shadow hover:shadow-md"
          >
            <CardContent className="py-2.5 px-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                  <p className="font-heading text-xl sm:text-2xl font-bold">
                    {stat.value.toLocaleString()}
                  </p>
                </div>
                <div
                  className={`flex size-8 sm:size-10 items-center justify-center rounded-lg ${stat.color}`}
                >
                  <Icon className="size-4 sm:size-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
