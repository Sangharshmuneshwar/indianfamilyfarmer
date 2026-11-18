import logoMark from '../assets/images/logo-mark.svg'

/**
 * Brand mark + wordmark.
 *
 * TEMPORARY LOGO: the emblem lives in src/assets/images/logo-mark.svg.
 * To use your final logo, replace that file (keep the same name). Any
 * square SVG/PNG/WebP works, or change the import above.
 * Also replace public/favicon.svg (browser tab icon).
 */
export default function Logo({ light = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src={logoMark}
        alt=""
        width="42"
        height="42"
        className={`h-[42px] w-[42px] shrink-0 rounded-full ${light ? 'ring-1 ring-ivory/25' : ''}`}
      />
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-[1.22rem] tracking-tight sm:text-[1.3rem] ${light ? 'text-ivory' : 'text-charcoal'}`}>
          Indian Family Farmer
        </span>
        <span
          className={`mt-1 text-[0.56rem] font-semibold tracking-[0.3em] uppercase ${light ? 'text-gold' : 'text-gold-deep'}`}
        >
          Spices &amp; Trading
        </span>
      </span>
    </span>
  )
}
