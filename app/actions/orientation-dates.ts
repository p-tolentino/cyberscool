"use server"

import { createClient } from "@/lib/supabase/server"

export async function getOrientationDates() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("orientation_dates")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching orientation dates:", error.message)
    return []
  }

  return data.map((d) => ({
    value: d.value,
    label: d.label,
    zoom_link: d.zoom_link,
  }))
}
