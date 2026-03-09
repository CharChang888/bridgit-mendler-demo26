import { useEffect, useRef, useState } from 'react'
import StarsBackground from './StarsBackground'

const MESSAGE = `Bridgit, what you're building at Northwood Space is insanely cool, so we thought it'd be fun to reach out to our fellow Trojan via this website we coded personally for you.

DEMO 26 is the largest student-organised startup conference in SoCal hosted by TroyLabs at USC on April 22nd 2026.

We cordially invite you to be our Keynote Speaker for DEMO 26.

Just as you're building the data highway between Earth and space, we're building the pipeline connecting student founders with resources to help them grow, scale and raise.

Will you join us on our mission?`

export default function InvitationSection() {
  const [hasClickedHellYes, setHasClickedHellYes] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  const scrollToWorkshop = () => {
    setHasClickedHellYes(true)
    document
      .getElementById('workshop-section')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (hasClickedHellYes) return

    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const sectionTop = rect.top + window.scrollY
      const sectionHeight = rect.height
      const maxScroll = sectionTop + sectionHeight - window.innerHeight
      if (maxScroll < 0) return
      if (window.scrollY > maxScroll) {
        window.scrollTo(0, maxScroll)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: false })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [hasClickedHellYes])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-[#0b1220]"
      aria-labelledby="dashboard-title"
    >
      <StarsBackground />

      {/* Satellite dashboard panel — scrolls with page */}
      <div
        className="relative z-10 mx-4 w-full max-w-lg overflow-hidden rounded-lg border-2 border-emerald-500/40 bg-slate-900/95 shadow-[0_0_40px_rgba(0,255,200,0.08),inset_0_0_60px_rgba(0,0,0,0.4)]"
        style={{
          boxShadow:
            '0 0 0 1px rgba(16, 185, 129, 0.2), 0 0 40px rgba(0,255,200,0.06), inset 0 0 80px rgba(0,0,0,0.5)',
        }}
      >
        <div className="flex items-center justify-between border-b border-emerald-500/30 bg-slate-800/80 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
            <span
              id="dashboard-title"
              className="text-xs font-semibold uppercase tracking-widest text-emerald-300/90"
            >
              Incoming transmission
            </span>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            background:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,200,0.15) 2px, rgba(0,255,200,0.15) 4px)',
          }}
        />

        <div className="relative max-h-[70vh] overflow-y-auto p-5">
          <p className="whitespace-pre-line text-sm leading-relaxed text-slate-200/95 sm:text-base">
            {MESSAGE}
          </p>
          <button
            type="button"
            onClick={scrollToWorkshop}
            data-hell-yes-twinkle
            className="mt-4 rounded-lg border-2 border-emerald-500/50 bg-emerald-600/30 px-4 py-2 text-sm font-semibold text-emerald-100 transition-colors hover:border-emerald-400 hover:bg-emerald-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
          >
            hell yes!
          </button>
        </div>
      </div>
    </section>
  )
}
