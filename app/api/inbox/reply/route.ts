import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const INBOUND_ADDRESS = `inquiry@cyberscoolph.com`

export async function POST(req: NextRequest) {
  try {
    const { originalMessageId, to, subject, replyHtml } = await req.json()

    if (!originalMessageId || !to || !subject || !replyHtml) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    // Send the reply
    const { data, error } = await resend.emails.send({
      from: `CybersCool Defcon Inc. <${INBOUND_ADDRESS}>`,
      to: [to],
      subject: subject.startsWith("Re:") ? subject : `Re: ${subject}`,
      html: replyHtml,
      headers: {
        "In-Reply-To": originalMessageId,
        References: originalMessageId,
      },
    })

    if (error) {
      console.error("Resend send error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
