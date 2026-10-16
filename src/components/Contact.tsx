import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Mail, MapPin, Phone } from 'lucide-react'
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { useEnquiry } from '../context/EnquiryContext'
import { company, serviceOptions, whatsappLink, type ServiceOption } from '../data/content'
import { buttonClass, MagneticLink } from './ui/Button'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

interface FormState {
  name: string
  phone: string
  email: string
  service: ServiceOption | ''
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const empty: FormState = { name: '', phone: '', email: '', service: '', message: '' }

function validate(v: FormState): FormErrors {
  const errors: FormErrors = {}
  if (v.name.trim().length < 2) errors.name = 'Enter your name.'

  const digits = v.phone.replace(/\D/g, '')
  const local = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits
  if (!/^[6-9]\d{9}$/.test(local)) errors.phone = 'Enter a 10-digit mobile number, like 98765 43210.'

  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    errors.email = 'Enter a valid email address, like name@example.com.'

  if (!v.service) errors.service = 'Choose the service you need.'
  return errors
}

function buildMessage(v: FormState): string {
  return [
    'Hi Socialkaari, I’d like to discuss a project.',
    '',
    `Name: ${v.name.trim()}`,
    `Phone: ${v.phone.trim()}`,
    v.email.trim() ? `Email: ${v.email.trim()}` : '',
    `Service: ${v.service}`,
    v.message.trim() ? `\n${v.message.trim()}` : '',
  ]
    .filter(Boolean)
    .join('\n')
}

export function Contact() {
  const { enquiry } = useEnquiry()
  const [values, setValues] = useState<FormState>(empty)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  // A service row's "Enquire" button pre-fills the form
  useEffect(() => {
    if (!enquiry) return
    setValues((v) => ({
      ...v,
      service: enquiry.option,
      message: v.message || `I’m interested in ${enquiry.service.toLowerCase()}.`,
    }))
    const t = window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 700)
    return () => window.clearTimeout(t)
  }, [enquiry])

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 4500)
    return () => window.clearTimeout(t)
  }, [toast])

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [e.target.name]: e.target.value } as FormState
    setValues(next)
    if (touched) setErrors(validate(next))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTouched(true)
    const found = validate(values)
    setErrors(found)
    const firstInvalid = (Object.keys(found) as (keyof FormState)[])[0]
    if (firstInvalid) {
      document.getElementById(`f-${firstInvalid}`)?.focus()
      return
    }
    window.open(whatsappLink(buildMessage(values)), '_blank', 'noopener,noreferrer')
    setToast('Opening WhatsApp with your details. Press send there and we’ll reply soon.')
    setValues(empty)
    setTouched(false)
  }

  const fieldProps = (name: keyof FormState) => ({
    id: `f-${name}`,
    name,
    value: values[name],
    onChange,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `f-${name}-error` : undefined,
  })

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <SectionLabel>Contact</SectionLabel>
          <h2 className="mt-5 max-w-[16ch] text-[clamp(2.5rem,6vw,5rem)] leading-[1]">
            Have a project in mind? Let’s bring it to life.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-16 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          {/* Form */}
          <form onSubmit={onSubmit} noValidate className="lg:col-span-7" aria-label="Project enquiry">
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              <Field label="Your name" error={errors.name} name="name">
                <input ref={nameRef} type="text" autoComplete="name" className="field" placeholder="Full name" {...fieldProps('name')} />
              </Field>
              <Field label="Phone / WhatsApp" error={errors.phone} name="phone">
                <input type="tel" inputMode="tel" autoComplete="tel" className="field" placeholder="98765 43210" {...fieldProps('phone')} />
              </Field>
              <Field label="Email (optional)" error={errors.email} name="email">
                <input type="email" autoComplete="email" className="field" placeholder="name@company.com" {...fieldProps('email')} />
              </Field>
              <Field label="Service" error={errors.service} name="service">
                <div className="relative">
                  <select className="field appearance-none pr-8" {...fieldProps('service')}>
                    <option value="" disabled>
                      Choose a service
                    </option>
                    {serviceOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <ChevronDown aria-hidden="true" size={18} strokeWidth={1.5} className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-muted" />
                </div>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Tell us about your brand (optional)" name="message">
                  <textarea rows={4} className="field resize-y" placeholder="What are you hoping to achieve?" {...fieldProps('message')} />
                </Field>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <button type="submit" className={buttonClass('solid', '!px-8 !py-4 text-base')}>
                Send on WhatsApp
              </button>
              <p className="text-sm text-muted">Opens WhatsApp with your details filled in.</p>
            </div>
          </form>

          {/* Details */}
          <aside className="lg:col-span-4 lg:col-start-9">
            <ul className="space-y-7">
              <Detail icon={<Phone size={18} strokeWidth={1.5} />} label="Call or WhatsApp">
                <a href={company.phoneHref} className="hover:text-brand-deep">
                  {company.phoneDisplay}
                </a>
              </Detail>
              <Detail icon={<Mail size={18} strokeWidth={1.5} />} label="Email">
                {company.emails.map((e) => (
                  <a key={e} href={`mailto:${e}`} className="block break-all hover:text-brand-deep">
                    {e}
                  </a>
                ))}
              </Detail>
              <Detail icon={<MapPin size={18} strokeWidth={1.5} />} label="Studio">
                <a href={company.mapLink} target="_blank" rel="noopener noreferrer" className="hover:text-brand-deep">
                  {company.address}
                </a>
              </Detail>
            </ul>

            <div className="mt-10 overflow-hidden border border-ink/10">
              <iframe
                title="Socialkaari studio location on Google Maps"
                src={company.mapEmbed}
                className="block h-64 w-full grayscale-[0.4]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <MagneticLink
              href={whatsappLink('Hi Socialkaari, could you please share your brochure?')}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="mt-8 w-full sm:w-auto"
            >
              Ask for our brochure
            </MagneticLink>
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <div className="pointer-events-none fixed inset-x-4 bottom-6 z-50 flex justify-center">
            <motion.div
              role="status"
              className="pointer-events-auto max-w-md rounded-2xl bg-ink px-5 py-4 text-sm text-paper shadow-2xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
            >
              {toast}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string
  name: keyof FormState
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={`f-${name}`} className="block text-sm font-medium text-muted">
        {label}
      </label>
      {children}
      {error && (
        <p id={`f-${name}-error`} className="mt-2 text-sm text-brand-deep">
          {error}
        </p>
      )}
    </div>
  )
}

function Detail({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/15 text-brand-deep">{icon}</span>
      <div>
        <p className="text-sm text-muted">{label}</p>
        <div className="mt-1 text-lg leading-snug">{children}</div>
      </div>
    </li>
  )
}
