"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DateTimePickerProps {
  value?: Date
  onChange: (date: Date | undefined) => void
  disabled?: boolean
}

export function DateTimePicker({
  value,
  onChange,
  disabled,
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false)

  // Helper: combine date from selectedDate and time from existing value (or default)
  const combineDateAndTime = (date: Date, timeFrom?: Date): Date => {
    const newDate = new Date(date)
    if (timeFrom) {
      newDate.setHours(timeFrom.getHours(), timeFrom.getMinutes())
    } else {
      // if no time reference, set to 00:00
      newDate.setHours(0, 0, 0, 0)
    }
    return newDate
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      onChange(undefined)
      return
    }
    // Preserve current time if exists, otherwise set to 00:00
    const newDate = value
      ? combineDateAndTime(date, value)
      : combineDateAndTime(date)
    onChange(newDate)
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":").map(Number)
    if (!value) {
      // If no date selected, create a new date with today's date and given time
      const today = new Date()
      const newDate = new Date(today)
      newDate.setHours(hours || 0, minutes || 0, 0, 0)
      onChange(newDate)
      return
    }
    // Always create a new Date object to trigger re‑render
    const newDate = new Date(value)
    newDate.setHours(hours || 0, minutes || 0, 0, 0)
    onChange(newDate)
  }

  const timeValue = value
    ? `${String(value.getHours()).padStart(2, "0")}:${String(value.getMinutes()).padStart(2, "0")}`
    : ""

  const isPastDate = (date: Date) => date < new Date()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {value ? (
            format(value, "MMM d, yyyy, h:mm aa")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="max-h-[70vh] w-auto overflow-auto p-1.5"
        align="start"
        side="bottom"
      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleDateSelect}
          disabled={isPastDate}
          className="w-full"
        />
        <div className="flex items-center gap-2 border-t p-3">
          <Clock className="size-4 shrink-0 text-muted-foreground" />
          <Label htmlFor="time-input" className="sr-only">
            Time
          </Label>
          <Input
            id="time-input"
            type="time"
            value={timeValue}
            onChange={handleTimeChange}
            className="flex min-w-auto justify-evenly"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
