import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Play } from 'lucide-react'
import { useRef, useState, type KeyboardEvent } from 'react'
import { projects, type Project, type ProjectMedia } from '../data/content'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

export function Work() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const reduce = useReducedMotion()
  const project = projects[active] ?? projects[0]

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = projects.length - 1
    let next = active
    if (e.key === 'ArrowRight') next = active === last ? 0 : active + 1
    else if (e.key === 'ArrowLeft') next = active === 0 ? last : active - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    else return
    e.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="projects" className="bg-ink py-24 text-paper sm:py-32">
      <div className="shell">
        <Reveal>
          <SectionLabel tone="light">Our work</SectionLabel>
          <h2 className="mt-5 max-w-[18ch] text-[clamp(2.25rem,5vw,4rem)] leading-[1.02]">
            What we make for brands, every week.
          </h2>
        </Reveal>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Work categories"
          onKeyDown={onKeyDown}
          className="no-scrollbar -mx-4 mt-12 flex gap-1 overflow-x-auto border-b border-paper/15 px-4 sm:mx-0 sm:px-0"
        >
          {projects.map((p, i) => {
            const selected = i === active
            return (
              <button
                key={p.id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                id={`tab-${p.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`panel-${p.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={`relative min-h-[48px] shrink-0 whitespace-nowrap px-4 pb-4 pt-2 text-[0.95rem] transition-colors ${
                  selected ? 'text-paper' : 'text-paper/50 hover:text-paper/80'
                }`}
              >
                {p.tab}
                {selected && (
                  <motion.span
                    layoutId="work-tab-line"
                    className="absolute inset-x-3 -bottom-px h-[2px] bg-brand"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={project.id}
            id={`panel-${project.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${project.id}`}
            tabIndex={0}
            className="mt-12 grid gap-10 focus:outline-none lg:mt-16 lg:grid-cols-12 lg:gap-10"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="lg:col-span-4">
              <h3 className="text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.08]">{project.title}</h3>
              <p className="mt-5 max-w-[46ch] text-paper/70">{project.description}</p>
              {project.tagline && (
                <p className="mt-6 font-display text-xl italic text-paper">{project.tagline}</p>
              )}
            </div>

            <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 lg:col-span-8">
              {project.media.map((m, i) => (
                <li key={`${project.id}-${i}`} className="w-[66vw] max-w-[17rem] shrink-0 snap-start sm:w-auto sm:max-w-none">
                  <MediaCard media={m} project={project} index={i} />
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function MediaCard({ media, project, index }: { media: ProjectMedia; project: Project; index: number }) {
  const offset = index === 1 ? 'sm:translate-y-8' : ''

  return (
    <figure className={`overflow-hidden rounded-[1.4rem] border border-paper/10 bg-paper/5 ${offset}`}>
      <div className="relative aspect-[9/16]">
        {media.src && media.type === 'image' && (
          <img
            src={media.src}
            alt={media.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
          />
        )}

        {media.src && media.type === 'video' && (
          <video
            src={media.src}
            poster={media.poster}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            aria-label={media.alt}
          />
        )}

        {!media.src && (
          <div className="absolute inset-0 flex flex-col justify-between bg-[linear-gradient(160deg,rgb(var(--brand)/0.22),transparent_55%)] p-5">
            <span className="font-mono text-xs text-paper/50">
              {String(index + 1).padStart(2, '0')} / {String(project.media.length).padStart(2, '0')}
            </span>
            <p className="font-display text-[1.65rem] italic leading-tight text-paper/85">{project.title}</p>
            <span className="flex items-center gap-2 text-sm text-paper/55">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-paper/30">
                <Play size={14} strokeWidth={1.5} aria-hidden="true" />
              </span>
              Reel coming soon
            </span>
          </div>
        )}
      </div>
    </figure>
  )
}
