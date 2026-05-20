import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { signOut } from '@/auth'
import Link from 'next/link'
import Image from 'next/image'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/login')

  return (
    <div className="min-h-screen flex flex-col bg-brand-surface">
      {/* Top Nav */}
      <header className="bg-brand-dark text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Image src="/logo-diforma2.jpg" alt="Diforma Group" width={110} height={44} className="object-contain rounded-md" />
          <p className="text-sm font-bold leading-tight">POP Prompt Builder</p>
        </Link>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-white/50">Bienvenido</p>
            <p className="text-sm font-medium">{session.user?.name?.split(' ')[0]}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent font-bold text-sm">
            {session.user?.name?.[0]?.toUpperCase() ?? 'D'}
          </div>
          <form action={async () => {
            'use server'
            await signOut({ redirectTo: '/login' })
          }}>
            <button
              type="submit"
              className="text-white/60 hover:text-white text-xs transition-colors"
            >
              Salir
            </button>
          </form>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
