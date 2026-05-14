"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Building, BanknoteArrowUp, UserX, UserSearch } from "lucide-react"
import { NumberTicker } from "../ui/number-ticker"

interface StatItemProps {
  value: number
  label: string
  icon: React.ReactNode
  delay?: number
  decimalPlaces?: number
  color?: string
}

const StatItem = ({
  value,
  label,
  icon,
  delay = 0,
  decimalPlaces = 0,
  color = "from-primary to-primary/70",
}: StatItemProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { resolvedTheme } = useTheme()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border/30 bg-card p-6",
        resolvedTheme === "dark"
          ? "shadow-xl shadow-black/5"
          : "shadow-lg shadow-black/3"
      )}
    >
      <div
        className={cn(
          "absolute -top-6 -right-6 h-24 w-24 rounded-full bg-linear-to-br opacity-20 blur-2xl transition-all duration-500 group-hover:opacity-30 group-hover:blur-3xl",
          color
        )}
      />

      <div className="flex items-center gap-4">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-linear-to-br text-white",
            color
          )}
        >
          {icon}
        </div>

        <div className="flex flex-col">
          <h3 className="flex items-baseline text-3xl font-bold tracking-tight">
            {label === "Cybercrime cost by 2027" && (
              <span className="font-medium">$</span>
            )}
            <NumberTicker
              value={value}
              decimalPlaces={decimalPlaces}
              className="tabular-nums"
            />
            {label === "Cybercrime cost by 2027" ? (
              <span className="ml-1 text-sm font-medium opacity-70">
                Trillion
              </span>
            ) : label === "Unfilled jobs globally as of 2025" ? (
              <span className="ml-1 text-sm font-medium opacity-70">
                Million
              </span>
            ) : label ===
              "Cybersecurity Professionals Needed in the Philippines" ? (
              <span className="ml-1 text-sm font-medium opacity-70">+</span>
            ) : null}
          </h3>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
        </div>
      </div>
    </motion.div>
  )
}

const cyberRoles = [
  {
    range: "$68,000 - $167,000",
    job: "Security Analyst / Cybersecurity Analyst",
    description: "United States of America",
  },
  {
    range: "$36,000 - $77,000",
    job: "SOC Analyst Tier 1",
    description: "United States of America",
  },

  {
    range: "$13,000 - $16,000",
    job: "Security Analyst / Cybersecurity Analyst",
    description: "Philippines",
  },
  {
    range: "$8,000 -   $16,000",
    job: "SOC Analyst Tier 1",
    description: "Philippines",
  },
]

export default function WhyCyber() {
  const aboutRef = useRef(null)
  const statsRef = useRef(null)
  const salaryRef = useRef(null)

  const aboutInView = useInView(aboutRef, { once: true, amount: 0.3 })
  const salaryInView = useInView(salaryRef, { once: true, amount: 0.2 })

  const stats = [
    {
      value: 23.84,
      label: "Cybercrime cost by 2027",
      icon: <BanknoteArrowUp className="h-5 w-5" />,
      delay: 0,
      decimalPlaces: 2,
    },
    {
      value: 4.8,
      label: "Unfilled jobs globally as of 2025",
      icon: <UserX className="h-5 w-5" />,
      delay: 0.1,
      decimalPlaces: 1,
    },
    {
      value: 180000,
      label: "Cybersecurity Professionals Needed in the Philippines",
      icon: <UserSearch className="h-5 w-5" />,
      delay: 0.2,
      decimalPlaces: 0,
    },
  ]

  return (
    <section
      className="relative w-full overflow-hidden py-20 md:py-32"
      id="why-cyber"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.02] dark:opacity-[0.05]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Header Section with Badge */}
        <div className="mx-auto mb-16 max-w-5xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="bg-linear-to-b from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl"
          >
            Why Cybersecurity?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-4 text-xl text-muted-foreground"
          >
            Cybersecurity is one of the fastest-growing tech career paths
            because companies need people who can defend systems, detect
            threats, respond to attacks, and protect sensitive data. In the free
            preview, we&apos;ll discuss realistic salary ranges, local and
            global opportunities, and which roles beginners can aim for first.
          </motion.p>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="mb-20">
          <div className="grid gap-5 sm:grid-cols-1 lg:grid-cols-3">
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
                delay={stat.delay || index * 0.1}
                decimalPlaces={stat.decimalPlaces}
                color={"to-brand-purple from-purple-500"}
              />
            ))}
          </div>
        </div>

        {/* About Content Section */}
        <div ref={aboutRef} className="relative mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="mx-auto mt-16 flex max-w-4xl items-start gap-4 text-pretty"
          >
            <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-primary/20 to-primary/5 text-primary">
              <Building className="h-5 w-5" />
            </div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Companies are not just looking for theory. They need people who
              can monitor alerts, investigate threats, secure systems, respond
              to incidents, and protect data. If you already understand
              computers, networks, users, or business systems, you may already
              have a foundation for cybersecurity.
            </p>
          </motion.div>
        </div>

        {/* Salary Range Section */}
        <div ref={salaryRef} className="relative mx-auto max-w-4xl space-y-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={
                salaryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center text-2xl font-bold tracking-tight md:text-3xl"
            >
              Cybersecurity Annual Salary Potential
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={
                salaryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center text-base leading-relaxed text-muted-foreground"
            >
              Local and Global Opportunities
            </motion.p>
          </div>

          <div className="relative space-y-6 md:space-y-8">
            {cyberRoles.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={
                  salaryInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{
                  duration: 0.5,
                  delay: 0.1 * index,
                  ease: "easeOut",
                }}
                className="relative rounded-lg border border-border/40 bg-card p-4 shadow-sm md:border-none md:bg-transparent md:p-0 md:shadow-none"
              >
                {/* Mobile card layout / Desktop grid layout */}
                <div className="md:grid md:grid-cols-5 md:gap-8">
                  <div className="md:col-span-2">
                    {/* Mobile: Show salary prominently at top */}
                    <div className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary md:hidden">
                      {item.range}
                    </div>

                    {/* Desktop */}
                    <div className="hidden md:block">
                      <div className="text-xl font-bold text-primary">
                        {item.range}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <h3 className="text-lg font-bold md:text-xl">{item.job}</h3>
                    <p className="mt-1 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="rounded-2xl border border-white/40 bg-muted/30 p-4 text-sm leading-relaxed text-muted-foreground italic">
            Salary ranges shown are projected estimates based on global market
            data and may vary significantly depending on factors such as company
            size, location, years of experience, specific role responsibilities,
            local economic conditions, and current hiring demand. Actual
            salaries may be higher or lower than the figures shown. Use this as
            a general reference, not a guarantee.
          </p>
        </div>
      </div>
    </section>
  )
}
