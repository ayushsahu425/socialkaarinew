import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState, type MouseEvent } from 'react'
import { useEnquiry } from '../context/EnquiryContext'
import { services } from '../data/content'
import { useFinePointer } from '../hooks/useMediaQuery'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

export function Services() {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const { requestEnquiry } = useEnquiry()

  const [open, setOpen] = useState<number | null>(0) // mobile accordion
  const [hovered, setHovered] = useState<number | null>(null) // desktop preview

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.5 })

  const onMove = (e: MouseEvent<HTMLUListElement>) => {
    x.set(e.clientX)
    y.set(e.clientY)
  }

  const showPreview = fine && !reduce

  return (
    <section id="service" className="border-t border-ink/10 py-24 sm:py-32">
      <div className="shell">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel>Our services</SectionLabel>
            <h2 className="mt-5 text-[clamp(2.25rem,5vw,4rem)] leading-[1.02]">
              Turning your vision into impeccable outcomes.
            </h2>
          </div>
          <p className="max-w-[44ch] text-muted lg:col-span-4 lg:col-start-9">
            Eight ways we grow brands. Pick one to start, or let us put together the mix your business needs.
          </p>
        </Reveal>

        <ul className="mt-14 border-b border-ink/15 lg:mt-20" onMouseMove={onMove} onMouseLeave={() => setHovered(null)}>
          {services.map((s, i) => {
            const isOpen = open === i
            const panelId = `service-panel-${s.id}`
            return (
              <li key={s.id} className="group border-t border-ink/15" onMouseEnter={() => setHovered(i)}>
                <div className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 py-6 sm:grid-cols-[4rem_minmax(0,1fr)] lg:grid-cols-[5rem_minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-x-10 lg:py-10">
                  <span className="pt-2 font-mono text-sm text-muted lg:pt-3">{String(i + 1).padStart(2, '0')}</span>

                  <h3 className="min-w-0">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full items-start justify-between gap-4 text-left lg:pointer-events-none lg:cursor-default"
                    >
                      <span className="block">
                        <span className="block text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.1] transition-[color,transform] duration-500 ease-out lg:group-hover:translate-x-2 lg:group-hover:text-brand-deep">
                          {s.title}
                        </span>
                        <span className="mt-1 block font-sans text-base text-muted">{s.summary}</span>
                      </span>
                      <Plus
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className={`mt-2 shrink-0 transition-transform duration-300 lg:hidden ${isOpen ? 'rotate-45' : ''}`}
                      />
                    </button>
                  </h3>

                  {/* Panel: collapsible on mobile, always visible on desktop */}
                  <div
                    id={panelId}
                    className={`col-start-2 grid transition-[grid-template-rows,visibility] duration-500 ease-out lg:visible lg:col-start-3 lg:row-start-1 lg:grid-rows-[1fr] ${
                      isOpen ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="space-y-2 pt-4 text-ink/80 lg:pt-2">
                        {s.points.map((p) => (
                          <li key={p} className="flex gap-3">
                            <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-brand" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        onClick={() => requestEnquiry(s.formOption, s.title)}
                        className="mt-5 inline-flex min-h-[44px] items-center text-[0.95rem] font-medium text-brand-deep underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand lg:opacity-60 lg:transition-opacity lg:group-hover:opacity-100 lg:focus-visible:opacity-100"
                      >
                        Enquire about {s.title.toLowerCase()}
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Cursor-following preview image, desktop only */}
      {showPreview && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-30 -mt-[140px] ml-10 hidden lg:block"
          style={{ x: sx, y: sy }}
        >
          <AnimatePresence>
            {hovered !== null && (
              <motion.div
                key="preview"
                className="relative h-[280px] w-[220px] overflow-hidden shadow-[0_24px_50px_-20px_rgb(var(--ink)/0.5)]"
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 3 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {services.map((s, i) => (
                  <img
                    key={s.id}
                    src={s.image}
                    alt=""
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                      hovered === i ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  )
}
