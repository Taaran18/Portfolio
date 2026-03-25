import { NextRequest, NextResponse } from 'next/server'

/**
 * Contact form handler.
 * In production you can add Resend / Nodemailer / SendGrid here.
 * For now it logs the message and returns success so the form works.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // TODO: add your email service here, e.g.:
    // await resend.emails.send({ from: 'noreply@...', to: '...', subject, html: ... })

    console.log('📬 New contact message:', { name, email, subject, message })

    return NextResponse.json({ message: 'Message received!' })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
