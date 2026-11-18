import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import MediaFrame from '../components/MediaFrame'
import CtaSection from '../components/CtaSection'
import { ImageReveal, Reveal, RevealGroup, RevealItem } from '../components/AnimatedSection'
import { upcomingProducts } from '../data/products'

const principles = [
  {
    title: 'Brand philosophy',
    text: 'We believe good trade starts with respect — for the land, for the farmers who work it, and for the businesses that depend on consistent, honest supply. Our role is to bring these together with care.',
  },
  {
    title: 'Agricultural heritage',
    text: 'India’s spice traditions are shaped by region, soil and generations of farming knowledge. We draw on that heritage, starting with a turmeric whose very name points to the place it comes from.',
  },
  {
    title: 'Commitment to quality',
    text: 'Quality is a conversation, not a slogan. We discuss expectations, specifications and product details openly with each buyer, so that what you receive matches what you were promised.',
  },
  {
    title: 'Long-term vision',
    text: 'We want to be a dependable name in Indian spice trading — a partner businesses return to because the relationship is straightforward and the produce is genuine.',
  },
]

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="Learn about Indian Family Farmer — an Indian spice trading company rooted in agricultural heritage, starting with Waigaon turmeric and growing into a wider collection of Indian spices."
      />
      <PageHeader
        crumb="About Us"
        eyebrow="About Indian Family Farmer"
        title={
          <>
            Grown from Tradition, <span className="text-gold-deep italic">Built on Trust</span>
          </>
        }
        intro="A spice trading company with its roots in Indian agriculture — and its focus on the businesses we serve."
      />

      {/* Wide image + statement */}
      <section aria-label="Introduction" className="container-x">
        <ImageReveal className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-cream sm:aspect-[21/9]">
          <MediaFrame imageKey="about" className="h-full w-full" sizes="100vw" />
        </ImageReveal>
        <div className="grid gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:py-32">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Our story</p>
          </Reveal>
          <div className="lg:col-span-8">
            <Reveal as="p" className="font-serif text-[1.85rem] leading-[1.25] text-charcoal sm:text-4xl lg:text-[2.75rem]">
              Indian Family Farmer was created to connect{' '}
              <span className="text-gold-deep italic">authentic Indian produce</span> with businesses that value
              knowing where their spices come from.
            </Reveal>
            <Reveal delay={0.1} className="mt-10 grid gap-6 text-muted sm:grid-cols-2">
              <p className="leading-relaxed">
                Our name is a reminder of what matters to us: the family farms and farming communities that sit
                behind every spice traded in India.
              </p>
              <p className="leading-relaxed">
                We are starting focused — with Waigaon turmeric — and expanding thoughtfully, one spice at a time.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles-title" className="bg-cream section-y">
        <div className="container-x">
          <SectionHeading eyebrow="What guides us" title={<span id="principles-title">The Principles Behind Our Name</span>} />
          <RevealGroup as="ol" className="mt-14 border-t border-charcoal/10 lg:mt-20">
            {principles.map((p, i) => (
              <RevealItem
                as="li"
                key={p.title}
                className="group grid gap-4 border-b border-charcoal/10 py-10 sm:grid-cols-12 sm:gap-8 lg:py-12"
              >
                <span className="font-serif text-xl text-gold-deep sm:col-span-2" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className="font-serif text-3xl leading-tight text-charcoal transition-transform duration-500 ease-(--ease-premium) group-hover:translate-x-1 sm:col-span-4 lg:text-4xl">
                  {p.title}
                </h3>
                <p className="leading-relaxed text-muted sm:col-span-6 lg:text-[1.05rem]">{p.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Expansion */}
      <section aria-labelledby="expansion-title" className="section-y">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Looking ahead"
              title={<span id="expansion-title">A Growing Spice Collection</span>}
              intro="Turmeric is where we begin. Over time, we plan to offer more of India’s essential spices to our trading partners. These products are not yet available."
            />
            <Reveal delay={0.15} className="mt-10">
              <Link to="/spices" className="btn-primary group">
                Explore our spices
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <RevealGroup as="ul" className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-6 lg:col-start-7" gap={0.07}>
            {upcomingProducts.map((p) => (
              <RevealItem as="li" key={p.slug} className="overflow-hidden rounded-2xl border border-line bg-white/50">
                <MediaFrame imageKey={p.image} art={p.art} alt={p.name} className="aspect-square w-full" sizes="(min-width: 1024px) 15vw, 45vw" />
                <div className="px-4 py-3.5">
                  <p className="font-serif text-lg text-charcoal">{p.name}</p>
                  <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-muted uppercase">Coming soon</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaSection title="Let’s Start a Conversation" />
    </>
  )
}
