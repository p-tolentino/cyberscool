"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function registerForOrientation(formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const orientationDate = formData.get("orientationDate") as string

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

  revalidatePath("/")
  return { success: true }
}
