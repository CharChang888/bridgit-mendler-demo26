import placeholder from '../assets/images/placeholder.svg'

export default function Home() {
  return (
    <div className="grid gap-10 md:grid-cols-2 md:items-center">
      <section className="grid gap-5">
        <p className="text-xs font-semibold tracking-widest text-violet-300/90">
          REACT + VITE + TAILWIND
        </p>
        <h1 className="text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl">
          Your site shell is ready.
        </h1>
        <p className="text-pretty text-slate-300">
          Drop images into <code className="text-slate-100">src/assets/images/</code>{' '}
          and import them directly in your components.
        </p>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs font-semibold tracking-wide text-slate-200">
            Example import
          </div>
          <pre className="mt-2 overflow-x-auto text-xs text-slate-200/90">
            <code>{`import hero from '../assets/images/hero.png'\n\n<img src={hero} alt=\"Hero\" />`}</code>
          </pre>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <img
          src={placeholder}
          alt="Placeholder"
          className="h-auto w-full rounded-xl"
        />
      </section>
    </div>
  )
}

