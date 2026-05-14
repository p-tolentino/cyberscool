import {
  Brain,
  ClockFading,
  UserSearch,
  ArrowRight,
  Computer,
  Code,
  BriefcaseBusiness,
} from "lucide-react"
import { ShimmerButton } from "../ui/shimmer-button"
import Link from "next/link"

const myths = [
  {
    icon: <Computer className="h-6 w-6" />,
    title: "I need IT background first.",
    desc: "You don't need to be an IT graduate to start. Many cybersecurity professionals began with zero technical background and learned through structured, hands-on training and real-world practice.",
  },
  {
    icon: <BriefcaseBusiness className="h-6 w-6" />,
    title: "If I have no experience, I won't get hired.",
    desc: "Entry-level cyber roles exist. Many companies actively hire for curiosity, attitude, and foundational IT skills, not decades of experience.",
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "I need to know how to code first.",
    desc: "Many entry-level roles (like SOC Analyst) require little to no coding. Scripting helps, but it's not a starting barrier.",
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "Cybersecurity is only for geniuses.",
    desc: "Cybersecurity is a skill you learn, not a talent you're born with. Hard work beats 'genius' every time.",
  },
  {
    icon: <ClockFading className="h-6 w-6" />,
    title: "It's too late for me to shift.",
    desc: "Many successful cybersecurity professionals started in their 30s, 40s, and beyond. Cybersecurity rewards adaptability, curiosity, and continuous learning, not age.",
  },
  {
    icon: <UserSearch className="h-6 w-6" />,
    title: "There are no beginner-friendly cyber roles.",
    desc: "Roles like Cybersecurity Analyst and SOC Analyst are designed for beginners. You just need the right roadmap, training, and hands-on skills.",
  },
]

export default function MythsToBreak() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="relative mx-auto text-center">
          <div className="relative z-10">
            <h3 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              The Cybersecurity Myths You&apos;ll Break
            </h3>
            <p className="mt-3 text-foreground/60">
              Think cybersecurity is only for hackers? Think again. <br /> In
              the free preview, we&apos;ll break the biggest myths:
            </p>
          </div>
          <div
            className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
            style={{
              background:
                "linear-gradient(152.92deg, rgba(131, 21, 199, 0.2) 4.54%, rgba(192, 5, 237, 0.26) 34.2%, rgba(131, 21, 199, 0.1) 77.55%)",
            }}
          ></div>
        </div>
        <hr className="mx-auto mt-5 h-px w-1/2 bg-foreground/30" />
        <div className="relative mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {myths.map((item, idx) => (
              <li
                key={idx}
                className="transform-gpu space-y-3 rounded-xl border bg-transparent p-4 [box-shadow:0_-20px_80px_-20px_#8b3d9e4f_inset]"
              >
                <div className="w-fit transform-gpu rounded-full border p-4 text-primary [box-shadow:0_-20px_80px_-20px_#8b3d9e6f_inset] dark:[box-shadow:0_-20px_80px_-20px_#8b3d9e3f_inset]">
                  {item.icon}
                </div>
                <h4 className="font-geist text-lg font-bold tracking-tighter">
                  &quot;{item.title}&quot;
                </h4>
                <p className="text-gray-500">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="#orientation-form" className="mx-auto mt-12">
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
        </div>
      </div>
    </section>
  )
}
