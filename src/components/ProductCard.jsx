import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock } from 'lucide-react'
import MediaFrame from './MediaFrame'
import { PRODUCT_STATUS } from '../data/products'

export function StatusBadge({ status, className = '' }) {
  const s = PRODUCT_STATUS[status] || PRODUCT_STATUS['coming-soon']
  const available = s.tone === 'available'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.68rem] font-semibold tracking-wider uppercase ${
        available ? 'bg-forest text-ivory' : 'bg-ivory/90 text-muted ring-1 ring-line'
      } ${className}`}
    >
      {available ? (
        <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
      ) : (
        <Clock className="h-3 w-3" aria-hidden="true" />
      )}
      {s.label}
    </span>
  )
}

/**
 * Catalogue card. Available products link to their detail section;
 * upcoming products are visually muted and not interactive.
 */
export default function ProductCard({ product, index = 0 }) {
  const available = product.status === 'available'
  const num = String(index + 1).padStart(2, '0')

  const body = (
    <>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-cream">
        <MediaFrame
          imageKey={product.image}
          art={product.art}
          alt={product.name}
          zoom
          sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
          className={`h-full w-full ${available ? '' : 'saturate-[0.8]'}`}
        />
        <StatusBadge status={product.status} className="absolute top-4 left-4" />
        {available && (
          <span className="absolute right-4 bottom-4 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-ivory text-charcoal opacity-0 transition-all duration-500 ease-(--ease-premium) group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        )}
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className={`font-serif text-2xl leading-tight ${available ? 'text-charcoal' : 'text-charcoal/70'}`}>
            {product.name}
          </h3>
          {product.localName && <p className="mt-1 text-sm text-gold-deep">{product.localName}</p>}
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{product.shortDescription}</p>
        </div>
        <span className="pt-1.5 text-xs font-semibold tracking-widest text-muted/70" aria-hidden="true">
          {num}
        </span>
      </div>
    </>
  )

  return available ? (
    <Link
      to={`/spices#${product.slug}`}
      className="group block rounded-[1.4rem] transition-transform duration-500 ease-(--ease-premium) hover:-translate-y-1"
      aria-label={`${product.name} — ${PRODUCT_STATUS[product.status].label}`}
    >
      {body}
    </Link>
  ) : (
    <div className="group">
      {body}
      <span className="sr-only">Not currently available.</span>
    </div>
  )
}
