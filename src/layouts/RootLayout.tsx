import type { PropsWithChildren } from 'react'

type RootLayoutProps = PropsWithChildren

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100">
      <header className="border-b border-white/10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <div className="text-sm font-semibold tracking-wide text-slate-100">
            Bridgit Mendler
          </div>
          <nav className="flex items-center gap-5 text-sm text-slate-300">
            <a className="hover:text-white" href="#">
              Home
            </a>
            <a className="hover:text-white" href="#">
              Media
            </a>
            <a className="hover:text-white" href="#">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>
    </div>
  )
}

