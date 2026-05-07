"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  toggleDateStatus,
  toggleEmailSent,
  toggleContacted,
} from "@/app/actions/admin"

export default function AdminDashboard({
  dates,
  registrations,
}: {
  dates: any[]
  registrations: any[]
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth")
    if (auth === "true") {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      localStorage.setItem("admin_auth", "true")
      setIsAuthenticated(true)
    } else {
      alert("Incorrect password")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_auth")
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-brand-purple">
              Admin Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Enter admin password"
                  autoFocus
                />
              </div>
              <Button onClick={handleLogin} className="w-full">
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold text-brand-purple">
            CybersCool Admin
          </h1>
          <div className="flex gap-2">
            <Button onClick={handleLogout} variant="outline" size="sm">
              Logout
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/">Back to Site</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Orientation Dates Management */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-brand-purple">
            Orientation Dates
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Manage orientation dates. Toggle active status to show/hide from
            registration form.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Label</th>
                  <th className="p-2 text-left">Value</th>
                  <th className="p-2 text-left">Active</th>
                  <th className="p-2 text-left">Created</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {dates.map((d) => (
                  <tr key={d.id} className="border-b hover:bg-muted/50">
                    <td className="p-2">{d.label}</td>
                    <td className="p-2">{d.value}</td>
                    <td className="p-2">
                      <Badge
                        variant={d.is_active ? "default" : "secondary"}
                        className={
                          d.is_active ? "bg-green-100 text-green-800" : ""
                        }
                      >
                        {d.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="p-2 text-sm text-muted-foreground">
                      {new Date(d.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-2">
                      <form action={toggleDateStatus}>
                        <input type="hidden" name="dateId" value={d.id} />
                        <input
                          type="hidden"
                          name="currentStatus"
                          value={d.is_active.toString()}
                        />
                        <Button type="submit" variant="outline" size="sm">
                          {d.is_active ? "Deactivate" : "Activate"}
                        </Button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Registrations */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-brand-purple">
            Registrations
            <span className="ml-2 text-lg text-muted-foreground">
              ({registrations.length})
            </span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Phone</th>
                  <th className="p-2 text-left">Program</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Email Sent</th>
                  <th className="p-2 text-left">Contacted</th>
                  <th className="p-2 text-left">Registered</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((r) => (
                  <tr key={r.id} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">
                      {r.first_name} {r.last_name}
                    </td>
                    <td className="p-2">{r.email}</td>
                    <td className="p-2">{r.phone}</td>
                    <td className="p-2">
                      <Badge
                        variant="outline"
                        className="border-brand-teal text-brand-teal"
                      >
                        {r.program_interest}
                      </Badge>
                    </td>
                    <td className="p-2">{r.orientation_date}</td>
                    <td className="p-2">
                      <form action={toggleEmailSent}>
                        <input type="hidden" name="regId" value={r.id} />
                        <input
                          type="hidden"
                          name="currentStatus"
                          value={r.email_sent.toString()}
                        />
                        <Button
                          type="submit"
                          variant={r.email_sent ? "default" : "outline"}
                          size="sm"
                        >
                          {r.email_sent ? "Yes" : "No"}
                        </Button>
                      </form>
                    </td>
                    <td className="p-2">
                      <form action={toggleContacted}>
                        <input type="hidden" name="regId" value={r.id} />
                        <input
                          type="hidden"
                          name="currentStatus"
                          value={r.contacted.toString()}
                        />
                        <Button
                          type="submit"
                          variant={r.contacted ? "default" : "outline"}
                          size="sm"
                        >
                          {r.contacted ? "Yes" : "No"}
                        </Button>
                      </form>
                    </td>
                    <td className="p-2 text-sm text-muted-foreground">
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
