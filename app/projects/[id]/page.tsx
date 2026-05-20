'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Project, Phase1Data, Phase2Data, Phase3Data, Phase4Data } from '@/types'
import {
  COMMERCIAL_OBJECTIVES, CHANNELS, GEOGRAPHIC_MARKETS,
  LIFESPANS, getCategoriesForLifespan, getTypesForCategoryAndLifespan, getMaterialsForTypeAndLifespan,
  CAMERA_ANGLES, LIGHTING_OPTIONS, MOODS, COLOR_GRADINGS, ASPECT_RATIOS,
} from '@/lib/utils'
import type { Lifespan } from '@/types'

const PHASES = [
  { num: 1, label: 'Brief Estratégico', desc: 'Objetivo, marca, canal' },
  { num: 2, label: 'Brief Técnico', desc: 'Tipo POP, materiales, estructura' },
  { num: 3, label: 'Dirección Creativa', desc: 'Ángulo, iluminación, mood' },
  { num: 4, label: 'Specs Nano Banana', desc: 'Ratio, resolución, modelo' },
]

export default function ProjectWizardPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [project, setProject] = useState<Project | null>(null)
  const [phase, setPhase] = useState(1)
  const [saving, setSaving] = useState(false)

  const [p1, setP1] = useState<Phase1Data>({
    commercialObjectives: [], brandSector: '', featuredProducts: '',
    shopperTarget: '', channel: '', season: '', geographicMarket: '',
  })
  const [p2, setP2] = useState<Phase2Data>({
    lifespan: '', popCategory: '', popSubtype: '', materials: [],
    dimensions: { height: '', width: '', depth: '' },
    hasHeader: true, headerType: '', hasBase: true, hasSidePanels: true,
    shelvesCount: '', facingsPerShelf: '', totalSKUs: '',
    brandingRatio: '30', shelfBranding: true, internalLighting: false, lightingType: '',
  })
  const [p3, setP3] = useState<Phase3Data>({
    cameraAngle: 'three-quarter-35', frameDistance: '', lighting: 'studio-3point',
    cameraSpecs: '', mood: '', colorGrading: 'clean-commercial', referenceNotes: '',
  })
  const [p4, setP4] = useState<Phase4Data>({
    aspectRatio: '4:5', resolution: '2K', model: 'pro',
    displayText: '', displayTextFont: '',
  })

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then(r => r.json())
      .then((p: Project) => {
        setProject(p)
        setPhase(p.currentPhase ?? 1)
        if (p.phase1) setP1(p.phase1)
        if (p.phase2) setP2(p.phase2)
        if (p.phase3) setP3(p.phase3)
        if (p.phase4) setP4(p.phase4)
      })
      .catch(() => router.push('/dashboard'))
  }, [id, router])

  const savePhase = async (phaseNum: number, data: unknown, nextPhase: number, isLast = false) => {
    setSaving(true)
    const phaseKey = `phase${phaseNum}`
    const body: Record<string, unknown> = {
      [phaseKey]: data,
      currentPhase: nextPhase,
      status: isLast ? 'in_progress' : 'in_progress',
    }

    if (isLast) {
      const { buildPrompts } = await import('@/lib/prompt-builder')
      const prompts = buildPrompts(project!.renderMode, p1, p2, p3, p4)
      body.generatedPrompts = prompts
      body.status = 'complete'
    }

    await fetch(`/api/projects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (isLast) {
      router.push(`/projects/${id}/prompt`)
    } else {
      setPhase(nextPhase)
      setSaving(false)
    }
  }

  const toggleObjective = (obj: string) => {
    setP1(prev => ({
      ...prev,
      commercialObjectives: prev.commercialObjectives.includes(obj)
        ? prev.commercialObjectives.filter(o => o !== obj)
        : [...prev.commercialObjectives, obj],
    }))
  }

  const toggleMaterial = (mat: string) => {
    setP2(prev => ({
      ...prev,
      materials: prev.materials.includes(mat)
        ? prev.materials.filter(m => m !== mat)
        : [...prev.materials, mat],
    }))
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-brand-surface flex items-center justify-center">
        <div className="text-brand-muted animate-pulse">Cargando proyecto...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-surface">
      {/* Header */}
      <div className="bg-brand-dark text-white px-6 py-4 flex items-center gap-3 shadow-lg">
        <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full border-2 border-brand-accent flex items-center justify-center">
            <div className="w-3.5 h-3.5 rounded-full bg-brand-accent" />
          </div>
          <div className="hidden sm:block">
            <p className="text-[10px] text-white/50 uppercase tracking-widest leading-none">Diforma In Store</p>
            <p className="text-sm font-bold leading-tight">POP Prompt Builder</p>
          </div>
        </Link>
        <span className="text-white/30">/</span>
        <div>
          <p className="text-xs text-white/50 font-mono">{project.code}</p>
          <p className="text-sm font-semibold">{project.name}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar — Phase Progress */}
          <aside className="w-56 shrink-0 hidden lg:block">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-brand-border sticky top-6">
              <p className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-4">Fases</p>
              <div className="space-y-1">
                {PHASES.map((p) => (
                  <button
                    key={p.num}
                    onClick={() => phase > p.num && setPhase(p.num)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-start gap-3 ${
                      p.num === phase
                        ? 'bg-brand-accent/10 border border-brand-accent/30'
                        : p.num < phase
                        ? 'hover:bg-brand-surface cursor-pointer'
                        : 'opacity-40 cursor-not-allowed'
                    }`}
                  >
                    <span className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      p.num < phase
                        ? 'bg-brand-success text-white'
                        : p.num === phase
                        ? 'bg-brand-accent text-white'
                        : 'bg-brand-border text-brand-muted'
                    }`}>
                      {p.num < phase ? '✓' : p.num}
                    </span>
                    <div>
                      <p className={`text-xs font-semibold ${p.num === phase ? 'text-brand-accent' : 'text-brand-text'}`}>
                        {p.label}
                      </p>
                      <p className="text-[10px] text-brand-muted">{p.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Project info */}
              <div className="mt-6 pt-4 border-t border-brand-border space-y-1.5">
                <p className="text-xs text-brand-muted"><span className="font-medium">Cliente:</span> {project.client}</p>
                <p className="text-xs text-brand-muted"><span className="font-medium">Producto:</span> {project.product}</p>
                <p className="text-xs text-brand-muted capitalize"><span className="font-medium">Modo:</span> {project.renderMode}</p>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Mobile phase indicator */}
            <div className="lg:hidden mb-4 flex gap-2">
              {PHASES.map(p => (
                <div key={p.num} className={`h-1.5 flex-1 rounded-full ${p.num <= phase ? 'bg-brand-accent' : 'bg-brand-border'}`} />
              ))}
            </div>

            {/* Phase 1 */}
            {phase === 1 && (
              <PhaseCard
                title="Fase 1 — Brief Estratégico"
                subtitle="¿Por qué existe este display?"
                onNext={() => savePhase(1, p1, 2)}
                saving={saving}
                valid={p1.commercialObjectives.length > 0 && !!p1.channel && !!p1.geographicMarket}
              >
                <Field label="Objetivo(s) Comercial(es) *">
                  <div className="grid grid-cols-2 gap-2">
                    {COMMERCIAL_OBJECTIVES.map(obj => (
                      <button
                        key={obj}
                        type="button"
                        onClick={() => toggleObjective(obj)}
                        className={`px-3 py-2 text-xs text-left rounded-lg border transition-all ${
                          p1.commercialObjectives.includes(obj)
                            ? 'border-brand-accent bg-brand-accent/10 text-brand-accent font-medium'
                            : 'border-brand-border text-brand-muted hover:border-brand-accent/40'
                        }`}
                      >
                        {obj}
                      </button>
                    ))}
                  </div>
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Sector de la Marca">
                    <input
                      value={p1.brandSector}
                      onChange={e => setP1(prev => ({ ...prev, brandSector: e.target.value }))}
                      placeholder="FMCG, Beauty, Bebidas..."
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Producto(s) Destacado(s)">
                    <input
                      value={p1.featuredProducts}
                      onChange={e => setP1(prev => ({ ...prev, featuredProducts: e.target.value }))}
                      placeholder="Coffee-Mate Hazelnut 400g"
                      className={inputCls}
                    />
                  </Field>
                </div>

                <Field label="Shopper Target">
                  <textarea
                    value={p1.shopperTarget}
                    onChange={e => setP1(prev => ({ ...prev, shopperTarget: e.target.value }))}
                    placeholder="Ej: Mujer 35-50 años, ama de casa, busca sabor premium para el café del hogar..."
                    rows={2}
                    className={inputCls}
                  />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Canal *">
                    <select
                      value={p1.channel}
                      onChange={e => setP1(prev => ({ ...prev, channel: e.target.value }))}
                      className={inputCls}
                    >
                      <option value="">Seleccionar canal...</option>
                      {CHANNELS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label="Temporada / Ocasión">
                    <input
                      value={p1.season}
                      onChange={e => setP1(prev => ({ ...prev, season: e.target.value }))}
                      placeholder="Navidad, Día de la Madre, Cotidiano..."
                      className={inputCls}
                    />
                  </Field>
                </div>

                <Field label="Mercado Geográfico *">
                  <div className="flex flex-wrap gap-2">
                    {GEOGRAPHIC_MARKETS.map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setP1(prev => ({ ...prev, geographicMarket: m }))}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                          p1.geographicMarket === m
                            ? 'border-brand-accent bg-brand-accent/10 text-brand-accent font-medium'
                            : 'border-brand-border text-brand-muted hover:border-brand-accent/40'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </Field>
              </PhaseCard>
            )}

            {/* Phase 2 */}
            {phase === 2 && (
              <PhaseCard
                title="Fase 2 — Brief Técnico del Display"
                subtitle="¿Qué es exactamente el display?"
                onNext={() => savePhase(2, p2, 3)}
                onBack={() => setPhase(1)}
                saving={saving}
                valid={!!p2.lifespan && !!p2.popCategory && !!p2.popSubtype && p2.materials.length > 0}
              >
                <Field label="Vida Útil del Display *">
                  <div className="grid grid-cols-3 gap-3">
                    {LIFESPANS.map(ls => (
                      <button
                        key={ls.value}
                        type="button"
                        onClick={() => setP2(prev => ({ ...prev, lifespan: ls.value, popCategory: '', popSubtype: '', materials: [] }))}
                        className={`px-3 py-3 text-left rounded-xl border-2 transition-all ${
                          p2.lifespan === ls.value
                            ? 'border-brand-accent bg-brand-accent/10'
                            : 'border-brand-border hover:border-brand-accent/40'
                        }`}
                      >
                        <p className={`text-xs font-bold ${p2.lifespan === ls.value ? 'text-brand-accent' : 'text-brand-text'}`}>
                          {ls.label}
                        </p>
                        <p className="text-[10px] text-brand-muted mt-0.5">{ls.sublabel}</p>
                        <p className="text-[10px] text-brand-muted/80 mt-1 leading-tight">{ls.desc}</p>
                      </button>
                    ))}
                  </div>
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Categoría POP *">
                    <select
                      value={p2.popCategory}
                      onChange={e => setP2(prev => ({ ...prev, popCategory: e.target.value, popSubtype: '', materials: [] }))}
                      disabled={!p2.lifespan}
                      className={inputCls}
                    >
                      <option value="">Seleccionar categoría...</option>
                      {p2.lifespan && getCategoriesForLifespan(p2.lifespan as Lifespan).map(c => (
                        <option key={c.value} value={c.value}>{c.emoji} {c.label}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Tipo de Display *">
                    <select
                      value={p2.popSubtype}
                      onChange={e => setP2(prev => ({ ...prev, popSubtype: e.target.value, materials: [] }))}
                      disabled={!p2.popCategory}
                      className={inputCls}
                    >
                      <option value="">Seleccionar tipo...</option>
                      {p2.popCategory && p2.lifespan && getTypesForCategoryAndLifespan(p2.popCategory, p2.lifespan as Lifespan).map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Materiales * (seleccionar todos los que apliquen)">
                  {p2.popSubtype && p2.lifespan ? (
                    <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                      {getMaterialsForTypeAndLifespan(p2.popCategory, p2.popSubtype, p2.lifespan as Lifespan).map(mat => (
                        <button
                          key={mat}
                          type="button"
                          onClick={() => toggleMaterial(mat)}
                          className={`px-2.5 py-1.5 text-xs text-left rounded-lg border transition-all ${
                            p2.materials.includes(mat)
                              ? 'border-brand-accent bg-brand-accent/10 text-brand-accent font-medium'
                              : 'border-brand-border text-brand-muted hover:border-brand-accent/40'
                          }`}
                        >
                          {mat}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-brand-muted italic py-3">
                      Selecciona vida útil, categoría y tipo de display para ver los materiales disponibles.
                    </p>
                  )}
                </Field>

                <Field label="Dimensiones (cm)">
                  <div className="grid grid-cols-3 gap-3">
                    {(['height', 'width', 'depth'] as const).map((dim) => (
                      <div key={dim}>
                        <label className="text-xs text-brand-muted block mb-1 capitalize">
                          {dim === 'height' ? 'Alto' : dim === 'width' ? 'Ancho' : 'Prof.'}
                        </label>
                        <input
                          type="number"
                          value={p2.dimensions[dim]}
                          onChange={e => setP2(prev => ({ ...prev, dimensions: { ...prev.dimensions, [dim]: e.target.value } }))}
                          placeholder="cm"
                          className={inputCls}
                        />
                      </div>
                    ))}
                  </div>
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Número de Bandejas / Shelves">
                    <input
                      type="number"
                      value={p2.shelvesCount}
                      onChange={e => setP2(prev => ({ ...prev, shelvesCount: e.target.value }))}
                      placeholder="4"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Facings por Bandeja">
                    <input
                      type="number"
                      value={p2.facingsPerShelf}
                      onChange={e => setP2(prev => ({ ...prev, facingsPerShelf: e.target.value }))}
                      placeholder="6"
                      className={inputCls}
                    />
                  </Field>
                </div>

                <Field label="Tipo de Cabezote / Header">
                  <div className="flex items-center gap-3 mb-2">
                    <input
                      type="checkbox"
                      id="hasHeader"
                      checked={p2.hasHeader}
                      onChange={e => setP2(prev => ({ ...prev, hasHeader: e.target.checked }))}
                      className="rounded border-brand-border accent-brand-accent w-4 h-4"
                    />
                    <label htmlFor="hasHeader" className="text-sm text-brand-text">El display lleva cabezote (header)</label>
                  </div>
                  {p2.hasHeader && (
                    <input
                      value={p2.headerType}
                      onChange={e => setP2(prev => ({ ...prev, headerType: e.target.value }))}
                      placeholder="Flat rectangular / Die-cut / 3D termoformado PETG / Banderola..."
                      className={inputCls}
                    />
                  )}
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="% Branding vs Producto">
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="10"
                        max="70"
                        step="5"
                        value={p2.brandingRatio}
                        onChange={e => setP2(prev => ({ ...prev, brandingRatio: e.target.value }))}
                        className="flex-1 accent-brand-accent"
                      />
                      <span className="text-sm font-bold text-brand-accent w-12 text-right">
                        {p2.brandingRatio}% / {100 - parseInt(p2.brandingRatio)}%
                      </span>
                    </div>
                    <p className="text-xs text-brand-muted mt-1">Branding / Producto (default 30/70)</p>
                  </Field>
                  <Field label="Iluminación Interna (LED)">
                    <div className="flex items-center gap-3 mb-2">
                      <input
                        type="checkbox"
                        id="hasLighting"
                        checked={p2.internalLighting}
                        onChange={e => setP2(prev => ({ ...prev, internalLighting: e.target.checked }))}
                        className="rounded border-brand-border accent-brand-accent w-4 h-4"
                      />
                      <label htmlFor="hasLighting" className="text-sm text-brand-text">Lleva iluminación LED</label>
                    </div>
                    {p2.internalLighting && (
                      <input
                        value={p2.lightingType}
                        onChange={e => setP2(prev => ({ ...prev, lightingType: e.target.value }))}
                        placeholder="LED strip / Lightbox / Neón flex..."
                        className={inputCls}
                      />
                    )}
                  </Field>
                </div>
              </PhaseCard>
            )}

            {/* Phase 3 */}
            {phase === 3 && (
              <PhaseCard
                title="Fase 3 — Dirección Creativa"
                subtitle="¿Cómo debe verse el render?"
                onNext={() => savePhase(3, p3, 4)}
                onBack={() => setPhase(2)}
                saving={saving}
                valid={!!p3.cameraAngle && !!p3.lighting}
              >
                <Field label="Ángulo de Cámara *">
                  <div className="grid grid-cols-2 gap-2">
                    {CAMERA_ANGLES.map(a => (
                      <button
                        key={a.value}
                        type="button"
                        onClick={() => setP3(prev => ({ ...prev, cameraAngle: a.value }))}
                        className={`px-3 py-2 text-xs text-left rounded-lg border transition-all ${
                          p3.cameraAngle === a.value
                            ? 'border-brand-accent bg-brand-accent/10 text-brand-accent font-medium'
                            : 'border-brand-border text-brand-muted hover:border-brand-accent/40'
                        }`}
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Iluminación *">
                  <div className="grid grid-cols-1 gap-2">
                    {LIGHTING_OPTIONS.map(l => (
                      <button
                        key={l.value}
                        type="button"
                        onClick={() => setP3(prev => ({ ...prev, lighting: l.value }))}
                        className={`px-3 py-2 text-xs text-left rounded-lg border transition-all ${
                          p3.lighting === l.value
                            ? 'border-brand-accent bg-brand-accent/10 text-brand-accent font-medium'
                            : 'border-brand-border text-brand-muted hover:border-brand-accent/40'
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Mood / Estética">
                    <div className="flex flex-wrap gap-1.5">
                      {MOODS.map(m => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setP3(prev => ({ ...prev, mood: m }))}
                          className={`px-2.5 py-1 text-xs rounded-lg border transition-all ${
                            p3.mood === m
                              ? 'border-brand-accent bg-brand-accent/10 text-brand-accent font-medium'
                              : 'border-brand-border text-brand-muted hover:border-brand-accent/40'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label="Color Grading">
                    <div className="space-y-1.5">
                      {COLOR_GRADINGS.map(g => (
                        <button
                          key={g.value}
                          type="button"
                          onClick={() => setP3(prev => ({ ...prev, colorGrading: g.value }))}
                          className={`w-full px-3 py-1.5 text-xs text-left rounded-lg border transition-all ${
                            p3.colorGrading === g.value
                              ? 'border-brand-accent bg-brand-accent/10 text-brand-accent font-medium'
                              : 'border-brand-border text-brand-muted hover:border-brand-accent/40'
                          }`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>

                <Field label="Notas de Referencias Visuales">
                  <textarea
                    value={p3.referenceNotes}
                    onChange={e => setP3(prev => ({ ...prev, referenceNotes: e.target.value }))}
                    placeholder="Ej: Se adjunta logo de marca (ref 1), packshot del producto (ref 2), key visual de campaña de Navidad (ref 3)..."
                    rows={3}
                    className={inputCls}
                  />
                  <p className="text-xs text-brand-muted mt-1">
                    Nano Banana acepta hasta 14 imágenes. Describe aquí qué adjuntarás y para qué.
                  </p>
                </Field>
              </PhaseCard>
            )}

            {/* Phase 4 */}
            {phase === 4 && (
              <PhaseCard
                title="Fase 4 — Specs Nano Banana"
                subtitle="Configuración técnica del modelo de IA"
                onNext={() => savePhase(4, { ...p4, displayText: p4.displayText }, 5, true)}
                nextLabel="Generar Prompts →"
                onBack={() => setPhase(3)}
                saving={saving}
                valid={!!p4.aspectRatio && !!p4.resolution}
              >
                <Field label="Aspect Ratio">
                  <div className="grid grid-cols-2 gap-2">
                    {ASPECT_RATIOS.map(r => (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => setP4(prev => ({ ...prev, aspectRatio: r.value }))}
                        className={`px-3 py-2 text-xs text-left rounded-lg border transition-all ${
                          p4.aspectRatio === r.value
                            ? 'border-brand-accent bg-brand-accent/10 text-brand-accent font-medium'
                            : 'border-brand-border text-brand-muted hover:border-brand-accent/40'
                        }`}
                      >
                        <span className="font-mono font-bold">{r.value}</span>
                        <span className="block text-[10px] mt-0.5 opacity-70">{r.label.split('—')[1]?.trim()}</span>
                      </button>
                    ))}
                  </div>
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Resolución">
                    <div className="flex gap-2">
                      {(['1K', '2K', '4K'] as const).map(res => (
                        <button
                          key={res}
                          type="button"
                          onClick={() => setP4(prev => ({ ...prev, resolution: res }))}
                          className={`flex-1 py-2.5 text-sm font-mono font-bold rounded-xl border transition-all ${
                            p4.resolution === res
                              ? 'border-brand-accent bg-brand-accent/10 text-brand-accent'
                              : 'border-brand-border text-brand-muted hover:border-brand-accent/40'
                          }`}
                        >
                          {res}
                        </button>
                      ))}
                    </div>
                    {p4.resolution === '4K' && (
                      <p className="text-xs text-amber-600 mt-1">4K requiere Nano Banana 2 Pro.</p>
                    )}
                  </Field>

                  <Field label="Modelo Recomendado">
                    <div className="space-y-2">
                      {[
                        { value: 'flash', label: 'Nano Banana (Flash)', desc: 'Rápido, bueno para ajustes con referencia' },
                        { value: 'pro', label: 'Nano Banana 2 Pro', desc: 'Alta fidelidad, texto legible, composición compleja' },
                      ].map(m => (
                        <button
                          key={m.value}
                          type="button"
                          onClick={() => setP4(prev => ({ ...prev, model: m.value as 'flash' | 'pro' }))}
                          className={`w-full px-3 py-2.5 text-left rounded-xl border transition-all ${
                            p4.model === m.value
                              ? 'border-brand-accent bg-brand-accent/10'
                              : 'border-brand-border hover:border-brand-accent/40'
                          }`}
                        >
                          <p className={`text-xs font-semibold ${p4.model === m.value ? 'text-brand-accent' : 'text-brand-text'}`}>
                            {m.label}
                          </p>
                          <p className="text-[10px] text-brand-muted mt-0.5">{m.desc}</p>
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>

                <Field label="Texto Visible en el Display (opcional)">
                  <input
                    value={p4.displayText}
                    onChange={e => setP4(prev => ({ ...prev, displayText: e.target.value }))}
                    placeholder='Ej: "20% OFF" · "NEW LAUNCH" · "AHORRA $5"'
                    className={inputCls}
                  />
                  {p4.displayText && (
                    <input
                      value={p4.displayTextFont}
                      onChange={e => setP4(prev => ({ ...prev, displayTextFont: e.target.value }))}
                      placeholder="Estilo de fuente: bold sans-serif condensed / brush script / serif clásica..."
                      className={`${inputCls} mt-2`}
                    />
                  )}
                  <p className="text-xs text-brand-muted mt-1">
                    Si el display lleva copy visible, escríbelo entre comillas exactamente como debe aparecer.
                  </p>
                </Field>

                <div className="bg-brand-navy/5 border border-brand-navy/20 rounded-xl p-4">
                  <p className="text-xs font-semibold text-brand-navy mb-2">Resumen del proyecto</p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-brand-muted">
                    <span><strong>Cliente:</strong> {project.client}</span>
                    <span><strong>Producto:</strong> {project.product}</span>
                    <span><strong>Modo:</strong> {project.renderMode}</span>
                    <span><strong>Display:</strong> {p2.popSubtype || p2.popCategory || '—'}</span>
                    <span><strong>Canal:</strong> {p1.channel || '—'}</span>
                    <span><strong>Mercado:</strong> {p1.geographicMarket || '—'}</span>
                  </div>
                </div>
              </PhaseCard>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const inputCls = 'w-full border border-brand-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent transition-colors bg-white'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-brand-text/70 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  )
}

function PhaseCard({
  title, subtitle, children, onNext, onBack, nextLabel = 'Siguiente →',
  saving, valid,
}: {
  title: string; subtitle: string; children: React.ReactNode
  onNext: () => void; onBack?: () => void; nextLabel?: string
  saving: boolean; valid: boolean
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-brand-border">
      <div className="px-6 py-5 border-b border-brand-border">
        <h2 className="font-bold text-brand-text text-lg">{title}</h2>
        <p className="text-brand-muted text-sm mt-0.5">{subtitle}</p>
      </div>

      <div className="px-6 py-5 space-y-5">
        {children}
      </div>

      <div className="px-6 py-4 border-t border-brand-border flex gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="px-5 py-2.5 border-2 border-brand-border text-brand-muted hover:border-brand-accent/40 rounded-xl transition-colors text-sm font-medium"
          >
            ← Atrás
          </button>
        )}
        <button
          onClick={onNext}
          disabled={!valid || saving}
          className="flex-1 bg-brand-accent hover:bg-brand-accent2 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition-colors text-sm shadow-sm"
        >
          {saving ? 'Guardando...' : nextLabel}
        </button>
      </div>
    </div>
  )
}
