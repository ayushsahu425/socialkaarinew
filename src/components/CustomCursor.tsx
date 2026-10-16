import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useFinePointer } from '../hooks/useMediaQuery'

const INTERACTIVE = 'a, button, [role="tab"], select, input, textarea, label'

/**
 * A soft ring that trails the native cursor on desktop and grows over
 * links and buttons. The system cursor stays visible.
 */
export function CustomCursor() {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const enabled = fine && !reduce

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!enabled) return
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const target = e.target as Element | null
      setHovering(!!target?.closest?.(INTERACTIVE))
    }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full border border-brand mix-blend-multiply"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: hovering ? 54 : 26,
        height: hovering ? 54 : 26,
        opacity: visible ? 1 : 0,
        backgroundColor: hovering ? 'rgba(226,35,26,0.12)' : 'rgba(226,35,26,0)',
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    />
  )
}
