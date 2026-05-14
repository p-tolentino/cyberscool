"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { adminLogout } from "@/app/actions/admin"
import { Button } from "@/components/ui/button"
import { ChevronRight, LogOutIcon } from "lucide-react"
import Image from "next/image"
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler"

export function AdminHeader() {
  const router = useRouter()
  const handleLogout = async () => {
    await adminLogout()
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center">
            <div className="flex h-9 w-9 items-center justify-center bg-transparent">
              <Image
                alt="Cyberscool Defcon Inc."
                width={140}
                height={48}
                src="/logo.png"
                className="h-full w-auto object-contain"
              />
            </div>
          </Link>
          <div className="ml-4 hidden items-center gap-1.5 border-l pl-4 text-sm text-muted-foreground md:flex">
            <Link href="/">
              <span className="font-medium">Home</span>
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground">Admin Dashboard</span>
          </div>
        </div>
        <div className="flex items-center">
          <AnimatedThemeToggler className="" />
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOutIcon className="mr-2 size-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  )
}
