import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isValidSession, SESSION_COOKIE } from '@/lib/auth'
import { clearPageViews, summarise } from '@/lib/analytics/store'

async function authorised(): Promise<boolean> {
  const store = await cookies()
  return isValidSession(store.get(SESSION_COOKIE)?.value)
}

export async function GET(req: NextRequest) {
  if (!(await authorised())) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const days = Math.min(Math.max(Number(req.nextUrl.searchParams.get('days') ?? 30) || 30, 1), 90)

  try {
    return NextResponse.json(await summarise(days))
  } catch (err) {
    console.error('Analytics summary error:', err)
    return NextResponse.json({ error: 'Failed to load analytics' }, { status: 500 })
  }
}

export async function DELETE() {
  if (!(await authorised())) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }
  try {
    await clearPageViews()
  } catch (err) {
    console.error('Analytics clear error:', err)
    return NextResponse.json({ error: 'Failed to clear analytics' }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
