export interface OrientationDate {
  id: string
  label: string
  value: string
  zoom_link: string
  is_active: boolean
  created_at: string
}

export interface Referrer {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export interface Registration {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  heard_from: string | null
  other_source: string | null
  program_interest: string
  orientation_date: string
  email_sent: boolean
  contacted: boolean
  is_enrolled: boolean
  enrolled_at: string | null
  referrer_id: string | null
  referrer?: Referrer | null
  created_at: string
  preferred_contact_method: string | null
  preferred_day: string | null
  preferred_time: string | null
}
