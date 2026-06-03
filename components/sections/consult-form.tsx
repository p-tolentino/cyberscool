"use client"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { lookupRegistration, updateContactPreferences } from "@/app/actions/contact"
import { Loader2, CheckCircle2, Search, User, Smartphone, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import type { Registration } from "@/lib/supabase/types"

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

const TIME_SLOTS: string[] = []
for (let h = 7; h <= 23; h++) {
  for (let m = 0; m < 60; m += 30) {
    const hour = h > 12 ? h - 12 : h
    const ampm = h >= 12 ? "PM" : "AM"
    const minute = m === 0 ? "00" : "30"
    TIME_SLOTS.push(`${hour}:${minute} ${ampm}`)
  }
}

const lookupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

const preferencesSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Invalid email address"),
  preferredContactMethod: z.string().min(1, "Please select a contact method"),
  preferredDay: z.string().min(1, "Please select a preferred day"),
  preferredTime: z.string().min(1, "Please select a preferred time"),
})

type LookupData = z.infer<typeof lookupSchema>
type PreferencesData = z.infer<typeof preferencesSchema>

export function ConsultForm() {
  const [step, setStep] = useState<"lookup" | "confirm" | "form" | "success">("lookup")
  const [registration, setRegistration] = useState<Registration | null>(null)
  const [isLookingUp, setIsLookingUp] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const lookupForm = useForm<LookupData>({
    resolver: zodResolver(lookupSchema),
    defaultValues: { email: "" },
  })

  const prefsForm = useForm<PreferencesData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      preferredContactMethod: "",
      preferredDay: "",
      preferredTime: "",
    },
  })

  const handleLookup = async (data: LookupData) => {
    setIsLookingUp(true)
    try {
      const result = await lookupRegistration(data.email)
      if (result.error || !result.data) {
        toast.error(result.error || "No registration found.")
        lookupForm.setError("email", {
          message: result.error || "No registration found with that email.",
        })
        return
      }
      setRegistration(result.data)
      setStep("confirm")
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLookingUp(false)
    }
  }

  const handleConfirm = () => {
    if (!registration) return
    prefsForm.reset({
      firstName: registration.first_name,
      lastName: registration.last_name,
      phone: registration.phone || "",
      email: registration.email,
      preferredContactMethod: registration.preferred_contact_method || "",
      preferredDay: registration.preferred_day || "",
      preferredTime: registration.preferred_time || "",
    })
    setStep("form")
  }

  const handleNotYou = () => {
    setRegistration(null)
    setStep("lookup")
    lookupForm.reset()
  }

  const handleSubmitPrefs = async (data: PreferencesData) => {
    if (!registration) return
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.set("lookupEmail", registration.email)
      formData.set("email", data.email)
      formData.set("firstName", data.firstName)
      formData.set("lastName", data.lastName)
      formData.set("phone", data.phone || "")
      formData.set("preferredContactMethod", data.preferredContactMethod)
      formData.set("preferredDay", data.preferredDay)
      formData.set("preferredTime", data.preferredTime)

      const result = await updateContactPreferences(formData)
      if (result.success) {
        setStep("success")
        toast.success("Your contact preferences have been saved!")
      } else {
        toast.error(result.error || "Failed to save preferences.")
      }
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="relative mx-auto mb-6 w-fit">
            <div className="absolute inset-0 mx-auto h-24 w-48 bg-primary/20 blur-[80px]"></div>
            <span className="relative rounded-full bg-secondary px-4 py-2 text-sm text-primary ring ring-border">
              Get in Touch
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
            Set Your{" "}
            <span className="text-primary">Contact Preferences</span>
          </h2>
          <p className="text-muted-foreground">
            Let us know how and when you&apos;d like us to reach out about our
            programs and enrollment.
          </p>
        </div>

        <div className="mx-auto max-w-lg">
          <Card className="border-primary/30 shadow-lg">
            <CardContent className="pt-6">
              {step === "lookup" && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Search className="h-6 w-6" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Enter the email you used when registering for the
                      orientation to get started.
                    </p>
                  </div>
                  <form
                    onSubmit={lookupForm.handleSubmit(handleLookup)}
                    className="space-y-4"
                  >
                    <FieldGroup>
                      <Controller
                        name="email"
                        control={lookupForm.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="lookup-email">
                              Email Address{" "}
                              <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input
                              id="lookup-email"
                              {...field}
                              placeholder="juandelacruz@gmail.com"
                              aria-invalid={fieldState.invalid}
                              className={
                                fieldState.invalid ? "border-destructive" : ""
                              }
                            />
                            {fieldState.error && (
                              <FieldError>
                                {fieldState.error.message}
                              </FieldError>
                            )}
                          </Field>
                        )}
                      />
                    </FieldGroup>
                    <Button
                      type="submit"
                      className="w-full bg-linear-to-b from-brand-purple via-brand-purple/70 to-primary text-white hover:bg-primary/90"
                      disabled={isLookingUp}
                    >
                      {isLookingUp ? (
                        <>
                          <Loader2 className="mr-2 size-4 animate-spin" />
                          Looking up...
                        </>
                      ) : (
                        "Find My Registration"
                      )}
                    </Button>
                  </form>
                </div>
              )}

              {step === "confirm" && registration && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <User className="h-6 w-6" />
                    </div>
                    <p className="text-sm text-muted-foreground">Is this you?</p>
                    <p className="mt-2 text-lg font-semibold">
                      {registration.first_name} {registration.last_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Registered on{" "}
                      {format(
                        new Date(registration.created_at),
                        "MMMM d, yyyy"
                      )}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={handleConfirm}
                      className="flex-1 bg-linear-to-b from-brand-purple via-brand-purple/70 to-primary text-white hover:bg-primary/90"
                    >
                      Yes, that&apos;s me
                    </Button>
                    <Button
                      onClick={handleNotYou}
                      variant="outline"
                      className="flex-1"
                    >
                      Not You
                    </Button>
                  </div>
                </div>
              )}

              {step === "form" && (
                <form
                  onSubmit={prefsForm.handleSubmit(handleSubmitPrefs)}
                  className="space-y-5"
                >
                  <FieldGroup>
                    <div className="grid grid-cols-2 gap-4">
                      <Controller
                        name="firstName"
                        control={prefsForm.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="pref-firstName">
                              First Name{" "}
                              <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input
                              id="pref-firstName"
                              {...field}
                              aria-invalid={fieldState.invalid}
                              className={
                                fieldState.invalid ? "border-destructive" : ""
                              }
                            />
                            {fieldState.error && (
                              <FieldError>
                                {fieldState.error.message}
                              </FieldError>
                            )}
                          </Field>
                        )}
                      />
                      <Controller
                        name="lastName"
                        control={prefsForm.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="pref-lastName">
                              Last Name{" "}
                              <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input
                              id="pref-lastName"
                              {...field}
                              aria-invalid={fieldState.invalid}
                              className={
                                fieldState.invalid ? "border-destructive" : ""
                              }
                            />
                            {fieldState.error && (
                              <FieldError>
                                {fieldState.error.message}
                              </FieldError>
                            )}
                          </Field>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Controller
                        name="phone"
                        control={prefsForm.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="pref-phone">
                              Phone{" "}
                              <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input
                              id="pref-phone"
                              {...field}
                              placeholder="912 345 6789"
                              aria-invalid={fieldState.invalid}
                              className={
                                fieldState.invalid ? "border-destructive" : ""
                              }
                            />
                            {fieldState.error && (
                              <FieldError>
                                {fieldState.error.message}
                              </FieldError>
                            )}
                          </Field>
                        )}
                      />
                      <Controller
                        name="email"
                        control={prefsForm.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="pref-email">
                              Email{" "}
                              <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input
                              id="pref-email"
                              {...field}
                              placeholder="juandelacruz@gmail.com"
                              aria-invalid={fieldState.invalid}
                              className={
                                fieldState.invalid ? "border-destructive" : ""
                              }
                            />
                            {fieldState.error && (
                              <FieldError>
                                {fieldState.error.message}
                              </FieldError>
                            )}
                          </Field>
                        )}
                      />
                    </div>

                    <Controller
                      name="preferredContactMethod"
                      control={prefsForm.control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel>
                            Preferred Contact Method{" "}
                            <span className="text-destructive">*</span>
                          </FieldLabel>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="grid gap-2"
                          >
                            {[
                              { value: "Phone", icon: Smartphone },
                              { value: "Email", icon: Mail },
                            ].map(({ value, icon: Icon }) => (
                              <div
                                key={value}
                                className={cn(
                                  "flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all hover:border-primary/50 hover:bg-primary/5",
                                  field.value === value &&
                                    "border-primary bg-primary/5 ring-1 ring-primary"
                                )}
                              >
                                <RadioGroupItem
                                  value={value}
                                  id={`consult-${value.toLowerCase()}`}
                                />
                                <Label
                                  htmlFor={`consult-${value.toLowerCase()}`}
                                  className="flex flex-1 cursor-pointer items-center gap-2 font-medium"
                                >
                                  <Icon className="size-4 text-muted-foreground" />
                                  {value}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                          {fieldState.error && (
                            <FieldError>
                              {fieldState.error.message}
                            </FieldError>
                          )}
                        </Field>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Controller
                        name="preferredDay"
                        control={prefsForm.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>
                              Preferred Day{" "}
                              <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger
                                className={cn(
                                  fieldState.invalid ? "border-destructive" : "",
                                  "py-5"
                                )}
                              >
                                <SelectValue placeholder="Select a day" />
                              </SelectTrigger>
                              <SelectContent position="popper" className="p-2">
                                {DAYS.map((day) => (
                                  <SelectItem key={day} value={day}>
                                    {day}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {fieldState.error && (
                              <FieldError>
                                {fieldState.error.message}
                              </FieldError>
                            )}
                          </Field>
                        )}
                      />

                      <Controller
                        name="preferredTime"
                        control={prefsForm.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>
                              Preferred Time{" "}
                              <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger
                                className={cn(
                                  fieldState.invalid ? "border-destructive" : "",
                                  "py-5"
                                )}
                              >
                                <SelectValue placeholder="Select a time" />
                              </SelectTrigger>
                              <SelectContent
                                position="popper"
                                className="max-h-60 p-2"
                              >
                                {TIME_SLOTS.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {fieldState.error && (
                              <FieldError>
                                {fieldState.error.message}
                              </FieldError>
                            )}
                          </Field>
                        )}
                      />
                    </div>
                  </FieldGroup>

                  <Button
                    type="submit"
                    className="w-full bg-linear-to-b from-brand-purple via-brand-purple/70 to-primary text-white hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Contact Preferences"
                    )}
                  </Button>
                </form>
              )}

              {step === "success" && (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="mb-2 text-xl font-semibold text-primary">
                    Preferences Saved!
                  </div>
                  <p className="mb-6 text-muted-foreground">
                    Thank you! We&apos;ll reach out to you based on your
                    preferred contact method and schedule.
                  </p>
                  <Button
                    onClick={() => {
                      setStep("lookup")
                      setRegistration(null)
                      lookupForm.reset()
                    }}
                    variant="outline"
                    className="border-primary/30 text-primary hover:bg-primary/10"
                  >
                    Set Preferences for Another Person
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
