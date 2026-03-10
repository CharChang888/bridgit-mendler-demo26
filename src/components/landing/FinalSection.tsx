import headshotImg from '../../assets/images/bridgitmendlerheadshot.jpg'
import launchImg from '../../assets/images/LAUNCHF25.JPG'
import troylabsLogoImg from '../../assets/images/troylabsLogo.svg'
import StarsBackground from './StarsBackground'

export default function FinalSection() {
  return (
    <section
      className="relative min-h-dvh w-full overflow-hidden bg-[linear-gradient(to_bottom,#020617,#020617_40%,#020617_60%,#000000_100%)]"
      aria-labelledby="final-cta"
    >
      <StarsBackground />

      {/* Main content: two frames + CTA + button, centered */}
      <div className="relative z-10 mx-auto flex min-h-dvh max-w-6xl flex-col items-center justify-center px-5 py-24 pt-32 sm:px-6">
        {/* Two image frames side by side */}
        <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-6 sm:flex-row sm:items-center sm:gap-8">
          {/* Left: Bridgit headshot — smaller frame */}
          <div className="flex shrink-0 justify-center">
            <div className="overflow-hidden rounded-xl border-2 border-amber-600/90 shadow-lg">
              <img
                src={headshotImg}
                alt="Bridgit Mendler"
                className="h-auto w-[240px] object-cover sm:w-[280px]"
                draggable={false}
              />
            </div>
          </div>
          {/* Right: LAUNCH F25 group photo — larger frame, top slightly above headshot */}
          <div className="flex flex-1 justify-center">
            <div className="overflow-hidden rounded-xl border-2 border-amber-600/90 shadow-lg">
              <img
                src={launchImg}
                alt="TroyLabs LAUNCH Fall 2025"
                className="h-auto w-full max-w-[360px] object-cover sm:max-w-[420px]"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* CTA text */}
        <p
          id="final-cta"
          className="font-poppins mt-12 max-w-2xl text-center text-lg font-medium leading-relaxed text-slate-200 sm:text-xl md:text-2xl"
        >
          Bridgit, will you return to your alma mater and join us as our Keynote Speaker for DEMO 26?
        </p>

        {/* Button */}
        <a
          href="https://doorlist.app/e/ddeSyII?s=thJ5tXmVfM"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-block rounded-xl border-2 border-amber-700/80 bg-amber-800 px-8 py-3.5 text-lg font-semibold tracking-wide text-slate-100 transition-colors hover:border-amber-600 hover:bg-amber-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/80"
        >
          let&apos;s do it!
        </a>
      </div>

      {/* Footer: TROYLABS left, envelope right */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-4 sm:px-6">
        <img
          src={troylabsLogoImg}
          alt="TroyLabs"
          className="h-6 w-auto opacity-90 drop-shadow-[0_10px_28px_rgba(0,0,0,0.55)] sm:h-7"
          draggable={false}
        />
        <a
          href="mailto:ctchang@usc.edu?subject=Bridgit%20Mendler%20Coming%20to%20DEMO26!"
          className="rounded p-1.5 text-slate-400 transition-colors hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60"
          aria-label="Contact"
        >
          <EnvelopeIcon className="h-6 w-6 sm:h-7 sm:w-7" />
        </a>
      </footer>
    </section>
  )
}

function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
