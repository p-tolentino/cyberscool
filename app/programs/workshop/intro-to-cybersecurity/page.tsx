import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, User, Briefcase, BookOpen } from "lucide-react"
import { programs } from "@/lib/data/programs"

export async function generateMetadata() {
  const program = programs.find((p) => p.slug === "intro-to-cybersecurity")
  return {
    title: `${program?.title} | CybersCool Defcon`,
    description: program?.description,
  }
}

export default function IntroToCybersecurityPage({
  params,
}: {
  params: { slug: string }
}) {
  const program = programs.find((p) => p.slug === "intro-to-cybersecurity")

  if (!program) return null

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header Section */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <BookOpen className="size-8 text-brand-purple" />
              {program.badge && (
                <Badge className="bg-brand-purple text-white hover:bg-brand-purple/90">
                  {program.badge}
                </Badge>
              )}
              <Badge variant="secondary">{program.category}</Badge>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-brand-purple md:text-5xl">
              {program.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {program.description}
            </p>
          </div>

          {/* Goals */}
          <div className="mb-12">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-brand-purple">
              <BookOpen className="size-6 text-brand-teal" />
              Program Goals
            </h2>
            <div className="rounded-lg border bg-brand-purple/5 p-6">
              <p className="text-muted-foreground">
                Discover the many different roles in cybersecurity and how each
                role makes an impact in an organization. Ideal for career
                shifters exploring this high-demand industry.
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mb-12 grid gap-4 md:grid-cols-3">
            <Card className="border-brand-purple/20">
              <CardContent className="pt-6">
                <Clock className="mb-2 size-5 text-brand-teal" />
                <CardTitle className="text-xl text-brand-purple">
                  {program.hours} hrs
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Total Training Hours
                </p>
              </CardContent>
            </Card>
            <Card className="border-brand-purple/20">
              <CardContent className="pt-6">
                <User className="mb-2 size-5 text-brand-teal" />
                <CardTitle className="text-xl text-brand-purple">
                  Workshop
                </CardTitle>
                <p className="text-sm text-muted-foreground">Program Type</p>
              </CardContent>
            </Card>
            <Card className="border-brand-purple/20">
              <CardContent className="pt-6">
                <Briefcase className="mb-2 size-5 text-brand-teal" />
                <CardTitle className="text-xl text-brand-purple">
                  {program.jobOutcomes.length}
                </CardTitle>
                <p className="text-sm text-muted-foreground">Opportunities</p>
              </CardContent>
            </Card>
          </div>

          {/* What You'll Learn */}
          <div className="mb-12">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-brand-purple">
              <CheckCircle2 className="size-6 text-brand-teal" />
              What You'll Learn
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {program.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg border border-brand-purple/20 bg-brand-purple/5 p-3"
                >
                  <CheckCircle2 className="size-4 flex-shrink-0 text-brand-teal" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hands-On Training */}
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-brand-purple">
              Hands-On Training
            </h2>
            <div className="rounded-lg border bg-brand-purple/5 p-6">
              <p className="text-muted-foreground">
                To ensure that students practice what they have learned, this
                program includes{" "}
                <strong>
                  60 unique laboratories and 100 different simulated exercises
                </strong>
                . Technical skills and relevant tools are learned through
                practical hands-on and simulation exercises in a safe and secure
                virtual environment. This is a <strong>30-hour</strong>{" "}
                self-paced online course.
              </p>
            </div>
          </div>

          {/* Opportunities */}
          <div className="mb-12">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-brand-purple">
              <Briefcase className="size-6 text-brand-teal" />
              Opportunities
            </h2>
            <div className="flex flex-wrap gap-3">
              {program.jobOutcomes.map((outcome, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="border-brand-purple px-4 py-2 text-sm text-brand-purple"
                >
                  {outcome}
                </Badge>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="rounded-2xl bg-gradient-to-r from-brand-purple/10 to-brand-teal/10 p-8 text-center">
            <h3 className="mb-4 text-2xl font-bold">
              Start Your Cyber Journey
            </h3>
            <p className="mb-6 text-muted-foreground">
              The best career-oriented education in cyber begins here.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-brand-purple text-white hover:bg-brand-purple/90"
              >
                <Link href="/#orientation-form">Reserve My Free Seat</Link>
              </Button>
              {program.syllabusFile && (
                <Button asChild size="lg" variant="outline">
                  <Link href="#" target="_blank">
                    Download Syllabus
                  </Link>
                </Button>
              )}
              <Button asChild size="lg" variant="outline">
                <Link href="/#programs">View All Programs</Link>
              </Button>
            </div>
          </div>

          {/* What You'll Learn */}
          <div className="mb-12">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-brand-purple">
              <CheckCircle2 className="size-6 text-brand-teal" />
              What You'll Learn
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {program.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg border border-brand-teal/20 bg-brand-teal/5 p-4"
                >
                  <CheckCircle2 className="size-5 flex-shrink-0 text-brand-teal" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hands-On Training */}
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-brand-purple">
              Hands-On Training
            </h2>
            <div className="rounded-lg border bg-brand-teal/5 p-6">
              <p className="text-muted-foreground">
                To ensure that students practice what they have learned, this
                program includes{" "}
                <strong>
                  60 unique laboratories and 100 different simulated exercises
                </strong>
                . Technical skills and relevant tools are learned through
                practical hands-on and simulation exercises in a safe and secure
                virtual environment. This is a <strong>30-hours</strong>{" "}
                workshop delivered on a blended in-class and on-line platforms.
              </p>
            </div>
          </div>

          {/* Career Paths */}
          <div className="mb-12">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-brand-purple">
              <Briefcase className="size-6 text-brand-teal" />
              Career Paths
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {program.jobOutcomes.map((outcome, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg border p-4"
                >
                  <Briefcase className="size-5 flex-shrink-0 text-brand-purple" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="rounded-2xl bg-brand-teal/5 p-8 text-center">
            <h3 className="mb-4 text-2xl font-bold">New to Cybersecurity?</h3>
            <p className="mb-6 text-muted-foreground">
              This workshop is perfect for career shifters exploring
              cybersecurity as a career path.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-brand-purple text-white hover:bg-brand-purple/90"
              >
                <Link href="#orientation-form">Reserve My Free Seat</Link>
              </Button>
              {program.syllabusFile && (
                <Button asChild size="lg" variant="outline">
                  <Link href="#" target="_blank">
                    Dowload Syllabus
                  </Link>
                </Button>
              )}
              <Button asChild size="lg" variant="outline">
                <Link href="/programs">View All Programs</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
