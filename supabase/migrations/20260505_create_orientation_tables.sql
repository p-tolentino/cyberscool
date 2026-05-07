-- Create orientation_dates table
CREATE TABLE IF NOT EXISTS orientation_dates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orientation_registrations table  
CREATE TABLE IF NOT EXISTS orientation_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  orientation_date TEXT NOT NULL,
  email_sent BOOLEAN DEFAULT false,
  contacted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default orientation dates
INSERT INTO orientation_dates (label, value) VALUES 
  ('May 15, 2026 (Saturday) - 10:00 AM', 'may-15-2026'),
  ('May 22, 2026 (Saturday) - 2:00 PM', 'may-22-2026'),
  ('June 5, 2026 (Saturday) - 10:00 AM', 'june-5-2026')
ON CONFLICT (value) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE orientation_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE orientation_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for anon access (using Supabase anon key from client)
-- Allow anon to insert registrations
CREATE POLICY "Allow anon insert registrations" 
  ON orientation_registrations 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- Allow anon to read active dates
CREATE POLICY "Allow anon read active dates" 
  ON orientation_dates 
  FOR SELECT 
  TO anon 
  USING (is_active = true);
