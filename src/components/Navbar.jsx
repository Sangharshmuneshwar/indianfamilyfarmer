import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import Logo from './Logo'
import WhatsAppIcon from './WhatsAppIcon'
import { siteConfig } from '../data/siteConfig'
import { buildWhatsAppUrl } from '../lib/whatsapp'
import { EASE } from './AnimatedSection'

function isActive(to, { pathname, hash }) {
  const [path, h] = to.split('#')
  if (h) return pathname === (path || '/') && hash === `#${h}`
  if (path === '/') return pathname === '/' && !hash
  return pathname.startsWith(path)
}

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const next = y > 24
    setScrolled((prev) => (prev === next ? prev : next))
  })

  // Close mobile menu on navigation
  useEffect(() => setOpen(false), [location.pathname, location.hash])

  // Lock scroll + Escape to close while menu is open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        open
          ? 'bg-ivory' // no backdrop-filter while open: it would trap the fixed menu
          : solid
            ? 'bg-ivory/92 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-md'
            : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className={`container-x relative z-10 flex items-center justify-between transition-[height] duration-500 ${scrolled ? 'h-[72px]' : 'h-[84px] lg:h-[96px]'}`}
      >
        <Link to="/" aria-label="Indian Family Farmer — Home" className="relative z-10 rounded-lg">
          <Logo />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {siteConfig.nav.map((item) => {
            const active = isActive(item.to, location)
            return (
              <li key={item.to} className="relative">
                <Link
                  to={item.to}
                  aria-current={active ? 'page' : undefined}
                  className={`group relative block px-4 py-2 text-[0.88rem] font-medium transition-colors duration-300 ${
                    active ? 'text-charcoal' : 'text-charcoal/65 hover:text-charcoal'
                  }`}
                >
                  {item.label}
                  <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-charcoal/40 transition-transform duration-400 ease-(--ease-premium) group-hover:scale-x-100" />
                  {active && (
                    <m.span
                      layoutId="nav-active"
                      className="absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full bg-gold"
                      transition={{ duration: 0.45, ease: EASE }}
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link to="/contact" className="btn-primary hidden min-h-11 px-6 sm:inline-flex">
            Enquire Now
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          {/* Hamburger */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-charcoal/15 bg-ivory/60 lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <m.span
                className="absolute left-0 block h-[1.5px] w-5 rounded bg-charcoal"
                animate={open ? { top: 5, rotate: 45 } : { top: 0, rotate: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              />
              <m.span
                className="absolute left-0 block h-[1.5px] rounded bg-charcoal"
                animate={open ? { top: 5, rotate: -45, width: 20 } : { top: 10, rotate: 0, width: 13 }}
                transition={{ duration: 0.35, ease: EASE }}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            className="fixed inset-0 z-0 flex flex-col overflow-y-auto bg-ivory pt-[96px] lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <m.ul
              className="container-x flex flex-1 flex-col justify-center gap-1 pb-10"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
            >
              {siteConfig.nav.map((item, i) => {
                const active = isActive(item.to, location)
                return (
                  <m.li
                    key={item.to}
                    variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="border-b border-line"
                  >
                    <Link
                      to={item.to}
                      aria-current={active ? 'page' : undefined}
                      className="flex items-baseline justify-between py-4"
                    >
                      <span className={`font-serif text-[2.1rem] leading-tight ${active ? 'text-gold-deep' : 'text-charcoal'}`}>
                        {item.label}
                      </span>
                      <span className="text-xs font-semibold tracking-widest text-muted">0{i + 1}</span>
                    </Link>
                  </m.li>
                )
              })}
              <m.li
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <Link to="/contact" className="btn-primary">
                  Enquire Now <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
                </a>
              </m.li>
            </m.ul>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
