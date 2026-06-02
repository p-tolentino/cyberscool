import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const after = searchParams.get("after") || undefined
    const limit = Math.min(Number(searchParams.get("limit")) || 50, 100)
    const skip = Math.max(Number(searchParams.get("skip")) || 0, 0)

    const fetchLimit = skip > 0 ? limit + skip : limit
    const result = await resend.emails.receiving.list({ after, limit: fetchLimit })

    const { data, error } = result
    if (error) {
      console.error("Resend list error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    let emails = data.data
    if (skip > 0 && !after) {
      emails = emails.slice(skip)
    }
    const hasMore = data.has_more
    const nextCursor = emails.length > 0 ? emails[emails.length - 1].id : null

    return NextResponse.json({ emails, hasMore, nextCursor })
  } catch (error) {
    console.error("Failed to list emails:", error)
    return NextResponse.json(
      { error: "Failed to fetch emails" },
      { status: 500 }
    )
  }
}
