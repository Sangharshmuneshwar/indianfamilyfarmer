import { useState } from 'react'
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowUp } from 'lucide-react'

/** Appears after the visitor scrolls past ~1.5 screens; stacks above the WhatsApp button. */
export default function ScrollToTop() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const next = y > window.innerHeight * 1.5
    setShow((prev) => (prev === next ? prev : next))
  })

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <AnimatePresence>
      {show && (
        <m.button
          type="button"
          onClick={toTop}
          aria-label="Scroll to top"
          className="fixed right-[1.375rem] bottom-[calc(max(1rem,env(safe-area-inset-bottom))+4.25rem)] z-40 grid h-11 w-11 place-items-center rounded-full border border-charcoal/10 bg-ivory/95 text-charcoal shadow-[0_8px_24px_-12px_rgba(36,40,32,0.45)] backdrop-blur transition-colors hover:bg-charcoal hover:text-ivory sm:right-[1.875rem] sm:bottom-[5.5rem]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </m.button>
      )}
    </AnimatePresence>
  )
}
