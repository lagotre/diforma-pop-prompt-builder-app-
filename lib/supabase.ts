import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Project } from '@/types'

let _client: SupabaseClient | null = null

function getClient(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) {
      throw new Error('Supabase no configurado. Revisa NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local')
    }
    _client = createClient(url, key)
  }
  return _client
}

export async function getProjects(userId: string): Promise<Project[]> {
  const { data, error } = await getClient()
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
  if (error) throw error
  return (data ?? []).map(dbToProject)
}

export async function getProject(id: string, userId: string): Promise<Project | null> {
  const { data, error } = await getClient()
    .from('projects')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single()
  if (error) return null
  return dbToProject(data)
}

export async function createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
  const { data, error } = await getClient()
    .from('projects')
    .insert(projectToDb(project))
    .select()
    .single()
  if (error) throw error
  return dbToProject(data)
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<Project> {
  const { data, error } = await getClient()
    .from('projects')
    .update({ ...projectToDb(updates as Project), updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return dbToProject(data)
}

export async function deleteProject(id: string, userId: string): Promise<void> {
  const { error } = await getClient()
    .from('projects')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)
  if (error) throw error
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dbToProject(row: any): Project {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    client: row.client,
    product: row.product,
    designer: row.designer,
    executive: row.executive,
    renderMode: row.render_mode,
    currentPhase: row.current_phase ?? 1,
    status: row.status ?? 'draft',
    phase1: row.phase1_data,
    phase2: row.phase2_data,
    phase3: row.phase3_data,
    phase4: row.phase4_data,
    generatedPrompts: row.generated_prompts,
    userId: row.user_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function projectToDb(p: Partial<Project>) {
  return {
    ...(p.code !== undefined && { code: p.code }),
    ...(p.name !== undefined && { name: p.name }),
    ...(p.client !== undefined && { client: p.client }),
    ...(p.product !== undefined && { product: p.product }),
    ...(p.designer !== undefined && { designer: p.designer }),
    ...(p.executive !== undefined && { executive: p.executive }),
    ...(p.renderMode !== undefined && { render_mode: p.renderMode }),
    ...(p.currentPhase !== undefined && { current_phase: p.currentPhase }),
    ...(p.status !== undefined && { status: p.status }),
    ...(p.phase1 !== undefined && { phase1_data: p.phase1 }),
    ...(p.phase2 !== undefined && { phase2_data: p.phase2 }),
    ...(p.phase3 !== undefined && { phase3_data: p.phase3 }),
    ...(p.phase4 !== undefined && { phase4_data: p.phase4 }),
    ...(p.generatedPrompts !== undefined && { generated_prompts: p.generatedPrompts }),
    ...(p.userId !== undefined && { user_id: p.userId }),
  }
}
