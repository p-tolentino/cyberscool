"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { Badge } from "@/components/ui/badge"
import {
  Terminal,
  TypingAnimation,
  AnimatedSpan,
} from "@/components/ui/terminal"
import { CheckCircle2, Clock, Flame, Info, Laptop, Network } from "lucide-react"
import { programs } from "@/lib/data/programs"

export function ZeroToHeroTerminal() {
  return (
    <section id="zero-to-hero" className="border-y border-border/50 py-20">
      <div className="mx-auto px-4 md:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Zero to Hero <span className="text-brand-teal">in Action</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            See how the Zero to Hero program transforms your resume — from no
            background to job-ready in 12 weeks.
          </p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: Terminal */}
          <div className="min-w-0">
            <Terminal sequence startOnView>
              <TypingAnimation>
                $ sudo apt enroll zero-to-hero-cyber-course
              </TypingAnimation>

              <AnimatedSpan className="text-green-500">
                ✓ Course enrollment started: Zero-to-Hero Cybersecurity Bootcamp
              </AnimatedSpan>

              <AnimatedSpan className="text-green-500">
                ✓ Prerequisites: None (No IT background required)
              </AnimatedSpan>

              <AnimatedSpan className="text-green-500">
                ✓ Included: 60 unique laboratories, 100 simulated exercises,
                ~400 hours of training
              </AnimatedSpan>

              <AnimatedSpan className="text-green-500">
                ✓ 287-day access window (fully online)
              </AnimatedSpan>

              <TypingAnimation className="text-muted-foreground">
                Status: Ready to begin. Type &apos;learn --start&apos; to start
                your journey.
              </TypingAnimation>

              <AnimatedSpan>
                <br />
              </AnimatedSpan>

              <TypingAnimation>$ learn --start</TypingAnimation>

              {/* Loading simulation */}
              <AnimatedSpan>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>Loading course modules... Done.</span>
                </div>
              </AnimatedSpan>
              <AnimatedSpan>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>Completing laboratory exercises... Done. </span>
                </div>
              </AnimatedSpan>
              <AnimatedSpan>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>Completing real-life simulations... Done.</span>
                </div>
              </AnimatedSpan>
              <AnimatedSpan className="text-green-500">
                ✓ Course completed successfully
              </AnimatedSpan>

              <AnimatedSpan className="text-green-500">
                ✓ Earned 1 Cybersecurity Defense Track Certificate from
                CybersCool Defcon Inc.
              </AnimatedSpan>

              <AnimatedSpan className="text-green-500">
                ✓ Earned 12 Micro-Credentials from TechDX
              </AnimatedSpan>

              <AnimatedSpan className="text-green-500">
                ✓ Earned 4 Industry-Aligned Certifications from TechDX
              </AnimatedSpan>

              <AnimatedSpan className="text-blue-500">
                <span className="pl-2">
                  - Certified Cybersecurity Associate
                </span>
              </AnimatedSpan>

              <AnimatedSpan className="text-blue-500">
                <span className="pl-2">- Certified Cybersecurity Analyst</span>
              </AnimatedSpan>

              <AnimatedSpan className="text-blue-500">
                <span className="pl-2">- Certified SOC Analyst</span>
              </AnimatedSpan>

              <AnimatedSpan className="text-blue-500">
                <span className="pl-2">
                  - Certified Cyber Threat Intelligence (CTI) Analyst
                </span>
              </AnimatedSpan>

              <AnimatedSpan>
                <br />
              </AnimatedSpan>

              <TypingAnimation>$ resume --update</TypingAnimation>

              <AnimatedSpan className="text-yellow-500">
                <span className="flex items-center">
                  <Info className="h-3 w-3" /> Updated 1 file:
                </span>
              </AnimatedSpan>
              <AnimatedSpan className="text-yellow-500">
                <span className="pl-2">- resume.docx</span>
              </AnimatedSpan>

              <TypingAnimation className="text-muted-foreground">
                Success! Zero To Hero Bootcamp completed successfully.
              </TypingAnimation>
              <TypingAnimation className="text-muted-foreground">
                You are now ready for cybersecurity roles.
              </TypingAnimation>
            </Terminal>
          </div>

          {/* Right: Program Info */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <Badge
                variant="outline"
                className="border-brand-teal px-2 py-0.5 text-xs text-brand-teal md:px-3 md:py-1 md:text-sm"
              >
                Flagship
              </Badge>
              <Badge className="flex items-center gap-1 bg-brand-purple px-2 py-0.5 text-xs text-white md:px-3 md:py-1 md:text-sm">
                <Flame className="size-3" />
                Most Popular
              </Badge>
            </div>

            <h3 className="bg-linear-to-r from-brand-purple to-brand-teal bg-clip-text text-3xl font-bold text-transparent">
              Zero to Hero Cyber Defense
            </h3>

            <p className="flex-wrap text-lg text-muted-foreground">
              Go from zero IT knowledge to a job-ready cyber defender with the
              only program offering 4 industry certifications and 12
              micro-credentials in one dedicated platform.
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <span>
                  <Clock className="text-xs text-muted-foreground" />
                </span>
                <span>
                  <p className="text-2xl font-bold text-brand-purple">~400</p>
                  <p className="text-xs text-muted-foreground">Hours</p>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span>
                  <Laptop className="text-xs text-muted-foreground" />
                </span>
                <span>
                  <p className="text-2xl font-bold text-brand-purple">60</p>
                  <p className="text-xs text-muted-foreground">Labs</p>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span>
                  <Network className="text-xs text-muted-foreground" />
                </span>
                <span>
                  <p className="text-2xl font-bold text-brand-purple">100</p>
                  <p className="text-xs text-muted-foreground">Simulations</p>
                </span>
              </div>
            </div>

            <h5 className="font-bold">
              After the course, you can pursue roles like:
            </h5>

            <div className="flex flex-wrap gap-2">
              {programs[0].jobOutcomes.map((outcome) => (
                <Badge
                  key={outcome}
                  variant="outline"
                  className="border-brand-teal/60 text-cyan-700 dark:text-brand-teal"
                >
                  <CheckCircle2 className="mr-1 size-3" />
                  {outcome}
                </Badge>
              ))}
            </div>

            <div className="mt-20 flex gap-4">
              <ShimmerButton
                onClick={() =>
                  document
                    .getElementById("orientation-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="h-10 gap-1 px-5 text-sm font-medium"
              >
                Reserve My Free Seat
              </ShimmerButton>
              <Button
                asChild
                variant="outline"
                className="h-10 gap-1 rounded-[80px] px-5"
              >
                <Link href="">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
