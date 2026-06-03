ALTER TABLE orientation_registrations
  ADD COLUMN IF NOT EXISTS preferred_contact_method TEXT,
  ADD COLUMN IF NOT EXISTS preferred_day TEXT,
  ADD COLUMN IF NOT EXISTS preferred_time TEXT;
