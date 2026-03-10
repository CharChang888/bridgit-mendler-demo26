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
    try {
      document.getElementById('workshop-section')?.scrollIntoView({ behavior: 'smooth' })
    } catch {
      // ignore DOM errors on scroll
    }
  }

  useEffect(() => {
    if (hasClickedHellYes) return

    const onScroll = () => {
      requestAnimationFrame(() => {
        const el = sectionRef.current
        if (!el) return

        const rect = el.getBoundingClientRect()
        const sectionTop = rect.top + window.scrollY
        const sectionHeight = rect.height
        let maxScroll = sectionTop + sectionHeight - window.innerHeight
        if (maxScroll < 0) return
        const maxAllowed = document.documentElement.scrollHeight - window.innerHeight
        if (Number.isFinite(maxAllowed) && maxScroll > maxAllowed) maxScroll = maxAllowed
        if (!Number.isFinite(maxScroll) || maxScroll < 0) return
        if (window.scrollY > maxScroll) {
          window.scrollTo(0, maxScroll)
        }
      })
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
        className="relative z-10 mx-4 w-full max-w-lg overflow-hidden rounded-lg border-2 border-amber-700/80 bg-slate-900/95 shadow-[0_0_40px_rgba(180,83,9,0.08),inset_0_0_60px_rgba(0,0,0,0.4)] sm:mx-6 sm:max-w-xl md:max-w-2xl"
        style={{
          boxShadow:
            '0 0 0 1px rgba(180, 83, 9, 0.25), 0 0 40px rgba(180, 83, 9, 0.06), inset 0 0 80px rgba(0,0,0,0.5)',
        }}
      >
        <div className="flex items-center justify-between border-b border-amber-700/60 bg-slate-800/80 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-400/80" />
            <span
              id="dashboard-title"
              className="text-xs font-semibold uppercase tracking-widest text-amber-200/90"
            >
              Incoming transmission
            </span>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            background:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(180,83,9,0.15) 2px, rgba(180,83,9,0.15) 4px)',
          }}
        />

        <div className="relative max-h-[70vh] overflow-y-auto p-5 sm:max-h-none sm:overflow-visible sm:p-6">
          <p className="font-poppins whitespace-pre-line text-sm leading-relaxed text-slate-200/95 sm:text-base">
            {MESSAGE}
          </p>
          <button
            type="button"
            onClick={scrollToWorkshop}
            data-hell-yes-twinkle
            className="mt-4 rounded-lg border-2 border-amber-700/80 bg-amber-600/30 px-4 py-2 text-sm font-semibold text-amber-100 transition-colors hover:border-amber-600 hover:bg-amber-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600/60"
          >
            let&apos;s launch!
          </button>
        </div>
      </div>
    </section>
  )
}
