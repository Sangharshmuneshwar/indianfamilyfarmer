import { Link } from 'react-router-dom'
import { m } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import { EASE } from './AnimatedSection'

/** Editorial header for inner pages, with breadcrumb and staggered reveal. */
export default function PageHeader({ eyebrow, title, intro, crumb, children }) {
  return (
    <header className="relative overflow-hidden pt-[128px] pb-14 sm:pt-[150px] lg:pt-[170px] lg:pb-20">
      <div aria-hidden="true" className="absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-gold/10 blur-3xl" />
      <div className="container-x relative">
        <m.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <ol className="flex items-center gap-1.5 text-xs font-medium text-muted">
            <li>
              <Link to="/" className="link-underline hover:text-charcoal">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3 w-3" />
            </li>
            <li aria-current="page" className="text-charcoal">
              {crumb}
            </li>
          </ol>
        </m.nav>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <m.p
              className="eyebrow"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            >
              {eyebrow}
            </m.p>
            <h1 className="mt-6 overflow-hidden pb-[0.08em] text-[2.7rem] leading-[1.03] text-charcoal sm:text-6xl lg:text-[5rem]">
              <m.span
                className="block"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
              >
                {title}
              </m.span>
            </h1>
          </div>
          {intro && (
            <m.p
              className="max-w-md text-base leading-relaxed text-muted sm:text-lg lg:col-span-4"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
            >
              {intro}
            </m.p>
          )}
        </div>
        {children}
      </div>
    </header>
  )
}
