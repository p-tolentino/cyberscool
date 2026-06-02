import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "404 - Page Not Found | CybersCool Defcon Inc.",
  robots: { index: false },
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-brand-purple">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button asChild className="bg-brand-purple hover:bg-brand-purple/90 text-white">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
