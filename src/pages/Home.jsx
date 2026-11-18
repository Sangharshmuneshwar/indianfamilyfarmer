import { Link } from 'react-router-dom'
import { m } from 'motion/react'
import { ArrowRight, ArrowUpRight, Handshake, MessagesSquare, Sprout, Award } from 'lucide-react'
import Seo from '../components/Seo'
import HeroSection from '../components/HeroSection'
import SectionHeading from '../components/SectionHeading'
import MediaFrame from '../components/MediaFrame'
import ProductCard from '../components/ProductCard'
import CtaSection from '../components/CtaSection'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { ImageReveal, Reveal, RevealGroup, RevealItem } from '../components/AnimatedSection'
import { featuredProduct, products } from '../data/products'
import { buildWhatsAppUrl, productEnquiryMessage } from '../lib/whatsapp'

const pillars = [
  {
    icon: Award,
    title: 'Focus on Quality',
    text: 'We pay close attention to the produce we offer and discuss quality expectations openly with every buyer.',
  },
  {
    icon: Sprout,
    title: 'Agricultural Heritage',
    text: 'Our name reflects where we come from — a deep respect for Indian farming and the people who grow our spices.',
  },
  {
    icon: Handshake,
    title: 'Business-Focused Supply',
    text: 'We work with wholesalers, distributors and food businesses, shaping each conversation around your volumes and needs.',
  },
  {
    icon: MessagesSquare,
    title: 'Transparent Communication',
    text: 'Clear, honest answers about product, availability and terms — directly, over email or WhatsApp.',
  },
]

function BrandIntro() {
  return (
    <section aria-labelledby="intro-title" className="section-y">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-5">
          <ImageReveal className="relative aspect-[5/6] overflow-hidden rounded-[28px] bg-cream">
            <MediaFrame imageKey="intro" className="h-full w-full" />
          </ImageReveal>
          <Reveal
            delay={0.3}
            className="absolute -right-3 -bottom-8 max-w-[15rem] rounded-2xl bg-forest p-6 text-ivory shadow-xl sm:-right-10"
          >
            <p className="font-serif text-xl leading-snug italic">“From the field, with care.”</p>
            <p className="mt-3 text-[0.65rem] font-semibold tracking-[0.22em] text-gold uppercase">Our approach</p>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHeading
            eyebrow="Who we are"
            title={
              <span id="intro-title">
                From Our Agricultural Roots <span className="text-gold-deep italic">to Your Business</span>
              </span>
            }
          />
          <Reveal delay={0.1} className="mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-[1.05rem]">
            <p>
              Indian Family Farmer is a spice trading company built on a simple idea: businesses deserve a sourcing
              partner who understands both the farm and the market.
            </p>
            <p>
              We connect authentic Indian agricultural produce with buyers who care about where their spices come
              from — beginning with Waigaon turmeric from Maharashtra, and growing into a wider collection of Indian
              spices.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-10">
            <Link to="/about" className="group inline-flex items-center gap-3 text-sm font-semibold text-charcoal">
              <span className="link-underline">Read our story</span>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-charcoal/15 transition-colors duration-300 group-hover:border-charcoal group-hover:bg-charcoal group-hover:text-ivory">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function FeaturedProduct() {
  const p = featuredProduct
  return (
    <section aria-labelledby="featured-title" className="relative overflow-hidden bg-cream section-y">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 right-0 font-serif text-[18vw] leading-none text-gold/[0.07] select-none lg:text-[13rem]"
      >
        हळद
      </div>
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Featured product"
          title={
            <span id="featured-title">
              The Golden Essence <span className="italic">of India</span>
            </span>
          }
        />

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          {/* Image composition */}
          <div className="relative lg:col-span-7">
            <ImageReveal className="group relative aspect-[4/3] overflow-hidden rounded-[28px] bg-ivory">
              <MediaFrame imageKey="turmeric" zoom className="h-full w-full" />
            </ImageReveal>
            <Reveal
              delay={0.25}
              className="absolute -bottom-10 left-6 hidden aspect-square w-44 overflow-hidden rounded-3xl border-[6px] border-cream bg-ivory shadow-xl sm:block lg:w-52"
            >
              <MediaFrame imageKey="turmericPowder" className="h-full w-full" />
            </Reveal>
          </div>

          {/* Editorial details */}
          <div className="flex flex-col lg:col-span-5 lg:pt-6">
            <Reveal>
              <p className="text-[0.7rem] font-semibold tracking-[0.24em] text-muted uppercase">No. 01 — Available for enquiry</p>
              <h3 className="mt-4 font-serif text-4xl leading-tight text-charcoal sm:text-5xl">{p.name}</h3>
              <p className="mt-2 text-lg text-gold-deep">
                {p.localName} · also known as {p.altNames.join(', ')}
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-7 space-y-4 leading-relaxed text-muted">
              <p>{p.shortDescription}</p>
              <p>{p.description[2]}</p>
            </Reveal>

            <Reveal delay={0.15}>
              <dl className="mt-8 divide-y divide-line border-y border-line">
                <div className="flex justify-between gap-6 py-4 text-sm">
                  <dt className="font-semibold text-charcoal">Origin</dt>
                  <dd className="text-right text-muted">{p.origin}</dd>
                </div>
                <div className="flex justify-between gap-6 py-4 text-sm">
                  <dt className="font-semibold text-charcoal">Supply</dt>
                  <dd className="text-right text-muted">Bulk &amp; wholesale enquiries</dd>
                </div>
                <div className="flex justify-between gap-6 py-4 text-sm">
                  <dt className="font-semibold text-charcoal">Specifications</dt>
                  <dd className="text-right text-muted">Shared on request</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.2} className="mt-9 flex flex-col gap-3 min-[480px]:flex-row lg:flex-col xl:flex-row">
              <Link to={`/contact?product=${p.slug}`} className="btn-primary group">
                Bulk Enquiry
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <a
                href={buildWhatsAppUrl(productEnquiryMessage(p.name))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#1f8f4e]" /> Enquire on WhatsApp
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhyChooseUs() {
  return (
    <section id="why-us" aria-labelledby="why-title" className="section-y">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Why choose us"
              title={<span id="why-title">A Trading Partner You Can Talk To</span>}
            />
          </div>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="leading-relaxed text-muted">
              We are building Indian Family Farmer around the things buyers value most in a long-term supplier.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, title, text }, i) => (
            <RevealItem key={title} className="group relative bg-ivory p-8 transition-colors duration-500 hover:bg-cream/60 lg:p-10">
              <div className="flex items-center justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-line text-forest transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-charcoal">
                  <Icon className="h-6 w-6" strokeWidth={1.4} aria-hidden="true" />
                </span>
                <span className="font-serif text-lg text-muted/60" aria-hidden="true">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-10 font-serif text-2xl leading-tight text-charcoal">{title}</h3>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">{text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

function Collection() {
  return (
    <section aria-labelledby="collection-title" className="pb-20 sm:pb-28 lg:pb-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="The collection"
            title={<span id="collection-title">Our Growing Spice Collection</span>}
            intro="Waigaon turmeric is available for enquiry today. More Indian spices are on the way."
          />
          <Reveal delay={0.1} className="shrink-0">
            <Link to="/spices" className="btn-outline">
              View catalogue <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3" gap={0.08}>
          {products.map((p, i) => (
            <RevealItem key={p.slug}>
              <ProductCard product={p} index={i} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

function SourcingStory() {
  return (
    <section aria-labelledby="story-title" className="relative isolate overflow-hidden bg-forest-deep">
      <m.div
        className="absolute inset-0 -z-10"
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      >
        <MediaFrame imageKey="story" className="h-full w-full opacity-60" />
      </m.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-deep via-forest-deep/80 to-forest-deep/20" />

      <div className="container-x grid min-h-[620px] items-center py-24 lg:min-h-[720px] lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading
            tone="light"
            eyebrow="Our sourcing story"
            title={
              <span id="story-title">
                Every Great Spice <span className="text-gold italic">Has a Story.</span>
              </span>
            }
          />
          <Reveal delay={0.1} className="mt-8 max-w-lg space-y-5 leading-relaxed text-ivory/75">
            <p>
              It begins in the soil — in the seasons, the land and the hands that tend it. A spice carries all of
              that with it, long after harvest.
            </p>
            <p>
              At Indian Family Farmer, we want buyers to know that story. That is why we start with a turmeric
              rooted in a specific place, and why we talk openly about where our produce comes from.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-10">
            <Link to="/about" className="btn-outline-light">
              Discover our philosophy <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Seo
        description="Indian Family Farmer — an Indian spice trading company offering Waigaon (Waygaon) turmeric for bulk and wholesale enquiries. Rooted in Indian soil, trusted for quality."
      />
      <HeroSection />
      <BrandIntro />
      <FeaturedProduct />
      <WhyChooseUs />
      <Collection />
      <SourcingStory />
      <div className="pt-20 sm:pt-28">
        <CtaSection />
      </div>
    </>
  )
}
