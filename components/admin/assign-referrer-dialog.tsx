// components/admin/assign-referrer-dialog.tsx
"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { assignReferrer, createReferrer } from "@/app/actions/admin"
import { toast } from "sonner"
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox"
import type { Registration, Referrer } from "@/lib/supabase/types"

interface AssignReferrerDialogProps {
  registration: Registration
  referrers: Referrer[]
  onAssign: (updatedRegistration: Registration) => void
  children: React.ReactNode
}

export function AssignReferrerDialog({
  registration,
  referrers,
  onAssign,
  children,
}: AssignReferrerDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedReferrerId, setSelectedReferrerId] = useState(
    registration.referrer_id || ""
  )
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredReferrers = referrers.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateAndAssign = async () => {
    if (!searchTerm.trim()) return

    setLoading(true)
    try {
      const result = await createReferrer(searchTerm)

      if (result.success && "data" in result && result.data) {
        // Assign the newly created referrer
        const assignResult = await assignReferrer(
          registration.id,
          result.data.id
        )

        if (assignResult.success) {
          const updatedRegistration = {
            ...registration,
            referrer_id: result.data.id,
            referrer: result.data,
          }
          toast.success(`Referrer "${searchTerm}" created and assigned`)
          onAssign(updatedRegistration)
          setOpen(false)
        } else {
          toast.error("Failed to assign referrer")
        }
      } else if ("error" in result && result.error) {
        toast.error(result.error)
      }
    } catch (error) {
      toast.error("An error occurred")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleAssign = async () => {
    if (!selectedReferrerId) return

    setLoading(true)
    try {
      const result = await assignReferrer(registration.id, selectedReferrerId)

      if (result.success) {
        const selectedReferrer = referrers.find(
          (r) => r.id === selectedReferrerId
        )
        const updatedRegistration = {
          ...registration,
          referrer_id: selectedReferrerId,
          referrer: selectedReferrer || null,
        }
        toast.success("Referrer assigned successfully")
        onAssign(updatedRegistration)
        setOpen(false)
      } else if ("error" in result && result.error) {
        toast.error(result.error)
      }
    } catch (error) {
      toast.error("An error occurred")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleValueChange = (value: string | null) => {
    setSelectedReferrerId(value || "")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Referred By</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Assign a referrer to {registration.first_name}{" "}
              {registration.last_name}
            </p>

            <Combobox
              value={
                referrers.find((r) => r.id === selectedReferrerId)?.name || ""
              }
              onValueChange={handleValueChange}
            >
              <ComboboxInput
                placeholder="Search or create referrer..."
                onChange={(e) => setSearchTerm(e.target.value)}
                showClear={!!selectedReferrerId}
              />
              <ComboboxContent>
                <ComboboxList>
                  {filteredReferrers.map((referrer) => (
                    <ComboboxItem key={referrer.id} value={referrer.id}>
                      {referrer.name}
                    </ComboboxItem>
                  ))}
                  {searchTerm && filteredReferrers.length === 0 && (
                    <ComboboxEmpty>
                      <div className="flex flex-col gap-2 p-2">
                        <p className="text-sm text-muted-foreground">
                          No referrer found with &quot;{searchTerm}&quot;
                        </p>
                        <Button
                          size="sm"
                          onClick={handleCreateAndAssign}
                          disabled={loading}
                        >
                          Create &quot;{searchTerm}&quot; & Assign
                        </Button>
                      </div>
                    </ComboboxEmpty>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAssign}
              disabled={loading || !selectedReferrerId}
            >
              {loading ? "Assigning..." : "Assign Referrer"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
