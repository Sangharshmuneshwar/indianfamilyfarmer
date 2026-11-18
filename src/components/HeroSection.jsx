import { Link } from 'react-router-dom'
import { m } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import MediaFrame from './MediaFrame'
import WhatsAppIcon from './WhatsAppIcon'
import { EASE } from './AnimatedSection'
import { buildWhatsAppUrl } from '../lib/whatsapp'

const lines = [
  ['Rooted in', 'Indian Soil.'],
  ['Trusted for', 'Quality.'],
]

const facts = [
  { k: 'Featured product', v: 'Waigaon Turmeric' },
  { k: 'Origin region', v: 'Maharashtra, India' },
  { k: 'Enquiries', v: 'Bulk & wholesale' },
]

/* Slow, subtle drifting motif (transform-only; disabled with reduced motion) */
function Floater({ className, delay = 0, children, range = 10 }) {
  return (
    <m.div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, -range, 0], rotate: [0, 4, 0] }}
      transition={{
        opacity: { duration: 1.2, delay: 0.8 + delay },
        y: { duration: 9, repeat: Infinity, ease: 'easeInOut', delay },
        rotate: { duration: 11, repeat: Infinity, ease: 'easeInOut', delay },
      }}
    >
      {children}
    </m.div>
  )
}

const Seed = ({ c = '#D69A24' }) => (
  <svg viewBox="0 0 40 20" className="h-full w-full">
    <path d="M2 10C10 1 30 1 38 10 30 19 10 19 2 10Z" fill={c} />
    <path d="M7 10h26" stroke="#fff" strokeOpacity=".35" strokeWidth="1.2" />
  </svg>
)
const LeafMotif = () => (
  <svg viewBox="0 0 80 40" className="h-full w-full">
    <path d="M2 20C20 2 56 0 78 20 56 40 20 38 2 20Z" fill="#263D32" fillOpacity=".85" />
    <path d="M6 20h66" stroke="#FAF8F3" strokeOpacity=".35" strokeWidth="1.2" />
  </svg>
)

export default function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-[104px] lg:pt-[120px]">
      {/* Soft background wash */}
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[38%] bg-cream lg:block" />
      <div
        aria-hidden="true"
        className="absolute top-[18%] -left-40 h-[420px] w-[420px] rounded-full bg-gold/10 blur-3xl"
      />

      <div className="container-x relative grid items-center gap-14 pb-16 lg:grid-cols-12 lg:gap-8 lg:pb-24">
        {/* Copy */}
        <div className="relative z-10 lg:col-span-6 xl:col-span-6">
          <m.p
            className="eyebrow"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            Indian Spices • Trusted Trading Partners
          </m.p>

          <h1
            id="hero-title"
            className="mt-7 text-[2.9rem] leading-[1.02] text-charcoal min-[400px]:text-[3.3rem] sm:text-7xl lg:text-[5.1rem] xl:text-[5.9rem]"
          >
            {lines.map((pair, li) => (
              <span key={li} className="block">
                {pair.map((part, pi) => (
                  <span key={pi} className="block overflow-hidden pb-[0.08em]">
                    <m.span
                      className={`block ${li === 1 && pi === 1 ? 'text-gold-deep italic' : ''}`}
                      initial={{ y: '105%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.2 + (li * 2 + pi) * 0.09 }}
                    >
                      {part}
                    </m.span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <m.p
            className="mt-8 max-w-[34rem] text-base leading-relaxed text-muted sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
          >
            Discover the richness of Indian agriculture with Indian Family Farmer — connecting quality spices
            with businesses that value authenticity and reliability.
          </m.p>

          <m.div
            className="mt-10 flex flex-col gap-3 min-[480px]:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
          >
            <Link to="/spices#waigaon-turmeric" className="btn-primary group">
              Explore Our Turmeric
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <WhatsAppIcon className="h-4 w-4 text-[#1f8f4e]" />
              Enquire on WhatsApp
            </a>
          </m.div>
        </div>

        {/* Imagery */}
        <div className="relative lg:col-span-6 xl:col-span-5 xl:col-start-8">
          <m.div
            className="relative mx-auto w-full max-w-[470px]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
          >
            {/* Arched primary image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-cream shadow-[0_40px_80px_-40px_rgba(38,61,50,0.45)]">
              <m.div
                className="h-full w-full"
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, ease: EASE, delay: 0.3 }}
              >
                <MediaFrame imageKey="hero" priority className="h-full w-full" sizes="(min-width: 1024px) 470px, 90vw" />
              </m.div>
            </div>

            {/* Circular secondary image */}
            <m.div
              className="absolute -bottom-8 -left-4 h-32 w-32 overflow-hidden rounded-full border-[6px] border-ivory bg-cream shadow-xl sm:-left-12 sm:h-40 sm:w-40"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
            >
              <MediaFrame imageKey="heroSecondary" className="h-full w-full" />
            </m.div>

            {/* Product tag */}
            <m.div
              className="absolute top-[14%] -right-2 rounded-2xl border border-line bg-ivory/95 px-5 py-4 shadow-[0_20px_40px_-24px_rgba(36,40,32,0.5)] backdrop-blur sm:-right-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 1.05 }}
            >
              <p className="text-[0.62rem] font-semibold tracking-[0.22em] text-gold-deep uppercase">Featured</p>
              <p className="mt-1 font-serif text-xl leading-tight text-charcoal">Waigaon Turmeric</p>
              <p className="text-sm text-muted">वायगाव हळद</p>
            </m.div>

            {/* Rotating seal (slow, decorative) */}
            <m.svg
              aria-hidden="true"
              viewBox="0 0 120 120"
              className="absolute -right-3 -bottom-10 h-24 w-24 text-forest sm:-right-10 sm:h-28 sm:w-28"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              transition={{ opacity: { delay: 1.2, duration: 1 }, rotate: { duration: 40, repeat: Infinity, ease: 'linear' } }}
            >
              <defs>
                <path id="seal-circle" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" />
              </defs>
              <circle cx="60" cy="60" r="58" fill="#FAF8F3" />
              <text fontSize="10.5" letterSpacing="3.2" fill="currentColor" fontFamily="Manrope, sans-serif" fontWeight="600">
                <textPath href="#seal-circle">FROM INDIAN SOIL • WAIGAON TURMERIC •</textPath>
              </text>
              <path d="M60 42c-5 7-8 12-8 18a8 8 0 0 0 16 0c0-6-3-11-8-18Z" fill="#D69A24" />
            </m.svg>
          </m.div>

          {/* Floating natural motifs */}
          <Floater className="top-4 left-2 h-5 w-10 sm:left-10" delay={0.2}>
            <Seed />
          </Floater>
          <Floater className="top-1/2 -right-1 hidden h-6 w-12 lg:block" delay={1.4} range={14}>
            <Seed c="#B76843" />
          </Floater>
          <Floater className="-top-6 right-[22%] h-8 w-16" delay={0.8}>
            <LeafMotif />
          </Floater>
        </div>
      </div>

      {/* Facts strip */}
      <m.div
        className="container-x relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <dl className="grid grid-cols-1 border-t border-line sm:grid-cols-3">
          {facts.map((f, i) => (
            <div
              key={f.k}
              className={`flex items-baseline justify-between gap-4 py-5 sm:block sm:py-7 ${i > 0 ? 'border-t border-line sm:border-t-0 sm:border-l sm:pl-8' : ''}`}
            >
              <dt className="text-[0.68rem] font-semibold tracking-[0.22em] text-muted uppercase">{f.k}</dt>
              <dd className="font-serif text-lg text-charcoal sm:mt-2 sm:text-2xl">{f.v}</dd>
            </div>
          ))}
        </dl>
      </m.div>
    </section>
  )
}
