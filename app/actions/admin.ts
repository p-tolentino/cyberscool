"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

// --- Auth ---

export async function adminLogin(formData: FormData) {
  const password = formData.get("password") as string

  if (
    password !== process.env.ADMIN_PASSWORD &&
    password !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD
  ) {
    return { success: false, error: "Invalid password" }
  }

  const cookieStore = await cookies()
  cookieStore.set("admin_session", "true", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  })

  return { success: true, error: "" }
}

export async function adminLogout() {
  const cookieStore = await cookies()
  cookieStore.set("admin_session", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/admin",
    maxAge: 0,
  })
  revalidatePath("/admin")
}

export async function checkAdminSession() {
  const cookieStore = await cookies()
  return cookieStore.has("admin_session")
}

async function requireAdmin() {
  const cookieStore = await cookies()
  if (!cookieStore.has("admin_session")) {
    return { success: false, error: "Unauthorized" }
  }
}

// --- Orientation Dates ---

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
    .select(
      `
      *,
      referrer:referrer_id (*)
    `
    )
    .order("created_at", { ascending: false })
  return registrations
}

export async function toggleDateStatus(dateId: string, currentStatus: boolean) {
  const unauth = await requireAdmin()
  if (unauth) return unauth
  const supabase = await createClient()
  const { error } = await supabase
    .from("orientation_dates")
    .update({ is_active: !currentStatus })
    .eq("id", dateId)

  if (error) return { success: false, error: error.message }
  revalidatePath("/admin")
  return { success: true, error: "" }
}

export async function toggleEmailSent(regId: string, currentStatus: boolean) {
  const unauth = await requireAdmin()
  if (unauth) return unauth
  const supabase = await createClient()
  const { error } = await supabase
    .from("orientation_registrations")
    .update({ email_sent: !currentStatus })
    .eq("id", regId)

  if (error) return { success: false, error: error.message }
  revalidatePath("/admin")
  return { success: true, error: "" }
}

export async function toggleContacted(regId: string, currentStatus: boolean) {
  const unauth = await requireAdmin()
  if (unauth) return unauth
  const supabase = await createClient()
  const { error } = await supabase
    .from("orientation_registrations")
    .update({ contacted: !currentStatus })
    .eq("id", regId)

  if (error) return { success: false, error: error.message }
  revalidatePath("/admin")
  return { success: true, error: "" }
}

export async function createOrientationDate(formData: FormData) {
  const unauth = await requireAdmin()
  if (unauth) return unauth
  const supabase = await createClient()
  const label = formData.get("label") as string
  const date = formData.get("date") as string

  const { error } = await supabase
    .from("orientation_dates")
    .insert({ label, value: date, is_active: true })

  if (error) return { success: false, error: error.message }
  revalidatePath("/admin")
  return { success: true, error: "" }
}

export async function deleteRegistration(regId: string) {
  const unauth = await requireAdmin()
  if (unauth) return unauth
  const supabase = await createClient()
  const { error } = await supabase
    .from("orientation_registrations")
    .delete()
    .eq("id", regId)

  if (error) return { success: false, error: error.message }
  revalidatePath("/admin")
  return { success: true, error: "" }
}

export async function deleteOrientationDate(dateId: string) {
  const unauth = await requireAdmin()
  if (unauth) return unauth
  const supabase = await createClient()
  const { error } = await supabase
    .from("orientation_dates")
    .delete()
    .eq("id", dateId)

  if (error) return { success: false, error: error.message }
  revalidatePath("/admin")
  return { success: true, error: "" }
}

export async function updateOrientationDate(formData: FormData) {
  const unauth = await requireAdmin()
  if (unauth) return unauth
  const supabase = await createClient()
  const dateId = formData.get("id") as string
  const label = formData.get("label") as string
  const value = formData.get("date") as string

  const { error } = await supabase
    .from("orientation_dates")
    .update({ label, value })
    .eq("id", dateId)

  if (error) return { success: false, error: error.message }
  revalidatePath("/admin")
  return { success: true, error: "" }
}

export async function getReferrers(searchTerm?: string) {
  const supabase = await createClient()
  let query = supabase.from("referrers").select("*").order("name")

  if (searchTerm && searchTerm.trim()) {
    query = query.ilike("name", `%${searchTerm}%`)
  }

  const { data } = await query.limit(20)
  return data || []
}

export async function createReferrer(name: string) {
  const unauth = await requireAdmin()
  if (unauth) return unauth

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("referrers")
    .insert({ name: name.trim() })
    .select()
    .single()

  if (error) {
    if (error.code === "23505") {
      const { data: existing } = await supabase
        .from("referrers")
        .select("*")
        .eq("name", name.trim())
        .single()
      return { success: true, data: existing, error: "" }
    }
    return { success: false, error: error.message }
  }

  revalidatePath("/admin")
  return { success: true, data, error: "" }
}

export async function assignReferrer(
  registrationId: string,
  referrerId: string | null
) {
  const unauth = await requireAdmin()
  if (unauth) return unauth

  const supabase = await createClient()
  const { error } = await supabase
    .from("orientation_registrations")
    .update({ referrer_id: referrerId })
    .eq("id", registrationId)

  if (error) return { success: false, error: error.message }
  revalidatePath("/admin")
  return { success: true, error: "" }
}

export async function toggleEnrolled(
  registrationId: string,
  currentStatus: boolean,
  enrolledDate?: Date | null
) {
  const unauth = await requireAdmin()
  if (unauth) return unauth

  const supabase = await createClient()

  const updateData: {
    is_enrolled: boolean
    enrolled_at?: string | null
  } = {
    is_enrolled: !currentStatus,
  }

  if (!currentStatus && enrolledDate) {
    updateData.enrolled_at = enrolledDate.toISOString()
  } else if (currentStatus) {
    updateData.enrolled_at = null
  }

  const { error } = await supabase
    .from("orientation_registrations")
    .update(updateData)
    .eq("id", registrationId)

  if (error) return { success: false, error: error.message }
  revalidatePath("/admin")
  return { success: true, error: "" }
}
