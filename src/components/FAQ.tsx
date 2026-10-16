import { Plus } from 'lucide-react'
import { useState } from 'react'
import { company, faqs, whatsappLink } from '../data/content'
import { MagneticLink } from './ui/Button'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-ink py-24 text-paper sm:py-32">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
            <SectionLabel tone="light">Frequently asked questions</SectionLabel>
            <h2 className="mt-5 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02]">
              Got questions? We’ve got answers.
            </h2>
            <p className="mt-6 max-w-[36ch] text-paper/65">
              Can’t find what you’re looking for? Ask us directly — we usually reply the same day.
            </p>
            <MagneticLink
              href={whatsappLink('Hi Socialkaari, I have a question.')}
              target="_blank"
              rel="noopener noreferrer"
              variant="light"
              className="mt-8"
            >
              Ask on WhatsApp
            </MagneticLink>
            <p className="mt-4 text-sm text-paper/55">
              or call <a href={company.phoneHref} className="underline underline-offset-4 hover:text-paper">{company.phoneDisplay}</a>
            </p>
          </div>
        </Reveal>

        <ul className="border-b border-paper/15 lg:col-span-7 lg:col-start-6">
          {faqs.map((f, i) => {
            const isOpen = open === i
            const id = `faq-${i}`
            return (
              <li key={f.question} className="border-t border-paper/15">
                <h3 className="font-sans">
                  <button
                    type="button"
                    id={`${id}-btn`}
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-start gap-5 py-7 text-left"
                  >
                    <span className="pt-1.5 font-mono text-sm text-paper/45">{String(i + 1).padStart(2, '0')}</span>
                    <span
                      className={`flex-1 font-display text-[clamp(1.25rem,2.2vw,1.6rem)] leading-snug transition-colors ${
                        isOpen ? 'text-paper' : 'text-paper/80 hover:text-paper'
                      }`}
                    >
                      {f.question}
                    </span>
                    <span
                      className={`mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        isOpen ? 'rotate-45 border-brand bg-brand text-white' : 'border-paper/25'
                      }`}
                      aria-hidden="true"
                    >
                      <Plus size={16} strokeWidth={1.5} />
                    </span>
                  </button>
                </h3>
                <div
                  id={id}
                  role="region"
                  aria-labelledby={`${id}-btn`}
                  className={`grid transition-[grid-template-rows,visibility] duration-500 ease-out ${
                    isOpen ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[62ch] pb-8 pl-[2.6rem] pr-12 text-paper/70">{f.answer}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
