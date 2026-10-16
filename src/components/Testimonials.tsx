import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { testimonials } from '../data/content'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

const WORD_LIMIT = 60
const AUTOPLAY_MS = 7000

function truncate(text: string, limit: number): { short: string; isLong: boolean } {
  const words = text.split(/\s+/)
  if (words.length <= limit) return { short: text, isLong: false }
  return { short: `${words.slice(0, limit).join(' ')}…`, isLong: true }
}

export function Testimonials() {
  const reduce = useReducedMotion()
  const [[index, direction], setState] = useState<[number, number]>([0, 0])
  const [expanded, setExpanded] = useState(false)
  const [paused, setPaused] = useState(false)

  const count = testimonials.length
  const t = testimonials[index] ?? testimonials[0]
  const { short, isLong } = truncate(t.quote, WORD_LIMIT)

  const go = useCallback(
    (dir: number) => {
      setExpanded(false)
      setState(([i]) => [(i + dir + count) % count, dir])
    },
    [count],
  )

  const goTo = (i: number) => {
    setExpanded(false)
    setState(([cur]) => [i, i > cur ? 1 : -1])
  }

  useEffect(() => {
    if (reduce || paused || expanded) return
    const timer = window.setTimeout(() => go(1), AUTOPLAY_MS)
    return () => window.clearTimeout(timer)
  }, [index, reduce, paused, expanded, go])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1)
    else if (info.offset.x > 60 || info.velocity.x > 400) go(-1)
  }

  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          <SectionLabel>Client testimonials</SectionLabel>
          <h2 className="mt-5 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02]">Our clients. Our pride.</h2>
          <p className="mt-5 max-w-[40ch] text-muted">
            From startups to established names, clinics to NGOs — here is what the brands who trust us say.
          </p>

          <div className="mt-10 hidden items-center gap-3 lg:flex">
            <ArrowButtons onPrev={() => go(-1)} onNext={() => go(1)} />
            <span className="ml-3 font-mono text-sm text-muted">
              {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
          </div>
        </Reveal>

        <div
          className="relative lg:col-span-7 lg:col-start-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') go(1)
            if (e.key === 'ArrowLeft') go(-1)
          }}
        >
          <span aria-hidden="true" className="pointer-events-none absolute -top-10 left-0 font-display text-[9rem] leading-none text-brand/90 sm:-left-4">
            “
          </span>

          <div className="relative min-h-[22rem] overflow-hidden pt-16 sm:min-h-[20rem]">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.figure
                key={index}
                custom={direction}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}`}
                drag={reduce ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={onDragEnd}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: direction >= 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: direction >= 0 ? -60 : 60 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="cursor-grab touch-pan-y active:cursor-grabbing"
              >
                <blockquote className="font-display text-[clamp(1.35rem,2.4vw,1.9rem)] leading-[1.4]">
                  <p>{expanded || !isLong ? t.quote : short}</p>
                </blockquote>
                {isLong && (
                  <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    className="mt-4 min-h-[44px] text-[0.95rem] font-medium text-brand-deep underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
                    aria-expanded={expanded}
                  >
                    {expanded ? 'Show less' : 'Read more'}
                  </button>
                )}
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink font-display text-lg text-paper">
                    {initials(t.name)}
                  </span>
                  <span>
                    <span className="block font-medium">{t.name}</span>
                    {t.business && <span className="block text-sm text-muted">{t.business}</span>}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-between gap-6">
            <div className="flex flex-wrap gap-1" role="group" aria-label="Choose testimonial">
              {testimonials.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show testimonial from ${item.name}`}
                  aria-current={i === index ? 'true' : undefined}
                  className="group grid h-11 w-8 place-items-center"
                >
                  <span
                    className={`block h-[3px] rounded-full transition-all duration-500 ${
                      i === index ? 'w-7 bg-brand' : 'w-3 bg-ink/20 group-hover:bg-ink/40'
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="flex gap-3 lg:hidden">
              <ArrowButtons onPrev={() => go(-1)} onNext={() => go(1)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ArrowButtons({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  const cls =
    'grid h-12 w-12 place-items-center rounded-full border border-ink/25 transition-colors hover:border-ink hover:bg-ink hover:text-paper'
  return (
    <>
      <button type="button" onClick={onPrev} className={cls} aria-label="Previous testimonial">
        <ChevronLeft size={20} strokeWidth={1.5} />
      </button>
      <button type="button" onClick={onNext} className={cls} aria-label="Next testimonial">
        <ChevronRight size={20} strokeWidth={1.5} />
      </button>
    </>
  )
}

function initials(name: string): string {
  return name
    .replace(/^(Mr|Mrs|Ms|Dr)\.?\s+/i, '')
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
