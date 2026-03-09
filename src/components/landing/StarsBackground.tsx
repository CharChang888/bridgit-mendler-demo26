import blueStar from '../../assets/images/blueStar.png'

type Star = {
  top: string
  left: string
  size: number
  opacity: number
  delay: number
  duration: number
  blur: number
}

const layerA: Star[] = [
  { top: '10%', left: '8%', size: 28, opacity: 0.9, delay: 0.1, duration: 2.8, blur: 0 },
  { top: '18%', left: '34%', size: 18, opacity: 0.75, delay: 1.2, duration: 3.4, blur: 0 },
  { top: '8%', left: '64%', size: 22, opacity: 0.8, delay: 0.7, duration: 2.9, blur: 0 },
  { top: '22%', left: '82%', size: 30, opacity: 0.9, delay: 1.6, duration: 3.6, blur: 0 },
  { top: '36%', left: '12%', size: 14, opacity: 0.6, delay: 0.4, duration: 4.1, blur: 0.3 },
  { top: '42%', left: '52%', size: 16, opacity: 0.7, delay: 1.9, duration: 3.2, blur: 0.2 },
  { top: '48%', left: '74%', size: 12, opacity: 0.55, delay: 0.8, duration: 4.6, blur: 0.4 },
  { top: '58%', left: '26%', size: 20, opacity: 0.8, delay: 1.4, duration: 3.7, blur: 0.1 },
  { top: '64%', left: '88%', size: 18, opacity: 0.75, delay: 0.6, duration: 3.3, blur: 0.2 },
 ]

const layerB: Star[] = [
  { top: '14%', left: '20%', size: 10, opacity: 0.45, delay: 0.9, duration: 5.2, blur: 0.8 },
  { top: '30%', left: '40%', size: 8, opacity: 0.35, delay: 2.4, duration: 6.4, blur: 1.0 },
  { top: '12%', left: '72%', size: 9, opacity: 0.4, delay: 1.7, duration: 5.7, blur: 0.9 },
  { top: '40%', left: '90%', size: 7, opacity: 0.3, delay: 0.3, duration: 7.1, blur: 1.2 },
  { top: '54%', left: '8%', size: 9, opacity: 0.35, delay: 3.0, duration: 6.9, blur: 1.1 },
  { top: '70%', left: '58%', size: 8, opacity: 0.3, delay: 2.1, duration: 6.1, blur: 1.2 },
 ]

function StarsLayer({ stars, className }: { stars: Star[]; className?: string }) {
  return (
    <div className={className}>
      {stars.map((s, idx) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          aria-hidden="true"
          className="absolute select-none will-change-transform"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
          data-twinkle
        >
          <img
            src={blueStar}
            alt=""
            draggable={false}
            className="h-full w-full"
            style={{
              filter: `blur(${s.blur}px)`,
            }}
          />
        </span>
      ))}
    </div>
  )
}

export default function StarsBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        data-stars-drift
        className="absolute inset-0 will-change-transform"
        style={{ animation: 'starsDrift 48s linear infinite' }}
      >
        <StarsLayer stars={layerA} className="absolute inset-0" />
      </div>
      <div
        data-stars-drift
        className="absolute inset-0 opacity-70 will-change-transform"
        style={{ animation: 'starsDrift 95s linear infinite reverse' }}
      >
        <StarsLayer stars={layerB} className="absolute inset-0" />
      </div>
    </div>
  )
}

