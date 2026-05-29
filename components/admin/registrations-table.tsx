"use client"

import { useState, useEffect, useRef } from "react"
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
  toggleEmailSent,
  toggleContacted,
  deleteRegistration,
} from "@/app/actions/admin"
import type {
  Registration,
  OrientationDate,
  Referrer,
} from "@/lib/supabase/types"
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
} from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"

import { AssignReferrerDialog } from "@/components/admin/assign-referrer-dialog"
import { EnrollDialog } from "@/components/admin/enroll-dialog"

interface RegistrationsTableProps {
  registrations: Registration[]
  dates: OrientationDate[]
  referrers: Referrer[]
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

        if (!heardFrom) {
          return <span className="text-xs text-muted-foreground">—</span>
        }

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
      meta: "Registered At",
      enableSorting: true,
      cell: ({ row }) => {
        const d = new Date(row.original.created_at)
        if (isNaN(d.getTime())) {
          return <span className="text-xs text-muted-foreground">—</span>
        }
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
      <div>
        <h3 className="font-heading text-lg font-bold">Registrations</h3>
        <p className="text-sm text-muted-foreground">
          View and manage orientation registrations.
        </p>
      </div>
      <DataTable
        columns={columns}
        data={regsState}
        searchKey="email"
        searchPlaceholder="Search..."
        pageSize={10}
        pinnedColumns={{ left: ["name"] }}
      />
    </div>
  )
}
