"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getOrientationDates() {
  const supabase = await createClient()
  const { data: dates } = await supabase
    .from("orientation_dates")
    .select("*")
    .order("created_at", { ascending: false })
  return dates
}

export async function getProspects() {
  const supabase = await createClient()
  const { data: registrations } = await supabase
    .from("orientation_registrations")
    .select("*")
    .order("created_at", { ascending: false })
  return registrations
}

export async function toggleDateStatus(formData: FormData) {
  const dateId = formData.get("dateId") as string
  const currentStatus = formData.get("currentStatus") === "true"

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("orientation_dates")
    .update({ is_active: !currentStatus })
    .eq("id", dateId)

  console.log(data, error)

  revalidatePath("/admin")
}

export async function toggleEmailSent(formData: FormData) {
  const regId = formData.get("regId") as string
  const currentStatus = formData.get("currentStatus") === "true"

  const supabase = await createClient()
  await supabase
    .from("orientation_registrations")
    .update({ email_sent: !currentStatus })
    .eq("id", regId)

  revalidatePath("/admin")
}

export async function toggleContacted(formData: FormData) {
  const regId = formData.get("regId") as string
  const currentStatus = formData.get("currentStatus") === "true"

  const supabase = await createClient()
  await supabase
    .from("orientation_registrations")
    .update({ contacted: !currentStatus })
    .eq("id", regId)

  revalidatePath("/admin")
}
