import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import { Reveal } from './AnimatedSection'
import { buildWhatsAppUrl } from '../lib/whatsapp'

/** Reusable B2B enquiry call-to-action band. */
export default function CtaSection({
  eyebrow = 'Bulk & Wholesale Enquiries',
  title = 'Looking for Quality Indian Spices?',
  text = 'Connect with Indian Family Farmer to discuss your sourcing requirements, bulk enquiries, and trading opportunities.',
  whatsappMessage,
}) {
  return (
    <section aria-labelledby="cta-title" className="container-x pb-20 sm:pb-28">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-forest px-6 py-16 text-center sm:px-12 sm:py-20 lg:px-20 lg:py-24">
        {/* Decorative rings */}
        <svg aria-hidden="true" className="pointer-events-none absolute -top-40 -right-40 h-[480px] w-[480px] text-gold/15" viewBox="0 0 200 200" fill="none">
          {[96, 78, 60, 42].map((r) => (
            <circle key={r} cx="100" cy="100" r={r} stroke="currentColor" strokeWidth=".6" />
          ))}
        </svg>
        <svg aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-32 h-[420px] w-[420px] text-ivory/[0.06]" viewBox="0 0 200 200" fill="none">
          {[96, 74, 52].map((r) => (
            <circle key={r} cx="100" cy="100" r={r} stroke="currentColor" strokeWidth=".8" />
          ))}
        </svg>

        <p className="eyebrow justify-center text-gold!">{eyebrow}</p>
        <h2 id="cta-title" className="mx-auto mt-6 max-w-3xl text-[2.2rem] leading-[1.08] text-ivory sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ivory/70 sm:text-lg">{text}</p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link to="/contact" className="btn-gold group">
            Send an Enquiry
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <a
            href={buildWhatsAppUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-light"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </div>
      </Reveal>
    </section>
  )
}
