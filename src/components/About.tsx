import { about, company } from '../data/content'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <SectionLabel>About us, the ideal people</SectionLabel>
          <blockquote className="mt-6 max-w-[22ch] font-display text-[clamp(2.1rem,5vw,4.25rem)] leading-[1.05] tracking-[-0.02em]">
            {about.quote}
          </blockquote>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          <figure className="lg:col-span-5">
            <div className="relative">
              <img
                src={about.image}
                alt="The Socialkaari team at work"
                width={640}
                height={800}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
              <span className="absolute -bottom-5 right-5 bg-brand px-4 py-2 font-display text-lg text-white sm:text-xl">
                Since {company.founded}
              </span>
            </div>
          </figure>

          <div className="flex flex-col justify-between gap-12 lg:col-span-6 lg:col-start-7">
            <div className="space-y-5 text-lg leading-relaxed text-ink/85">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="max-w-[60ch]">
                  {p}
                </p>
              ))}
            </div>

            <div className="border-l-2 border-brand pl-6">
              <p className="font-display text-2xl leading-snug sm:text-[1.75rem]">{company.founder}</p>
              <p className="text-sm text-muted">Founder and creative director</p>
              <p className="mt-4 max-w-[52ch] text-ink/80">{about.founderNote}</p>
            </div>
          </div>
        </div>

        <ul className="mt-20 grid gap-10 border-t border-ink/15 pt-10 md:grid-cols-3 md:gap-8 lg:mt-28">
          {about.pillars.map((p) => (
            <li key={p.title}>
              <h3 className="text-[1.6rem] leading-tight">{p.title}</h3>
              <p className="mt-3 max-w-[38ch] text-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
