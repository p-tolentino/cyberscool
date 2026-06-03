import type { Metadata } from "next"
import Header from "@/components/sections/header"
import Footer from "@/components/sections/footer"
import { ConsultForm } from "@/components/sections/consult-form"

export const metadata: Metadata = {
  title: "Book A Consultation | CybersCool Defcon Inc.",
  description:
    "Set your contact preferences so we can reach out about our cybersecurity programs and enrollment.",
}

export default function ContactPage() {
  return (
    <main>
      <Header />
      <div className="pt-16">
        <ConsultForm />
      </div>
      <Footer />
    </main>
  )
}
