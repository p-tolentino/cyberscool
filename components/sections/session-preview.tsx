"use client"

import { useState, useEffect, useRef } from "react"
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
    image: "/preview/worth.png",
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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-cycle timer (8 seconds per item)
  useEffect(() => {
    if (!isAutoPlaying) return

    const cycleDuration = 8000 // 8 seconds - longer for reading

    const startTimer = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)

      setProgress(0)

      // Progress bar increment every 80ms (100 steps over 8 seconds)
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return prev
          return prev + 100 / (cycleDuration / 80)
        })
      }, 80)

      timeoutRef.current = setTimeout(() => {
        setCurrentFeature((prev) => (prev + 1) % features.length)
        setProgress(0)
      }, cycleDuration)
    }

    startTimer()

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [currentFeature, isAutoPlaying])

  const handleFeatureClick = (index: number) => {
    if (index === currentFeature) return
    setIsAutoPlaying(false)
    setCurrentFeature(index)
    setProgress(0)

    // Resume auto-play after 15 seconds of inactivity
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    const resumeTimeout = setTimeout(() => {
      setIsAutoPlaying(true)
    }, 15000)

    timeoutRef.current = resumeTimeout
  }

  return (
    <div className="px-8 py-16 md:py-24" id="preview">
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
                className="flex cursor-pointer items-center gap-6 md:gap-8"
                initial={{ opacity: 0.3, x: -20 }}
                animate={{
                  opacity: index === currentFeature ? 1 : 0.5,
                  x: 0,
                  scale: index === currentFeature ? 1.02 : 1,
                }}
                transition={{ duration: 0.3 }}
                onClick={() => handleFeatureClick(index)}
              >
                <motion.div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all md:h-14 md:w-14",
                    index === currentFeature
                      ? "scale-110 border-primary bg-primary/10 text-primary [box-shadow:0_0_15px_rgba(192,15,102,0.3)]"
                      : "border-muted-foreground bg-muted hover:border-primary/50 hover:bg-primary/5"
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
              "relative order-1 overflow-hidden rounded-xl border border-primary/20 [box-shadow:0_5px_30px_-15px_rgba(192,15,102,0.3)] md:order-2",
              "h-50 md:h-75 lg:h-100"
            )}
          >
            {/* Progress bar indicator */}
            {isAutoPlaying && (
              <div className="absolute top-0 right-0 left-0 z-10 h-1 bg-primary/20 transition-all">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.08, ease: "linear" }}
                />
              </div>
            )}
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
