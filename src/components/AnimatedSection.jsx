import { m } from 'motion/react'

export const EASE = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export const stagger = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

/** Fades content up once when it scrolls into view (IntersectionObserver-based, no scroll listeners). */
export function Reveal({ as = 'div', children, delay = 0, y = 28, className = '', amount = 0.25, ...rest }) {
  const Comp = m[as] || m.div
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

/** Container that staggers its <RevealItem> children into view. */
export function RevealGroup({ as = 'div', children, className = '', gap = 0.1, amount = 0.15, ...rest }) {
  const Comp = m[as] || m.div
  return (
    <Comp
      className={className}
      variants={stagger(gap)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

export function RevealItem({ as = 'div', children, className = '', ...rest }) {
  const Comp = m[as] || m.div
  return (
    <Comp className={className} variants={fadeUp} {...rest}>
      {children}
    </Comp>
  )
}

/** Soft image entrance: inset clip opens while the image settles. */
export function ImageReveal({ children, className = '', delay = 0, radius = 28 }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, scale: 1.03, clipPath: `inset(6% 6% 6% 6% round ${radius}px)` }}
      whileInView={{ opacity: 1, scale: 1, clipPath: `inset(0% 0% 0% 0% round ${radius}px)` }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </m.div>
  )
}

export default Reveal
