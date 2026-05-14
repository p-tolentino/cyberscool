# CybersCool Defcon

First globally accredited cybersecurity school in the Philippines. Transforming careers through hands-on training.

## About

CybersCool Defcon Inc. is a TESDA-accredited cybersecurity school delivering world-class training via the TechDX Arena platform. Our programs are aligned with the NIST NICE Framework and have been recognized by global award bodies.

## Programs

- **Zero to Hero Cyber Defense** - Flagship program (480 hrs) - No IT background required
- **Ethical Hacking** - Specialized track (200 hrs) - OSCP-aligned curriculum
- **SOC Analyst Level1** - Specialized track (200 hrs) - Tier 1/2 analyst training
- **Intro to CyberSecurity** - Workshop (40 hrs) - Entry-level for career shifters
- **Risk Assessor** - Specialized track (150 hrs) - Risk management training
- **Fundamentals for Executives** - Workshop (16 hrs) - Cybersecurity for leaders

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** TailwindCSS 4.x + Shadcn UI (radix-nova style)
- **Backend:** Supabase (PostgreSQL, Auth, Server Actions)
- **Forms:** React Hook Form + Zod validation
- **Language:** TypeScript
- **Icons:** Lucide React

## Features

- 500+ graduates placed in top companies
- 9 specialized programs from foundational to advanced
- TESDA-accredited and globally accredited
- 60 unique laboratories + 100 simulated exercises
- NIST NICE Framework aligned

Features:

- View and manage orientation dates (activate/deactivate)
- View all registrations with contact status
- Toggle email_sent and contacted status

## Getting Started

```bash
npm install
npm run dev
```

## Database

Supabase tables:

- `orientation_dates` - Available orientation sessions
- `orientation_registrations` - User registrations for orientations

## Project Structure

```
app/
├── programs/
│   ├── flagship/
│   │   └── zero-to-hero/
│   ├── workshop/
│   │   ├── intro-to-cybersecurity/
│   │   └── fundamentals-for-executives/
│   └── specialized/
│       ├── ethical-hacking/
│       ├── soc-analyst/
│       └── risk-assessor/
├── admin/
│   ├── layout.tsx
│   └── orientation-dates/
└── (main pages)

components/
├── nav/
├── sections/
└── ui/ (shadcn components)

lib/
├── data/
│   └── programs.ts
└── supabase/
```
