"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { toast } from "sonner"
import { useState } from "react"
import { registerForOrientation } from "@/app/actions/orientation"
import { cn } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton"
import { PrivacyDialog } from "../privacy-modal"
import {
  ShieldCheck,
  Briefcase,
  GraduationCap,
  DollarSign,
  AlertTriangle,
  MapPin,
  CheckCircle2,
} from "lucide-react"

export interface OrientationDate {
  value: string
  label: string
  zoom_link: string
}

const orientationSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  orientationDate: z.string().min(1, "Please select an orientation date"),
  zoomLink: z.string(),
  dataPrivacy: z
    .boolean()
    .refine(
      (val) => val === true,
      "You must agree to the Data Privacy Act of 2012"
    ),
})

type OrientationFormData = z.infer<typeof orientationSchema>

export function OrientationForm({
  orientationDates,
  isLoadingDates,
}: {
  orientationDates: OrientationDate[]
  isLoadingDates: boolean
}) {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)
  const [success, setSuccess] = useState(false)

  const form = useForm({
    resolver: zodResolver(orientationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      orientationDate: "",
      dataPrivacy: false,
    },
  })

  const isPending = form.formState.isSubmitting

  const onSubmit = async (data: OrientationFormData) => {
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, String(value))
      })

      const result = await registerForOrientation(formData)

      if (result.success) {
        setSuccess(true)
        toast.success(
          "Registration successful! We sent you via email the orientation details."
        )
      } else {
        toast.error(result.error || "Registration failed. Please try again.")
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again."
      )
    } finally {
    }
  }

  const whatYoullLearn = [
    {
      icon: ShieldCheck,
      text: "Whether cybersecurity is a realistic next step for you",
    },
    {
      icon: Briefcase,
      text: "Which entry-level roles fit your current background",
    },
    { icon: GraduationCap, text: "What skills you need to build first" },
    { icon: DollarSign, text: "What salary ranges and opportunities exist" },
    { icon: AlertTriangle, text: "What mistakes beginners should avoid" },
    {
      icon: MapPin,
      text: "What your next step should be if you want a guided path",
    },
  ]

  return (
    <section id="orientation-form" className="py-20">
      <PrivacyDialog open={isPrivacyOpen} onOpenChange={setIsPrivacyOpen} />
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="relative mx-auto mb-6 w-fit">
            <div className="absolute inset-0 mx-auto h-24 w-48 bg-primary/20 blur-[80px]"></div>
            <span className="relative rounded-full bg-secondary px-4 py-2 text-sm text-primary ring ring-border">
              Free 30-Minute Career Preview
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
            Ready to Start{" "}
            <span className="text-primary">Your Cybersecurity Journey?</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            No cybersecurity background? No problem. The free short career
            preview is designed for absolute beginners who want a clear, honest
            look at what it really takes to step into cybersecurity.
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-8 md:grid-cols-2">
            {/* Left Column - What You'll Learn */}
            <div className="order-1">
              <div className="sticky top-8">
                <div className="">
                  <h3 className="mb-4 text-xl font-bold">
                    By the end of the 30-minute preview, you&apos;ll know:
                  </h3>
                  <div className="space-y-3">
                    {whatYoullLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0 text-primary">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 border-t border-border/60 pt-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      <span>No prior cybersecurity experience needed</span>
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      <span>Live Q&A</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="order-2">
              <Card className="border-primary/30 shadow-lg">
                <CardHeader className="border-b border-border/60">
                  <CardTitle className="text-center text-2xl text-primary">
                    Reserve Your Free Seat
                  </CardTitle>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    Limited slots available per orientation. Choose your
                    preferred schedule below.
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  {success ? (
                    <div className="py-8 text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <div className="mb-2 text-xl font-semibold text-primary">
                        Registration Successful!
                      </div>
                      <p className="mb-4 text-muted-foreground">
                        Kindly check your email (
                        <strong>{form.getValues("email")}</strong>), we sent you
                        the Zoom link for the orientation! If you are having
                        trouble, try checking the &apos;Spam&apos; folder.
                      </p>
                      <Button
                        onClick={() => {
                          form.reset()
                          setSuccess(false)
                        }}
                        variant="outline"
                        className="border-primary/30 text-primary hover:bg-primary/10"
                      >
                        Register Another Person
                      </Button>
                    </div>
                  ) : (
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="flex flex-col gap-5"
                    >
                      <FieldGroup>
                        <div className="grid grid-cols-2 gap-4">
                          <Controller
                            name="firstName"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field>
                                <FieldLabel htmlFor="firstName">
                                  First Name{" "}
                                  <span className="text-destructive">*</span>
                                </FieldLabel>
                                <Input
                                  id={field.name}
                                  {...field}
                                  aria-invalid={fieldState.invalid}
                                  disabled={
                                    isLoadingDates ||
                                    orientationDates.length === 0 ||
                                    isPending
                                  }
                                  placeholder="Juan"
                                  className="focus-visible:ring-primary"
                                />
                                {form.formState.errors.firstName && (
                                  <FieldError>
                                    {form.formState.errors.firstName.message}
                                  </FieldError>
                                )}
                              </Field>
                            )}
                          />

                          <Controller
                            name="lastName"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field>
                                <FieldLabel htmlFor="lastName">
                                  Last Name{" "}
                                  <span className="text-destructive">*</span>
                                </FieldLabel>
                                <Input
                                  id={field.name}
                                  {...field}
                                  aria-invalid={fieldState.invalid}
                                  disabled={
                                    isLoadingDates ||
                                    orientationDates.length === 0 ||
                                    isPending
                                  }
                                  placeholder="Dela Cruz"
                                  className="focus-visible:ring-primary"
                                />
                                {form.formState.errors.lastName && (
                                  <FieldError>
                                    {form.formState.errors.lastName.message}
                                  </FieldError>
                                )}
                              </Field>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field>
                                <FieldLabel htmlFor="email">
                                  Email{" "}
                                  <span className="text-destructive">*</span>
                                </FieldLabel>
                                <Input
                                  id={field.name}
                                  {...field}
                                  aria-invalid={fieldState.invalid}
                                  disabled={
                                    isLoadingDates ||
                                    orientationDates.length === 0 ||
                                    isPending
                                  }
                                  placeholder="juandelacruz@gmail.com"
                                  className="focus-visible:ring-primary"
                                />
                                {form.formState.errors.email && (
                                  <FieldError>
                                    {form.formState.errors.email.message}
                                  </FieldError>
                                )}
                              </Field>
                            )}
                          />

                          <Controller
                            name="phone"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field>
                                <FieldLabel htmlFor="phone">
                                  Phone{" "}
                                  <span className="text-destructive">*</span>
                                </FieldLabel>
                                <Input
                                  id={field.name}
                                  {...field}
                                  aria-invalid={fieldState.invalid}
                                  disabled={
                                    isLoadingDates ||
                                    orientationDates.length === 0 ||
                                    isPending
                                  }
                                  placeholder="+63 123 456 7890"
                                  className="focus-visible:ring-primary"
                                />
                                {form.formState.errors.phone && (
                                  <FieldError>
                                    {form.formState.errors.phone.message}
                                  </FieldError>
                                )}
                              </Field>
                            )}
                          />
                        </div>

                        <Controller
                          name="orientationDate"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field>
                              <FieldLabel>
                                Select Your Preferred Date{" "}
                                <span className="text-destructive">*</span>
                              </FieldLabel>
                              {isLoadingDates ? (
                                <div className="space-y-3">
                                  <Skeleton className="h-12 w-full rounded-lg" />
                                  <Skeleton className="h-12 w-full rounded-lg" />
                                  <Skeleton className="h-12 w-full rounded-lg" />
                                </div>
                              ) : orientationDates.length === 0 ? (
                                <div className="rounded-lg border border-dashed p-8 text-center">
                                  <p className="text-muted-foreground">
                                    No orientation dates available at the
                                    moment.
                                  </p>
                                  <p className="mt-2 text-sm text-muted-foreground">
                                    Please check back later or contact us.
                                  </p>
                                </div>
                              ) : (
                                <RadioGroup
                                  name={field.name}
                                  value={field.value}
                                  onValueChange={(selectedValue) => {
                                    field.onChange(selectedValue)
                                    const selected = orientationDates.find(
                                      (d) => d.value === selectedValue
                                    )
                                    form.setValue(
                                      "zoomLink",
                                      selected?.zoom_link || ""
                                    )
                                  }}
                                >
                                  {orientationDates.map((date) => (
                                    <div
                                      key={date.value}
                                      className={cn(
                                        "flex min-h-12 cursor-pointer items-center space-x-2 rounded-lg border p-4 transition-all hover:border-primary/50 hover:bg-primary/5",
                                        field.value === date.value &&
                                          "border-primary bg-primary/5 ring-1 ring-primary",
                                        fieldState.invalid &&
                                          "border-destructive text-destructive"
                                      )}
                                    >
                                      <RadioGroupItem
                                        value={date.value}
                                        id={date.value}
                                        data-invalid={fieldState.invalid}
                                        className="hover:cursor-pointer"
                                        disabled={
                                          isLoadingDates ||
                                          orientationDates.length === 0 ||
                                          isPending
                                        }
                                      />
                                      <Label
                                        htmlFor={date.value}
                                        className="flex-1 cursor-pointer font-medium"
                                      >
                                        {date.label}
                                      </Label>
                                    </div>
                                  ))}
                                </RadioGroup>
                              )}
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />

                        <Controller
                          name="dataPrivacy"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field>
                              <label className="flex cursor-pointer items-start space-x-2 rounded-lg border bg-primary/5 p-4 transition-all hover:border-primary/30">
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className={cn(
                                    "mt-1 data-[state=checked]:border-primary data-[state=checked]:bg-primary",
                                    fieldState.invalid && "border-destructive"
                                  )}
                                  disabled={
                                    isLoadingDates ||
                                    orientationDates.length === 0 ||
                                    isPending
                                  }
                                />
                                <div className="text-sm leading-relaxed">
                                  <p style={{ textAlign: "justify" }}>
                                    I agree to the processing of my personal
                                    data in accordance with the{" "}
                                    <span
                                      className="cursor-pointer text-primary transition-all hover:underline"
                                      onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        setIsPrivacyOpen(!isPrivacyOpen)
                                      }}
                                    >
                                      Data Privacy Act of 2012 (Republic Act No.
                                      10173)
                                    </span>{" "}
                                    and understand my data will be used solely
                                    for orientation communication.
                                  </p>
                                </div>
                              </label>
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </FieldGroup>

                      <Button
                        type="submit"
                        className="w-full bg-primary/70 bg-linear-to-b from-brand-purple via-brand-purple/70 to-primary text-white hover:bg-primary/90"
                        disabled={
                          isLoadingDates ||
                          orientationDates.length === 0 ||
                          isPending
                        }
                      >
                        {orientationDates.length > 0
                          ? isPending
                            ? "Registering..."
                            : "Reserve My Free Seat →"
                          : isLoadingDates
                            ? "Loading Orientation Dates..."
                            : "No Orientation Dates Available"}
                      </Button>

                      <p className="text-center text-xs text-muted-foreground">
                        Limited seats per session. First come, first served.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
