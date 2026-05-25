"use server"

import JoinEmail from "@/components/email-template"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function registerForOrientation(formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const orientationDate = formData.get("orientationDate") as string
  const zoomLink = formData.get("zoomLink") as string

  const supabase = await createClient()

  const { error } = await supabase.from("orientation_registrations").insert([
    {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      orientation_date: orientationDate,
      email_sent: false,
      contacted: false,
      created_at: new Date(),
    },
  ])

  if (error) return { error: error.message }

  const { data } = await supabase
    .from("orientation_dates")
    .select("label")
    .eq("value", orientationDate)
    .single()

  const { error: sendEmailError } = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: "Discover the Cybersecurity Path",
    react: JoinEmail({
      firstName: firstName,
      companyName: "Cyberscool Defcon Inc.",
      zoomUrl: zoomLink,
      orientationDateTime: data?.label.toString(),
    }),
  })

  if (sendEmailError) return { error: sendEmailError.message }

  revalidatePath("/")
  return { success: true }
}
