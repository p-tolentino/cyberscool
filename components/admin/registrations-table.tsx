"use client"

import { useState, useEffect, useRef, useMemo, useReducer } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
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

import { CalendarIcon } from "lucide-react"
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
} from "@/app/actions/admin"

import type { Registration, Referrer } from "@/lib/supabase/types"
import {
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

  // ========== COLUMNS ==========
  const columns: ColumnDef<Registration>[] = [
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
        pinnedColumns={{ left: ["name"] }}
      />
    </div>
  )
}
