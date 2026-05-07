import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

const faqs = [
  {
    question: "Do I need an IT background to enroll?",
    answer:
      "No! Our flagship Zero to Hero Cyber Defense Track is specifically designed for career shifters with zero IT background. We start from IT fundamentals and build up your skills progressively through 400 hours of hands-on labs using the TechDX Arena platform.",
  },
  {
    question: "Is CybersCool Defcon TESDA accredited?",
    answer:
      "Yes! We are the first globally accredited cyber school in the Philippines and fully TESDA accredited. Our programs are aligned with the NIST NICE Framework and recognized by government agencies including NBI, NDCP, and AFP.",
  },
  {
    question: "How much is tuition?",
    answer:
      "Tuition ranges from (--------) for our flagship Zero to Hero program (400 hrs, 4 certifications, 12 micro-credentials). We offer flexible payment plans and accept TESDA scholarships for qualified students.",
  },
  {
    question: "What is the schedule for classes?",
    answer:
      "Training is fully online via TechDX Arena — accessible anywhere with internet. The Zero to Hero program offers 287-day access with self-paced learning. Live orientations are held on select Saturdays — check the registration form for upcoming dates.",
  },
  {
    question: "What jobs can I get after graduation?",
    answer:
      "500+ graduates have been placed in roles like SOC Analyst (Tier 1/2), Penetration Tester, Risk Assessor, and Cyber Threat Intelligence Analyst at companies like NTT, Santander, and DarkTrace.",
  },
  {
    question: "Is there a free orientation?",
    answer:
      "Yes! We offer free orientation sessions on select Saturdays. You can register on this page — just scroll down to the registration form and select an available date. We'll send you the meeting details via email.",
  },
  {
    question: "What certifications will I earn?",
    answer:
      "Zero to Hero graduates earn: 1) CybersCool Defcon Certificate, 2) 12 Micro-Credentials from TechDX, and 3) 4 Industry-Aligned Certifications: Certified Cybersecurity Associate, Certified Cybersecurity Analyst, Certified SOC Analyst, and Certified Cyber Threat Intelligence Analyst.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Frequently Asked <span className="text-brand-teal">Questions</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Find answers to common questions about our programs, accreditation,
            and orientation process
          </p>
        </div>

        <Card className="mx-auto max-w-3xl border-brand-purple/30">
          <CardContent>
            <Accordion type="multiple" className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="p-2">
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent
                    className="text-muted-foreground"
                    style={{ textAlign: "justify" }}
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
