import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const MAX_LENGTHS = { name: 100, email: 254, subject: 200, message: 5000 } as const
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

type SafeFields = { name: string; email: string; subject: string; message: string }

function detailRow(label: string, value: string) {
  return `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font:600 11px/1.4 -apple-system,Segoe UI,Roboto,Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#71717a;width:96px;vertical-align:top;">${label}</td>
          <td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font:400 15px/1.5 -apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#18181b;">${value}</td>
        </tr>`
}

function emailTemplate(safe: SafeFields, receivedAt: string) {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New portfolio enquiry</title></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${safe.name} sent you a message via taaranjain.com</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;border:1px solid #e4e4e7;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background-color:#4f46e5;padding:24px 32px;">
              <p style="margin:0;font:700 17px/1.3 -apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#ffffff;">New portfolio enquiry</p>
              <p style="margin:6px 0 0;font:400 13px/1.4 -apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#c7d2fe;">${receivedAt}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${detailRow('From', `<strong style="font-weight:600;">${safe.name}</strong>`)}
                ${detailRow('Email', `<a href="mailto:${safe.email}" style="color:#4f46e5;text-decoration:none;">${safe.email}</a>`)}
                ${detailRow('Subject', safe.subject || '&mdash;')}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 0;">
              <p style="margin:0 0 10px;font:600 11px/1.4 -apple-system,Segoe UI,Roboto,Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#71717a;">Message</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fafafa;border-left:3px solid #4f46e5;border-radius:0 8px 8px 0;">
                <tr>
                  <td style="padding:18px 20px;font:400 15px/1.7 -apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#27272a;white-space:pre-wrap;word-break:break-word;">${safe.message}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#4f46e5;border-radius:999px;">
                    <a href="mailto:${safe.email}?subject=Re:%20${encodeURIComponent(safe.subject || 'Your message')}" style="display:inline-block;padding:12px 26px;font:600 14px/1 -apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#ffffff;text-decoration:none;border-radius:999px;">Reply to ${safe.name}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color:#fafafa;border-top:1px solid #e4e4e7;padding:18px 32px;">
              <p style="margin:0;font:400 12px/1.5 -apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#71717a;">
                Sent from the contact form on <a href="https://www.taaranjain.com" style="color:#4f46e5;text-decoration:none;">taaranjain.com</a>. Replying to this email goes straight to ${safe.name}.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const name = String(body.name ?? '').trim()
    const email = String(body.email ?? '').trim()
    const subject = String(body.subject ?? '').trim()
    const message = String(body.message ?? '').trim()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const tooLong = (Object.entries(MAX_LENGTHS) as [keyof typeof MAX_LENGTHS, number][]).some(
      ([field, max]) => ({ name, email, subject, message })[field].length > max
    )
    if (tooLong) {
      return NextResponse.json({ error: 'One or more fields are too long' }, { status: 400 })
    }

    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      subject: escapeHtml(subject),
      message: escapeHtml(message),
    }

    const receivedAt = new Date().toLocaleString('en-IN', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata',
    })

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
      subject: `Portfolio enquiry from ${name}${subject ? ` — ${subject}` : ''}`,
      text: [
        'NEW PORTFOLIO ENQUIRY',
        '',
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Subject: ${subject || '—'}`,
        `Received: ${receivedAt}`,
        '',
        'Message:',
        message,
        '',
        '---',
        'Sent from the contact form on taaranjain.com. Reply directly to respond.',
      ].join('\n'),
      html: emailTemplate(safe, receivedAt),
    })

    return NextResponse.json({ message: 'Email sent!' })
  } catch (err) {
    console.error('Email error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
