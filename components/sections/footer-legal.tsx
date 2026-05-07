"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function FooterLegal() {
  return (
    <ul className="space-y-2 text-sm text-muted-foreground">
      <li>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" className="p-0 h-auto text-sm">
              Privacy Policy
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Privacy Policy</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p><strong>Data Privacy Act of 2012 (Republic Act No. 10173)</strong></p>
              <p>CybersCool Defcon Inc. is committed to protecting your personal data in accordance with Philippine law.</p>
              <h3 className="text-lg font-semibold">Information We Collect</h3>
              <p>We collect information you provide when registering for orientations or contacting us.</p>
              <h3 className="text-lg font-semibold">How We Use Your Information</h3>
              <p>Your data is used solely for orientation communication and program inquiries.</p>
              <h3 className="text-lg font-semibold">Data Sharing</h3>
              <p>We do not share your data with third parties without your explicit consent.</p>
              <h3 className="text-lg font-semibold">Contact Us</h3>
              <p>For questions about this Privacy Policy, contact us at info@cyberscooldefcon.com.</p>
            </div>
          </DialogContent>
        </Dialog>
      </li>
      <li>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" className="p-0 h-auto text-sm">
              Terms of Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Terms of Service</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p><strong>Last updated: May 1, 2026</strong></p>
              <h3 className="text-lg font-semibold">Enrollment Terms</h3>
              <p>By enrolling, you agree to complete all required laboratories and exercises.</p>
              <h3 className="text-lg font-semibold">Payment Terms</h3>
              <p>Tuition fees are non-refundable after the first week of the program.</p>
              <h3 className="text-lg font-semibold">Contact Us</h3>
              <p>For questions about these Terms, contact us at info@cyberscooldefcon.com.</p>
            </div>
          </DialogContent>
        </Dialog>
      </li>
    </ul>
  )
}
