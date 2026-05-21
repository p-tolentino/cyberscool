"use client"

import Image from "next/image"
import { Marquee } from "@/components/ui/marquee"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Partner, partners } from "@/lib/data/partners"

function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="mx-8 flex cursor-pointer items-center justify-center">
          {partner.logoDark ? (
            <>
              <Image
                src={partner.logo}
                alt={partner.name}
                width={200}
                height={80}
                className="h-20 w-auto object-contain transition-all duration-300 hover:scale-105 dark:hidden"
                preload
              />
              <Image
                src={partner.logoDark}
                alt={partner.name}
                width={200}
                height={80}
                className="hidden h-20 w-auto object-contain transition-all duration-300 hover:scale-105 dark:block"
                preload
              />
            </>
          ) : (
            <Image
              src={partner.logo}
              alt={partner.name}
              width={200}
              height={80}
              className="h-20 w-auto object-contain transition-all duration-300 hover:scale-105"
              preload
            />
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{partner.name}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export function PartnerMarquee() {
  const firstHalf = partners.slice(0, Math.ceil(partners.length / 2))
  const secondHalf = partners.slice(Math.ceil(partners.length / 2))

  return (
    <section id="partners" className="py-16 md:py-24">
      <div className="container mx-auto mb-8 px-4">
        <h2 className="text-center text-3xl font-bold tracking-tighter md:text-4xl">
          Trusted by <span className="text-primary">Leading Organizations</span>
        </h2>
        <p className="mx-auto mt-3 text-center text-muted-foreground">
          Government agencies, private organizations, and academic institutions
        </p>
        <div className="mt-4 flex justify-center">
          <div className="h-px w-16 bg-linear-to-r from-transparent via-primary/50 to-transparent"></div>
        </div>
      </div>

      <div className="relative">
        <Marquee pauseOnHover className="[--duration:40s]">
          {firstHalf.map((partner) => (
            <PartnerLogo key={partner.name} partner={partner} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="mt-4 [--duration:40s]">
          {secondHalf.map((partner) => (
            <PartnerLogo key={partner.name} partner={partner} />
          ))}
        </Marquee>

        {/* Linear masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-background" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-background" />
      </div>
    </section>
  )
}
