import type { Metadata } from "next"
import { Hero } from "@/components/sections/hero"
import { OrientationForm } from "@/components/sections/orientation-form"
import { getOrientationDates } from "@/app/actions/orientation-dates"
import SessionPreview from "@/components/sections/session-preview"
import ThisIsForYou from "@/components/sections/for-you"
import MythsToBreak from "@/components/sections/myth-bust"
import WhyCyber from "@/components/sections/why-cyber"
import Testimonials from "@/components/sections/testimonials"
import FAQs from "@/components/sections/faq"
import { PartnerMarquee } from "@/components/sections/partner-marquee"
import Header from "@/components/sections/header"
import Footer from "@/components/sections/footer"

export const metadata: Metadata = {
  title: "Home | CybersCool Defcon Inc. | Cybersecurity Training Philippines",
  description:
    "Start your cybersecurity career with CybersCool Defcon Inc. Explore our hands-on programs — from foundational courses to advanced certifications. Attend a free orientation session to learn more.",
  openGraph: {
    title: "Home | CybersCool Defcon Inc. | Cybersecurity Training Philippines",
    description:
      "Start your cybersecurity career with CybersCool Defcon Inc. Explore our hands-on programs — from foundational courses to advanced certifications.",
  },
}

export default async function HomePage() {
  const orientationDates = await getOrientationDates()

  return (
    <main>
      <Header />

      <Hero />

      <SessionPreview />

      <ThisIsForYou />

      <MythsToBreak />

      <WhyCyber />

      <Testimonials />

      <PartnerMarquee />

      <FAQs />

      <OrientationForm
        orientationDates={orientationDates}
        isLoadingDates={false}
      />

      {/* 
      <ZeroToHeroTerminal />

      

      

      <TestimonialsSection />

      <RecognitionSection />

      <FAQSection />

       */}

      <Footer />
    </main>
  )
}
