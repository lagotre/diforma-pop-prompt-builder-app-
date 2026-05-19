import { auth } from '@/auth'
import { getProjects } from '@/lib/supabase'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import type { Project } from '@/types'

const STATUS_LABELS: Record<string, string> = {
  draft: 'Borrador',
  in_progress: 'En progreso',
  complete: 'Completo',
}

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600',
  in_progress: 'bg-blue-100 text-blue-700',
  complete: 'bg-green-100 text-green-700',
}

export default async function DashboardPage() {
  const session = await auth()
  let projects: Project[] = []

  try {
    projects = await getProjects(session!.user!.id!)
  } catch {
    // Supabase not configured yet — show empty state
  }

  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-text">Mis Proyectos</h1>
          <p className="text-brand-muted text-sm mt-1">
            {projects.length} proyecto{projects.length !== 1 ? 's' : ''} en total
          </p>
        </div>
        <Link
          href="/projects/new"
          className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accent2 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <span className="text-lg leading-none">+</span>
          Nuevo Proyecto
        </Link>
      </div>

      {/* Projects grid */}
      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-dark/5 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-brand-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-brand-text font-semibold text-lg">Sin proyectos aún</h3>
          <p className="text-brand-muted text-sm mt-1 max-w-xs">
            Crea tu primer proyecto para empezar a generar prompts para Nano Banana.
          </p>
          <Link
            href="/projects/new"
            className="mt-6 bg-brand-accent hover:bg-brand-accent2 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Crear primer proyecto
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.status === 'complete' ? `/projects/${project.id}/prompt` : `/projects/${project.id}`}
              className="bg-white rounded-2xl p-6 shadow-sm border border-brand-border hover:shadow-md hover:border-brand-accent/30 transition-all group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-brand-muted font-mono uppercase tracking-wide">{project.code}</p>
                  <h3 className="font-bold text-brand-text text-base mt-0.5 truncate group-hover:text-brand-accent transition-colors">
                    {project.name}
                  </h3>
                </div>
                <span className={`ml-2 text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${STATUS_COLORS[project.status]}`}>
                  {STATUS_LABELS[project.status]}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-1.5 mb-4">
                <p className="text-sm text-brand-muted">
                  <span className="text-brand-text/60 font-medium">Cliente:</span> {project.client}
                </p>
                <p className="text-sm text-brand-muted">
                  <span className="text-brand-text/60 font-medium">Producto:</span> {project.product}
                </p>
                <p className="text-sm text-brand-muted">
                  <span className="text-brand-text/60 font-medium">Diseñador:</span> {project.designer}
                </p>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-brand-muted mb-1">
                  <span>Fase {Math.min(project.currentPhase, 4)} de 4</span>
                  <span>{Math.round(Math.min(project.currentPhase - 1, 4) / 4 * 100)}%</span>
                </div>
                <div className="h-1.5 bg-brand-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-accent rounded-full transition-all"
                    style={{ width: `${Math.round(Math.min(project.currentPhase - 1, 4) / 4 * 100)}%` }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-brand-muted pt-3 border-t border-brand-border">
                <span>{formatDate(project.updatedAt)}</span>
                <span className="text-brand-accent font-medium group-hover:translate-x-1 transition-transform inline-block">
                  {project.status === 'complete' ? 'Ver prompt →' : 'Continuar →'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
