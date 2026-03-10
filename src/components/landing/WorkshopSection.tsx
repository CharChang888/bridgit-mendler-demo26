import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import greyrocketImg from '../../assets/images/greyrocket.png'
import rocketNoseconeImg from '../../assets/images/rocket-nosecone.png'
import rocketBodyImg from '../../assets/images/rocket-body.png'
import rocketThrusterImg from '../../assets/images/rocket-thruster.png'
import rocketFinsImg from '../../assets/images/rocket-fins.png'
import noseImg from '../../assets/images/nose.png'
import bodyImg from '../../assets/images/body.png'
import thrustersImg from '../../assets/images/thrusters.png'
import finsImg from '../../assets/images/fins.png'
import earthImg from '../../assets/images/Earth.png'
import finalRocketImg from '../../assets/images/final-rocket.png'

const ROCKET_IMAGES = [
  rocketNoseconeImg,
  rocketBodyImg,
  rocketThrusterImg,
  rocketFinsImg,
] as const

const PARTS = [
  { src: noseImg, alt: 'Nose cone' },
  { src: bodyImg, alt: 'Body' },
  { src: thrustersImg, alt: 'Thrusters' },
  { src: finsImg, alt: 'Fins' },
] as const

const PART_COPY: Record<number, string> = {
  0: `Your story of pivoting from Disney Channel Star to Philosophy Doctorate to space startup founder inspires us to break the status quo and relentlessly chase our passions.`,
  1: `Space is the new frontier. And we need more women building for space. Whilst we have a female founder building drones for the ISS in our accelerator right now, we believe you could empower more young founders to take the leap.`,
  2: `We recently hosted Abdo John Hajj from Type One Ventures, and we’d love to also get your thoughts on the power of humanities people building in deep-tech!`,
  3: `Just as you were “building antennas out of random crap [you] could find at Home Depot”, we’re a family of super scrappy builders too - come hang out with us!`,
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
}

export default function WorkshopSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [assembled, setAssembled] = useState(false)
  const [isLaunching, setIsLaunching] = useState(false)
  const [panelHidden, setPanelHidden] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const rocketRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const launchStartRectRef = useRef<DOMRect | null>(null)
  const [overlayRect, setOverlayRect] = useState<{
    left: number
    top: number
    width: number
    height: number
  } | null>(null)

  // 1s after "Assemble rocket", trigger launch (then animation runs in next effect)
  useEffect(() => {
    if (!assembled) return
    const t = window.setTimeout(() => setIsLaunching(true), 1000)
    return () => window.clearTimeout(t)
  }, [assembled])

  // When other sections are in view, gently fade the workshop rocket out.
  useEffect(() => {
    const sectionEl = sectionRef.current
    if (!sectionEl) return
    if (prefersReducedMotion()) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        const rocketEl = rocketRef.current
        if (!rocketEl) return
        if (isLaunching || overlayRect) return

        gsap.to(rocketEl, {
          autoAlpha: entry.isIntersecting ? 1 : 0,
          duration: 0.35,
          ease: 'power1.out',
          overwrite: 'auto',
        })
      },
      { threshold: 0.2 },
    )

    observer.observe(sectionEl)
    return () => observer.disconnect()
  }, [isLaunching, overlayRect])

  // Panel: show only when part is selected; fade out as launch begins
  useEffect(() => {
    if (!isLaunching) return
    if (selectedIndex === null) return
    if (panelHidden) return

    if (prefersReducedMotion()) {
      setPanelHidden(true)
      return
    }

    const el = panelRef.current
    if (!el) {
      setPanelHidden(true)
      return
    }

    gsap.to(el, {
      autoAlpha: 0,
      y: 12,
      duration: 0.35,
      ease: 'power1.out',
      onComplete: () => setPanelHidden(true),
    })
  }, [isLaunching, panelHidden, selectedIndex])

  // Panel: subtle animate-in when selecting a part
  useEffect(() => {
    if (selectedIndex === null) return
    if (panelHidden) return
    if (isLaunching) return
    if (prefersReducedMotion()) return
    const el = panelRef.current
    if (!el) return

    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 8, filter: 'blur(4px)' },
      { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.25, ease: 'power2.out' },
    )
  }, [isLaunching, panelHidden, selectedIndex])

  // When launch is triggered, capture start rect and mount overlay
  useEffect(() => {
    if (!isLaunching || !rocketRef.current) return
    const reducedMotion = prefersReducedMotion()
    if (reducedMotion) {
      document.getElementById('final-section')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    const startRect = rocketRef.current.getBoundingClientRect()
    launchStartRectRef.current = startRect
    setOverlayRect({
      left: startRect.left,
      top: startRect.top,
      width: startRect.width,
      height: startRect.height,
    })
  }, [isLaunching])

  // Animate overlay: fly up, scroll, then fade out (no final-section dock)
  useEffect(() => {
    if (!isLaunching) return
    if (!overlayRect) return
    if (!rocketRef.current || !overlayRef.current) return

    const reducedMotion = prefersReducedMotion()
    if (reducedMotion) return

    const startRect = launchStartRectRef.current
    if (!startRect) return

    const overlayEl = overlayRef.current
    const inSectionEl = rocketRef.current

    let fadeTimeout: number | null = null
    const tweens: Array<{ kill: () => void }> = []

    // Hide in-section rocket once overlay takes over
    gsap.set(inSectionEl, { opacity: 0 })
    gsap.set(overlayEl, { x: 0, y: 0, rotation: 0, scale: 1, transformOrigin: '50% 70%' })

    const flyUpTween = gsap.to(overlayEl, {
      y: -window.innerHeight * 1.15,
      rotation: 0,
      duration: 1.1,
      ease: 'power2.in',
      onComplete: () => {
        document.getElementById('final-section')?.scrollIntoView({ behavior: 'smooth' })

        // Give the scroll a moment to start, then fade the rocket overlay out.
        fadeTimeout = window.setTimeout(() => {
          const fadeTween = gsap.to(overlayEl, {
            autoAlpha: 0,
            duration: 0.45,
            ease: 'power1.out',
            overwrite: 'auto',
            onComplete: () => setOverlayRect(null),
          })
          tweens.push(fadeTween)
        }, 650)
      },
    })
    tweens.push(flyUpTween)

    return () => {
      if (fadeTimeout) window.clearTimeout(fadeTimeout)
      tweens.forEach((t) => t.kill())
    }
  }, [isLaunching, overlayRect])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh w-full overflow-hidden bg-[linear-gradient(to_bottom,#020617,#020617_40%,#020617_60%,#000000_100%)]"
      aria-labelledby="workshop-headline"
    >
      <div className="flex min-h-dvh flex-col md:relative">
        {/* Headline: stacked on mobile, absolute top-left on md+ */}
        <div
          id="workshop-headline"
          className="relative z-10 px-4 pt-6 pb-2 text-slate-100 md:absolute md:left-[8vw] md:top-[8vh] md:max-w-md md:px-0 md:pt-0 md:pb-0 sm:px-0"
        >
          <h2 className="text-2xl font-semibold tracking-wide sm:text-3xl md:text-4xl">
            Bridgit x TroyLabs
          </h2>
          <p className="mt-1 text-xl font-medium tracking-wide text-slate-200/95 sm:text-2xl md:text-3xl">
            Startup Building Workshop
          </p>
          <p className="mt-2 text-sm italic font-semibold tracking-wide text-amber-200/90 sm:text-base md:text-lg">
            reasons why we&apos;d love for YOU to speak at DEMO
          </p>
        </div>

        {/* Parts grid + assemble: stacked on mobile, absolute left on md+ */}
        <div className="relative z-10 flex flex-col items-center gap-4 px-4 py-4 md:absolute md:left-[6vw] md:top-[26vh] md:px-0 md:py-0">
          <div className="grid w-[38vw] min-w-[200px] max-w-[420px] grid-cols-2 gap-2 sm:gap-4 [touch-action:manipulation]">
          {PARTS.map((part, index) => (
          <button
            type="button"
            key={part.alt}
            onClick={() => setSelectedIndex((prev) => (prev === index ? null : index))}
            className={`flex min-h-[44px] min-w-[44px] aspect-square items-center justify-center overflow-hidden rounded-lg border-2 bg-slate-900/60 p-2 shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/80 active:scale-100 ${
              selectedIndex === index
                ? 'border-amber-800/80 hover:border-amber-700 hover:bg-slate-800/50'
                : 'border-slate-600/30 hover:border-slate-500/60 hover:bg-slate-800/70'
            }`}
            aria-pressed={selectedIndex === index}
            aria-label={`Select ${part.alt}`}
          >
            <img
              src={part.src}
              alt=""
              className="h-full w-full object-contain"
              draggable={false}
            />
          </button>
        ))}
        </div>
        <button
          type="button"
          onClick={() => setAssembled(true)}
          className="w-fit rounded-lg border-2 border-amber-700/80 bg-amber-900/40 px-5 py-2.5 text-lg font-semibold tracking-wide text-amber-200/95 transition-colors hover:border-amber-600 hover:bg-amber-800/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/80"
        >
          Assemble rocket
        </button>
        </div>

        {/* Rocket: stacked on mobile, absolute right half on md+ */}
        <div
          ref={rocketRef}
          className="relative z-10 flex min-h-[280px] items-end justify-center overflow-visible py-4 md:absolute md:bottom-[28vh] md:left-1/2 md:right-0 md:top-[12vh] md:min-h-0 md:py-0"
          {...(!isLaunching ? { 'data-rocket-bob': true } : {})}
        >
        <img
          src={
            assembled
              ? finalRocketImg
              : selectedIndex !== null
                ? ROCKET_IMAGES[selectedIndex]
                : greyrocketImg
          }
          alt="Assembled rocket"
          className={`h-full max-h-[95vh] w-auto max-w-[90vw] object-contain object-bottom transition-transform duration-200 sm:max-w-none ${
            assembled || selectedIndex !== null
              ? 'min-w-0 scale-110 sm:min-w-[520px] md:min-w-[640px]'
              : 'min-w-0 sm:min-w-[480px] md:min-w-[600px]'
          }`}
          draggable={false}
        />
        </div>

        {/* Dashboard: in flow on mobile (below rocket), absolute on md+ */}
        {selectedIndex !== null && !panelHidden ? (
          <div className="relative z-20 flex justify-center px-4 py-4 md:absolute md:bottom-[12vh] md:left-1/2 md:right-0 md:py-0">
          <div
            ref={panelRef}
            className="relative w-full max-w-md overflow-hidden rounded-lg border-2 border-amber-700/80 bg-slate-900/95 shadow-[0_0_40px_rgba(180,83,9,0.08),inset_0_0_60px_rgba(0,0,0,0.4)]"
            style={{
              boxShadow:
                '0 0 0 1px rgba(180, 83, 9, 0.25), 0 0 40px rgba(180, 83, 9, 0.06), inset 0 0 80px rgba(0,0,0,0.5)',
            }}
          >
            <div className="flex items-center justify-between border-b border-amber-700/60 bg-slate-800/80 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400/80" />
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-200/90">
                  Workshop dashboard
                </span>
              </div>
              <span className="text-[11px] font-semibold tracking-widest text-amber-200/70">
                {PARTS[selectedIndex]?.alt}
              </span>
            </div>

            <div
              className="pointer-events-none absolute inset-0 opacity-[0.03]"
              style={{
                background:
                  'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(180,83,9,0.15) 2px, rgba(180,83,9,0.15) 4px)',
              }}
            />

            <div className="relative px-4 py-5 sm:px-5">
              <p className="font-poppins text-sm leading-relaxed text-slate-200/95 sm:text-base">
                {PART_COPY[selectedIndex]}
              </p>
            </div>
          </div>
        </div>
        ) : null}
      </div>

      {overlayRect ? (
        <div
          ref={overlayRef}
          className="pointer-events-none fixed left-0 top-0 z-[60] will-change-transform"
          style={{
            left: overlayRect.left,
            top: overlayRect.top,
            width: overlayRect.width,
            height: overlayRect.height,
          }}
        >
          <img
            src={finalRocketImg}
            alt=""
            aria-hidden
            className="h-full w-full object-contain object-bottom"
            draggable={false}
          />
        </div>
      ) : null}

      {/* Bottom: Earth decorative strip — less visible, subtle band, 50% opacity */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-[1] h-[20vh] w-full overflow-hidden opacity-50 sm:h-[24vh]">
        <div className="absolute inset-0 rounded-t-[6rem] shadow-[0_-24px_64px_rgba(0,0,0,0.55)] sm:rounded-t-[8rem]">
          <img
            src={earthImg}
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
            style={{ objectPosition: 'center top' }}
            draggable={false}
          />
        </div>
      </div>
    </section>
  )
}
