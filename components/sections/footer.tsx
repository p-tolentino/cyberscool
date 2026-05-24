"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  LinkedinIcon as LinkedIn,
  FacebookIcon as Facebook,
} from "../icons/il-icons"
import { PrivacyDialog } from "../privacy-modal"

const data = () => ({
  navigation: {
    company: [
      { name: "About", href: "/about" },
      { name: "Meet the Team", href: "/team" },
      { name: "What's In It For Me?", href: "/#preview" },
      { name: "Why Cybersecurity?", href: "/#why-cyber" },
      { name: "Testimonials", href: "/#testimonials" },
      { name: "Our Partners", href: "/#partners" },
      { name: "FAQs", href: "/#faq" },
    ],
    contact: [
      { name: "Leave a Message", href: "mailto:sales@cyberscooldefcon.com" },
      { name: "Reserve My Free Seat", href: "/#orientation-form" },
      { name: "(+63) 920 947 6628", href: "tel:+639209476628" },
      { name: "(+63) 998 981 1628", href: "tel:+639989811628" },
      { name: "(+63) 2 7915 6464", href: "tel:+63279156464" },
    ],
    legal: [{ name: "Data Privacy", href: "/" }],
  },
  socialLinks: [
    {
      icon: Facebook,
      label: "Facebook",
      href: "https://www.facebook.com/CyberCoolDefcon/",
    },
    {
      icon: LinkedIn,
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/cyberscool-defcon-inc/?originalSubdomain=ph",
    },
  ],
  bottomLinks: [{ href: "/privacy", label: "Privacy Policy" }],
})

export default function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentYear = new Date().getFullYear()

  if (!mounted) return null

  return (
    <footer className="w-full overflow-x-hidden">
      <PrivacyDialog open={isPrivacyOpen} onOpenChange={setIsPrivacyOpen} />
      <div className="animate-energy-flow h-px w-full bg-linear-to-r from-transparent via-brand-purple to-transparent" />
      <div className="relative w-full px-5">
        {/* Top Section */}
        <div className="container m-auto grid grid-cols-1 gap-12 py-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3">
              <Image
                alt="Cyberscool Defcon Inc."
                width={140}
                height={48}
                src="/logo.png"
                className=""
              />
            </div>
            <p className="max-w-md text-muted-foreground">
              The first globally accredited cyber school in the Philippines: we
              focus on skills, not theory.
            </p>
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                {data().socialLinks.map(({ icon: Icon, label, href }) => (
                  <Button
                    key={label}
                    size="icon"
                    variant="outline"
                    asChild
                    className="cursor-pointer border-brand-purple/30! shadow-none transition-all duration-500 hover:scale-110 hover:-rotate-12 hover:border-brand-purple! hover:bg-brand-purple hover:text-white hover:shadow-md dark:hover:bg-brand-purple"
                  >
                    <Link href={href} target="_blank">
                      <Icon className="h-4 w-4" />
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
            <h1 className="bg-linear-to-b from-muted-foreground/15 bg-clip-text text-5xl font-extrabold text-transparent lg:text-7xl">
              Cyberscool Defcon Inc.
            </h1>
          </div>

          {/* Navigation Links - 3 columns */}
          <div className="mb-20 ml-10 grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:mt-10 md:mb-0 lg:col-span-2 lg:grid-cols-3">
            {(["company", "contact", "legal"] as const).map((section) => (
              <div key={section} className="">
                <h3 className="mb-4 -ml-5 border-l-2 border-brand-purple pl-5 text-sm font-semibold tracking-wider uppercase">
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </h3>
                <ul className="space-y-3">
                  {section === "legal" ? (
                    <li>
                      <span
                        className="group -ml-5 inline-flex items-center gap-2 text-muted-foreground decoration-brand-purple underline-offset-8 transition-all duration-500 hover:cursor-pointer hover:pl-5 hover:text-foreground hover:underline"
                        onClick={() => setIsPrivacyOpen(!isPrivacyOpen)}
                      >
                        Privacy Policy
                      </span>
                    </li>
                  ) : (
                    data().navigation[section].map((item) => {
                      const isRoute =
                        item.href.startsWith("/") && item.href !== ""
                      const isEmail = item.href.startsWith("mailto:")
                      const isPhone = item.href.startsWith("tel:")
                      const isHashLink =
                        !isRoute &&
                        !isEmail &&
                        !isPhone &&
                        item.href.startsWith("/#")

                      return (
                        <li key={item.name}>
                          {isRoute ? (
                            <Link
                              href={item.href}
                              className="group -ml-5 inline-flex items-center gap-2 text-muted-foreground decoration-brand-purple underline-offset-8 transition-all duration-500 hover:pl-5 hover:text-foreground hover:underline"
                            >
                              {item.name}
                            </Link>
                          ) : isEmail || isPhone ? (
                            <a
                              href={item.href}
                              className="group -ml-5 inline-flex items-center gap-2 text-muted-foreground decoration-brand-purple underline-offset-8 transition-all duration-500 hover:pl-5 hover:text-foreground hover:underline"
                            >
                              {item.name}
                            </a>
                          ) : isHashLink ? (
                            <Link
                              href={item.href}
                              className="group -ml-5 inline-flex items-center gap-2 text-muted-foreground decoration-brand-purple underline-offset-8 transition-all duration-500 hover:pl-5 hover:text-foreground hover:underline"
                            >
                              {item.name}
                            </Link>
                          ) : (
                            <span className="group -ml-5 inline-flex items-center gap-2 text-muted-foreground">
                              {item.name}
                            </span>
                          )}
                        </li>
                      )
                    })
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="animate-rotate-3d h-px w-full bg-linear-to-r from-transparent via-brand-purple to-transparent" />
        <div className="container m-auto flex flex-col items-center justify-between gap-4 p-4 text-xs text-muted-foreground md:flex-row md:px-0 md:text-sm">
          <p className="">
            &copy; {currentYear} CybersCool Defcon Inc. | All rights reserved
          </p>
          <div className="flex items-center gap-4">
            <span
              className="hover:cursor-pointer hover:text-foreground"
              onClick={() => setIsPrivacyOpen(!isPrivacyOpen)}
            >
              Privacy Policy
            </span>
          </div>
        </div>
        <span className="absolute inset-x-0 bottom-0 left-0 -z-10 h-1/3 w-full bg-linear-to-t from-brand-purple/20" />
      </div>

      {/* Animations */}
      <style jsx>{`
        /* ===== Animation Presets ===== */
        .animate-rotate-3d {
          animation: rotate3d 8s linear infinite;
        }

        .animate-energy-flow {
          animation: energy-flow 4s linear infinite;
          background-size: 200% 100%;
        }

        /* ===== Keyframes ===== */
        @keyframes rotate3d {
          0% {
            transform: rotateY(0);
          }
          100% {
            transform: rotateY(360deg);
          }
        }

        @keyframes energy-flow {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 100% 0;
          }
        }
      `}</style>
    </footer>
  )
}
