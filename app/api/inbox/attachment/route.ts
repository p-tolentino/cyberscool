import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const emailId = searchParams.get("emailId")
  const attachmentId = searchParams.get("attachmentId")

  if (!emailId || !attachmentId) {
    return NextResponse.json(
      { error: "Missing email ID or attachment ID" },
      { status: 400 }
    )
  }

  try {
    // Fetch the list of attachments for this email
    const { data: attachmentsResponse } =
      await resend.emails.receiving.attachments.list({
        emailId,
      })

    // Validate the response and extract the array
    if (!attachmentsResponse || !("data" in attachmentsResponse)) {
      return NextResponse.json(
        { error: "Invalid response from Resend" },
        { status: 500 }
      )
    }
    const attachmentsArray = attachmentsResponse.data
    if (!Array.isArray(attachmentsArray)) {
      return NextResponse.json(
        { error: "No attachments found" },
        { status: 404 }
      )
    }

    // Find the specific attachment by ID
    const targetAttachment = attachmentsArray.find(
      (att) => att.id === attachmentId
    )
    if (!targetAttachment?.download_url) {
      return NextResponse.json(
        { error: "Attachment not found or download URL missing" },
        { status: 404 }
      )
    }

    // Download the file from Resend's temporary URL
    const downloadResponse = await fetch(targetAttachment.download_url)
    if (!downloadResponse.ok) {
      throw new Error(
        `Failed to fetch attachment: ${downloadResponse.statusText}`
      )
    }

    const fileBuffer = await downloadResponse.arrayBuffer()

    // Return the file as a downloadable response
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type":
          targetAttachment.content_type || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${targetAttachment.filename}"`,
      },
    })
  } catch (error) {
    console.error("Error downloading attachment:", error)
    return NextResponse.json(
      { error: "Failed to download attachment" },
      { status: 500 }
    )
  }
}
