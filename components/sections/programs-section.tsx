"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, Flame } from "lucide-react"
import Link from "next/link"
import { programs } from "@/lib/data/programs"

export function ProgramsSection() {
  return (
    <section id="programs" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Our <span className="text-brand-teal">Programs</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            From beginner to advanced — TESDA-accredited programs aligned with
            NIST NICE Framework. Delivered via TechDX Arena&apos;s AI-powered
            platform.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <Card
              key={program.slug}
              className={`flex flex-col ${program.isFlagship ? "border-brand-purple/50 md:col-span-2 lg:col-span-1" : "border-brand-teal/20"}`}
            >
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                <Badge
                     variant="outline"
                     className="border-brand-teal text-brand-teal"
                   >
                     {program.category}
                   </Badge>
                  {program.badge && (
                    <Badge className="flex items-center gap-1 bg-brand-purple text-white hover:bg-brand-purple/90">
                      <Flame data-icon="inline-start" className="size-3" />
                      {program.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{program.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {program.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-4 flex flex-col gap-2">
                  {program.features.slice(0, 4).map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-brand-purple" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-sm text-muted-foreground">
                    <Clock className="mr-1 inline size-3" />
                    {program.hours} hrs
                  </span>
                </div>
              </CardContent>
              <div className="flex gap-2 px-6 pb-6">
                <Button
                  asChild
                  variant="default"
                  className="flex-1"
                >
                  <Link href="/#orientation-form">Register</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link
                    href={`/programs/${program.category.toLowerCase()}/${program.slug}`}
                  >
                    Learn More
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
