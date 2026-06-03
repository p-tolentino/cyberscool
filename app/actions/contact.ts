"use server"

import { createClient } from "@/lib/supabase/server"
import { normalizePhone } from "@/lib/phone"

export async function lookupRegistration(email: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("orientation_registrations")
    .select("*")
    .eq("email", email)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (error) {
    if (error.code === "PGRST116") {
      return { data: null, error: "No registration found with that email." }
    }
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function updateContactPreferences(formData: FormData) {
  const lookupEmail = formData.get("lookupEmail") as string
  const email = formData.get("email") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const phone = normalizePhone(formData.get("phone") as string)
  const preferredContactMethod = formData.get("preferredContactMethod") as string
  const preferredDay = formData.get("preferredDay") as string
  const preferredTime = formData.get("preferredTime") as string

  const supabase = await createClient()

  const { error } = await supabase
    .from("orientation_registrations")
    .update({
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      preferred_contact_method: preferredContactMethod,
      preferred_day: preferredDay,
      preferred_time: preferredTime,
    })
    .eq("email", lookupEmail)

  if (error) return { success: false, error: error.message }

  return { success: true, error: null }
}
