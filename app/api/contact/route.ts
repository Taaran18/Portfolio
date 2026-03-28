import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `[Portfolio] ${subject || 'New message'} — from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a1f; color: #f1f5f9; padding: 32px; border-radius: 12px; border: 1px solid rgba(6,182,212,0.3);">
          <h2 style="color: #22d3ee; margin: 0 0 24px;">New Contact Form Submission</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #94a3b8; width: 90px; font-size: 13px;">NAME</td>
              <td style="padding: 10px 0; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #94a3b8; font-size: 13px;">EMAIL</td>
              <td style="padding: 10px 0;">
                <a href="mailto:${email}" style="color: #22d3ee; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #94a3b8; font-size: 13px;">SUBJECT</td>
              <td style="padding: 10px 0;">${subject || '—'}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 20px; background: rgba(255,255,255,0.04); border-radius: 8px; border-left: 3px solid #8b5cf6;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0 0 10px; letter-spacing: 0.1em;">MESSAGE</p>
            <p style="margin: 0; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="margin-top: 24px; color: #475569; font-size: 12px;">
            Sent from your portfolio contact form · Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ message: 'Email sent!' })
  } catch (err) {
    console.error('Email error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
