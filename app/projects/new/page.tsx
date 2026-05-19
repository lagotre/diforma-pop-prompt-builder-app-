'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { RenderMode } from '@/types'

const RENDER_MODES = [
  {
    value: 'commercial' as RenderMode,
    label: 'Render Comercial',
    description: 'Mockup con fondo limpio para propuesta al cliente',
    icon: '🖼️',
  },
  {
    value: 'instore' as RenderMode,
    label: 'Ambientación In-Store',
    description: 'Display dentro de tienda real, con contexto de retail',
    icon: '🏪',
  },
  {
    value: 'hybrid' as RenderMode,
    label: 'Híbrido / Estilizado',
    description: 'Escenario estilizado, entre studio y tienda real',
    icon: '✨',
  },
]

export default function NewProjectPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [renderMode, setRenderMode] = useState<RenderMode>('commercial')
  const [form, setForm] = useState({
    code: '',
    name: '',
    client: '',
    product: '',
    designer: '',
    executive: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, renderMode }),
      })

      if (!res.ok) throw new Error('Error al crear el proyecto')
      const project = await res.json()
      router.push(`/projects/${project.id}`)
    } catch (err) {
      setError('No se pudo crear el proyecto. Verifica la configuración de Supabase.')
      setLoading(false)
    }
  }

  const isValid = form.code && form.name && form.client && form.product && form.designer && form.executive

  return (
    <div className="min-h-screen bg-brand-surface">
      {/* Header */}
      <div className="bg-brand-dark text-white px-6 py-4 flex items-center gap-4">
        <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full border-2 border-brand-accent flex items-center justify-center">
            <div className="w-3.5 h-3.5 rounded-full bg-brand-accent" />
          </div>
          <div>
            <p className="text-[10px] text-white/50 uppercase tracking-widest leading-none">Diforma In Store</p>
            <p className="text-sm font-bold leading-tight">POP Prompt Builder</p>
          </div>
        </Link>
        <span className="text-white/30">/</span>
        <span className="text-white/70 text-sm">Nuevo Proyecto</span>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-brand-text">Nuevo Proyecto POP</h1>
          <p className="text-brand-muted text-sm mt-1">
            Completa los datos básicos para iniciar el proceso de generación del prompt.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project info card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-border">
            <h2 className="font-semibold text-brand-text mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-accent text-white text-xs flex items-center justify-center font-bold">1</span>
              Datos del Proyecto
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-brand-text/70 uppercase tracking-wide mb-1.5">
                  Código del Proyecto *
                </label>
                <input
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  placeholder="DIF-2025-001"
                  required
                  className="w-full border border-brand-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent transition-colors font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-text/70 uppercase tracking-wide mb-1.5">
                  Nombre del Proyecto *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Floor Display Nestlé Q3"
                  required
                  className="w-full border border-brand-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-text/70 uppercase tracking-wide mb-1.5">
                  Cliente *
                </label>
                <input
                  name="client"
                  value={form.client}
                  onChange={handleChange}
                  placeholder="Nestlé Colombia"
                  required
                  className="w-full border border-brand-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-text/70 uppercase tracking-wide mb-1.5">
                  Producto / SKU *
                </label>
                <input
                  name="product"
                  value={form.product}
                  onChange={handleChange}
                  placeholder="Coffee-Mate Hazelnut 400g"
                  required
                  className="w-full border border-brand-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-text/70 uppercase tracking-wide mb-1.5">
                  Diseñador *
                </label>
                <input
                  name="designer"
                  value={form.designer}
                  onChange={handleChange}
                  placeholder="Ana García"
                  required
                  className="w-full border border-brand-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-text/70 uppercase tracking-wide mb-1.5">
                  Ejecutivo Comercial *
                </label>
                <input
                  name="executive"
                  value={form.executive}
                  onChange={handleChange}
                  placeholder="Fernando Rico"
                  required
                  className="w-full border border-brand-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Render mode */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-border">
            <h2 className="font-semibold text-brand-text mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-accent text-white text-xs flex items-center justify-center font-bold">2</span>
              Modo de Presentación
            </h2>
            <p className="text-brand-muted text-xs mb-4">
              Define el tipo de render que necesitas. Esto guiará todas las decisiones de IA.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {RENDER_MODES.map((mode) => (
                <button
                  key={mode.value}
                  type="button"
                  onClick={() => setRenderMode(mode.value)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    renderMode === mode.value
                      ? 'border-brand-accent bg-brand-accent/5'
                      : 'border-brand-border hover:border-brand-accent/40'
                  }`}
                >
                  <div className="text-2xl mb-2">{mode.icon}</div>
                  <p className={`font-semibold text-sm ${renderMode === mode.value ? 'text-brand-accent' : 'text-brand-text'}`}>
                    {mode.label}
                  </p>
                  <p className="text-brand-muted text-xs mt-1 leading-snug">{mode.description}</p>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <Link
              href="/dashboard"
              className="flex-1 text-center py-3 border-2 border-brand-border text-brand-muted hover:border-brand-accent/40 rounded-xl transition-colors text-sm font-medium"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={!isValid || loading}
              className="flex-1 bg-brand-accent hover:bg-brand-accent2 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors text-sm shadow-sm"
            >
              {loading ? 'Creando...' : 'Crear Proyecto →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
