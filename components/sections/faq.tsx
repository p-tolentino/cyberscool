"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface FAQItemProps {
  question: string
  answer: string
  index: number
}

const faqs: Omit<FAQItemProps, "index">[] = [
  {
    question: "Who is CybersCool Defcon?",
    answer:
      "CybersCool Defcon Inc. is a cybersecurity training provider in the Philippines focused on practical, skills-based learning. Its programs emphasize hands-on labs, simulations, and industry-aligned cybersecurity training.",
  },
  {
    question: "Is the career preview really free?",
    answer:
      "Yes. The 30-minute cybersecurity career preview is free to attend. It is designed to help you understand the cybersecurity career opportunity, beginner-friendly roles, salary potential, and possible next steps.",
  },
  {
    question: "What will I learn in the free preview?",
    answer:
      "You will learn why cybersecurity demand is growing, what beginner-friendly roles are available, what salary ranges may look like, what skills you need to build first, and what common myths stop people from starting.",
  },
  {
    question: "Do I need cybersecurity experience to join?",
    answer:
      "No. The preview is designed for people with no cybersecurity experience. It is especially helpful for IT professionals, tech graduates, career shifters, and beginners who want to know whether cybersecurity is a realistic path for them.",
  },
  {
    question: "Is this only for IT professionals?",
    answer:
      "No. IT professionals may have an advantage because they already understand technology, systems, users, or networks. However, the preview is also open to tech graduates, BPO professionals, career shifters, and anyone seriously exploring cybersecurity.",
  },
  {
    question: "Is this for absolute beginners?",
    answer:
      "Our program is tailored specifically for those with zero technical experience, providing a clear and guided path for anyone looking to make a successful career shift into cybersecurity.",
  },
  {
    question: "What beginner-friendly roles can I aim for?",
    answer:
      "Depending on your background and training, possible entry points may include Cybersecurity Intern, Cybersecurity Associate, Cybersecurity Analyst, Cybersecurity Operations Technician, SOC Analyes Tier 1.",
  },
  {
    question: "Will salary ranges be discussed?",
    answer:
      "Yes. The preview will discuss realistic local and global salary ranges, including what factors affect compensation such as role, experience, company, location, certifications, and skill level. Salary figures are for general reference and are not guaranteed.",
  },
  {
    question: "Will there be a training offer during the preview?",
    answer:
      "Yes. Toward the end of the session, CybersCool Defcon may introduce its structured Zero-to-Hero Cyber Defense Program for those who want guided, hands-on training. There is no obligation to enroll. The main purpose of the preview is to give you career clarity. You will learn about the cybersecurity industry, possible roles, salary potential, beginner misconceptions, and the realistic path to start. The training pathway is presented only for those who want help taking the next step.",
  },
  {
    question: "How long is the session?",
    answer:
      "The career preview is approximately 30 minutes, with time allotted for key insights and possible Q&A depending on the session format.",
  },
  {
    question: "Is there a recording available on this webinar?",
    answer:
      "This live webinar will not be recorded to ensure a focused, real-time learning experience and to protect the privacy of all attendees during our interactive sessions.",
  },
  {
    question: "What if I am interested but not ready to enroll in a course?",
    answer:
      "That is completely fine. The preview is meant to help you understand whether cybersecurity is worth exploring. You can attend to learn, ask questions, and decide your next step afterward.",
  },
]

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      className={cn(
        "group rounded-lg border border-border/60",
        "transition-all duration-200 ease-in-out",
        isOpen ? "bg-card/30 shadow-sm" : "hover:bg-card/50",
        "h-fit"
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 px-6 py-4"
      >
        <h3
          className={cn(
            "text-left text-base font-medium transition-colors duration-200",
            "text-foreground/80",
            isOpen && "text-foreground"
          )}
        >
          {question}
        </h3>
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 1.1 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={cn(
            "shrink-0 rounded-full p-0.5",
            "transition-colors duration-200",
            isOpen ? "text-primary" : "text-muted-foreground"
          )}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: {
                  duration: 0.4,
                  ease: [0.04, 0.62, 0.23, 0.98],
                },
                opacity: {
                  duration: 0.25,
                  delay: 0.1,
                },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
                opacity: {
                  duration: 0.25,
                },
              },
            }}
          >
            <div className="border-t border-border/40 px-6 pt-2 pb-4">
              <motion.p
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="text-sm leading-relaxed text-muted-foreground"
              >
                {answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQs() {
  return (
    <section
      className="relative w-full max-w-screen overflow-x-hidden bg-background py-20"
      id="faq"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 -left-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <Badge
            variant="outline"
            className="mb-4 border-primary px-3 py-1 text-xs font-medium tracking-wider uppercase"
          >
            FAQs
          </Badge>

          <h2 className="mb-3 bg-linear-to-r from-primary to-brand-purple bg-clip-text text-3xl font-bold text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-muted-foreground">
            Everything you need to know about Cyberscool Defcon Inc. and its
            programs.
          </p>
        </motion.div>

        <div className="mx-auto grid gap-4 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} index={index} />
          ))}
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={cn("mx-auto mt-12 max-w-md rounded-lg p-6 text-center")}
        >
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-2 text-primary">
            <Mail className="h-4 w-4" />
          </div>
          <p className="mb-1 text-sm font-medium text-foreground">
            Still have questions?
          </p>
          <p className="mb-4 text-xs text-muted-foreground">
            We&apos;re here to help you
          </p>
          <button
            type="button"
            className={cn(
              "rounded-md px-4 py-2 text-sm",
              "bg-primary text-primary-foreground",
              "hover:bg-primary/90",
              "transition-colors duration-200",
              "font-medium"
            )}
          >
            Contact Support
          </button>
        </motion.div> */}
      </div>
    </section>
  )
}
