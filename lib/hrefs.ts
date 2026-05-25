import {
  LinkedinIcon as LinkedIn,
  FacebookIcon as Facebook,
} from "@/components/icons/il-icons"

export const data = () => ({
  navigation: {
    company: [
      //   { name: "About", href: "/about" },
      //   { name: "Meet the Team", href: "/team" },
      { name: "What's In It For Me?", href: "/#preview" },
      { name: "Why Cybersecurity?", href: "/#why-cyber" },
      { name: "Testimonials", href: "/#testimonials" },
      { name: "Our Partners", href: "/#partners" },
      { name: "FAQs", href: "/#faq" },
    ],
    contact: [
      { name: "Leave a Message", href: "mailto:sales@cyberscooldefcon.com" },
      { name: "Reserve My Free Seat", href: "/#orientation-form" },
      { name: "(+63) 920 947 6628", href: "tel:+639209476628" },
      { name: "(+63) 998 981 1628", href: "tel:+639989811628" },
      { name: "(+63) 2 7915 6464", href: "tel:+63279156464" },
    ],
    legal: [{ name: "Data Privacy", href: "/" }],
  },
  socialLinks: [
    {
      icon: Facebook,
      label: "Facebook",
      href: "https://www.facebook.com/CybersCoolDefcon/",
    },
    {
      icon: LinkedIn,
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/cyberscool-defcon-inc/?originalSubdomain=ph",
    },
  ],
  bottomLinks: [{ href: "/privacy", label: "Privacy Policy" }],
})
