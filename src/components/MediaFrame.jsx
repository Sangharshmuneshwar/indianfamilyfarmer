import SpiceArt from './SpiceArt'
import { images } from '../data/images'

/**
 * Renders a real photo when one is registered in data/images.js,
 * otherwise a branded placeholder illustration. Callers reserve space
 * (aspect-ratio / fixed height) to prevent layout shift.
 */
export default function MediaFrame({
  imageKey,
  art,
  alt,
  className = '',
  imgClassName = '',
  priority = false,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  zoom = false,
}) {
  const img = imageKey ? images[imageKey] : null
  const label = alt ?? img?.alt ?? ''
  const zoomCls = zoom
    ? 'transition-transform duration-[1200ms] ease-(--ease-premium) group-hover:scale-[1.06]'
    : ''

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {img?.src ? (
        <img
          src={img.src}
          srcSet={img.srcSet || undefined}
          sizes={img.srcSet ? sizes : undefined}
          alt={label}
          width={img.width}
          height={img.height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          className={`h-full w-full object-cover ${zoomCls} ${imgClassName}`}
        />
      ) : (
        <>
          <SpiceArt
            variant={art || img?.art || 'turmeric'}
            title={label}
            className={`block h-full w-full ${zoomCls} ${imgClassName}`}
          />
          {import.meta.env.DEV && (
            <span className="pointer-events-none absolute right-3 bottom-3 rounded-full bg-charcoal/70 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-ivory uppercase">
              Placeholder
            </span>
          )}
        </>
      )}
    </div>
  )
}
