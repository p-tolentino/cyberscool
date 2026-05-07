import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Flame, CheckCircle2 } from "lucide-react"
import { programs } from "@/lib/data/programs"

export function ProgramGrid() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Programs</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From beginner to advanced — find the right cybersecurity training for your career goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <Card key={program.slug} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{program.category}</Badge>
                  {program.badge && (
                    <Badge className="bg-brand-purple hover:bg-brand-purple/90 text-white flex items-center gap-1">
                      <Flame data-icon="inline-start" className="size-3" />
                      {program.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{program.title}</CardTitle>
                <CardDescription>{program.description}</CardDescription>
              </CardHeader>
               <CardContent className="flex-1">
                 <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                   <span className="flex items-center gap-1">
                     <Clock data-icon="inline-start" className="size-4 text-brand-teal" />
                     {program.hours} hrs
                   </span>
                 </div>
                 <div className="space-y-2">
                   {program.features.slice(0, 4).map((feature, i) => (
                     <div key={i} className="flex items-center gap-2">
                       <CheckCircle2 className="size-4 shrink-0 text-brand-teal" />
                       <span className="text-sm">{feature}</span>
                     </div>
                   ))}
                 </div>
               </CardContent>
               <CardFooter className="flex gap-2">
                 <Button asChild className="flex-1 bg-brand-purple hover:bg-brand-purple/90 text-white">
                   <Link href="/#orientation-form">
                     Register
                   </Link>
                 </Button>
                 <Button asChild variant="outline">
                   <Link href={`/programs/${program.category.toLowerCase()}/${program.slug}`}>
                     Learn More
                     <ArrowRight data-icon="inline-end" />
                   </Link>
                 </Button>
               </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
