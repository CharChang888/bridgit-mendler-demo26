import { useEffect, useState } from 'react'

const MESSAGE = `Bridgit, what you're building at Northwood Space is insanely cool, so we thought it'd be fun to reach out to our fellow Trojan via this website we coded personally for you.

DEMO 26 is the largest student-organised startup conference in SoCal hosted by TroyLabs at USC on April 22nd 2026.

We cordially invite you to be our Keynote Speaker for DEMO 26.

Just as you're building the data highway between Earth and space, we're building the pipeline connecting student founders with resources to help them grow, scale and raise.

Will you join us on our mission?`

type DashboardPopupProps = {
  open: boolean
  onClose: () => void
}

export default function DashboardPopup({ open, onClose }: DashboardPopupProps) {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (open) {
      setMounted(true)
      const id = setTimeout(() => setVisible(true), 20)
      return () => clearTimeout(id)
    } else {
      setVisible(false)
      const id = setTimeout(() => setMounted(false), 300)
      return () => clearTimeout(id)
    }
  }, [open])

  if (!mounted) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-modal="true"
      role="dialog"
      aria-labelledby="dashboard-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Close message"
      />

      {/* Satellite dashboard panel */}
      <div
        className={`relative max-h-[85vh] w-full max-w-lg overflow-hidden rounded-lg border-2 border-emerald-500/40 bg-slate-900/95 shadow-[0_0_40px_rgba(0,255,200,0.08),inset_0_0_60px_rgba(0,0,0,0.4)] transition-transform duration-300 ${
          visible ? 'scale-100' : 'scale-95'
        }`}
        style={{
          boxShadow:
            '0 0 0 1px rgba(16, 185, 129, 0.2), 0 0 40px rgba(0,255,200,0.06), inset 0 0 80px rgba(0,0,0,0.5)',
        }}
      >
        {/* Dashboard header bar */}
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
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-slate-500/50 bg-slate-700/50 px-2 py-1 text-xs text-slate-300 hover:bg-slate-600/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
          >
            Close
          </button>
        </div>

        {/* Scan line overlay for CRT feel */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            background:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,200,0.15) 2px, rgba(0,255,200,0.15) 4px)',
          }}
        />

        {/* Message body */}
        <div className="relative max-h-[calc(85vh-52px)] overflow-y-auto p-5">
          <p className="whitespace-pre-line text-sm leading-relaxed text-slate-200/95 sm:text-base">
            {MESSAGE}
          </p>
        </div>
      </div>
    </div>
  )
}
