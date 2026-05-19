# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

```bash
npm run dev      # Desarrollo local (http://localhost:3000)
npm run build    # Build de producción
npm run lint     # ESLint
npx tsc --noEmit # Type check sin compilar
```

## Stack

- **Next.js 16** App Router + TypeScript
- **Tailwind CSS v4** — configuración via `@theme` en `globals.css` (no hay `tailwind.config.ts`)
- **NextAuth v5 (beta)** — Google OAuth, restringido a `@grupodiforma.com`
- **Supabase** — PostgreSQL como base de datos, cliente lazy en `lib/supabase.ts`
- **@react-pdf/renderer** — generación de PDF en cliente (import dinámico en prompt page)

## Variables de entorno requeridas

Copiar `.env.local.example` a `.env.local` y completar:
- `AUTH_SECRET` — secret de NextAuth
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — Google OAuth Console
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — proyecto Supabase

## Base de datos

Ejecutar `supabase-schema.sql` en Supabase > SQL Editor antes del primer uso. Incluye tabla `projects`, índices, RLS y trigger de `updated_at`.

## Arquitectura del flujo

```
/login               → Google OAuth (solo @grupodiforma.com)
/dashboard           → Lista de proyectos del usuario
/projects/new        → Formulario de datos básicos (code, name, client, product, designer, executive, renderMode)
/projects/[id]       → Wizard de 4 fases (client component, guarda en Supabase por fase)
/projects/[id]/prompt → Prompts generados + descarga PDF
```

## Generación de prompts

`lib/prompt-builder.ts` toma los datos de las 4 fases y construye:
- **main** — prompt principal en inglés (fórmula Subject + Action + Location + Composition + Style)
- **variantA** — ángulo alternativo
- **variantB** — modo de presentación alternativo (commercial ↔ instore)
- **technicalBrief** — resumen en español para producción
- **troubleshooting** — checklist de ajustes comunes

## Colores de marca (Tailwind)

Definidos en `app/globals.css` dentro de `@theme {}`:
- `brand-dark` (#0D1B2A) — fondo oscuro, header nav
- `brand-navy` (#1A3A5C) — azul corporativo secundario
- `brand-accent` (#E8672A) — naranja principal (CTAs, highlights)
- `brand-accent2` (#FF8B4E) — naranja hover
- `brand-surface` (#F5F7FA) — fondo de páginas
- `brand-muted` (#64748B) — texto secundario

## Deploy en Vercel

1. Conectar repo en vercel.com
2. Agregar las 5 variables de entorno en Settings > Environment Variables
3. Vercel detecta Next.js automáticamente — no requiere configuración adicional

## Notas importantes

- El cliente Supabase es lazy: no se inicializa hasta la primera llamada. Sin env vars el build funciona pero las API routes fallan en runtime.
- El PDF se genera 100% en el cliente (import dinámico) para evitar problemas con `@react-pdf/renderer` en el servidor.
- La restricción de dominio `@grupodiforma.com` está en el callback `signIn` de `auth.ts`.
- Para agregar la Claude API en el futuro: crear `app/api/refine-prompt/route.ts` y llamar desde la página de prompt.
