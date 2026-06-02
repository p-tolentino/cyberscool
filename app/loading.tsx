import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero Area */}
      <div className="relative overflow-hidden pb-20 pt-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <Skeleton className="mx-auto h-10 w-64 sm:h-12 sm:w-80" />
            <Skeleton className="mx-auto h-6 w-96 max-w-full" />
            <Skeleton className="mx-auto h-6 w-72 max-w-full" />
            <div className="flex justify-center gap-4 pt-4">
              <Skeleton className="h-11 w-36 rounded-full" />
              <Skeleton className="h-11 w-44 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Section 1 */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <Skeleton className="mx-auto h-8 w-56" />
            <Skeleton className="mx-auto h-5 w-80 max-w-full" />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl border bg-card p-6">
                <Skeleton className="mb-4 size-12 rounded-lg" />
                <Skeleton className="mb-2 h-5 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="mt-1 h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <Skeleton className="mx-auto h-8 w-48" />
            <Skeleton className="mx-auto h-5 w-72 max-w-full" />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-4 rounded-xl border bg-card p-6">
                <Skeleton className="size-10 shrink-0 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-xl space-y-4 text-center">
            <Skeleton className="mx-auto h-8 w-64" />
            <Skeleton className="mx-auto h-5 w-80 max-w-full" />
            <Skeleton className="mx-auto mt-6 h-12 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
