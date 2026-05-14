"use client"

import { AdminLogin } from "@/components/admin/admin-login"

export function AdminGate({ children }: { children: React.ReactNode }) {
  const sessionCookie =
    typeof document !== "undefined"
      ? document.cookie
          .split("; ")
          .find((row) => row.startsWith("admin_session="))
      : null

  if (!sessionCookie) {
    return <AdminLogin />
  }

  return <>{children}</>
}
