import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { experience } from '@/lib/dataStore'

export async function GET() {
  return NextResponse.json(experience.getAll())
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const newItem = experience.create({
      company: body.company,
      role: body.role,
      description: body.description,
      responsibilities: body.responsibilities ?? [],
      technologies: body.technologies ?? [],
      startDate: body.startDate,
      endDate: body.endDate,
      current: body.current ?? false,
      order: body.order ?? 0,
    })
    return NextResponse.json(newItem, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 })
  }
}
