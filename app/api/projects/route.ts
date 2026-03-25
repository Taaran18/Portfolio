import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { projects } from '@/lib/dataStore'

export async function GET() {
  try {
    return NextResponse.json(projects.getAll())
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const newProject = projects.create({
      title: body.title,
      description: body.description,
      longDescription: body.longDescription,
      technologies: body.technologies ?? [],
      liveUrl: body.liveUrl,
      githubUrl: body.githubUrl,
      imageUrl: body.imageUrl,
      featured: body.featured ?? false,
      order: body.order ?? 0,
    })
    return NextResponse.json(newProject, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
