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
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
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
} from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"

const formSchema = z.object({
  datetime: z.date({ message: "Date and time are required" }),
})

type FormValues = z.infer<typeof formSchema>

function generateLabel(datetime: Date) {
  return format(datetime, "MMMM d, yyyy (EEEE) - h:mm aa")
}

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

  const handleToggle = async (date: OrientationDate) => {
    const result = await toggleDateStatus(date.id, date.is_active)
    if (result?.error) {
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

  const handleDelete = async (id: string, label: string) => {
    const result = await deleteOrientationDate(id)
    if (result?.error) {
      toast.error("Failed to delete date")
    } else {
      setDatesState((prev) => prev.filter((d) => d.id !== id))
      toast.success("Orientation date deleted")
    }
  }

  const columns: ColumnDef<OrientationDate>[] = [
    {
      accessorKey: "label",
      header: "Scheduled Date & Time",
      enableSorting: true,
      cell: ({ row }) => (
        <span className="text-sm">{row.original.label}</span>
      ),
    },
    {
      accessorKey: "is_active",
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.original.is_active
        return (
          <Badge
            variant={isActive ? "default" : "secondary"}
            className={
              isActive
                ? "gap-1.5 bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400 border-green-200 dark:border-green-900"
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
      cell: ({ row }) => {
        const d = new Date(row.original.created_at)
        const display = isNaN(d.getTime())
          ? "—"
          : format(d, "MMM d, yyyy")
        return (
          <span className="text-xs text-muted-foreground">{display}</span>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const date = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem
                onClick={() => handleToggle(date)}
              >
                {date.is_active ? (
                  <PowerOff className="size-4 mr-2" />
                ) : (
                  <Power className="size-4 mr-2" />
                )}
                {date.is_active ? "Deactivate" : "Activate"}
              </DropdownMenuItem>
              <EditDateDialog date={date} />
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    variant="destructive"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Trash2 className="size-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Orientation Date?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{date.label}"? This
                      action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      onClick={() => handleDelete(date.id, date.label)}
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading text-lg font-bold">Orientation Dates</h3>
          <p className="text-sm text-muted-foreground">
            Manage orientation dates. Toggle status to show/hide from
            registration form.
          </p>
        </div>
        <CreateDateDialog />
      </div>
      <DataTable columns={columns} data={datesState} pageSize={5} />
    </div>
  )
}

function CreateDateDialog() {
  const [open, setOpen] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      datetime: undefined,
    },
  })

  const onSubmit = async (data: FormValues) => {
    const label = generateLabel(data.datetime)
    const formData = new FormData()
    formData.set("label", label)
    formData.set("date", data.datetime.toISOString())
    const result = await createOrientationDate(formData)
    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success("Orientation date created")
      setOpen(false)
      form.reset()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4 mr-2" />
          Add New Date
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Orientation Date</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
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
          <DialogFooter>
            <Button type="submit">Create Date</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function EditDateDialog({ date }: { date: OrientationDate }) {
  const [open, setOpen] = useState(false)

  const parsedDate = (() => {
    const d = new Date(date.value)
    return isNaN(d.getTime()) ? undefined : d
  })()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      datetime: parsedDate,
    },
  })

  const onSubmit = async (data: FormValues) => {
    const label = generateLabel(data.datetime)
    const formData = new FormData()
    formData.set("id", date.id)
    formData.set("label", label)
    formData.set("date", data.datetime.toISOString())
    const result = await updateOrientationDate(formData)
    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success("Orientation date updated")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Pencil className="size-4 mr-2" />
          Edit
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Orientation Date</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
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
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
