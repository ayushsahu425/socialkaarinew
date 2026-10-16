import { AnimatePresence, motion } from 'framer-motion'
import { whatsappLink } from '../data/content'
import { useScrolledPast } from '../hooks/useScrolledPast'

/** Floating WhatsApp button that appears once the hero has scrolled away. */
export function WhatsAppFab() {
  const visible = useScrolledPast(0.8)

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappLink('Hi Socialkaari, I’d like to know more about your services.')}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Socialkaari on WhatsApp"
          className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-10px_rgb(0_0_0/0.45)] transition-transform hover:scale-105 sm:bottom-7 sm:right-7"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        >
          <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden="true">
            <path d="M16.04 3C8.86 3 3.03 8.83 3.03 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.75A12.95 12.95 0 0 0 16.04 29C23.2 29 29 23.17 29 16S23.2 3 16.04 3Zm0 23.63c-2 0-3.95-.54-5.65-1.56l-.4-.24-3.96 1.04 1.06-3.86-.26-.4A10.6 10.6 0 0 1 5.4 16c0-5.86 4.77-10.63 10.64-10.63 5.86 0 10.6 4.77 10.6 10.63 0 5.87-4.75 10.63-10.6 10.63Zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.1-.5-.16-.72.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.14 3.09 1.3 3.3.16.21 2.25 3.43 5.45 4.81.76.33 1.36.53 1.82.67.77.24 1.46.21 2.01.13.61-.09 1.89-.77 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
