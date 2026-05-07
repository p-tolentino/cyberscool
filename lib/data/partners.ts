export interface Partner {
  name: string
  logo: string // path relative to public folder (light mode)
  logoDark?: string // path relative to public folder (dark mode, optional)
  category: "government" | "private" | "academic"
}

export const partners: Partner[] = [
  // Government Agencies
  {
    name: "Armed Forces of the Philippines",
    logo: "/partner-logos/afp.png",
    category: "government",
  },
  {
    name: "Philippine Air Force",
    logo: "/partner-logos/airforce.svg",
    category: "government",
  },
  {
    name: "Philippine Army",
    logo: "/partner-logos/army.svg",
    category: "government",
  },
  {
    name: "Philippine Navy",
    logo: "/partner-logos/navy.png",
    category: "government",
  },
  {
    name: "Philippine Coast Guard",
    logo: "/partner-logos/coastguard.png",
    category: "government",
  },
  {
    name: "National Defense College of the Philippines",
    logo: "/partner-logos/ndcp.png",
    category: "government",
  },
  {
    name: "National Bureau of Investigation",
    logo: "/partner-logos/nbi.png",
    category: "government",
  },
  { name: "TESDA", logo: "/partner-logos/tesda.svg", category: "government" },
  {
    name: "Bureau of Immigration",
    logo: "/partner-logos/immigration.png",
    category: "government",
  },
  {
    name: "Bureau of Internal Revenue",
    logo: "/partner-logos/bir.png",
    category: "government",
  },
  {
    name: "Department of Finance",
    logo: "/partner-logos/depfin.png",
    category: "government",
  },
  {
    name: "National Intelligence Coordinating Agency",
    logo: "/partner-logos/nica.svg",
    category: "government",
  },
  {
    name: "Commission on Elections",
    logo: "/partner-logos/comelec.png",
    category: "government",
  },
  {
    name: "Provincial Government of Sultan Kudarat",
    logo: "/partner-logos/sultankudarat.png",
    category: "government",
  },
  {
    name: "Science City of Muñoz",
    logo: "/partner-logos/sciencecity.png",
    category: "government",
  },

  // Private Organizations
  {
    name: "San Miguel Corporation",
    logo: "/partner-logos/smc.png",
    logoDark: "/partner-logos/smc-dark.png",
    category: "private",
  },
  {
    name: "Deloitte Philippines",
    logo: "/partner-logos/deloitte.png",
    logoDark: "/partner-logos/deloitte-dark.png",
    category: "private",
  },
  {
    name: "Manuel L. Quezon University",
    logo: "/partner-logos/mlqu.png",
    category: "academic",
  },
  {
    name: "IntelMaximum Surveillance Inc.",
    logo: "/partner-logos/ims.png",
    category: "private",
  },
  // {
  //   name: "Smartpetro Inc.",
  //   logo: "/partner-logos/smartpetro.png",
  //   category: "private",
  // },
]
