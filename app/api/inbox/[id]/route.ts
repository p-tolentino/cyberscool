import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const { data, error } = await resend.emails.receiving.get(id)

    if (error) {
      console.error("Resend get error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Failed to get email:", error)
    return NextResponse.json(
      { error: "Failed to fetch email" },
      { status: 500 }
    )
  }
}
