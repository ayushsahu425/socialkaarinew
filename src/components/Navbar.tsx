import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { company, navLinks, whatsappLink } from '../data/content'
import { useScrollSpy } from '../hooks/useScrollSpy'

/* ------------------------------------------------------------------
   Navbar — a floating dark capsule.
   The Socialkaari logo is white, so the bar is ink-coloured to keep it
   visible on the light page. It tucks away while you scroll down and
   comes back as soon as you scroll up.
------------------------------------------------------------------- */

const ids = navLinks.map((l) => l.id)
const contactMessage = 'Hi Socialkaari, I’d like to talk about marketing for my business.'

function useHideOnScroll(disabled: boolean): { hidden: boolean; compact: boolean } {
  const [hidden, setHidden] = useState(false)
  const [compact, setCompact] = useState(false)
  const last = useRef(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      const delta = y - last.current
      setCompact(y > 40)
      if (disabled || y < 160) setHidden(false)
      else if (delta > 6) setHidden(true)
      else if (delta < -6) setHidden(false)
      last.current = y
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [disabled])

  return { hidden, compact }
}

export function Navbar() {
  const active = useScrollSpy(ids)
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [focusWithin, setFocusWithin] = useState(false)
  const { hidden, compact } = useHideOnScroll(open || focusWithin || !!reduce)

  // Lock page scroll and close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Close the mobile menu if the window grows to desktop width
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const onChange = () => mql.matches && setOpen(false)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4"
        animate={{ y: hidden ? '-120%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        onFocus={() => setFocusWithin(true)}
        onBlur={() => setFocusWithin(false)}
      >
        <nav
          aria-label="Main"
          className={`mx-auto flex max-w-site items-center justify-between gap-4 rounded-full bg-ink text-paper transition-[padding,box-shadow] duration-500 ${
            compact
              ? 'py-1.5 pl-5 pr-1.5 shadow-[0_18px_40px_-20px_rgb(var(--ink)/0.6)]'
              : 'py-2 pl-6 pr-2 shadow-[0_10px_30px_-22px_rgb(var(--ink)/0.5)]'
          }`}
        >
          {/* Logo */}
          <a href="#top" className="flex shrink-0 items-center" aria-label="Socialkaari, back to top">
            <img
              src={company.logo}
              alt="Socialkaari"
              width={160}
              height={44}
              className={`w-auto transition-[height] duration-500 ${compact ? 'h-9' : 'h-10 sm:h-11'}`}
            />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative flex flex-col items-center px-3 py-2.5 text-[0.95rem] transition-colors xl:px-4 ${
                      isActive ? 'text-paper' : 'text-paper/60 hover:text-paper'
                    }`}
                  >
                    {link.label}
                    <span className="absolute bottom-0.5 h-1 w-1">
                      {isActive && (
                        <motion.span
                          layoutId="nav-dot"
                          className="block h-1 w-1 rounded-full bg-brand"
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        />
                      )}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <a
              href={whatsappLink(contactMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-[44px] items-center gap-2 rounded-full bg-brand px-5 text-[0.95rem] font-medium text-white transition-colors hover:bg-brand-deep sm:inline-flex"
            >
              Get in touch
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-paper/20 lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 flex flex-col bg-ink text-paper lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: 'circle(0% at calc(100% - 2.6rem) 2.6rem)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'circle(150% at calc(100% - 2.6rem) 2.6rem)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'circle(0% at calc(100% - 2.6rem) 2.6rem)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between px-6 pb-2 pt-5 sm:px-8">
              <img src={company.logo} alt="Socialkaari" width={160} height={44} className="h-10 w-auto" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full bg-paper/10 hover:bg-paper/20"
                aria-label="Close menu"
                autoFocus
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <ul className="flex flex-1 flex-col justify-center gap-1 px-6 pb-8 sm:px-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={reduce ? false : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === link.id ? 'true' : undefined}
                    className={`flex items-center gap-4 py-1.5 font-display text-[clamp(2.25rem,9vw,3.5rem)] leading-tight transition-colors ${
                      active === link.id ? 'text-paper' : 'text-paper/50 hover:text-paper/80'
                    }`}
                  >
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${active === link.id ? 'bg-brand' : 'bg-transparent'}`}
                      aria-hidden="true"
                    />
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="border-t border-paper/15 px-6 py-6 sm:px-8">
              <a
                href={whatsappLink(contactMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-brand text-base font-medium text-white hover:bg-brand-deep"
              >
                Chat on WhatsApp
              </a>
              <div className="mt-5 flex flex-wrap justify-between gap-x-6 gap-y-1 text-sm text-paper/60">
                <a href={company.phoneHref} className="py-1 hover:text-paper">
                  {company.phoneDisplay}
                </a>
                <a href={`mailto:${company.emails[0]}`} className="py-1 hover:text-paper">
                  {company.emails[0]}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
