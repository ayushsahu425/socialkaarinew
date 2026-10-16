interface SectionLabelProps {
  children: string
  tone?: 'dark' | 'light'
  className?: string
}

/** Small label above a section heading: a short red rule and sentence-case text. */
export function SectionLabel({ children, tone = 'dark', className = '' }: SectionLabelProps) {
  return <p className={`eyebrow ${tone === 'light' ? '!text-paper/60' : ''} ${className}`}>{children}</p>
}
