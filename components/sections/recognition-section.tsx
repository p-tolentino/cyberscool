import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, ShieldCheck, Globe } from "lucide-react"

const awards = [
  {
    icon: ShieldCheck,
    title: "TESDA Accredited",
    description: "First globally accredited cyber school in the Philippines",
    year: "2022",
  },
  {
    icon: ShieldCheck,
    title: "NIST NICE Framework Aligned",
    description: "Cybersecurity education aligned with U.S. National Institute of Standards and Technology",
    year: "2022-Present",
  },
  {
    icon: Trophy,
    title: "White House Contributor",
    description: "Recognized partner contributor to U.S. National Cyber Workforce & Education Strategy",
    year: "2023",
  },
  {
    icon: Trophy,
    title: "Cybersecurity Excellence Awards 2023",
    description: "Awarded Gold and Silver distinctions for excellence in cybersecurity education and training delivery",
    year: "2023",
  },
  {
    icon: Globe,
    title: "Global InfoSec Awards 2024",
    description: "Named Market Leader for Cybersecurity Training - evaluated on innovation, customer impact, and scalability",
    year: "2024",
  },
  {
    icon: Trophy,
    title: "Security Training Platform of the Year 2025",
    description: "Recognized for hands-on, simulation-driven cybersecurity training at RSA Conference",
    year: "2025",
  },
  {
    icon: Trophy,
    title: "Publisher's Choice Award - RSA 2025",
    description: "Awarded at RSA Conference, the world's largest cybersecurity event, endorsed by Cyber Defense Magazine",
    year: "2025",
  },
  {
    icon: ShieldCheck,
    title: "Top InfoSec Innovator Awards 2025",
    description: "Most Innovative Cybersecurity Training and Most Innovative AI-Driven Training",
    year: "2025",
  },
]

export function RecognitionSection() {
  return (
    <section id="recognition" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Global <span className="text-brand-purple">Recognition</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Validated by governments, industry leaders, and global award bodies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {awards.map((award, i) => (
            <Card key={i} className="border-brand-teal/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <award.icon className="size-6 text-brand-purple" />
                  <Badge variant="outline" className="border-brand-teal text-brand-teal">
                    {award.year}
                  </Badge>
                </div>
                <CardTitle className="text-base">{award.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{award.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            In partnership with <strong>TechDX (formerly ThriveDX)</strong> — 
            a globally recognized leader in innovative cybersecurity education with AI-powered Arena platform.
          </p>
        </div>
      </div>
    </section>
  )
}
