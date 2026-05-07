import AdminPanel from "@/components/admin-panel"
import { getOrientationDates, getProspects } from "../actions/admin"

export async function generateMetadata() {
  return {
    title: "Admin Dashboard | CybersCool Defcon",
    description:
      "Manage orientation dates and view registrations for CybersCool Defcon programs.",
  }
}

export default async function AdminPage() {
  const dates = await getOrientationDates()

  const registrations = await getProspects()

  return <AdminPanel dates={dates || []} registrations={registrations || []} />
}
