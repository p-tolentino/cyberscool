import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const INBOUND_ADDRESS = `inquiry@cyberscoolph.com`

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const originalMessageId = formData.get("originalMessageId") as string
    const to = formData.get("to") as string
    const subject = formData.get("subject") as string
    const replyHtml = formData.get("replyHtml") as string

    if (!originalMessageId || !to || !subject || !replyHtml) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const attachments: { filename: string; content: string }[] = []
    const fileEntries = formData.getAll("attachment") as File[]
    for (const file of fileEntries) {
      const buffer = Buffer.from(await file.arrayBuffer())
      attachments.push({
        filename: file.name,
        content: buffer.toString("base64"),
      })
    }

    const { data, error } = await resend.emails.send({
      from: `CybersCool Defcon Inc. <${INBOUND_ADDRESS}>`,
      to: [to],
      subject: subject.startsWith("Re:") ? subject : `Re: ${subject}`,
      html: replyHtml,
      headers: {
        "In-Reply-To": originalMessageId,
        References: originalMessageId,
      },
      ...(attachments.length > 0 && { attachments }),
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
