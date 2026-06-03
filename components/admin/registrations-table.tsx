"use client"

import { useState, useEffect, useRef, useMemo, useReducer } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { CalendarIcon, ChevronDown, Mail } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  toggleEmailSent,
  toggleContacted,
  deleteRegistration,
  sendNextStepEmail,
  batchToggleEmailSent,
  batchToggleContacted,
  batchDeleteRegistrations,
} from "@/app/actions/admin"

import type { Registration, Referrer } from "@/lib/supabase/types"
import {
  Download,
  MoreHorizontal,
  Phone,
  Trash2,
  MailCheck,
  MailX,
  PhoneCall,
  UserCheck,
  GraduationCap,
  UserPlus,
  FilterX,
  Send,
  Clock,
  CalendarDays,
  Smartphone,
} from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"
import { Label } from "@/components/ui/label"

import { AssignReferrerDialog } from "@/components/admin/assign-referrer-dialog"
import { EnrollDialog } from "@/components/admin/enroll-dialog"
import { cn } from "@/lib/utils"

interface RegistrationsTableProps {
  registrations: Registration[]
  referrers: Referrer[]
}

// ========== FILTER STATE & REDUCER ==========

interface FilterState {
  orientationDate: string
  leadSource: string
  emailSent: string
  contacted: string
  registeredAt: string
  enrolledAt: string
  referrer: string
}

type FilterAction =
  | { type: "SET_FILTER"; field: keyof FilterState; value: string }
  | { type: "CLEAR_ALL" }

const initialFilterState: FilterState = {
  orientationDate: "all",
  leadSource: "all",
  emailSent: "all",
  contacted: "all",
  registeredAt: "",
  enrolledAt: "",
  referrer: "all",
}

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_FILTER":
      return { ...state, [action.field]: action.value }
    case "CLEAR_ALL":
      return initialFilterState
    default:
      return state
  }
}

interface DatePickerProps {
  date: string | undefined
  onSelect: (date: string | undefined) => void
  placeholder?: string
  className?: string
}

function DatePicker({
  date,
  onSelect,
  placeholder = "Pick a date",
  className,
}: DatePickerProps) {
  const [open, setOpen] = useState(false)

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      onSelect(format(selectedDate, "yyyy-MM-dd"))
    } else {
      onSelect(undefined)
    }
    setOpen(false)
  }

  const parsedDate = date ? new Date(date) : undefined

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            className
          )}
        >
          <CalendarIcon className="mr-2 size-3.5" />
          {parsedDate ? (
            format(parsedDate, "PPP")
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={parsedDate} onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  )
}

function FilterContent({
  filters,
  dispatch,
  orientationDateOptions,
  leadSourceOptions,
  referrers,
  hasActiveFilters,
}: {
  filters: FilterState
  dispatch: React.Dispatch<FilterAction>
  orientationDateOptions: string[]
  leadSourceOptions: string[]
  referrers: Referrer[]
  hasActiveFilters: boolean
}) {
  return (
    <div className="space-y-3 p-1">
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch({ type: "CLEAR_ALL" })}
            className="h-6 px-2 text-xs"
          >
            <FilterX className="mr-1 size-3" />
            Clear all
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
        {/* Orientation Date */}
        <div className="space-y-1">
          <Label className="text-[10px] font-medium text-muted-foreground">
            Orientation
          </Label>
          <Select
            value={filters.orientationDate}
            onValueChange={(val) =>
              dispatch({
                type: "SET_FILTER",
                field: "orientationDate",
                value: val,
              })
            }
          >
            <SelectTrigger className="h-7 w-full text-xs">
              <SelectValue placeholder="All dates" />
            </SelectTrigger>
            <SelectContent position="popper" className="p-1">
              <SelectItem value="all">All dates</SelectItem>
              {orientationDateOptions.map((date) => (
                <SelectItem key={date} value={date}>
                  {format(new Date(date), "MMM d, h:mm aa")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Lead Source */}
        <div className="space-y-1">
          <Label className="text-[10px] font-medium text-muted-foreground">
            Lead source
          </Label>
          <Select
            value={filters.leadSource}
            onValueChange={(val) =>
              dispatch({ type: "SET_FILTER", field: "leadSource", value: val })
            }
          >
            <SelectTrigger className="h-7 w-full text-xs">
              <SelectValue placeholder="All sources" />
            </SelectTrigger>
            <SelectContent position="popper" className="p-1">
              <SelectItem value="all">All sources</SelectItem>
              {leadSourceOptions.map((source) => (
                <SelectItem key={source} value={source}>
                  {source}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Email Sent */}
        <div className="space-y-1">
          <Label className="text-[10px] font-medium text-muted-foreground">
            Email
          </Label>
          <Select
            value={filters.emailSent}
            onValueChange={(val) =>
              dispatch({ type: "SET_FILTER", field: "emailSent", value: val })
            }
          >
            <SelectTrigger className="h-7 w-full text-xs">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent position="popper" className="p-1">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="not_sent">Not sent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Contacted */}
        <div className="space-y-1">
          <Label className="text-[10px] font-medium text-muted-foreground">
            Contacted
          </Label>
          <Select
            value={filters.contacted}
            onValueChange={(val) =>
              dispatch({ type: "SET_FILTER", field: "contacted", value: val })
            }
          >
            <SelectTrigger className="h-7 w-full text-xs">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent position="popper" className="p-1">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="not_contacted">Not contacted</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Registered At */}
        <div className="space-y-1">
          <Label className="text-[10px] font-medium text-muted-foreground">
            Registered
          </Label>
          <DatePicker
            date={filters.registeredAt || undefined}
            onSelect={(date) =>
              dispatch({
                type: "SET_FILTER",
                field: "registeredAt",
                value: date || "",
              })
            }
            placeholder="Pick date"
            className="h-7 w-full text-xs"
          />
        </div>

        {/* Enrolled At */}
        <div className="space-y-1">
          <Label className="text-[10px] font-medium text-muted-foreground">
            Enrolled
          </Label>
          <DatePicker
            date={filters.enrolledAt || undefined}
            onSelect={(date) =>
              dispatch({
                type: "SET_FILTER",
                field: "enrolledAt",
                value: date || "",
              })
            }
            placeholder="Pick date"
            className="h-7 w-full text-xs"
          />
        </div>

        {/* Referrer (now last, full width on two‑column grid) */}
        <div className="space-y-1 min-[400px]:col-span-2">
          <Label className="text-[10px] font-medium text-muted-foreground">
            Referrer
          </Label>
          <Select
            value={filters.referrer}
            onValueChange={(val) =>
              dispatch({ type: "SET_FILTER", field: "referrer", value: val })
            }
          >
            <SelectTrigger className="h-7 w-full text-xs">
              <SelectValue placeholder="All referrers" />
            </SelectTrigger>
            <SelectContent position="popper" className="p-1">
              <SelectItem value="all">All referrers</SelectItem>
              <SelectItem value="null">None</SelectItem>
              {referrers.map((ref) => (
                <SelectItem key={ref.id} value={ref.id}>
                  {ref.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
export function RegistrationsTable({
  registrations,
  referrers,
}: RegistrationsTableProps) {
  const [regsState, setRegsState] = useState(registrations)
  const prevRegs = useRef(registrations)
  useEffect(() => {
    if (prevRegs.current !== registrations) {
      setRegsState(registrations)
      prevRegs.current = registrations
    }
  }, [registrations])

  const [filters, dispatch] = useReducer(filterReducer, initialFilterState)

  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const activeFilterCount = useMemo(() => {
    return Object.entries(filters).filter(([key, val]) => {
      if (key === "registeredAt" || key === "enrolledAt") return val !== ""
      return val !== "all"
    }).length
  }, [filters])

  // ========== UNIQUE VALUES FOR DROPDOWNS ==========
  const orientationDateOptions = useMemo(() => {
    const dates = regsState
      .map((r) => r.orientation_date)
      .filter((date): date is string => !!date && date !== "")
    const unique = Array.from(new Set(dates))
    return unique.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
  }, [regsState])

  const leadSourceOptions = useMemo(() => {
    const sources = regsState
      .map((r) => r.heard_from)
      .filter(
        (source): source is string =>
          source !== null && source !== undefined && source !== ""
      )
    const unique = Array.from(new Set(sources))
    return unique.sort()
  }, [regsState])

  // ========== APPLY FILTERS ==========
  const filteredRegistrations = useMemo(() => {
    let filtered = [...regsState]

    if (filters.orientationDate !== "all") {
      filtered = filtered.filter(
        (r) => r.orientation_date === filters.orientationDate
      )
    }
    if (filters.leadSource !== "all") {
      filtered = filtered.filter((r) => r.heard_from === filters.leadSource)
    }
    if (filters.emailSent !== "all") {
      const isSent = filters.emailSent === "sent"
      filtered = filtered.filter((r) => r.email_sent === isSent)
    }
    if (filters.contacted !== "all") {
      const isContacted = filters.contacted === "contacted"
      filtered = filtered.filter((r) => r.contacted === isContacted)
    }
    if (filters.registeredAt) {
      const filterDate = new Date(filters.registeredAt).toDateString()
      filtered = filtered.filter((r) => {
        if (!r.created_at) return false
        return new Date(r.created_at).toDateString() === filterDate
      })
    }
    if (filters.enrolledAt) {
      const filterDate = new Date(filters.enrolledAt).toDateString()
      filtered = filtered.filter((r) => {
        if (!r.enrolled_at) return false
        return new Date(r.enrolled_at).toDateString() === filterDate
      })
    }
    if (filters.referrer !== "all") {
      if (filters.referrer === "null") {
        filtered = filtered.filter((r) => !r.referrer_id)
      } else {
        filtered = filtered.filter((r) => r.referrer_id === filters.referrer)
      }
    }

    return filtered
  }, [regsState, filters])

  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some((val) =>
      typeof val === "string" ? val !== "all" && val !== "" : false
    )
  }, [filters])

  // ========== HANDLERS ==========
  const handleToggleEmail = async (reg: Registration) => {
    const result = await toggleEmailSent(reg.id, reg.email_sent)
    if (result.error) {
      toast.error("Failed to update email status")
    } else {
      setRegsState((prev) =>
        prev.map((r) =>
          r.id === reg.id ? { ...r, email_sent: !r.email_sent } : r
        )
      )
      toast.success("Email status updated")
    }
  }

  const handleToggleContact = async (reg: Registration) => {
    const result = await toggleContacted(reg.id, reg.contacted)
    if (result.error) {
      toast.error("Failed to update contact status")
    } else {
      setRegsState((prev) =>
        prev.map((r) =>
          r.id === reg.id ? { ...r, contacted: !r.contacted } : r
        )
      )
      toast.success("Contact status updated")
    }
  }

  const handleDelete = async (id: string) => {
    const result = await deleteRegistration(id)
    if (result.error) {
      toast.error("Failed to delete registration")
    } else {
      setRegsState((prev) => prev.filter((r) => r.id !== id))
      toast.success("Registration deleted")
    }
  }

  // ── Send Next Step Email Dialog ─────────────────────

  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const [emailTargetIds, setEmailTargetIds] = useState<string[]>([])
  const [sendingEmail, setSendingEmail] = useState(false)
  const [emailResult, setEmailResult] = useState<{
    alreadySentIds: string[]
  } | null>(null)

  // ── Bulk Actions ─────────────────────────

  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false)
  const [bulkDeleteTargetIds, setBulkDeleteTargetIds] = useState<string[]>([])

  // ========== COLUMNS ==========
  const columns: ColumnDef<Registration>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      meta: "Select",
    },
    {
      id: "name",
      accessorFn: (row) => `${row.first_name} ${row.last_name}`,
      header: "Name",
      meta: "Name",
      enableSorting: true,
      cell: ({ row }) => (
        <span className="font-medium">
          {row.original.first_name} {row.original.last_name}
        </span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      meta: "Email",
      enableSorting: true,
      cell: ({ row }) => (
        <a
          href={`mailto:${row.original.email}`}
          className="text-sm text-brand-teal hover:underline"
        >
          {row.original.email}
        </a>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      meta: "Phone",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {row.original.phone || "—"}
        </span>
      ),
    },
    {
      accessorKey: "orientation_date",
      header: "Orientation Date",
      meta: "Orientation Date",
      cell: ({ row }) => (
        <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium">
          {format(
            new Date(row.original.orientation_date),
            "MMM d, yyyy (EE, h:mm aa)"
          )}
        </span>
      ),
    },
    {
      id: "lead_source",
      header: "Lead Source",
      meta: "Lead Source",
      cell: ({ row }) => {
        const heardFrom = row.original.heard_from
        const otherSource = row.original.other_source
        if (!heardFrom)
          return <span className="text-xs text-muted-foreground">—</span>
        if (heardFrom === "Other" && otherSource) {
          return (
            <span className="text-xs">
              Other: <span className="font-medium">{otherSource}</span>
            </span>
          )
        }
        if (heardFrom === "Friend or Acquaintance" && otherSource) {
          return (
            <span className="text-xs">
              Friend: <span className="font-medium">{otherSource}</span>
            </span>
          )
        }
        return <span className="text-xs">{heardFrom}</span>
      },
    },
    {
      accessorKey: "email_sent",
      header: "Email Sent",
      meta: "Email Sent",
      cell: ({ row }) => {
        const sent = row.original.email_sent
        return (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              className="size-8 p-0"
              onClick={() => handleToggleEmail(row.original)}
            >
              {sent ? (
                <MailCheck className="size-4 text-brand-teal" />
              ) : (
                <MailX className="size-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        )
      },
    },
    {
      accessorKey: "contacted",
      header: "Contacted",
      meta: "Contacted",
      cell: ({ row }) => {
        const contacted = row.original.contacted
        return (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              className="size-8 p-0"
              onClick={() => handleToggleContact(row.original)}
            >
              {contacted ? (
                <PhoneCall className="size-4 text-brand-teal" />
              ) : (
                <Phone className="size-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        )
      },
    },
    {
      accessorKey: "created_at",
      header: "Registered At",
      enableSorting: true,
      meta: "Registered At",
      cell: ({ row }) => {
        const d = new Date(row.original.created_at)
        if (isNaN(d.getTime()))
          return <span className="text-xs text-muted-foreground">—</span>
        return (
          <span className="text-xs whitespace-nowrap text-muted-foreground">
            {format(d, "MMM d, yyyy")}
            <span className="ml-1 text-muted-foreground/60">
              ({format(d, "h:mm a")})
            </span>
          </span>
        )
      },
    },
    {
      accessorKey: "is_enrolled",
      header: "Enrolled",
      meta: "Enrolled",
      cell: ({ row }) => {
        const isEnrolled = row.original.is_enrolled
        return (
          <div className="flex justify-center">
            <EnrollDialog
              registration={row.original}
              onEnroll={() => {
                setRegsState((prev) =>
                  prev.map((r) =>
                    r.id === row.original.id
                      ? {
                          ...r,
                          is_enrolled: !r.is_enrolled,
                          enrolled_at: !r.is_enrolled
                            ? new Date().toISOString()
                            : null,
                        }
                      : r
                  )
                )
              }}
            >
              <Button variant="ghost" size="sm" className="size-8 p-0">
                {isEnrolled ? (
                  <GraduationCap className="size-4 text-green-600" />
                ) : (
                  <UserCheck className="size-4 text-muted-foreground" />
                )}
              </Button>
            </EnrollDialog>
          </div>
        )
      },
    },
    {
      accessorKey: "referrer",
      header: "Referrer",
      meta: "Referrer",
      cell: ({ row }) => {
        const referrerName = row.original.referrer?.name || "—"
        return (
          <span className="text-xs text-muted-foreground">{referrerName}</span>
        )
      },
    },
    {
      accessorKey: "preferred_contact_method",
      header: "Contact Method",
      meta: "Contact Method",
      cell: ({ row }) => {
        const method = row.original.preferred_contact_method
        if (!method)
          return <span className="text-xs text-muted-foreground">—</span>
        return (
          <span className="inline-flex items-center gap-1 text-xs">
            {method === "Phone" && (
              <Smartphone className="size-3 text-muted-foreground" />
            )}
            {method === "Email" && (
              <Mail className="size-3 text-muted-foreground" />
            )}
            {method}
          </span>
        )
      },
    },
    {
      accessorKey: "preferred_day",
      header: "Preferred Day",
      meta: "Preferred Day",
      cell: ({ row }) => {
        const day = row.original.preferred_day
        if (!day)
          return <span className="text-xs text-muted-foreground">—</span>
        return (
          <span className="inline-flex items-center gap-1 text-xs">
            <CalendarDays className="size-3 text-muted-foreground" />
            {day}
          </span>
        )
      },
    },
    {
      accessorKey: "preferred_time",
      header: "Preferred Time",
      meta: "Preferred Time",
      cell: ({ row }) => {
        const time = row.original.preferred_time
        if (!time)
          return <span className="text-xs text-muted-foreground">—</span>
        return (
          <span className="inline-flex items-center gap-1 text-xs">
            <Clock className="size-3 text-muted-foreground" />
            {time}
          </span>
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      meta: "Actions",
      cell: ({ row }) => {
        const reg = row.original
        return (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleToggleEmail(reg)}>
                {reg.email_sent ? (
                  <MailX className="mr-2 size-4" />
                ) : (
                  <MailCheck className="mr-2 size-4" />
                )}
                {reg.email_sent ? "Mark Not Sent" : "Mark Email Sent"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleToggleContact(reg)}>
                {reg.contacted ? (
                  <Phone className="mr-2 size-4" />
                ) : (
                  <PhoneCall className="mr-2 size-4" />
                )}
                {reg.contacted ? "Mark Not Contacted" : "Mark Contacted"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AssignReferrerDialog
                registration={reg}
                referrers={referrers}
                onAssign={(updatedRegistration) => {
                  setRegsState((prev) =>
                    prev.map((r) =>
                      r.id === updatedRegistration.id ? updatedRegistration : r
                    )
                  )
                }}
              >
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <UserPlus className="mr-2 size-4" />
                  Assign Referrer
                </DropdownMenuItem>
              </AssignReferrerDialog>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault()
                  setEmailTargetIds([reg.id])
                  setEmailResult(null)
                  setEmailDialogOpen(true)
                }}
              >
                <Send className="mr-2 size-4" />
                Send Next Step Email
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
                    <AlertDialogTitle>Delete Registration?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete the registration for{" "}
                      {reg.first_name} {reg.last_name}? This action cannot be
                      undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      onClick={() => handleDelete(reg.id)}
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

  const handleSendNextStepEmail = async () => {
    if (emailTargetIds.length === 0) return
    setSendingEmail(true)
    try {
      const result = (await sendNextStepEmail(emailTargetIds)) as {
        success: boolean
        error?: string | null
        sentCount?: number
        alreadySentIds?: string[]
      }
      if (result.success) {
        setEmailResult({ alreadySentIds: result.alreadySentIds || [] })
        setRegsState((prev) =>
          prev.map((r) =>
            emailTargetIds.includes(r.id) ? { ...r, email_sent: true } : r
          )
        )
        if (result.alreadySentIds && result.alreadySentIds.length > 0) {
          toast.success(
            `Next Step email sent to ${result.sentCount} attendee(s). ${result.alreadySentIds.length} already received it.`
          )
        } else {
          toast.success(
            `Next Step email sent to ${result.sentCount} attendee(s)!`
          )
        }
      } else {
        toast.error(result.error || "Failed to send email.")
      }
    } catch {
      toast.error("Something went wrong.")
    } finally {
      setSendingEmail(false)
    }
  }

  const handleBulkEmailSent = async (
    ids: string[],
    selectedRows: Registration[]
  ) => {
    const allSent = selectedRows.every((r) => r.email_sent)
    const setTo = !allSent
    const result = await batchToggleEmailSent(ids, setTo)
    if (result.success) {
      setRegsState((prev) =>
        prev.map((r) => (ids.includes(r.id) ? { ...r, email_sent: setTo } : r))
      )
      toast.success(
        `Email marked as ${setTo ? "sent" : "not sent"} for ${ids.length} registration(s)`
      )
    } else {
      toast.error("Failed to update email status")
    }
  }

  const handleBulkContacted = async (
    ids: string[],
    selectedRows: Registration[]
  ) => {
    const allContacted = selectedRows.every((r) => r.contacted)
    const setTo = !allContacted
    const result = await batchToggleContacted(ids, setTo)
    if (result.success) {
      setRegsState((prev) =>
        prev.map((r) => (ids.includes(r.id) ? { ...r, contacted: setTo } : r))
      )
      toast.success(
        `Marked as ${setTo ? "contacted" : "not contacted"} for ${ids.length} registration(s)`
      )
    } else {
      toast.error("Failed to update contact status")
    }
  }

  const handleBulkDelete = async (ids: string[]) => {
    const result = await batchDeleteRegistrations(ids)
    if (result.success) {
      setRegsState((prev) => prev.filter((r) => !ids.includes(r.id)))
      toast.success(`${ids.length} registration(s) deleted`)
      setBulkDeleteOpen(false)
    } else {
      toast.error("Failed to delete registrations")
    }
  }

  // ── CSV Export ─────────────────────────

  const exportToCSV = (data: Registration[]) => {
    if (data.length === 0) {
      toast.error("No data to export")
      return
    }

    const headers = [
      "Name",
      "Email",
      "Phone",
      "Orientation Date",
      "Lead Source",
      "Other Source",
      "Email Sent",
      "Contacted",
      "Registered At",
      "Enrolled",
      "Enrolled At",
      "Referrer",
      "Contact Method",
      "Preferred Day",
      "Preferred Time",
    ]

    const rows = data.map((r) => {
      const esc = (v: string | null | undefined) => {
        const s = v ?? ""
        return s.includes(",") || s.includes('"') || s.includes("\n")
          ? `"${s.replace(/"/g, '""')}"`
          : s
      }

      return [
        esc(`${r.first_name} ${r.last_name}`),
        esc(r.email),
        esc(r.phone),
        esc(
          r.orientation_date
            ? format(new Date(r.orientation_date), "MMM d, yyyy h:mm aa")
            : ""
        ),
        esc(r.heard_from),
        esc(r.other_source),
        r.email_sent ? "Yes" : "No",
        r.contacted ? "Yes" : "No",
        esc(
          r.created_at
            ? format(new Date(r.created_at), "MMM d, yyyy h:mm aa")
            : ""
        ),
        r.is_enrolled ? "Yes" : "No",
        esc(
          r.enrolled_at ? format(new Date(r.enrolled_at), "MMM d, yyyy") : ""
        ),
        esc(r.referrer?.name),
        esc(r.preferred_contact_method),
        esc(r.preferred_day),
        esc(r.preferred_time),
      ].join(",")
    })

    const csv = [headers.join(","), ...rows].join("\n")
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
      endings: "native",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `registrations-${format(new Date(), "yyyy-MM-dd")}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success(`Exported ${data.length} registration(s)`)
  }

  const emailTargetRegs = useMemo(() => {
    return regsState.filter((r) => emailTargetIds.includes(r.id))
  }, [regsState, emailTargetIds])

  const alreadySentNames = useMemo(() => {
    return emailTargetRegs
      .filter((r) => r.email_sent)
      .map((r) => `${r.first_name} ${r.last_name}`)
  }, [emailTargetRegs])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        {/* Left side: title and description */}
        <div>
          <h3 className="font-heading text-lg font-bold">Registrations</h3>
          <p className="text-sm text-muted-foreground">
            View and manage orientation registrations.
          </p>
        </div>

        {/* Right side: compact filter controls with labels */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1"
            onClick={() => exportToCSV(filteredRegistrations)}
          >
            <Download className="size-3.5" />
            Export CSV
          </Button>
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="relative h-8 gap-1"
              >
                <FilterX className="size-3.5" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[80vw] max-w-2xl p-3" align="end">
              <FilterContent
                filters={filters}
                dispatch={dispatch}
                orientationDateOptions={orientationDateOptions}
                leadSourceOptions={leadSourceOptions}
                referrers={referrers}
                hasActiveFilters={hasActiveFilters}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredRegistrations}
        searchKey="email"
        searchPlaceholder="Search..."
        pageSize={10}
        pinnedColumns={{ left: ["select", "name"] }}
        getRowId={(row) => row.id}
        renderSelectedActions={({
          selectedIds,
          selectedRows,
          onClearSelection,
        }) => {
          const allSent = selectedRows.every((r) => r.email_sent)
          const allContacted = selectedRows.every((r) => r.contacted)
          return (
            <div className="flex w-full items-center gap-3">
              <span className="text-sm whitespace-nowrap text-muted-foreground">
                {selectedIds.length} selected
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default" size="sm" className="gap-1.5">
                    Actions <ChevronDown className="size-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem
                    onClick={() => {
                      setEmailTargetIds(selectedIds)
                      setEmailResult(null)
                      setEmailDialogOpen(true)
                    }}
                  >
                    <Send className="mr-2 size-4" />
                    Send Next Step Email
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      handleBulkEmailSent(selectedIds, selectedRows)
                    }
                  >
                    {allSent ? (
                      <MailX className="mr-2 size-4" />
                    ) : (
                      <MailCheck className="mr-2 size-4" />
                    )}
                    {allSent ? "Mark Not Sent" : "Mark Sent"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      handleBulkContacted(selectedIds, selectedRows)
                    }
                  >
                    {allContacted ? (
                      <Phone className="mr-2 size-4" />
                    ) : (
                      <PhoneCall className="mr-2 size-4" />
                    )}
                    {allContacted ? "Mark Not Contacted" : "Mark Contacted"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <AssignReferrerDialog
                    registrationIds={selectedIds}
                    referrers={referrers}
                    onBulkAssign={() => {
                      setRegsState((prev) => [...prev])
                    }}
                  >
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <UserPlus className="mr-2 size-4" />
                      Assign Referrer
                    </DropdownMenuItem>
                  </AssignReferrerDialog>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => {
                      setBulkDeleteTargetIds(selectedIds)
                      setBulkDeleteOpen(true)
                    }}
                  >
                    <Trash2 className="mr-2 size-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearSelection}
                className="gap-1.5"
              >
                Clear selection
              </Button>
            </div>
          )
        }}
      />

      {/* Bulk Delete Confirmation Dialog */}
      <AlertDialog open={bulkDeleteOpen} onOpenChange={setBulkDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Registrations?</AlertDialogTitle>
            <AlertDialogDescription>
              <p className="space-y-3">
                <p>
                  Are you sure you want to delete{" "}
                  <strong>{bulkDeleteTargetIds.length}</strong> registration(s)?
                  This action cannot be undone.
                </p>
                {bulkDeleteTargetIds.length > 0 && (
                  <div className="rounded-md border bg-muted/30 p-3">
                    <p className="mb-1 text-xs font-medium text-muted-foreground">
                      Registrations:
                    </p>
                    <ul className="space-y-0.5 text-sm">
                      {(() => {
                        const targetRegs = regsState.filter((r) =>
                          bulkDeleteTargetIds.includes(r.id)
                        )
                        return (
                          <>
                            {targetRegs.slice(0, 5).map((r) => (
                              <li key={r.id}>
                                {r.first_name} {r.last_name}
                              </li>
                            ))}
                            {targetRegs.length > 5 && (
                              <li className="text-muted-foreground">
                                +{targetRegs.length - 5} more
                              </li>
                            )}
                          </>
                        )
                      })()}
                    </ul>
                  </div>
                )}
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setBulkDeleteTargetIds([])}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => handleBulkDelete(bulkDeleteTargetIds)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Send Next Step Email Confirmation Dialog */}
      <AlertDialog
        open={emailDialogOpen}
        onOpenChange={(open) => {
          if (!sendingEmail) {
            setEmailDialogOpen(open)
            if (!open) {
              setEmailResult(null)
              setEmailTargetIds([])
            }
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {emailResult ? "Email Sent" : "Send Next Step Email?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {emailResult ? (
                <span>
                  The Next Step email has been sent to {emailTargetIds.length}{" "}
                  attendee{emailTargetIds.length !== 1 ? "s" : ""}:
                  {alreadySentNames.length > 0 && (
                    <span className="mt-2 block text-amber-600">
                      {alreadySentNames.join(", ")}
                    </span>
                  )}
                </span>
              ) : (
                <p className="space-y-3">
                  <span>
                    This will send the Next Step email to{" "}
                    <strong>{emailTargetIds.length}</strong> attendee
                    {emailTargetIds.length !== 1 ? "s" : ""}.
                  </span>
                  {emailTargetRegs.length > 0 && (
                    <div className="mt-2 rounded-md border bg-muted/30 p-3">
                      <p className="mb-1 text-xs font-medium text-muted-foreground">
                        Recipients:
                      </p>
                      <ul className="space-y-0.5 text-sm">
                        {emailTargetRegs.slice(0, 5).map((r) => (
                          <li key={r.id}>
                            {r.first_name} {r.last_name} ({r.email})
                          </li>
                        ))}
                        {emailTargetRegs.length > 5 && (
                          <li className="text-muted-foreground">
                            +{emailTargetRegs.length - 5} more
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                  {alreadySentNames.length > 0 && (
                    <p className="text-sm text-amber-600">
                      Warning: {alreadySentNames.length} of these already
                      received the Next Step email.
                    </p>
                  )}
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {emailResult ? (
              <AlertDialogAction
                onClick={() => {
                  setEmailDialogOpen(false)
                  setEmailResult(null)
                  setEmailTargetIds([])
                }}
              >
                Done
              </AlertDialogAction>
            ) : (
              <>
                <AlertDialogCancel disabled={sendingEmail}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  disabled={sendingEmail}
                  onClick={(e) => {
                    e.preventDefault()
                    handleSendNextStepEmail()
                  }}
                >
                  {sendingEmail ? "Sending..." : "Send Email"}
                </AlertDialogAction>
              </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
