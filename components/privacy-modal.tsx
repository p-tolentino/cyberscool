"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface PrivacyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PrivacyDialog({ open, onOpenChange }: PrivacyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto text-muted-foreground md:w-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Data Privacy Consent Form
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <strong className="text-foreground">
              Data Privacy Act of 2012 (Republic Act No. 10173)
            </strong>
          </p>
          <p>
            CybersCool Defcon Inc. is committed to protecting your personal data
            in accordance with Philippine law.
          </p>

          <p>
            By registering for and/or attending the cybersecurity course
            orientation conducted by{" "}
            <strong className="text-foreground">CybersCool Defcon Inc.</strong>{" "}
            (hereinafter referred to as the &quot;Company&quot;), I voluntarily
            allow the Company to collect, store, and use my personal data for
            the purposes stated below.
          </p>

          <p>
            Upon submitting my registration or attendance, I give my full
            consent and authorization to the Company to:
          </p>

          <ol className="list-decimal space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Use my personal data</strong>{" "}
              (e.g., name, email address, school/organization, course
              preferences) for the purpose of managing my participation in the
              cybersecurity course orientation, including sending reminders,
              updates, and evaluation forms.
            </li>
            <li>
              <strong className="text-foreground">Retain my information</strong>{" "}
              for the duration of the orientation period and up to thirty (30)
              days thereafter for documentation and feedback analysis. After
              this period, my data will be securely deleted, unless I provide
              separate written consent for retention for future course
              announcements.
            </li>
            <li>
              <strong className="text-foreground">
                Limit access to my information
              </strong>{" "}
              to authorized CybersCool Defcon Inc. personnel, course
              facilitators, orientation coordinators, and IT support staff who
              need the data to perform their duties. Access will not be granted
              to external parties without my explicit consent.
            </li>
            <li>
              Understand that{" "}
              <strong className="text-foreground">
                any improper use, disclosure, or breach
              </strong>{" "}
              of my information will be addressed in accordance with the Data
              Privacy Act of 2012 and Company policy, and may be subject to
              legal remedies.
            </li>
            <li>
              <strong className="text-foreground">Receive assurance</strong>{" "}
              that reasonable organizational, physical, and technical security
              measures will be taken to protect my personal data from
              unauthorized access, alteration, or destruction.
            </li>
          </ol>

          <h3 className="pt-2 text-lg font-semibold text-foreground">
            Contact Us
          </h3>
          <p>
            For any concerns, corrections, or requests related to this consent
            form or my personal data, please contact:
          </p>
          <p className="flex flex-col">
            CybersCool Defcon Inc.
            <br />
            <span>
              Tel:{" "}
              <a href="tel:+63279093880" className="text-brand-teal underline">
                +63 2 7909 3880
              </a>
            </span>
            <span>
              Tel:{" "}
              <a href="tel:+63282499900" className="text-brand-teal underline">
                +63 2 8249 9900
              </a>
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
