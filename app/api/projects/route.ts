import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getProjects, createProject } from '@/lib/supabase'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const projects = await getProjects(session.user.id)
  return NextResponse.json(projects)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const project = await createProject({ ...body, userId: session.user.id, currentPhase: 1, status: 'draft' })
  return NextResponse.json(project, { status: 201 })
}
