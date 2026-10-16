import { motion, useReducedMotion } from 'framer-motion'
import { results } from '../data/content'

export function Results() {
  const reduce = useReducedMotion()

  return (
    <section aria-labelledby="results-heading" className="bg-brand py-20 text-white sm:py-24">
      <div className="shell">
        <h2 id="results-heading" className="max-w-[24ch] text-[clamp(1.9rem,4vw,3.25rem)] leading-[1.05]">
          Where our clients started, and where they are now.
        </h2>

        <ul className="mt-12 grid gap-y-10 md:grid-cols-3 md:gap-x-10">
          {results.map((r, i) => (
            <li key={r.client} className="border-t border-white/35 pt-6">
              <p className="text-sm text-white">{r.client}</p>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-sm text-white">
                  from <span className="font-mono">{r.from}</span>
                </span>
              </div>

              <div className="relative mt-3 h-[3px] w-full bg-white/25" aria-hidden="true">
                <motion.div
                  className="absolute inset-y-0 left-0 origin-left bg-white"
                  style={{ width: `${r.progress * 100}%` }}
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
                />
              </div>

              <p className="mt-4 font-display text-[clamp(3rem,6vw,4.75rem)] leading-none tracking-tight">{r.to}</p>
              <p className="mt-2 text-white">{r.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
