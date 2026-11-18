import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, MapPin } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import MediaFrame from '../components/MediaFrame'
import ProductCard, { StatusBadge } from '../components/ProductCard'
import CtaSection from '../components/CtaSection'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { ImageReveal, Reveal, RevealGroup, RevealItem } from '../components/AnimatedSection'
import { availableProducts, upcomingProducts } from '../data/products'
import { siteConfig } from '../data/siteConfig'
import { buildWhatsAppUrl, productEnquiryMessage } from '../lib/whatsapp'

function ProductDetail({ product: p, reverse }) {
  return (
    <article id={p.slug} aria-labelledby={`${p.slug}-title`} className="grid gap-12 lg:grid-cols-12 lg:gap-14">
      {/* Imagery */}
      <div className={`lg:col-span-6 ${reverse ? 'lg:order-2' : ''}`}>
        <div className="lg:sticky lg:top-28">
          <ImageReveal className="group relative aspect-[4/5] overflow-hidden rounded-[28px] bg-cream">
            <MediaFrame imageKey={p.image} art={p.art} zoom className="h-full w-full" />
            <StatusBadge status={p.status} className="absolute top-5 left-5" />
          </ImageReveal>
          {p.gallery?.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              {p.gallery.map((key, i) => (
                <Reveal key={key} delay={i * 0.1} className="aspect-[4/3] overflow-hidden rounded-2xl bg-cream">
                  <MediaFrame imageKey={key} className="h-full w-full" sizes="(min-width: 1024px) 25vw, 50vw" />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="lg:col-span-6">
        <Reveal>
          <p className="text-[0.7rem] font-semibold tracking-[0.24em] text-muted uppercase">Product detail</p>
          <h2 id={`${p.slug}-title`} className="mt-4 text-[2.6rem] leading-[1.05] text-charcoal sm:text-6xl">
            {p.name}
          </h2>
          {p.localName && (
            <p className="mt-3 text-lg text-gold-deep">
              {p.localName}
              {p.altNames?.length ? <span className="text-muted"> · also known as {p.altNames.join(', ')}</span> : null}
            </p>
          )}
        </Reveal>

        <Reveal delay={0.05} className="mt-8 space-y-4 text-[1.02rem] leading-relaxed text-muted">
          {p.description.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </Reveal>

        {/* Origin */}
        <Reveal delay={0.05} className="mt-10 flex gap-4 rounded-2xl bg-cream p-6">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest text-gold">
            <MapPin className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-[0.7rem] font-semibold tracking-[0.22em] text-muted uppercase">Origin</h3>
            <p className="mt-1.5 font-serif text-xl text-charcoal">{p.origin}</p>
            {p.originNote && <p className="mt-1 text-sm text-muted">{p.originNote}</p>}
          </div>
        </Reveal>

        {/* Applications */}
        <Reveal delay={0.05} className="mt-10">
          <h3 className="font-serif text-2xl text-charcoal">Applications</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {p.applications.map((a) => (
              <li key={a} className="flex gap-3 text-[0.95rem] text-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={2} aria-hidden="true" />
                {a}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Available information */}
        <Reveal delay={0.05} className="mt-10">
          <h3 className="font-serif text-2xl text-charcoal">Available Information</h3>
          <dl className="mt-5 divide-y divide-line border-y border-line">
            {p.availableInfo.map((row) => (
              <div key={row.label} className="flex justify-between gap-6 py-4 text-sm">
                <dt className="font-semibold text-charcoal">{row.label}</dt>
                <dd className="text-right text-muted">{row.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Detailed specifications, product forms and packaging options are shared on request, based on your
            requirement.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-10 rounded-[1.5rem] bg-forest p-7 text-ivory sm:p-9">
          <p className="font-serif text-2xl leading-snug sm:text-3xl">Interested in bulk {p.name.toLowerCase()}?</p>
          <p className="mt-3 text-sm leading-relaxed text-ivory/70">
            Tell us your quantity, location and requirements — we’ll respond with the details you need.
          </p>
          <div className="mt-7 flex flex-col gap-3 min-[480px]:flex-row">
            <Link to={`/contact?product=${p.slug}`} className="btn-gold group">
              Bulk Enquiry
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <a
              href={buildWhatsAppUrl(productEnquiryMessage(p.name))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light"
            >
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </article>
  )
}

export default function Spices() {
  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': availableProducts.map((p) => ({
        '@type': 'Product',
        name: p.name,
        alternateName: [p.localName, ...(p.altNames || [])].filter(Boolean),
        description: p.shortDescription,
        category: 'Spices',
        brand: { '@type': 'Brand', name: siteConfig.name },
        url: `${siteConfig.siteUrl}/spices#${p.slug}`,
      })),
    }),
    [],
  )

  return (
    <>
      <Seo
        title="Our Spices — Waigaon Turmeric"
        description="Explore Waigaon (Waygaon) turmeric from Indian Family Farmer — origin, applications and bulk enquiry details — plus upcoming Indian spices including red chilli, coriander, cumin, black pepper and cardamom."
        jsonLd={jsonLd}
      />
      <PageHeader
        crumb="Our Spices"
        eyebrow="Spice catalogue"
        title={
          <>
            Our Spices, <span className="text-gold-deep italic">Thoughtfully Sourced</span>
          </>
        }
        intro="Waigaon turmeric is available for bulk enquiry today. More spices from across India are coming soon."
      >
        <nav aria-label="Catalogue sections" className="mt-12 flex flex-wrap gap-2.5">
          <a href="#waigaon-turmeric" className="rounded-full border border-line bg-white/60 px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:border-charcoal">
            Available now
          </a>
          <a href="#coming-soon" className="rounded-full border border-line bg-white/60 px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:border-charcoal">
            Coming soon
          </a>
        </nav>
      </PageHeader>

      <section aria-label="Available products" className="container-x space-y-28 pb-24 lg:pb-32">
        {availableProducts.map((p, i) => (
          <ProductDetail key={p.slug} product={p} reverse={i % 2 === 1} />
        ))}
      </section>

      <section id="coming-soon" aria-labelledby="soon-title" className="bg-cream section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Coming soon"
            title={<span id="soon-title">Expanding Our Collection</span>}
            intro="The spices below are planned additions and are not currently available. Register your interest and we’ll let you know when they are."
          />
          <RevealGroup className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
            {upcomingProducts.map((p, i) => (
              <RevealItem key={p.slug}>
                <ProductCard product={p} index={i + availableProducts.length} />
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-14">
            <Link to="/contact" className="btn-outline">
              Register interest <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <div className="pt-20 sm:pt-28">
        <CtaSection />
      </div>
    </>
  )
}
