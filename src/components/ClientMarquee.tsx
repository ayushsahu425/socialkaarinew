import { useReducedMotion } from 'framer-motion'
import { clients } from '../data/content'

export function ClientMarquee() {
  const reduce = useReducedMotion()
  // Render the list twice so the -50% translate loops seamlessly.
  const loop = reduce ? clients : [...clients, ...clients]

  return (
    <section aria-label="Clients" className="mt-4 border-y border-ink/10 py-10 sm:py-12">
      <div className="shell mb-8 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="font-display text-2xl italic sm:text-3xl">Started as clients, stayed as family.</p>
        <p className="text-sm text-muted">{clients.length} of the brands we work with</p>
      </div>

      <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <ul
          className={
            reduce
              ? 'shell flex flex-wrap items-center justify-center gap-x-10 gap-y-6'
              : 'flex w-max animate-marquee items-center gap-12 group-hover:[animation-play-state:paused] sm:gap-16'
          }
        >
          {loop.map((c, i) => (
            <li key={`${c.name}-${i}`} aria-hidden={i >= clients.length ? 'true' : undefined} className="shrink-0">
              <img
                src={c.logo}
                alt={i >= clients.length ? '' : c.name}
                width={140}
                height={70}
                loading="lazy"
                decoding="async"
                className="h-14 w-auto max-w-[140px] object-contain mix-blend-multiply grayscale transition duration-500 hover:grayscale-0 sm:h-16"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
