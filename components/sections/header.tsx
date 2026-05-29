"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, easeInOut } from "framer-motion"
import { Menu, X, ArrowRight } from "lucide-react"
import Link from "next/link"
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler"
import Image from "next/image"
import { ShimmerButton } from "../ui/shimmer-button"

interface NavItem {
  name: string
  href: string
}

const navItems: NavItem[] = [
  // { name: "Programs", href: "programs" },
  { name: "What's In It For Me?", href: "preview" },
  { name: "Why Cybersecurity?", href: "why-cyber" },
  { name: "Testimonials", href: "testimonials" },
  { name: "Our Partners", href: "partners" },
  { name: "FAQs", href: "faq" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: easeInOut,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: easeInOut,
        staggerChildren: 0.1,
      },
    },
  }

  const mobileItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "border-b border-border/50 bg-background/80 shadow-sm backdrop-blur-md"
            : "bg-transparent"
        }`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 👇 Wrapper to prevent scrollbar layout shift when Radix Select is open */}
        <div className="fixed-content-offset">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <motion.div
                className="flex items-center space-x-3"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link href="/" className="flex items-center space-x-3">
                  <div className="flex h-9 w-9 items-center justify-center bg-transparent">
                    <Image
                      alt="Cyberscool Defcon Inc."
                      width={140}
                      height={48}
                      src="/logo.png"
                      className="h-full w-auto object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="hidden bg-linear-to-br from-brand-purple via-brand-purple/80 to-brand-teal bg-clip-text font-bold text-transparent sm:block md:text-lg dark:from-purple-400 dark:via-purple-400/80">
                      Cyberscool Defcon Inc.
                    </span>
                    <span className="-mt-1 hidden text-xs text-muted-foreground sm:block">
                      We focus on skills, not theory.
                    </span>
                  </div>
                </Link>
              </motion.div>

              <nav className="hidden items-center space-x-1 lg:flex">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    className="relative"
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link
                      href={`/#${item.href}`}
                      className="relative rounded-lg px-4 py-2 text-sm font-medium text-foreground/80 transition-colors duration-200 hover:text-foreground"
                    >
                      {hoveredItem === item.name && (
                        <motion.div
                          className="absolute inset-0 rounded-lg bg-muted"
                          layoutId="navbar-hover"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="hidden items-center space-x-3 lg:flex"
                variants={itemVariants}
              >
                <AnimatedThemeToggler className="" />

                <motion.div
                  className="text-foreground transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/#orientation-form"
                    className="inline-flex items-center space-x-2 text-sm font-medium transition-all duration-200"
                  >
                    <ShimmerButton
                      aria-label="Reserve My Free Seat"
                      className="group h-10 gap-1 rounded-md text-white"
                    >
                      Reserve My Free Seat
                      <ArrowRight
                        data-icon="inline-end"
                        className="size-4 transition-all duration-100 group-hover:ml-1"
                      />
                    </ShimmerButton>
                  </Link>
                </motion.div>
              </motion.div>

              <div className="flex gap-1 sm:gap-4 lg:hidden">
                <AnimatedThemeToggler className="" />
                <motion.button
                  className="rounded-lg p-2 text-foreground transition-colors duration-200 hover:bg-muted"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  variants={itemVariants}
                  whileTap={{ scale: 0.95 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed top-16 right-4 z-50 w-80 overflow-hidden rounded-2xl border border-border bg-background shadow-2xl lg:hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="space-y-6 p-6">
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <motion.div key={item.name} variants={mobileItemVariants}>
                      <Link
                        href={`/#${item.href}`}
                        className="block rounded-lg px-4 py-3 font-medium text-foreground transition-colors duration-200 hover:bg-muted"
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="w-full space-y-3 border-t border-border pt-6"
                  variants={mobileItemVariants}
                >
                  <Link
                    href="/#orientation-form"
                    className="inline-flex w-full items-center space-x-2 text-sm font-medium transition-all duration-200"
                  >
                    <ShimmerButton
                      aria-label="Reserve My Free Seat"
                      className="group h-10 w-full gap-1 rounded-md text-white"
                    >
                      Reserve My Free Seat
                      <ArrowRight
                        data-icon="inline-end"
                        className="size-4 transition-all duration-100 group-hover:ml-1"
                      />
                    </ShimmerButton>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
