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
