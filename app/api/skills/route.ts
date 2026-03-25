import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { skills } from '@/lib/dataStore'

export async function GET() {
  return NextResponse.json(skills.getAll())
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const newSkill = skills.create({
      name: body.name,
      level: Number(body.level),
      category: body.category,
      icon: body.icon,
      order: body.order ?? 0,
    })
    return NextResponse.json(newSkill, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 })
  }
}
