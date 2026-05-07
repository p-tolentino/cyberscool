export interface Program {
  title: string
  slug: string
  category: "Flagship" | "Workshop" | "Specialized"
  hours: number
  description: string
  features: string[]
  badge: string | null
  isFlagship: boolean
  jobOutcomes: string[]
  syllabusFile: string | null
}

// Order based on original website dropdown
export const programs: Program[] = [
  // 1. Flagship
  {
    title: "Zero to Hero Cyber Defense",
    slug: "zero-to-hero",
    category: "Flagship",
    hours: 480,
    description:
      "Comprehensive end-to-end program with 4 certifications + 12 micro-credentials via TechDX Arena. No IT background required. Transform into a job-ready cyber defender in 12 weeks.",
    features: [
      "No IT background required",
      "60 unique laboratories",
      "100 simulated exercises",
      "287-day access",
      "4 certifications + 12 micro-credentials",
    ],
    badge: "Most Popular",
    isFlagship: true,
    jobOutcomes: [
      "Cybersecurity Associate",
      "Cybersecurity Intern",
      "Incident Responder",
      "Cybersecurity Analyst",
      "Cyber Forensic Investigator",
      "Network Operation Specialist",
      "Cyber Infrastructure Support Staff",
      "Cybersecurity Operations Technician",
      "Cyber Threat Researcher",
      "Cyber Defense Analyst",
      "SOC Analyst (Tier 1)",
      "SOC Analyst (Tier 2)",
      "Threat Intelligence Analyst",
    ],
    syllabusFile: "syllabus-zero-to-hero.pdf",
  },
  // 2. Workshop
  {
    title: "Intro to CyberSecurity",
    slug: "intro-to-cybersecurity",
    category: "Workshop",
    hours: 30,
    description:
      "The best career-oriented education in cyber begins here. A 30-hour introductory course, completely online and self-paced, ideal for learners exploring cybersecurity and discovering the many different roles in this high-demand industry.",
    features: [
      "Cybersecurity procedures",
      "Common security threats & social engineering",
      "Attackers and Advanced Persistent Threats",
      "Risk management & attack investigation",
      "Cybersecurity career paths",
    ],
    badge: null,
    isFlagship: false,
    jobOutcomes: [
      "Career Shifters",
      "Entry-level Security Awareness",
      "Future Cyber Defense Analyst",
    ],
    syllabusFile: "syllabus-intro-cyber.pdf",
  },
  // 3. Workshop
  {
    title: "Fundamentals for Executives",
    slug: "fundamentals-for-executives",
    category: "Workshop",
    hours: 15,
    description:
      "Empowering leaders with cybersecurity knowledge. 97% of cyber-attacks target leaders and employees. This 15-hour self-paced online program empowers government leaders and business executives to protect their organizations from cyber risks.",
    features: [
      "Effective content tailor-made for leaders",
      "15 hours of interactive learning",
      "100% online with real-world examples",
      "Learn to react to emerging tech trends",
    ],
    badge: null,
    isFlagship: false,
    jobOutcomes: [
      "C-Suite",
      "Security Managers",
      "Risk Officers",
      "Government Leaders",
    ],
    syllabusFile: "syllabus-fundamentals-executives.pdf",
  },
  // 4. Specialized
  {
    title: "Ethical Hacking",
    slug: "ethical-hacking",
    category: "Specialized",
    hours: 200,
    description:
      "Master penetration testing with comprehensive training from network administration to advanced security measures. Covers ethical hacking techniques and incident response to identify and address vulnerabilities before exploitation.",
    features: [
      "Network administration & cybersecurity fundamentals",
      "Network and application security",
      "Ethical hacking techniques & incident response",
      "60 labs + 100 simulations",
    ],
    badge: null,
    isFlagship: false,
    jobOutcomes: [
      "Ethical Hacker",
      "Penetration Tester",
      "Cyber Defense Incident Responder",
      "Cyber Defense Analyst",
    ],
    syllabusFile: "syllabus-ethical-hacking.pdf",
  },
  // 5. Specialized
  {
    title: "Risk Assessor",
    slug: "risk-assessor",
    category: "Specialized",
    hours: 200,
    description:
      "Comprehensive training in risk management and threat intelligence. Master identifying, assessing, and mitigating cybersecurity risks with industry-standard frameworks for roles like Lead Risk Assessor and Intelligence Analyst.",
    features: [
      "Network administration & cybersecurity fundamentals",
      "Network and application security",
      "Secure design principles",
      "Risk management & threat intelligence",
    ],
    badge: null,
    isFlagship: false,
    jobOutcomes: [
      "Lead Risk Assessor",
      "Intelligence Analyst",
      "Cyber Defense Analyst",
    ],
    syllabusFile: "syllabus-risk-assessor.pdf",
  },
  // 6. Specialized
  {
    title: "SOC Analyst Level 1",
    slug: "soc-analyst",
    category: "Specialized",
    hours: 200,
    description:
      "Become a SOC Analyst and master network administration, security, and incident handling. This 200-hour program prepares you for SOC Analyst, Cyber Defense Analyst, and Network Operations Specialist roles.",
    features: [
      "Network administration fundamentals",
      "Cybersecurity fundamentals",
      "Network and application security",
      "Incident handling & secure design",
    ],
    badge: null,
    isFlagship: false,
    jobOutcomes: [
      "Lead SOC Analyst",
      "Cyber Defense Analyst",
      "Cyber Defense Infrastructure Support Specialist",
      "Network Operations Specialist",
    ],
    syllabusFile: "syllabus-soc-analyst.pdf",
  },
  // 7. Specialized (requires SOC Analyst L1)
  {
    title: "Cyber Defense Incident Responder Level 2",
    slug: "cyber-defense-incident-responder",
    category: "Specialized",
    hours: 128,
    description:
      "Advanced program for SOC graduates. Intensive training in forensics, malware analysis, ethical hacking, and incident response. Registration conditional upon successful graduation of SOC Analyst Level 1.",
    features: [
      "Forensics investigation & evidence collection",
      "Malware analysis",
      "Ethical hacking techniques",
      "Incident response procedures",
      "128 hours blended learning",
    ],
    badge: null,
    isFlagship: false,
    jobOutcomes: [
      "Cyber Defense Incident Responder",
      "Cyber Defense Forensics Analyst",
      "Cyber Defense Analyst",
    ],
    syllabusFile: "syllabus-cyber-defense-l2.pdf",
  },
  // 8. Specialized
  {
    title: "Cyber Threat Intelligence Analyst",
    slug: "cyber-threat-intelligence",
    category: "Specialized",
    hours: 160,
    description:
      "Master cyber threat intelligence, operational security, and open-source investigation tools. Learn to investigate with low-technical threshold skills. Equip yourself with theory and practical insights for effective CTI across diverse domains.",
    features: [
      "Cyber threat intelligence fundamentals",
      "Operational security & collaboration",
      "OSINT tools mastery",
      "Low-technical threshold investigation skills",
    ],
    badge: null,
    isFlagship: false,
    jobOutcomes: [
      "SOC Analyst",
      "Fraud Analyst",
      "Cybersecurity Analyst",
      "Threat Intelligence Analyst",
      "Counter-Disinformation Analyst",
      "Cryptocurrency Crime Analyst",
      "Intelligence Analyst",
      "Forensic Analyst",
    ],
    syllabusFile: "syllabus-cti-analyst.pdf",
  },
  // 9. Specialized
  {
    title: "The OSINT Analyst",
    slug: "osint-analyst",
    category: "Specialized",
    hours: 200,
    description:
      "Comprehensive OSINT training for crime analysts, fraud investigators, law enforcement, and intelligence professionals. Learn data collection and analysis from expert instructors with vast experience in private and public sector investigations.",
    features: [
      "Digital investigations & collaboration",
      "Open-source intelligence mastery",
      "Data collection & analysis",
      "60 labs + 100 simulations",
    ],
    badge: null,
    isFlagship: false,
    jobOutcomes: [
      "Crime Analyst",
      "Fraud Analyst",
      "Law Enforcement Officer",
      "Military NCOs and Officers",
      "Geopolitical Analyst",
      "AML/CTF Analyst",
      "Journalist",
      "Private Investigator",
      "Intelligence Analyst",
      "Fact-Checker",
      "Threat Intelligence Analyst",
      "Insider Threat Analyst",
    ],
    syllabusFile: "syllabus-osint-analyst.pdf",
  },
]

export const getProgramBySlug = (slug: string): Program | undefined => {
  return programs.find((p) => p.slug === slug)
}

export const getProgramsByCategory = (
  category: Program["category"]
): Program[] => {
  return programs.filter((p) => p.category === category)
}
