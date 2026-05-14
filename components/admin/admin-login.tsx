"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { adminLogin } from "@/app/actions/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  TriangleAlertIcon,
  ShieldCheck,
} from "lucide-react"

export function AdminLogin() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    startTransition(async () => {
      const formData = new FormData()
      formData.set("password", password)
      const result = await adminLogin(formData)
      if (result?.error) {
        setError(result.error)
        setPassword("")
      } else {
        router.refresh()
      }
    })
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex w-[440px] bg-gradient-to-br from-brand-purple to-brand-teal p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.15)_0%,_transparent_60%),_radial-gradient(ellipse_at_bottom_right,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />
        <div className="relative z-10 text-center space-y-6">
          <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
            <ShieldCheck className="size-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">CybersCool</h1>
          <p className="text-white/70 text-sm max-w-xs mx-auto">
            Secure admin access for program management and lead tracking.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-1">
            <div className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-purple/10 text-brand-purple mb-4 lg:hidden">
              <ShieldCheck className="size-6" />
            </div>
            <h2 className="text-2xl font-heading font-bold">Welcome back</h2>
            <p className="text-sm text-muted-foreground">Admin Dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (error) setError("")
                  }}
                  placeholder="Enter admin password"
                  autoFocus
                  disabled={isPending}
                  className={error ? "border-destructive ring-destructive/20 pr-10" : "pr-10"}
                  aria-invalid={!!error}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOffIcon className="size-4 text-muted-foreground" />
                  ) : (
                    <EyeIcon className="size-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {error && (
                <p className="text-xs text-destructive flex items-center gap-1 animate-in slide-in-from-top-1 fade-in duration-150">
                  <TriangleAlertIcon className="size-3" />
                  {error}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="size-4 mr-2 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Signing in...
                </>
              ) : (
                <>
                  <LockIcon className="size-4 mr-2" /> Sign In
                </>
              )}
            </Button>
          </form>

          <Link
            href="/"
            className="block text-sm text-muted-foreground hover:text-foreground text-center transition-colors"
          >
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  )
}

export function AdminLoginSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-4">
      <div className="space-y-3">
        <div className="flex justify-center">
          <Skeleton className="size-12 rounded-xl" />
        </div>
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-80" />
        <Skeleton className="h-10 w-80" />
      </div>
    </div>
  )
}
