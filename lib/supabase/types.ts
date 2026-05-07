// Supabase utilities for orientation management
// Replaces Google Sheets integration

export interface OrientationDate {
  id: string
  label: string
  value: string
  is_active: boolean
  created_at: string
}

export interface Registration {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  program_interest: string
  orientation_date: string
  email_sent: boolean
  contacted: boolean
  created_at: string
}
