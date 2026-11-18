import { Reveal } from './AnimatedSection'

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'dark',
  className = '',
  as: Tag = 'h2',
}) {
  const center = align === 'center'
  const light = tone === 'light'
  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && (
        <p className={`eyebrow ${center ? 'justify-center' : ''} ${light ? 'text-gold!' : ''}`}>{eyebrow}</p>
      )}
      <Tag
        className={`mt-5 text-[2.15rem] leading-[1.08] sm:text-5xl lg:text-[3.5rem] ${light ? 'text-ivory' : 'text-charcoal'}`}
      >
        {title}
      </Tag>
      {intro && (
        <p
          className={`mt-6 max-w-2xl text-base leading-relaxed sm:text-lg ${light ? 'text-ivory/75' : 'text-muted'} ${center ? 'mx-auto' : ''}`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  )
}
