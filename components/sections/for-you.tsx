import {
  Building2,
  LucideIcon,
  Compass,
  Globe,
  Brain,
  AlertCircle,
  Snail,
  RefreshCw,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Define the feature item type
type FeatureItem = {
  icon: LucideIcon
  title: string
  description: string
  position?: "left" | "right"
  cornerStyle?: string
}

const leftFeatures: FeatureItem[] = [
  {
    icon: Building2,
    title: "You are an IT Professional",
    description:
      "You work in IT support, helpdesk, networking, systems, or software",
    position: "left",
    cornerStyle: "sm:translate-x-4 sm:rounded-br-[2px]",
  },
  {
    icon: Snail,
    title: "You feel Stuck in Place",
    description:
      "You feel your current tech career has limited growth potential",
    position: "left",
    cornerStyle: "sm:-translate-x-4 sm:rounded-br-[2px]",
  },
  {
    icon: Compass,
    title: "You are Curious but Lost",
    description:
      "You keep hearing about cybersecurity but don't know where to start",
    position: "left",
    cornerStyle: "sm:translate-x-4 sm:rounded-tr-[2px]",
  },
]

const rightFeatures: FeatureItem[] = [
  {
    icon: Globe,
    title: "You seek Opportunities",
    description:
      "You want a higher-value tech skill that can open local and global opportunities",
    position: "right",
    cornerStyle: "sm:-translate-x-4 sm:rounded-bl-[2px]",
  },
  {
    icon: Brain,
    title: "You are Worried but Willing",
    description:
      "You're curious but worried cybersecurity is too technical, too expensive, or too late to learn",
    position: "right",
    cornerStyle: "sm:translate-x-4 sm:rounded-bl-[2px]",
  },
  {
    icon: RefreshCw,
    title: "You are Ready for Change",
    description:
      "You want to break into cybersecurity but need a clear, beginner-friendly path",
    position: "right",
    cornerStyle: "sm:-translate-x-4 sm:rounded-tl-[2px]",
  },
]

// Feature card component
const FeatureCard = ({ feature }: { feature: FeatureItem }) => {
  const Icon = feature.icon

  return (
    <div className="h-full">
      <div
        className={cn(
          "relative flex h-full flex-col rounded-2xl px-4 pt-4 pb-4 text-sm",
          "bg-secondary/50 ring ring-border",
          feature.cornerStyle
        )}
      >
        <div className="mb-3 text-[2rem] text-primary">
          <Icon />
        </div>
        <h2 className="mb-2.5 text-2xl text-foreground">{feature.title}</h2>
        <p className="text-base text-pretty text-muted-foreground">
          {feature.description}
        </p>
        {/* Decorative elements */}
        <span className="absolute -bottom-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-linear-to-r from-primary/0 via-primary to-primary/0 opacity-60"></span>
        <span className="absolute inset-0 bg-[radial-gradient(30%_5%_at_50%_100%,hsl(var(--primary)/0.15)_0%,transparent_100%)] opacity-60"></span>
      </div>
    </div>
  )
}

export default function ThisIsForYou() {
  return (
    <section className="pt-20 pb-8" id="features">
      <div className="mx-6 max-w-280 pt-2 pb-16 max-[300px]:mx-4 min-[1150px]:mx-auto">
        <div className="flex flex-col-reverse gap-6 md:grid md:grid-cols-3">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {leftFeatures.map((feature, index) => (
              <FeatureCard key={`left-feature-${index}`} feature={feature} />
            ))}
          </div>

          {/* Center column */}
          <div className="order-1 mb-6 self-center sm:order-0 md:mb-0">
            <div className="relative mx-auto mb-4.5 w-fit rounded-full rounded-bl-xs bg-secondary px-4 py-2 text-sm text-foreground ring ring-border">
              <span className="relative z-1 flex items-center gap-2">
                No cybersecurity experience required
              </span>
              <span className="absolute -bottom-px left-1/2 h-px w-2/5 -translate-x-1/2 bg-linear-to-r from-primary/0 via-primary to-primary/0"></span>
              <span className="absolute inset-0 bg-[radial-gradient(30%_40%_at_50%_100%,hsl(var(--primary)/0.25)_0%,transparent_100%)]"></span>
            </div>
            <h2 className="mb-2 text-center text-2xl text-foreground sm:mb-2.5 md:text-[2rem]">
              This free career preview is for you if...
            </h2>
            {/* <p className="mx-auto max-w-[18rem] text-center text-pretty text-muted-foreground">
              Start your cybersecurity journey, break the myths, and discover
              the realistic path to a high-growth tech career.
            </p> */}
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {rightFeatures.map((feature, index) => (
              <FeatureCard key={`right-feature-${index}`} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
