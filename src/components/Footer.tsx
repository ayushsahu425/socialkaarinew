import { ArrowUp } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { company, navLinks, serviceOptions } from '../data/content'

export function Footer() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError('Enter a valid email address, like name@example.com.')
      return
    }
    setError(null)
    const subject = encodeURIComponent('Question from the website')
    const body = encodeURIComponent(`Hi Socialkaari,\n\nI have a question. Please get back to me at ${email.trim()}.\n`)
    window.location.href = `mailto:${company.emails[0]}?subject=${subject}&body=${body}`
  }

  return (
    <footer className="relative overflow-hidden bg-ink pt-20 text-paper">
      <div className="shell grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <p className="font-display text-3xl">Socialkaari</p>
          <p className="mt-4 max-w-[34ch] text-paper/65">{company.tagline}</p>

          <form onSubmit={onSubmit} noValidate className="mt-8 max-w-sm" aria-label="Ask a question by email">
            <label htmlFor="footer-email" className="text-sm text-paper/65">
              Got questions? Leave your email and we’ll write back.
            </label>
            <div className="mt-3 flex border-b border-paper/30 focus-within:border-brand">
              <input
                id="footer-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? 'footer-email-error' : undefined}
                className="min-w-0 flex-1 border-0 bg-transparent px-0 py-3 text-paper placeholder:text-paper/35 focus:outline-none focus:ring-0"
              />
              <button type="submit" className="min-h-[44px] px-2 text-sm font-medium text-paper hover:text-white">
                Send
              </button>
            </div>
            {error && (
              <p id="footer-email-error" className="mt-2 text-sm text-[#FF8A80]">
                {error}
              </p>
            )}
          </form>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-6">
          <p className="text-sm text-paper/45">Explore</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-paper/80 hover:text-paper">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="text-sm text-paper/45">Services</p>
          <ul className="mt-4 space-y-2">
            {serviceOptions
              .filter((s) => s !== 'Other')
              .map((s) => (
                <li key={s}>
                  <a href="#service" className="text-paper/80 hover:text-paper">
                    {s}
                  </a>
                </li>
              ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="text-sm text-paper/45">Contact</p>
          <address className="mt-4 space-y-2 not-italic text-paper/80">
            <a href={company.phoneHref} className="block hover:text-paper">
              {company.phoneDisplay}
            </a>
            {company.emails.map((e) => (
              <a key={e} href={`mailto:${e}`} className="block break-all hover:text-paper">
                {e}
              </a>
            ))}
            <p className="pt-2 text-paper/60">{company.address}</p>
          </address>
        </div>
      </div>

      {/* Giant outlined wordmark */}
      <div className="relative mt-20 select-none" aria-hidden="true">
        <p className="text-outline whitespace-nowrap text-center font-display text-[15.5vw] leading-[0.8] tracking-[-0.03em]">
          Socialkaari
        </p>
        <span className="absolute bottom-[18%] right-[6%] font-deva text-[6vw] leading-none text-brand">कारी</span>
      </div>

      <div className="shell flex flex-col-reverse items-start justify-between gap-4 border-t border-paper/15 py-6 text-sm text-paper/55 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Socialkaari. All rights reserved.</p>
        <a href="#top" className="inline-flex min-h-[44px] items-center gap-2 hover:text-paper">
          Back to top
          <span className="grid h-9 w-9 place-items-center rounded-full border border-paper/25">
            <ArrowUp size={16} strokeWidth={1.5} aria-hidden="true" />
          </span>
        </a>
      </div>
    </footer>
  )
}
