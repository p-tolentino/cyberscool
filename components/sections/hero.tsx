"use client"

import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  BookOpenCheck,
  GraduationCap,
  ShieldCheck,
} from "lucide-react"
import { ShuffleText } from "../ui/shuffle-text"
import { FlickeringGrid } from "../ui/flickering-grid"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
  VideoPlayerVolumeRange,
} from "@/components/kibo-ui/video-player"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden rounded-lg border py-20 md:py-32"
    >
      <FlickeringGrid
        className="absolute inset-0 -z-1 size-full mask-[radial-gradient(1200px_circle_at_center,white,transparent)]"
        squareSize={30}
        gridGap={12}
        color="#616161"
        maxOpacity={0.2}
        flickerChance={0.05}
        height={1600}
        width={2000}
      />
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 text-center md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex items-center gap-8 pt-8"
          >
            <Badge
              variant="secondary"
              className="mb-2 flex h-8 items-center gap-2 bg-transparent p-4 text-xs outline outline-gray-400 sm:text-sm md:h-5 md:bg-secondary md:outline-0"
            >
              <ShieldCheck className="hidden size-4 md:flex" />
              First Globally Accredited Cyber School in the Philippines
            </Badge>
          </motion.div>

          <h1 className="text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-6xl">
            <div className="flex flex-col md:flex-row">
              <span className="bg-linear-to-b from-foreground via-foreground/80 to-foreground/40 bg-clip-text">
                <ShuffleText
                  text={`Your Fastest Path into `}
                  scrambleSpeed={50}
                  revealDelay={150}
                  trigger="mount"
                />
              </span>
              <span className="bg-linear-to-b from-brand-purple via-brand-purple/80 to-brand-teal bg-clip-text">
                <ShuffleText
                  text={`Cybersecurity`}
                  scrambleSpeed={50}
                  revealDelay={150}
                  trigger="mount"
                />
              </span>
            </div>

            <span className="text-lg text-muted-foreground sm:text-xl md:text-2xl lg:text-4xl">
              <ShuffleText
                text="No cybersecurity experience required"
                scrambleSpeed={50}
                revealDelay={90}
                trigger="mount"
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="max-w-3xl text-xl text-muted-foreground"
          >
            Join our{" "}
            <span className="font-semibold text-brand-teal">
              free 30-minute career preview and discover
            </span>{" "}
            how IT professionals are moving into SOC, cyber defense, threat
            intelligence, and incident response roles.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <ShimmerButton
              onClick={() =>
                document
                  .getElementById("orientation-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              aria-label="Reserve My Free Seat"
              className="group h-10 gap-1 rounded-md text-white"
            >
              Reserve My Free Seat
              <ArrowRight
                data-icon="inline-end"
                className="size-4 transition-all duration-100 group-hover:ml-1"
              />
            </ShimmerButton>
            {/* <Button
              asChild
              size="lg"
              variant="outline"
              className="dark:bg-background"
            >
              <Link href="#">
                Download Syllabus
                <Download data-icon="inline-end" />
              </Link>
            </Button> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="relative max-w-6xl"
          >
            <VideoPlayer className="overflow-hidden rounded-lg border">
              <VideoPlayerContent
                crossOrigin=""
                muted
                preload="auto"
                slot="media"
                src="https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/high.mp4"
              />
              <VideoPlayerControlBar>
                <VideoPlayerPlayButton />
                <VideoPlayerMuteButton />
                <VideoPlayerVolumeRange />
                <VideoPlayerTimeDisplay showDuration />
                <VideoPlayerTimeRange />
                <VideoPlayerSeekBackwardButton />
                <VideoPlayerSeekForwardButton />
              </VideoPlayerControlBar>
            </VideoPlayer>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
