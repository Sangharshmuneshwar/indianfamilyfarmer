import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import Logo from './Logo'
import WhatsAppIcon from './WhatsAppIcon'
import { siteConfig, isWhatsAppConfigured } from '../data/siteConfig'
import { buildWhatsAppUrl } from '../lib/whatsapp'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Our Spices', to: '/spices' },
  { label: 'Contact', to: '/contact' },
]

function Placeholder({ children }) {
  return <span className="text-ivory/45 italic">{children}</span>
}

export default function Footer() {
  const { email, address, phone, whatsappNumber } = siteConfig.contact
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-forest-deep text-ivory">
      {/* Oversized wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[0.18em] left-1/2 -translate-x-1/2 font-serif text-[14vw] leading-none whitespace-nowrap text-ivory/[0.035] select-none"
      >
        Family Farmer
      </div>

      <div className="container-x relative pt-20 pb-10 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo light />
            <p className="mt-7 max-w-sm font-serif text-2xl leading-snug text-ivory/90 italic">
              “{siteConfig.tagline}”
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/60">
              Indian spice trading for wholesalers, distributors and food businesses — starting with Waigaon turmeric.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-7">
            <h2 className="text-[0.7rem] font-semibold tracking-[0.24em] text-gold uppercase">Explore</h2>
            <ul className="mt-6 space-y-3.5 text-[0.95rem]">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-underline text-ivory/80 hover:text-ivory">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/privacy-policy" className="link-underline text-ivory/80 hover:text-ivory">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="text-[0.7rem] font-semibold tracking-[0.24em] text-gold uppercase">Get in touch</h2>
            <ul className="mt-6 space-y-5 text-[0.95rem]">
              <li className="flex gap-3.5">
                <WhatsAppIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                {isWhatsAppConfigured ? (
                  <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="link-underline text-ivory/85 hover:text-ivory">
                    +{whatsappNumber}
                  </a>
                ) : (
                  <Placeholder>WhatsApp number — to be added</Placeholder>
                )}
              </li>
              {phone && (
                <li className="flex gap-3.5">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
                  <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="link-underline text-ivory/85 hover:text-ivory">
                    {phone}
                  </a>
                </li>
              )}
              <li className="flex gap-3.5">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
                {email ? (
                  <a href={`mailto:${email}`} className="link-underline break-all text-ivory/85 hover:text-ivory">
                    {email}
                  </a>
                ) : (
                  <Placeholder>Business email — to be added</Placeholder>
                )}
              </li>
              <li className="flex gap-3.5">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
                {address ? (
                  <address className="text-ivory/85 not-italic">{address}</address>
                ) : (
                  <Placeholder>Business address — to be added</Placeholder>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/50 sm:flex-row sm:items-center sm:justify-between lg:mt-28">
          <p>© {year} Indian Family Farmer. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase">Indian Spices • Trusted Trading</p>
        </div>
      </div>
    </footer>
  )
}
