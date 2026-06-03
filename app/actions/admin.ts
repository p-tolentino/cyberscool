"use server"

import NextStepEmail from "@/components/email-templates/next-step"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

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
  const zoomLink = formData.get("zoom_link") as string | null

  const { error } = await supabase.from("orientation_dates").insert({
    label,
    value: date,
    is_active: true,
    zoom_link: zoomLink || null,
  })

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
  const zoomLink = formData.get("zoom_link") as string | null

  const { error } = await supabase
    .from("orientation_dates")
    .update({ label, value, zoom_link: zoomLink || null })
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

export async function sendNextStepEmail(registrationIds: string[]) {
  const unauth = await requireAdmin()
  if (unauth) return unauth

  const supabase = await createClient()

  const { data: registrations, error } = await supabase
    .from("orientation_registrations")
    .select("id, first_name, email, email_sent")
    .in("id", registrationIds)

  if (error) return { success: false, error: error.message }
  if (!registrations || registrations.length === 0)
    return { success: false, error: "No registrations found." }

  const alreadySent = registrations.filter((r) => r.email_sent)
  const toSend = registrations.filter((r) => !r.email_sent)

  if (toSend.length === 0) {
    return {
      success: false,
      error:
        "Next Step email has already been sent to all selected registrations.",
      alreadySentIds: alreadySent.map((r) => r.id),
    }
  }

  const sentIds: string[] = []
  const errors: { email: string; error: string }[] = []

  for (const r of toSend) {
    const { error: sendError } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: [r.email],
      subject: `Your Next Steps in Cybersecurity`,
      react: NextStepEmail({ firstName: r.first_name }),
    })
    if (sendError) {
      errors.push({ email: r.email, error: sendError.message })
    } else {
      sentIds.push(r.id)
    }
  }

  if (sentIds.length > 0) {
    await supabase
      .from("orientation_registrations")
      .update({ email_sent: true })
      .in("id", sentIds)
  }

  revalidatePath("/admin")

  if (errors.length > 0) {
    return {
      success: sentIds.length > 0,
      error: `Sent ${sentIds.length}/${toSend.length}. Failed: ${errors.map((e) => `${e.email} (${e.error})`).join(", ")}`,
      sentCount: sentIds.length,
      alreadySentIds: alreadySent.map((r) => r.id),
    }
  }

  return {
    success: true,
    error: null,
    sentCount: sentIds.length,
    alreadySentIds: alreadySent.map((r) => r.id),
  }
}

export async function batchToggleEmailSent(ids: string[], setTo: boolean) {
  const unauth = await requireAdmin()
  if (unauth) return unauth
  const supabase = await createClient()
  const { error } = await supabase
    .from("orientation_registrations")
    .update({ email_sent: setTo })
    .in("id", ids)

  if (error) return { success: false, error: error.message }
  revalidatePath("/admin")
  return { success: true, error: "" }
}

export async function batchToggleContacted(ids: string[], setTo: boolean) {
  const unauth = await requireAdmin()
  if (unauth) return unauth
  const supabase = await createClient()
  const { error } = await supabase
    .from("orientation_registrations")
    .update({ contacted: setTo })
    .in("id", ids)

  if (error) return { success: false, error: error.message }
  revalidatePath("/admin")
  return { success: true, error: "" }
}

export async function batchDeleteRegistrations(ids: string[]) {
  const unauth = await requireAdmin()
  if (unauth) return unauth
  const supabase = await createClient()
  const { error } = await supabase
    .from("orientation_registrations")
    .delete()
    .in("id", ids)

  if (error) return { success: false, error: error.message }
  revalidatePath("/admin")
  return { success: true, error: "" }
}

export async function batchAssignReferrer(
  ids: string[],
  referrerId: string | null
) {
  const unauth = await requireAdmin()
  if (unauth) return unauth
  const supabase = await createClient()
  const { error } = await supabase
    .from("orientation_registrations")
    .update({ referrer_id: referrerId })
    .in("id", ids)

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
