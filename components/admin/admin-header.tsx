"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { adminLogout } from "@/app/actions/admin"
import { ChevronRight, LayoutDashboard, Mail, LogOut } from "lucide-react"
import Image from "next/image"
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/inbox": "Inbox",
}

export function AdminHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const pageTitle = pageTitles[pathname] || "Admin"

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
            <span className="text-foreground">{pageTitle}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AnimatedThemeToggler className="" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full p-1 pr-3 transition-colors hover:bg-muted">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-brand-purple text-xs font-semibold text-white">
                    AD
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium sm:inline">
                  Admin
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col">
                  <span className="font-medium">Admin</span>
                  <span className="text-xs text-muted-foreground">
                    CybersCool Defcon Inc.
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                asChild
                className={pathname === "/admin" ? "bg-accent" : ""}
              >
                <Link href="/admin">
                  <LayoutDashboard className="mr-2 size-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className={pathname === "/admin/inbox" ? "bg-accent" : ""}
              >
                <Link href="/admin/inbox">
                  <Mail className="mr-2 size-4" />
                  Inbox
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                variant="destructive"
              >
                <LogOut className="mr-2 size-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
