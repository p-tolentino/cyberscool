"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, UserPlus, CalendarCheck, MailQuestion } from "lucide-react"

interface StatsCardsProps {
  totalRegistrations: number
  todaySignups: number
  activeDates: number
  pendingContact: number
}

export function StatsCards({
  totalRegistrations,
  todaySignups,
  activeDates,
  pendingContact,
}: StatsCardsProps) {
  const stats = [
    {
      label: "Total Registrations",
      value: totalRegistrations,
      icon: Users,
      color:
        "bg-brand-purple/10 text-brand-purple dark:bg-purple-950/30 dark:text-purple-400",
    },
    {
      label: "Today's Signups",
      value: todaySignups,
      icon: UserPlus,
      color:
        "bg-brand-teal/10 text-brand-teal dark:bg-cyan-950/30 dark:text-cyan-400",
    },
    {
      label: "Active Dates",
      value: activeDates,
      icon: CalendarCheck,
      color:
        "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400",
    },
    {
      label: "Pending Contact",
      value: pendingContact,
      icon: MailQuestion,
      color:
        "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.label}
            className="shadow-sm transition-shadow hover:shadow-md"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="font-heading text-2xl font-bold">
                    {stat.value.toLocaleString()}
                  </p>
                </div>
                <div
                  className={`flex size-10 items-center justify-center rounded-lg ${stat.color}`}
                >
                  <Icon className="size-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
