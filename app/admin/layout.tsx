import type { Metadata } from "next"
import { checkAdminSession } from "../actions/admin"
import { AdminLogin } from "@/components/admin/admin-login"
import { AdminHeader } from "@/components/admin/admin-header"

export const metadata: Metadata = {
  title: "Admin | CybersCool Defcon Inc.",
  robots: { index: false, follow: false },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = await checkAdminSession()

  if (!isAuthenticated) {
    return <AdminLogin />
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <main className="mx-auto max-w-[90%] space-y-6 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
}
