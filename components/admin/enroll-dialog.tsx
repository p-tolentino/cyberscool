// components/admin/enroll-dialog.tsx
"use client"

import { useState, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toggleEnrolled } from "@/app/actions/admin"
import { toast } from "sonner"
import type { Registration } from "@/lib/supabase/types"

interface EnrollDialogProps {
  registration: Registration
  onEnroll: (updatedRegistration: Registration) => void
  children: React.ReactNode
}

export function EnrollDialog({
  registration,
  onEnroll,
  children,
}: EnrollDialogProps) {
  const [open, setOpen] = useState(false)
  const [enrolledDate, setEnrolledDate] = useState<Date>(
    registration.enrolled_at ? new Date(registration.enrolled_at) : new Date()
  )
  const [loading, setLoading] = useState(false)

  const isFutureDate = (date: Date) => date > new Date()

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen)
      // Reset date if reopening and not enrolled
      if (newOpen && !registration.is_enrolled) {
        setEnrolledDate(new Date())
      }
    },
    [registration.is_enrolled]
  )

  const handleEnroll = async () => {
    setLoading(true)
    const result = await toggleEnrolled(
      registration.id,
      registration.is_enrolled,
      enrolledDate
    )
    if (result.success) {
      const updatedRegistration = {
        ...registration,
        is_enrolled: !registration.is_enrolled,
        enrolled_at: !registration.is_enrolled
          ? enrolledDate.toISOString()
          : null,
      }
      toast.success(
        registration.is_enrolled ? "Unenrolled" : "Enrolled successfully"
      )
      onEnroll(updatedRegistration)
      setOpen(false)
    } else if ("error" in result && result.error) {
      toast.error("Failed to update enrollment status")
    }
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {registration.is_enrolled ? "Unenroll" : "Enroll"} Student
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            {registration.is_enrolled
              ? `Remove enrollment for ${registration.first_name} ${registration.last_name}`
              : `Confirm enrollment for ${registration.first_name} ${registration.last_name}`}
          </p>

          {!registration.is_enrolled && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Enrollment Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !enrolledDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {enrolledDate ? format(enrolledDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={enrolledDate}
                    onSelect={(date: Date | undefined) =>
                      date && setEnrolledDate(date)
                    }
                    disabled={isFutureDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleEnroll}
              disabled={loading}
              variant={registration.is_enrolled ? "destructive" : "default"}
            >
              {loading
                ? "Processing..."
                : registration.is_enrolled
                  ? "Unenroll"
                  : "Confirm Enrollment"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
