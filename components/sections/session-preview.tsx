"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"
import {
  BriefcaseBusiness,
  CircleQuestionMark,
  DollarSign,
  ShieldAlert,
  Trophy,
} from "lucide-react"

const features = [
  {
    title: "Understand the Demand",
    content: "Why cybersecurity demand is exploding globally",
    icon: <ShieldAlert className="h-6 w-6 text-primary" />,
    image: "/preview/demand.png",
  },
  {
    title: "Know Your Worth",
    content:
      "How much cyber professionals can earn locally and internationally",
    icon: <DollarSign className="h-6 w-6 text-primary" />,
    image: "/preview/salary.jpg",
  },
  {
    title: "Find Your Entry Point",
    content: "Which entry-level roles are realistic for beginners",
    icon: <BriefcaseBusiness className="h-6 w-6 text-primary" />,
    image: "/preview/entry-point.jpeg",
  },
  {
    title: "Break the Myths",
    content:
      "Why you don't need to be a hacker, genius, or programmer to start",
    icon: <CircleQuestionMark className="h-6 w-6 text-primary" />,
    image: "/preview/myth.png",
  },
  {
    title: "Learn from a Success Story",
    content:
      "How one Filipino cyber professional successfully entered the field",
    icon: <Trophy className="h-6 w-6 text-primary" />,
    image: "/preview/success.jpg",
  },
]

export default function SessionPreview() {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (4000 / 100))
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length)
        setProgress(0)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [progress])

  return (
    <div className="px-8 py-20 md:px-12" id="preview">
      <div className="mx-auto w-full max-w-7xl">
        <div className="relative mx-auto mb-12 max-w-5xl sm:text-center">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
              Is Cybersecurity Your Next Career Move?
            </h2>
            <p className="mt-3 text-foreground/60">
              For IT professionals, tech graduates, and career shifters who want
              to understand the demand, salary potential, and realistic path
              into cybersecurity. In this free session, you will:
            </p>
          </div>
          <div
            className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
            style={{
              background:
                "linear-linear(152.92deg, rgba(192, 15, 102, 0.2) 4.54%, rgba(192, 11, 109, 0.26) 34.2%, rgba(192, 15, 102, 0.1) 77.55%)",
            }}
          ></div>
        </div>
        <hr className="mx-auto mb-10 h-px w-1/2 bg-foreground/30" />

        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-10">
          <div className="order-2 space-y-8 md:order-1">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-6 md:gap-8"
                initial={{ opacity: 0.3, x: -20 }}
                animate={{
                  opacity: index === currentFeature ? 1 : 0.3,
                  x: 0,
                  scale: index === currentFeature ? 1.05 : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 md:h-14 md:w-14",
                    index === currentFeature
                      ? "scale-110 border-primary bg-primary/10 text-primary [box-shadow:0_0_15px_rgba(192,15,102,0.3)]"
                      : "border-muted-foreground bg-muted"
                  )}
                >
                  {feature.icon}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold md:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground md:text-base">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className={cn(
              "relative order-1 h-50 overflow-hidden rounded-xl border border-primary/20 [box-shadow:0_5px_30px_-15px_rgba(192,15,102,0.3)] md:order-2 md:h-75 lg:h-100"
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 overflow-hidden rounded-lg"
                      initial={{ y: 100, opacity: 0, rotateX: -20 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -100, opacity: 0, rotateX: 20 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <Image
                        preload
                        src={feature.image}
                        alt={feature.title}
                        className="h-full w-full transform object-cover transition-transform hover:scale-105"
                        width={1000}
                        height={500}
                      />
                      <div className="absolute right-0 bottom-0 left-0 h-2/3 bg-linear-to-t from-background via-background/50 to-transparent" />
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
