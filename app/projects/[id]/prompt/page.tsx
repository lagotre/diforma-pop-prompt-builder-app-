'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/types'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
        copied
          ? 'border-brand-success bg-brand-success/10 text-brand-success'
          : 'border-brand-border text-brand-muted hover:border-brand-accent hover:text-brand-accent'
      }`}
    >
      {copied ? '✓ Copiado' : 'Copiar'}
    </button>
  )
}

function PromptBlock({ title, label, content, accent = false }: {
  title: string; label: string; content: string; accent?: boolean
}) {
  return (
    <div className={`rounded-2xl border ${accent ? 'border-brand-accent/40 bg-brand-accent/3' : 'border-brand-border bg-white'}`}>
      <div className={`flex items-center justify-between px-5 py-3.5 border-b ${accent ? 'border-brand-accent/20' : 'border-brand-border'}`}>
        <div>
          <span className={`text-[10px] font-bold uppercase tracking-widest ${accent ? 'text-brand-accent' : 'text-brand-muted'}`}>
            {label}
          </span>
          <p className="font-semibold text-brand-text text-sm">{title}</p>
        </div>
        <CopyButton text={content} />
      </div>
      <pre className="px-5 py-4 text-sm text-brand-text whitespace-pre-wrap font-sans leading-relaxed">
        {content}
      </pre>
    </div>
  )
}

export default function PromptPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [project, setProject] = useState<Project | null>(null)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then(r => r.json())
      .then((p: Project) => {
        if (!p.generatedPrompts) {
          router.push(`/projects/${id}`)
          return
        }
        setProject(p)
      })
      .catch(() => router.push('/dashboard'))
  }, [id, router])

  const handleDownloadPDF = async () => {
    if (!project?.generatedPrompts) return
    setDownloading(true)

    const { pdf } = await import('@react-pdf/renderer')
    const { DiformaPDFDocument } = await import('@/components/prompt/PDFDocument')

    const blob = await pdf(<DiformaPDFDocument project={project} />).toBlob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${project.code}-prompt.pdf`
    a.click()
    URL.revokeObjectURL(url)
    setDownloading(false)
  }

  const copyAll = async () => {
    if (!project?.generatedPrompts) return
    const { main, variantA, variantB, technicalBrief, troubleshooting } = project.generatedPrompts
    const text = [
      '═══ PROMPT PRINCIPAL ═══',
      main,
      '',
      '═══ VARIANTE A ═══',
      variantA,
      '',
      '═══ VARIANTE B ═══',
      variantB,
      '',
      '═══ MINI-BRIEF TÉCNICO ═══',
      technicalBrief,
      '',
      '═══ TROUBLESHOOTING ═══',
      ...troubleshooting.map(t => `• ${t}`),
    ].join('\n')
    await navigator.clipboard.writeText(text)
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-brand-surface flex items-center justify-center">
        <div className="text-brand-muted animate-pulse">Generando prompts...</div>
      </div>
    )
  }

  const { generatedPrompts: gp } = project

  return (
    <div className="min-h-screen bg-brand-surface">
      {/* Header */}
      <div className="bg-brand-dark text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-white rounded-lg px-2 py-1">
              <Image src="/logo-diforma4.jpg" alt="Diforma Group" width={88} height={36} className="object-contain" />
            </div>
            <p className="hidden sm:block text-sm font-bold leading-tight">POP Prompt Builder</p>
          </Link>
          <span className="text-white/30">/</span>
          <div>
            <p className="text-xs text-white/50 font-mono">{project.code}</p>
            <p className="text-sm font-semibold">{project.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={copyAll}
            className="text-xs border border-white/20 hover:border-white/50 text-white/70 hover:text-white px-3 py-1.5 rounded-lg transition-all"
          >
            Copiar todo
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accent2 disabled:opacity-60 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            {downloading ? (
              'Generando PDF...'
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Descargar PDF
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
        {/* Project summary bar */}
        <div className="bg-white rounded-2xl p-4 border border-brand-border shadow-sm flex flex-wrap gap-x-6 gap-y-1.5 text-xs">
          <span className="font-mono text-brand-muted font-bold">{project.code}</span>
          <span><strong className="text-brand-text/60">Cliente:</strong> {project.client}</span>
          <span><strong className="text-brand-text/60">Producto:</strong> {project.product}</span>
          <span><strong className="text-brand-text/60">Diseñador:</strong> {project.designer}</span>
          <span><strong className="text-brand-text/60">Ejecutivo:</strong> {project.executive}</span>
          <span className="capitalize"><strong className="text-brand-text/60">Modo:</strong> {project.renderMode}</span>
          <span>
            <strong className="text-brand-text/60">Nano Banana:</strong>{' '}
            {project.phase4?.model === 'pro' ? 'Nano Banana 2 Pro' : 'Nano Banana (Flash)'}
          </span>
          <span>
            <strong className="text-brand-text/60">Ratio:</strong> {project.phase4?.aspectRatio}
          </span>
          <span>
            <strong className="text-brand-text/60">Resolución:</strong> {project.phase4?.resolution}
          </span>
        </div>

        {/* Prompts */}
        {gp && (
          <>
            <PromptBlock
              label="Prompt Principal"
              title="Versión recomendada — copiar y pegar en Nano Banana"
              content={gp.main}
              accent
            />
            <PromptBlock
              label="Variante A"
              title="Ángulo o encuadre alternativo"
              content={gp.variantA}
            />
            <PromptBlock
              label="Variante B"
              title="Contexto alternativo (render comercial ↔ in-store)"
              content={gp.variantB}
            />

            {/* Technical brief */}
            <div className="bg-brand-dark rounded-2xl border border-white/10">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Mini-Brief</span>
                  <p className="font-semibold text-white text-sm">Resumen Técnico para Producción</p>
                </div>
                <CopyButton text={gp.technicalBrief} />
              </div>
              <pre className="px-5 py-4 text-sm text-white/80 whitespace-pre-wrap font-mono leading-relaxed">
                {gp.technicalBrief}
              </pre>
            </div>

            {/* Troubleshooting */}
            <div className="bg-white rounded-2xl border border-brand-border shadow-sm">
              <div className="px-5 py-3.5 border-b border-brand-border">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Troubleshooting</span>
                <p className="font-semibold text-brand-text text-sm">Si el render falla, ajustar así:</p>
              </div>
              <ul className="px-5 py-4 space-y-2">
                {gp.troubleshooting.map((tip, i) => (
                  <li key={i} className="flex gap-2 text-sm text-brand-muted">
                    <span className="text-brand-accent shrink-0">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Back + Edit buttons */}
        <div className="flex gap-3 pt-2">
          <Link
            href="/dashboard"
            className="px-5 py-2.5 border-2 border-brand-border text-brand-muted hover:border-brand-accent/40 rounded-xl transition-colors text-sm font-medium"
          >
            ← Dashboard
          </Link>
          <Link
            href={`/projects/${id}`}
            className="px-5 py-2.5 border-2 border-brand-border text-brand-muted hover:border-brand-accent/40 rounded-xl transition-colors text-sm font-medium"
          >
            Editar Brief
          </Link>
        </div>
      </div>
    </div>
  )
}
