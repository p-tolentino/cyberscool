import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata = {
  title: "CybersCool Defcon Inc. | Cybersecurity Training Philippines",
  description:
    "Premier cybersecurity training institute in the Philippines offering hands-on programs from foundational to advanced levels.",
  keywords: [
    "cybersecurity",
    "training",
    "Philippines",
    "CybersCool Defcon Inc.",
    "IT security",
    "cyber defense",
  ],
  authors: [{ name: "CybersCool Defcon Inc." }],
  metadataBase: new URL("https://cyberscooldefcon.com"),
  openGraph: {
    title: "CybersCool Defcon Inc. | Cybersecurity Training Philippines",
    description:
      "Premier cybersecurity training institute in the Philippines offering hands-on programs from foundational to advanced levels.",
    url: "https://cyberscooldefcon.com",
    siteName: "CybersCool Defcon Inc.",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "CybersCool Defcon Inc. Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CybersCool Defcon Inc. | Cybersecurity Training Philippines",
    description:
      "Premier cybersecurity training institute in the Philippines offering hands-on programs from foundational to advanced levels.",
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>
            {children}
            <Toaster richColors />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
