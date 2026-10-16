import { motion, useReducedMotion } from 'framer-motion'
import { Fragment } from 'react'
import { clients, hero, projects, results, stats } from '../data/content'
import { MagneticLink } from './ui/Button'
import { Counter } from './ui/Counter'

/* ------------------------------------------------------------------
   Hero — "the reel wall"
   Left: an editorial headline with live image chips set inside the text.
   Right: two columns of real Socialkaari posts scrolling in opposite
   directions, like a feed. On mobile the wall becomes a sideways strip.
------------------------------------------------------------------- */

const ease = [0.16, 1, 0.3, 1] as const

type Token = { kind: 'word'; text: string } | { kind: 'chip'; src: string; alt: string }

const headline: Token[] = [
  { kind: 'word', text: 'We' },
  { kind: 'word', text: 'combine' },
  { kind: 'word', text: 'creativity' },
  { kind: 'chip', src: hero.images[0]?.src ?? '', alt: '' },
  { kind: 'word', text: 'with' },
  { kind: 'word', text: 'strategy' },
  { kind: 'chip', src: projects[1]?.media[0]?.src ?? '', alt: '' },
  { kind: 'word', text: 'to' },
  { kind: 'word', text: 'deliver' },
  { kind: 'word', text: 'impactful' },
  { kind: 'word', text: 'results.' },
]

/* Every real image we have, split across two columns */
const feed: string[] = [
  ...hero.images.map((i) => i.src),
  ...projects.flatMap((p) => p.media.map((m) => m.src ?? '')),
].filter(Boolean)
const columnA = feed.filter((_, i) => i % 2 === 0)
const columnB = feed.filter((_, i) => i % 2 === 1)

const proof = results[0]
const trustLogos = clients.slice(0, 4)

export function Hero() {
  const reduce = useReducedMotion()
  let wordIndex = 0

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Keyframes live here so this file is a drop-in replacement */}
      <style>{`
        @keyframes sk-reel-up { from { transform: translateY(0) } to { transform: translateY(-50%) } }
        @keyframes sk-reel-down { from { transform: translateY(-50%) } to { transform: translateY(0) } }
        @keyframes sk-reel-left { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .sk-reel:hover .sk-track { animation-play-state: paused; }
      `}</style>

      <div className="shell grid gap-y-12 pt-[calc(var(--nav-h)+2.5rem)] lg:min-h-[calc(100svh-8.5rem)] lg:grid-cols-12 lg:items-center lg:gap-x-12 lg:pt-[var(--nav-h)]">
        {/* ---------- Copy ---------- */}
        <div className="lg:col-span-7 lg:py-16">
          <motion.p
            className="flex items-center gap-3 text-sm text-muted"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            Digital marketing agency in Bhopal, since 2014
          </motion.p>

          <h1 className="mt-6 text-[clamp(2.6rem,6.4vw,5.9rem)] leading-[1.02] tracking-[-0.03em]">
            {headline.map((t, i) => {
              if (t.kind === 'chip') {
                return (
                  <Fragment key={i}>
                    <motion.span
                      aria-hidden="true"
                      className="mx-[0.06em] inline-block h-[0.78em] overflow-hidden rounded-full align-[-0.06em] shadow-[inset_0_0_0_1px_rgb(var(--ink)/0.08)]"
                      initial={reduce ? { width: '1.75em' } : { width: '0em' }}
                      animate={{ width: '1.75em' }}
                      transition={{ duration: 0.9, ease, delay: 0.75 + i * 0.05 }}
                    >
                      <img src={t.src} alt={t.alt} className="h-full w-[1.75em] max-w-none object-cover" />
                    </motion.span>{' '}
                  </Fragment>
                )
              }
              const n = wordIndex++
              const isLast = i === headline.length - 1
              return (
                <Fragment key={i}>
                  <span className="inline-block overflow-hidden pb-[0.1em] align-top">
                    <motion.span
                      className={`inline-block ${isLast ? 'text-brand' : ''}`}
                      initial={reduce ? false : { y: '110%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 0.9, ease, delay: 0.1 + n * 0.045 }}
                    >
                      {t.text}
                    </motion.span>
                  </span>{' '}
                </Fragment>
              )
            })}
          </h1>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.9 }}
          >
            <p className="mt-7 max-w-[38rem] text-lg text-ink/75">
              Social media, SEO, branding, paid ads, influencers and memes — handled by one team of
              strategists, writers and designers, with our own in-house studio.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <MagneticLink href="#contact">Start a project</MagneticLink>
              <MagneticLink href="#projects" variant="outline">
                See our work
              </MagneticLink>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <ul className="flex" aria-hidden="true">
                {trustLogos.map((c, i) => (
                  <li key={c.name} className={i === 0 ? '' : '-ml-3'}>
                    <img
                      src={c.logo}
                      alt=""
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full border-2 border-paper bg-white object-contain p-0.5"
                    />
                  </li>
                ))}
              </ul>
              <p className="text-sm leading-snug text-muted">
                <span className="font-medium text-ink">50+ brands</span> trust us,
                <br className="sm:hidden" /> from cafés and clinics to NGOs.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ---------- Reel wall: desktop ---------- */}
        <motion.div
          className="sk-reel relative hidden h-[min(70vh,44rem)] lg:col-span-5 lg:block"
          initial={reduce ? false : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.3 }}
        >
          <div aria-hidden="true" className="grid h-full grid-cols-2 gap-4 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_12%,#000_88%,transparent)]">
            <ReelColumn images={columnA} direction="up" duration={38} />
            <ReelColumn images={columnB} direction="down" duration={44} className="pt-16" />
          </div>

          {/* Proof card from real client results */}
          {proof && (
            <motion.div
              className="absolute -left-10 bottom-14 z-10 w-64 rounded-2xl border border-ink/10 bg-card p-5 shadow-[0_24px_50px_-24px_rgb(var(--ink)/0.45)]"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 1.3 }}
            >
              <p className="text-xs text-muted">{proof.client}</p>
              <p className="mt-2 font-display text-3xl leading-none">
                <span className="text-muted">{proof.from}</span> → {proof.to}
              </p>
              <p className="mt-1.5 text-sm text-ink/75">{proof.label}</p>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-ink/10">
                <motion.div
                  className="h-full origin-left rounded-full bg-brand"
                  initial={reduce ? false : { scaleX: 0.14 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.6, ease, delay: 1.7 }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* ---------- Reel strip: mobile & tablet ---------- */}
      <div
        className="sk-reel mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] lg:hidden"
        aria-hidden="true"
      >
        <ul
          className="sk-track flex w-max"
          style={reduce ? undefined : { animation: 'sk-reel-left 40s linear infinite' }}
        >
          {[...feed, ...feed].map((src, i) => (
            <li key={i} className="w-32 shrink-0 pr-3 sm:w-40">
              <ReelCard src={src} />
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- Stats band ---------- */}
      <div className="mt-12 bg-ink text-paper lg:mt-0">
        <dl className="shell grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col-reverse justify-end py-7 lg:py-9 ${i % 2 === 1 ? 'border-l border-paper/15 pl-5' : 'pr-4'} ${
                i > 1 ? 'border-t border-paper/15 lg:border-t-0' : ''
              } ${i === 2 ? 'lg:border-l lg:pl-6' : ''} ${i > 0 ? 'lg:pl-6' : ''}`}
            >
              <dt className="mt-2 text-sm text-paper/60">{s.label}</dt>
              <dd className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-none tracking-tight">
                {s.animate ? <Counter value={s.value} /> : s.value}
                <span className="text-brand">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function ReelColumn({
  images,
  direction,
  duration,
  className = '',
}: {
  images: string[]
  direction: 'up' | 'down'
  duration: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const loop = [...images, ...images] // doubled so the -50% shift loops seamlessly

  return (
    <div className={className}>
      <ul
        className="sk-track"
        style={reduce ? undefined : { animation: `sk-reel-${direction} ${duration}s linear infinite` }}
      >
        {loop.map((src, i) => (
          <li key={i} className="pb-4" aria-hidden={i >= images.length ? 'true' : undefined}>
            <ReelCard src={src} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function ReelCard({ src }: { src: string }) {
  return (
    <div className="rounded-[1.25rem] bg-card p-1.5 shadow-[0_14px_30px_-18px_rgb(var(--ink)/0.5)]">
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        className="aspect-[9/16] w-full rounded-[0.9rem] object-cover"
      />
    </div>
  )
}
