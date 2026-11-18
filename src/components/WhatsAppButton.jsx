import { m } from 'motion/react'
import WhatsAppIcon from './WhatsAppIcon'
import { buildWhatsAppUrl } from '../lib/whatsapp'
import { EASE } from './AnimatedSection'

/**
 * Floating click-to-chat button (official wa.me link — no automation).
 * Sits above the safe-area inset; the scroll-to-top control stacks above it.
 */
export default function WhatsAppButton() {
  return (
    <m.a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
      className={`group fixed right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#1f8f4e] text-white shadow-[0_12px_30px_-10px_rgba(20,90,50,0.7)] bottom-[max(1rem,env(safe-area-inset-bottom))] sm:right-6 sm:bottom-6`}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: 1.2 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full ring-1 ring-white/25 ring-inset"
      />
      <WhatsAppIcon className="h-7 w-7" />
      <span
        role="tooltip"
        className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 translate-x-2 rounded-full bg-charcoal px-3.5 py-2 text-xs font-semibold whitespace-nowrap text-ivory opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
      >
        Chat with Us
      </span>
    </m.a>
  )
}
