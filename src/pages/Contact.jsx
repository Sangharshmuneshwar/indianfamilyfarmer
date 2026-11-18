import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import ContactForm from '../components/ContactForm'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { Reveal } from '../components/AnimatedSection'
import { siteConfig, isWhatsAppConfigured } from '../data/siteConfig'
import { buildWhatsAppUrl } from '../lib/whatsapp'

function InfoRow({ icon: Icon, label, children }) {
  return (
    <li className="flex gap-4 py-6">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-forest">
        <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-[0.68rem] font-semibold tracking-[0.22em] text-muted uppercase">{label}</p>
        <div className="mt-1.5 text-charcoal">{children}</div>
      </div>
    </li>
  )
}

const Pending = ({ children }) => <span className="text-muted italic">{children}</span>

export default function Contact() {
  const { email, address, phone, whatsappNumber } = siteConfig.contact
  return (
    <>
      <Seo
        title="Contact Us — Bulk Turmeric Enquiry"
        description="Contact Indian Family Farmer for bulk Waigaon turmeric enquiries and Indian spice sourcing. Send an enquiry by email or WhatsApp."
      />
      <PageHeader
        crumb="Contact"
        eyebrow="Get in touch"
        title={
          <>
            Let’s Talk <span className="text-gold-deep italic">Spices</span>
          </>
        }
        intro="Share your requirement and we’ll get back to you. Prefer to chat? Send your enquiry straight to WhatsApp."
      />

      <section aria-label="Contact form and details" className="container-x pb-24 lg:pb-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7 xl:col-span-8">
            <ContactForm />
          </Reveal>

          <aside className="lg:col-span-5 xl:col-span-4" aria-label="Contact details">
            <Reveal delay={0.1} className="lg:sticky lg:top-28">
              <h2 className="font-serif text-3xl text-charcoal">Contact details</h2>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                <InfoRow icon={WhatsAppIcon} label="WhatsApp">
                  {isWhatsAppConfigured ? (
                    <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="link-underline">
                      +{whatsappNumber}
                    </a>
                  ) : (
                    <Pending>Number to be added</Pending>
                  )}
                </InfoRow>
                {phone && (
                  <InfoRow icon={Phone} label="Phone">
                    <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="link-underline">
                      {phone}
                    </a>
                  </InfoRow>
                )}
                <InfoRow icon={Mail} label="Email">
                  {email ? (
                    <a href={`mailto:${email}`} className="link-underline break-all">
                      {email}
                    </a>
                  ) : (
                    <Pending>Business email to be added</Pending>
                  )}
                </InfoRow>
                <InfoRow icon={MapPin} label="Address">
                  {address ? <address className="not-italic">{address}</address> : <Pending>Business address to be added</Pending>}
                </InfoRow>
                <InfoRow icon={Clock} label="Response">
                  <span>We aim to reply to every enquiry as soon as possible.</span>
                </InfoRow>
              </ul>

              <div className="mt-8 rounded-[1.5rem] bg-forest p-7 text-ivory">
                <p className="font-serif text-2xl leading-snug">Prefer a quick chat?</p>
                <p className="mt-2 text-sm leading-relaxed text-ivory/70">
                  Open WhatsApp with a ready-to-send message. You’ll be able to review it before sending.
                </p>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp mt-6 w-full"
                >
                  <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
                </a>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  )
}
