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
import Image from "next/image"
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler"

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
      if (result.error) {
        setError(result.error)
        setPassword("")
      } else {
        router.refresh()
      }
    })
  }

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-110 items-center justify-center overflow-hidden bg-muted/30 bg-linear-to-br p-12 lg:flex dark:bg-gray-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.15)_0%,transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        <div className="relative z-10 space-y-6 text-center">
          <div className="inline-flex size-64 items-center justify-center">
            <Image
              alt="Cyberscool Defcon Inc."
              width={140}
              height={48}
              src="/logo.png"
              className="h-full w-auto object-contain"
            />
          </div>
          <p className="mx-auto max-w-xs text-sm text-gray-500">
            Secure admin access for program management and lead tracking.
          </p>
        </div>
      </div>

      <div className="relative flex flex-1 justify-center p-8">
        <div className="flex w-full max-w-sm flex-col justify-center space-y-6">
          <div className="space-y-1 text-center">
            <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl backdrop-blur-sm dark:bg-white/15">
              <ShieldCheck className="size-6 dark:text-white" />
            </div>
            <h2 className="font-heading text-2xl font-bold">Welcome back</h2>
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
                  className={
                    error
                      ? "border-destructive pr-10 ring-destructive/20"
                      : "pr-10"
                  }
                  aria-invalid={!!error}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-0 right-0 h-full"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeIcon className="size-4 text-muted-foreground" />
                  ) : (
                    <EyeOffIcon className="size-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {error && (
                <p className="flex animate-in items-center gap-1 text-xs text-destructive duration-150 fade-in slide-in-from-top-1">
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
                  <span className="mr-2 size-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Signing in...
                </>
              ) : (
                <>
                  <LockIcon className="mr-2 size-4" /> Sign In
                </>
              )}
            </Button>
          </form>

          <Link
            href="/"
            className="block text-center text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to website
          </Link>
        </div>
        <div className="absolute right-10 bottom-10">
          <AnimatedThemeToggler />
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
