import { motion, useMotionValue, useReducedMotion, useSpring, type HTMLMotionProps } from 'framer-motion'
import type { MouseEvent } from 'react'
import { useFinePointer } from '../../hooks/useMediaQuery'

export type ButtonVariant = 'solid' | 'outline' | 'light'

const base =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-medium transition-colors duration-300 ease-out'

const variants: Record<ButtonVariant, string> = {
  // White on brand red passes AA (4.7:1); paper-on-red would not.
  solid: 'bg-brand text-white hover:bg-brand-deep',
  outline: 'border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  light: 'border border-paper/35 text-paper hover:border-paper hover:bg-paper hover:text-ink',
}

export function buttonClass(variant: ButtonVariant = 'solid', extra = ''): string {
  return `${base} ${variants[variant]} ${extra}`.trim()
}

interface MagneticLinkProps extends HTMLMotionProps<'a'> {
  variant?: ButtonVariant
  /** How far the button leans toward the cursor (0–1). */
  strength?: number
}

/** A pill link that leans gently toward the cursor on desktop. */
export function MagneticLink({ variant = 'solid', strength = 0.22, className = '', children, ...rest }: MagneticLinkProps) {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 })

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!fine || reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      {...rest}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={buttonClass(variant, className)}
    >
      {children}
    </motion.a>
  )
}
