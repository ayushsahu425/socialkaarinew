import { useEffect, useState } from 'react'

/** True once the page has scrolled more than `threshold` px (or a fraction of the viewport if < 1). */
export function useScrolledPast(threshold: number): boolean {
  const [past, setPast] = useState(false)

  useEffect(() => {
    const limit = () => (threshold < 1 ? window.innerHeight * threshold : threshold)
    const onScroll = () => setPast(window.scrollY > limit())
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [threshold])

  return past
}
