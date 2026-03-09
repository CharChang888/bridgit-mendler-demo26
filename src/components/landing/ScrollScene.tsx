import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import satelliteImg from '../../assets/images/satellite.png'
import groundStationImg from '../../assets/images/northwoodGroundStation.png'
import earthImg from '../../assets/images/Earth.png'
import StarsBackground from './StarsBackground'

gsap.registerPlugin(ScrollTrigger)

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
}

type StoryText = {
  id: string
  text: string
  className: string
}

type TypewriterTextProps = {
  text: string
  active: boolean
  delayMs?: number
  speedMs?: number
}

function TypewriterText({ text, active, delayMs = 350, speedMs = 90 }: TypewriterTextProps) {
  const [display, setDisplay] = useState(active ? '' : text)

  useEffect(() => {
    if (!active) {
      setDisplay(text)
      return
    }

    let frame = 0
    setDisplay('')

    const startTimeout = window.setTimeout(() => {
      const interval = window.setInterval(() => {
        frame += 1
        const next = text.slice(0, frame)
        setDisplay(next)

        if (frame >= text.length) {
          window.clearInterval(interval)
        }
      }, speedMs)
    }, delayMs)

    return () => {
      window.clearTimeout(startTimeout)
    }
  }, [active, delayMs, speedMs, text])

  return <>{display}</>
}

export default function ScrollScene() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const globeSurfaceRef = useRef<HTMLImageElement | null>(null)
  const satelliteRef = useRef<HTMLImageElement | null>(null)

  const story: StoryText[] = useMemo(
    () => [
      {
        id: 'headline',
        text: 'From Hurricane to Northwood Space,',
        className:
          'top-[12vh] left-1/2 -translate-x-1/2 text-center text-3xl sm:text-5xl font-semibold tracking-wide text-slate-100',
      },
      {
        id: 'sub1',
        text: "inspiring TroyLabs founders to shoot for the stars.",
        className:
          'top-[24vh] left-[8vw] max-w-xl text-3xl sm:text-5xl tracking-wide text-slate-200/90',
      },
      {
        id: 'sub2',
        text: 'An invitation for Bridgit Mendler to speak at DEMO 2026.',
        className:
          'top-[64vh] left-[8vw] max-w-xl text-3xl sm:text-5xl tracking-wide text-slate-200/90',
      },
    ],
    [],
  )

  useLayoutEffect(() => {
    const sectionEl = sectionRef.current
    const globeSurfaceEl = globeSurfaceRef.current
    const satEl = satelliteRef.current
    if (!sectionEl || !globeSurfaceEl || !satEl) return

    if (prefersReducedMotion()) {
      return
    }

    // Smoothness / stability tweaks
    ScrollTrigger.config({
      ignoreMobileResize: true,
    })

    const ctx = gsap.context(() => {
      const setSatX = gsap.quickSetter(satEl, 'x', 'px')
      const setSatY = gsap.quickSetter(satEl, 'y', 'px')
      const setSatRot = gsap.quickSetter(satEl, 'rotation', 'deg')

      const updateSatellite = (progress: number) => {
        const vw = sectionEl.clientWidth
        const vh = sectionEl.clientHeight

        // Globe center: horizontally centered, slightly below bottom to form a visible arc
        const cx = vw * 0.5
        const cy = vh * 1.04
        const r = Math.min(vw, vh) * 0.62

        // Angle sweep: upper-left to upper-right along the globe arc
        const startDeg = 205
        const endDeg = 330
        const a = ((startDeg + (endDeg - startDeg) * progress) * Math.PI) / 180

        const x = cx + r * Math.cos(a)
        const y = cy + r * Math.sin(a)

        // Position satellite with a small parallax-y feel
        setSatX(x - vw * 0.12)
        setSatY(y - vh * 0.42)
        setSatRot(-12 + progress * 16)
      }

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          id: 'landing-scroll',
          trigger: sectionEl,
          start: 'top top',
          end: '+=250%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => updateSatellite(self.progress),
          onRefresh: (self) => updateSatellite(self.progress),
        },
      })
      // Initial position (before first scroll update)
      updateSatellite(0)

      // Text reveals: headline static on load; subsequent text right-to-left with cross-fade
      story.forEach((s, idx) => {
        const baseTime = idx * 0.9
        const selector = `[data-story="${s.id}"]`

        if (s.id === 'headline') {
          // Headline stays visible initially; only fade out slightly before second text
          tl.to(
            selector,
            { autoAlpha: 0, duration: 0.3 },
            baseTime + 0.55,
          )
        } else {
          tl.fromTo(
            selector,
            { autoAlpha: 0, x: 60, filter: 'blur(6px)' },
            { autoAlpha: 1, x: 0, filter: 'blur(0px)', duration: 0.4 },
            baseTime,
          )

          if (idx < story.length - 1) {
            tl.to(
              selector,
              { autoAlpha: 0, duration: 0.3 },
              baseTime + 0.45,
            )
          }
        }
      })
    }, sectionEl)

    return () => ctx.revert()
  }, [story])

  return (
    <section
      ref={sectionRef}
      className="relative h-dvh w-full overflow-hidden bg-[linear-gradient(to_bottom,#020617,#020617_40%,#020617_60%,#000000_100%)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(255,255,255,0.10),transparent_60%)]" />
      <StarsBackground />

      {/* Story text */}
      <div className="absolute inset-0 z-[3]">
        {story.map((s) => {
          const isHeadline = s.id === 'headline'
          return (
            <div
              key={s.id}
              data-story={s.id}
              className={`absolute ${s.className}`}
              style={{
                opacity: prefersReducedMotion() ? 1 : isHeadline ? 1 : 0,
              }}
            >
              {isHeadline ? (
                <TypewriterText text={s.text} active={!prefersReducedMotion()} />
              ) : (
                s.text
              )}
            </div>
          )
        })}
      </div>

      {/* Satellite */}
      <img
        ref={satelliteRef}
        src={satelliteImg}
        alt="Satellite"
        className="pointer-events-none absolute left-0 top-0 z-[2] h-auto w-[280px] select-none drop-shadow-[0_18px_50px_rgba(0,0,0,0.55)] will-change-transform sm:w-[360px]"
        draggable={false}
        style={{
          transform: 'translate3d(6vw, 10vh, 0) rotate(-12deg)',
        }}
      />

      {/* Ground station */}
      <img
        src={groundStationImg}
        alt="Ground station"
        className="absolute bottom-[15vh] right-[8vw] z-[2] h-auto w-[240px] select-none drop-shadow-[0_18px_40px_rgba(0,0,0,0.55)] sm:w-[320px]"
        draggable={false}
      />

      {/* Globe */}
      <div className="pointer-events-none absolute -bottom-[32vh] left-1/2 z-[1] h-[78vh] w-[140vw] -translate-x-1/2">
        <div className="relative h-full w-full overflow-hidden rounded-[999px] shadow-[0_-40px_120px_rgba(0,0,0,0.75)]">
          <img
            ref={globeSurfaceRef}
            src={earthImg}
            alt="Earth"
            className="h-full w-full object-cover"
            style={{ objectPosition: 'center top' }}
            draggable={false}
          />
        </div>
      </div>
    </section>
  )
}

