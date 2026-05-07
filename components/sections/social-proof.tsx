import { Badge } from "@/components/ui/badge"

export function SocialProofSection() {
  return (
    <section className="py-12 border-y bg-muted/30">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Globally Accredited • TESDA Certified • Trusted by Government Agencies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          <Badge variant="secondary" className="text-base py-2 px-4 border-brand-purple/30">
            TESDA
          </Badge>
          <Badge variant="secondary" className="text-base py-2 px-4 border-brand-teal/30">
            TechDX (ThriveDX)
          </Badge>
          <Badge variant="secondary" className="text-base py-2 px-4 border-brand-purple/30">
            NDCP
          </Badge>
          <Badge variant="secondary" className="text-base py-2 px-4 border-brand-teal/30">
            NBI
          </Badge>
          <Badge variant="secondary" className="text-base py-2 px-4 border-brand-purple/30">
            AFP
          </Badge>
        </div>
      </div>
    </section>
  )
}
