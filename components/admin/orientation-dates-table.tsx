"use client"

import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  toggleDateStatus,
  createOrientationDate,
  deleteOrientationDate,
  updateOrientationDate,
} from "@/app/actions/admin"
import { DateTimePicker } from "@/components/ui/date-time-picker"
import type { OrientationDate } from "@/lib/supabase/types"
import {
  MoreHorizontal,
  Plus,
  Pencil,
  Trash2,
  Power,
  PowerOff,
  ExternalLink,
} from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"
import Link from "next/link"

const formSchema = z.object({
  datetime: z.date({ message: "Date and time are required" }),
  zoom_link: z.string().url("Must be a valid URL").optional().or(z.literal("")),
})

type FormValues = z.infer<typeof formSchema>

export function generateLabel(datetime: Date) {
  return format(datetime, "MMMM d, yyyy (EEEE) - h:mm aa")
}

// ========== POPOVER FOR CREATING DATES ==========
function CreateDatePopover({
  onDateCreated,
}: {
  onDateCreated: (date: Date, zoomLink: string) => Promise<void>
}) {
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [zoomLink, setZoomLink] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleConfirm = async () => {
    if (!selectedDate) {
      toast.error("Please pick a date and time")
      return
    }
    setIsSubmitting(true)
    try {
      await onDateCreated(selectedDate, zoomLink.trim())
      setOpen(false)
      setSelectedDate(undefined)
      setZoomLink("")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="px-4 py-5">
          <Plus className="mr-2 size-4" />
          Add New Date
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto gap-4 p-0 pt-4"
        align="start"
        side="bottom"
      >
        <div className="space-y-2 px-4">
          <Label htmlFor="zoom-link">Orientation Date</Label>
          <DateTimePicker value={selectedDate} onChange={setSelectedDate} />
        </div>
        <div className="space-y-2 px-4">
          <Label htmlFor="zoom-link">Zoom Meeting Link</Label>
          <Input
            id="zoom-link"
            type="url"
            placeholder="https://zoom.us/j/..."
            value={zoomLink}
            onChange={(e) => setZoomLink(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2 border-t p-3">
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleConfirm}
            disabled={!selectedDate || isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Confirm Date"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// ========== EDIT DIALOG (unchanged, still modal) ==========
interface OrientationDateFormDialogProps {
  mode: "edit"
  initialValues?: FormValues
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: FormValues) => Promise<void>
}

function OrientationDateFormDialog({
  mode,
  initialValues,
  open,
  onOpenChange,
  onSubmit,
}: OrientationDateFormDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues ?? { datetime: undefined, zoom_link: "" },
  })

  const handleSubmit = async (data: FormValues) => {
    await onSubmit(data)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Orientation Date</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 pt-4"
        >
          <div className="space-y-2">
            <Label>Date & Time</Label>
            <DateTimePicker
              value={form.watch("datetime")}
              onChange={(date) =>
                form.setValue("datetime", date as Date, {
                  shouldValidate: true,
                })
              }
            />
            {form.formState.errors.datetime && (
              <p className="text-xs text-destructive">
                {form.formState.errors.datetime.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Zoom Meeting Link</Label>
            <Input
              type="url"
              placeholder="https://zoom.us/j/..."
              {...form.register("zoom_link")}
            />
            {form.formState.errors.zoom_link && (
              <p className="text-xs text-destructive">
                {form.formState.errors.zoom_link.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// ========== MAIN TABLE ==========
interface OrientationDatesTableProps {
  dates: OrientationDate[]
}

export function OrientationDatesTable({ dates }: OrientationDatesTableProps) {
  const [datesState, setDatesState] = useState(dates)
  const prevDates = useRef(dates)

  useEffect(() => {
    if (prevDates.current !== dates) {
      setDatesState(dates)
      prevDates.current = dates
    }
  }, [dates])

  const [editingDate, setEditingDate] = useState<OrientationDate | null>(null)

  const handleToggle = async (date: OrientationDate) => {
    const result = await toggleDateStatus(date.id, date.is_active)
    if (result.error) {
      toast.error("Failed to update date status")
    } else {
      setDatesState((prev) =>
        prev.map((d) =>
          d.id === date.id ? { ...d, is_active: !d.is_active } : d
        )
      )
      toast.success("Date status updated")
    }
  }

  const handleDelete = async (id: string) => {
    const result = await deleteOrientationDate(id)
    if (result.error) {
      toast.error("Failed to delete date")
    } else {
      setDatesState((prev) => prev.filter((d) => d.id !== id))
      toast.success("Orientation date deleted")
    }
  }

  const handleCreateDate = async (datetime: Date, zoomLink: string) => {
    const label = generateLabel(datetime)
    const formData = new FormData()
    formData.set("label", label)
    formData.set("date", datetime.toISOString())
    if (zoomLink) formData.set("zoom_link", zoomLink)

    const result = await createOrientationDate(formData)

    if (result.error) {
      toast.error(result.error)
      throw new Error(result.error)
    }

    toast.success("Orientation date created")
  }

  const columns: ColumnDef<OrientationDate>[] = [
    {
      accessorKey: "label",
      header: "Scheduled Date & Time",
      meta: "Scheduled Date & Time",
      enableSorting: true,
      cell: ({ row }) => (
        <span className="text-sm">
          {format(new Date(row.original.value), "MMM d, yyyy (EE, h:mm aa)")}
        </span>
      ),
    },
    {
      id: "zoom_link",
      accessorKey: "zoom_link",
      meta: "Zoom Link",
      header: "Meeting Room Link",
      cell: ({ row }) => {
        const link = row.original.zoom_link
        if (!link) return <span className="text-muted-foreground">—</span>
        return (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            Join Zoom Meeting
            <ExternalLink className="size-3" />
          </Link>
        )
      },
    },
    {
      accessorKey: "is_active",
      header: "Status",
      meta: "Status",
      cell: ({ row }) => {
        const isActive = row.original.is_active
        return (
          <Badge
            variant={isActive ? "default" : "secondary"}
            className={
              isActive
                ? "gap-1.5 border-green-200 bg-green-100 text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-400"
                : "gap-1.5"
            }
          >
            <span
              className={`size-1.5 rounded-full ${
                isActive
                  ? "bg-green-600 dark:bg-green-400"
                  : "bg-muted-foreground"
              }`}
            />
            {isActive ? "Active" : "Inactive"}
          </Badge>
        )
      },
    },
    {
      accessorKey: "created_at",
      header: "Created",
      meta: "Created",
      cell: ({ row }) => {
        const d = new Date(row.original.created_at)
        const display = isNaN(d.getTime()) ? "—" : format(d, "MMM d, yyyy")
        return <span className="text-xs text-muted-foreground">{display}</span>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const date = row.original
        return (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem onClick={() => handleToggle(date)}>
                {date.is_active ? (
                  <PowerOff className="mr-2 size-4" />
                ) : (
                  <Power className="mr-2 size-4" />
                )}
                {date.is_active ? "Deactivate" : "Activate"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                onClick={() => setEditingDate(date)}
              >
                <Pencil className="mr-2 size-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    variant="destructive"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Trash2 className="mr-2 size-4" />
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Delete Orientation Date?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete &quot;{date.label}&quot;?
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      onClick={() => handleDelete(date.id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const handleEditSubmit = async (data: FormValues) => {
    if (!editingDate) return
    const label = generateLabel(data.datetime)
    const formData = new FormData()
    formData.set("id", editingDate.id)
    formData.set("label", label)
    formData.set("date", data.datetime.toISOString())
    formData.set("zoom_link", data.zoom_link || "")

    const result = await updateOrientationDate(formData)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Orientation date updated")
      setEditingDate(null)
    }
  }

  const parsedEditingDate = editingDate
    ? new Date(editingDate.value)
    : undefined
  const isValidEditDate =
    parsedEditingDate && !isNaN(parsedEditingDate.getTime())

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-heading text-lg font-bold">Orientation Dates</h3>
          <p className="text-sm text-muted-foreground">
            Manage orientation dates. Toggle status to show/hide from
            registration form.
          </p>
        </div>
        <CreateDatePopover onDateCreated={handleCreateDate} />
      </div>

      <DataTable
        columns={columns}
        data={datesState}
        pageSize={5}
        pinnedColumns={{ left: ["label"] }}
      />

      {editingDate && (
        <OrientationDateFormDialog
          mode="edit"
          initialValues={{
            datetime: isValidEditDate ? parsedEditingDate : new Date(),
            zoom_link: editingDate.zoom_link ?? "",
          }}
          open={!!editingDate}
          onOpenChange={(open) => !open && setEditingDate(null)}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  )
}
