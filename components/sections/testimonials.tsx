"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Marquee } from "@/components/ui/marquee"
import { Avatar, AvatarFallback } from "../ui/avatar"

export function Highlight({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "bg-brand-teal/10 p-1 py-0.5 font-bold text-brand-teal",
        className
      )}
    >
      {children}
    </span>
  )
}

export interface TestimonialCardProps {
  name: string
  role: string
  img?: string
  description: React.ReactNode
  className?: string
  [key: string]: any
}

export function TestimonialCard({
  description,
  name,
  img,
  role,
  className,
  ...props // Capture the rest of the props
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4",
        // theme styles
        "border border-border bg-card/50 shadow-sm",
        // hover effect
        "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
        className
      )}
      {...props}
    >
      <div className="text-sm font-normal text-muted-foreground select-none">
        <div className="italic">{description}</div>
        <div className="mt-2 flex flex-row py-1">
          <Star className="size-4 fill-amber-500 text-amber-500" />
          <Star className="size-4 fill-amber-500 text-amber-500" />
          <Star className="size-4 fill-amber-500 text-amber-500" />
          <Star className="size-4 fill-amber-500 text-amber-500" />
          <Star className="size-4 fill-amber-500 text-amber-500" />
        </div>
      </div>

      <div className="flex w-full items-center justify-start gap-5 select-none">
        <Avatar className="size-12">
          <AvatarFallback className="bg-brand-purple text-white">
            {name[0]}
          </AvatarFallback>
        </Avatar>

        <div>
          <p
            className={`font-medium text-foreground ${name === "Anonymous" ? "text-muted-foreground italic" : ""}`}
          >
            {name}
          </p>
          <p className="text-xs font-normal text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  )
}
// Full Testimonials
// const testimonials = [
//   {
//     name: "Robert B. Rojas Jr.",
//     role: "Computer Operator IV, Cybersecurity Division, Commission on Elections",
//     description: (
//       <p>
//         Completing my cybersecurity training was a{" "}
//         <Highlight>life-changing experience</Highlight>. The program taught me
//         the right skill set and the right tools to succeed in the industry . I
//         gained deep knowledge in SOC operations and Offensive Security
//         techniques, which I now apply in my role as an Offensive Security
//         Analyst. The hands-on approach and real-world scenarios prepared me to
//         tackle complex challenges with confidence.
//       </p>
//     ),
//   },
//   {
//     name: "John Jefferson So",
//     role: "Cybersecurity Division, Commission on Elections",
//     description: (
//       <p>
//         I had no prior knowledge about cybersecurity. After attending, I feel
//         very lucky to be one of the first batch.
//         <Highlight>
//           Real-life cybersecurity exercises allowed me to experience actual
//           scenarios
//         </Highlight>{" "}
//         such as identifying phishing emails, responding to simulated incidents,
//         and analyzing suspicious activity . I now feel more confident in guiding
//         our organization to strengthen our security posture.
//       </p>
//     ),
//   },
//   {
//     name: "Sheryle Alambat Domingo",
//     role: "Administrative Aide VI, PhilHealth",
//     description: (
//       <p>
//         <Highlight>
//           The course is such a great help for us, especially in this digital era
//         </Highlight>
//         . I really enjoyed the laboratories and modules. I have learned a lot
//         from this program.
//       </p>
//     ),
//   },
//   {
//     name: "Renato Limsiaco",
//     role: "Senior Vice President for Finance, PhilHealth",
//     description: (
//       <p>
//         My mission is to understand the value of this program so that the entire
//         country can have a good sleep thinking that their data are secured and
//         protected.
//         <Highlight>
//           I encourage all senior executives to attend this kind of training
//         </Highlight>
//         .
//       </p>
//     ),
//   },
//   {
//     name: "Mark Anthony F. Rodriguez",
//     role: "Computer Maintenance Technologist II, Supreme Court of the Philippines",
//     description: (
//       <p>
//         <Highlight>
//           The training program has been a remarkable journey for me
//         </Highlight>
//         . The skills I&apos;ve acquired have contributed to both my personal and
//         professional growth. It&apos;s an investment that pays dividends.
//       </p>
//     ),
//   },
//   {
//     name: "Kate Arjhon V. Carandang",
//     role: "Civil Affairs Helper, Philippine Air Force",
//     description: (
//       <p>
//         <Highlight>
//           It&apos;s a game-changer for both beginners and experienced
//           professionals
//         </Highlight>
//         . The hands-on labs and real-world simulations were incredibly engaging
//         and practical, allowing me to apply the skills immediately.
//       </p>
//     ),
//   },
//   {
//     name: "Anonymous",
//     role: "Government Employee",
//     description: (
//       <p>
//         <Highlight>
//           I highly recommend this course to anyone looking to upskill or reskill
//         </Highlight>
//         . The flexible format allowed me to balance my studies with my busy
//         schedule.
//       </p>
//     ),
//   },
//   {
//     name: "Jefferson A. Mercede",
//     role: "Computer Operator II, Supreme Court of the Philippines",
//     description: (
//       <p>
//         The <Highlight>practical exercises and clear explanations</Highlight>{" "}
//         helped me gain a strong foundation in cybersecurity concepts . It was an{" "}
//         <Highlight>engaging and valuable</Highlight> learning experience.
//       </p>
//     ),
//   },
//   {
//     name: "Joyce C. Vacual",
//     role: "Information Systems Analyst II, Supreme Court of the Philippines",
//     description: (
//       <p>
//         The real-world scenarios and practical exercises in the course
//         <Highlight>
//           deepened my understanding of security operations
//         </Highlight>{" "}
//         and familiarized me with essential tools for effective threat response.
//       </p>
//     ),
//   },
//   {
//     name: "Michael V. Calooy",
//     role: "Programming Technician, Philippine Air Force",
//     description: (
//       <p>
//         <Highlight>One of the best platforms</Highlight> to perform an actual
//         configuration using a browser.
//       </p>
//     ),
//   },
//   {
//     name: "Anonymous",
//     role: "Government Employee",
//     description: (
//       <p>
//         The course structure{" "}
//         <Highlight>
//           {" "}
//           helps beginners to effectively grasp new, unfamiliar concepts
//         </Highlight>
//         , especially to those who are not cybersecurity practitioners.
//       </p>
//     ),
//   },
//   {
//     name: "Johney M. Florida",
//     role: "Computer Operator II, Court of Appeals (Visayas Station)",
//     description: (
//       <p>
//         <Highlight>
//           Cybersecurity is not just a concern for IT professionals but it&apos;s
//           a responsibility that extends to everyone
//         </Highlight>
//         . By understanding these risks, we become more vigilant and capable of
//         recognizing potential threats.
//       </p>
//     ),
//   },
//   {
//     name: "Jean P. Baawa",
//     role: "PhilHealth (Local Health Insurance Office-Kalinga, Apayao)",
//     description: (
//       <p>
//         I can confidently say that it was{" "}
//         <Highlight>a truly valuable experience</Highlight>. The knowledge gained
//         will significantly enhance our skills in identifying vulnerabilities.
//       </p>
//     ),
//   },
//   {
//     name: "Marlon A. Parugrug",
//     role: "Group Commander, Philippine Air Force",
//     description: (
//       <p>
//         <Highlight>
//           I highly recommend this course to anyone looking to enhance their
//           skills in today&apos;s tech-driven world
//         </Highlight>
//         . I gained essential skills in protecting data and responding to
//         breaches.
//       </p>
//     ),
//   },
//   {
//     name: "Helbert Santos",
//     role: "IT Officer I, Court of Appeals",
//     description: (
//       <p>
//         The{" "}
//         <Highlight>well-structured curriculum and expert instructors</Highlight>{" "}
//         provide a solid foundation in cybersecurity. Highly recommended!
//       </p>
//     ),
//   },
//   {
//     name: "Anonymous",
//     role: "Government Employee",
//     description: (
//       <p>
//         The platform was not the usual online learning platform that I am used
//         to — especially the{" "}
//         <Highlight>laboratories through the virtual machine</Highlight>.
//       </p>
//     ),
//   },
//   {
//     name: "Dante Sigua",
//     role: "CEIS Officer, Philippine Air Force",
//     description: (
//       <p>
//         This may have <Highlight>helped many scholars</Highlight> like us
//         understand how cybersecurity applies to everyday life .
//       </p>
//     ),
//   },
//   {
//     name: "Angela Marie M. de Gracia-Cruz",
//     role: "Court Attorney VI, Supreme Court of the Philippines",
//     description: (
//       <p>
//         <Highlight>As someone with no IT background</Highlight>, I appreciated
//         the practical applications and real-world examples integrated into the
//         course . Each module built upon previous knowledge, creating{" "}
//         <Highlight>a smooth and cohesive learning journey</Highlight>.
//       </p>
//     ),
//   },
//   {
//     name: "Jamaico Jasma",
//     role: "Military Personnel, Philippine Air Force",
//     description: (
//       <p>
//         I feel{" "}
//         <Highlight>empowered to safeguard and defend digital spaces</Highlight>{" "}
//         because of the TESDA Cybersecurity Scholarship Program.
//       </p>
//     ),
//   },
//   {
//     name: "Geronimo S. De Villa Jr.",
//     role: "Computer Operator II, Supreme Court of the Philippines",
//     description: (
//       <p>
//         The course <Highlight>equipped us with practical tools</Highlight> to
//         leverage open-source data in real-world investigations .
//       </p>
//     ),
//   },
//   {
//     name: "Sheryll de Guzman",
//     role: "Chief, MISD, Court of Appeals",
//     description: (
//       <p>
//         The discussions on secure design principles and threat intelligence{" "}
//         <Highlight>
//           gave me actionable strategies that I&apos;m already putting into
//           practice
//         </Highlight>
//         .
//       </p>
//     ),
//   },
//   {
//     name: "Cherry Jean O. Romano",
//     role: "Court Attorney II, Supreme Court of the Philippines",
//     description: (
//       <p>
//         The course has{" "}
//         <Highlight>
//           prepared me to contribute with greater confidence to our
//           organization&apos;s cybersecurity strategy
//         </Highlight>
//         .
//       </p>
//     ),
//   },
// ]

const testimonials = [
  {
    name: "Robert B. Rojas Jr.",
    role: "Computer Operator IV, Cybersecurity Division, Commission on Elections",
    description: (
      <p>
        &quot; Completing my cybersecurity training was a{" "}
        <Highlight>life-changing experience</Highlight>. The hands-on approach
        and real-world scenarios prepared me to tackle cybersecurity challenges
        with confidence. The program gave me the right skills and tools, which I
        now apply in my role as an Offensive Security Analyst. &quot;
      </p>
    ),
    delay: 0.12,
  },
  {
    name: "Angela Marie M. de Gracia-Cruz",
    role: "Court Attorney VI, Supreme Court of the Philippines",
    description: (
      <p>
        &quot;{" "}
        <Highlight>
          As someone with no IT or computer engineering background
        </Highlight>
        , I appreciated the practical applications and real-world examples
        integrated into the course. They made the concepts easier to understand
        and showed how cybersecurity applies to my professional field. &quot;
      </p>
    ),
    delay: 0.45,
  },
  {
    name: "Joyce C. Vacual",
    role: "Information Systems Analyst II, Supreme Court of the Philippines",
    description: (
      <p>
        &quot; The real-world scenarios and practical exercises in the course
        <Highlight>
          strengthened my understanding of security operations and familiarized
          me with essential tools
        </Highlight>{" "}
        for effective threat response. &quot;
      </p>
    ),
    delay: 0.67,
  },
  {
    name: "Anonymous",
    role: "Government Employee",
    description: (
      <p>
        &quot; I was hesitant at first to take an online course, but{" "}
        <Highlight>it proved to be the right choice</Highlight>. The flexible
        format, structured material, and instructor support helped me learn new
        skills and advance my career. &quot;
      </p>
    ),
    delay: 0.23,
  },
]

const highlightedTestimonial = {
  name: "John Jefferson So",
  role: "Cybersecurity Division, Commission on Elections",
  description: (
    <p>
      &quot; I had no prior knowledge about cybersecurity. After attending, I
      feel very lucky to be one of the first batch.
      <Highlight>
        The real-life cybersecurity exercises allowed me to experience actual
        scenarios
      </Highlight>{" "}
      such as identifying phishing emails, responding to simulated incidents,
      and analyzing suspicious activity. The training gave me the foundation and
      confidence to perform my role more effectively. &quot;
    </p>
  ),
}

export default function Testimonials() {
  return (
    <section
      className="relative mx-auto overflow-hidden py-20 md:py-32"
      id="testimonials"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 -left-20 z-10 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute -right-20 bottom-20 z-10 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-4 text-center text-4xl leading-[1.2] font-bold tracking-tighter text-foreground md:text-5xl">
          Hear from People Who Started Where You Are
        </h2>
        <h3 className="mx-auto mb-8 text-center text-lg font-medium tracking-tight text-balance text-muted-foreground">
          Here&apos;s what{" "}
          <span className="bg-linear-to-r from-blue-500 to-brand-teal bg-clip-text text-transparent">
            real professionals
          </span>{" "}
          are saying about{" "}
          <span className="font-semibold">
            the Cybersecurity Path with Cyberscool Defcon Inc.
          </span>
        </h3>
      </motion.div>

      <div className="relative mt-6 max-h-screen overflow-hidden">
        <div className="mx-auto max-w-[80%] md:max-w-7xl">
          {/* Mobile layout: Stack vertically */}
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            {/* Left side - Static highlighted testimonial */}
            <div className="w-full md:w-1/3">
              <div className="mt-25 items-center justify-center gap-5">
                <TestimonialCard
                  {...highlightedTestimonial}
                  className="shadow-lg shadow-sky-200 dark:border-sky-800 dark:shadow-sky-800"
                />
              </div>
            </div>

            {/* Right side - Single marquee with remaining testimonials */}
            <div className="w-full md:w-2/3">
              <Marquee
                vertical
                className="h-150 [--duration:30s] md:h-125"
                pauseOnHover
              >
                <div className="space-y-4 py-2">
                  {testimonials.map((card, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: card.delay,
                        duration: 1.2,
                      }}
                    >
                      <TestimonialCard {...card} />
                    </motion.div>
                  ))}
                </div>
              </Marquee>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-linear-to-t from-background from-20%"></div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-linear-to-b from-background from-20%"></div>
      </div>
    </section>
  )
}
