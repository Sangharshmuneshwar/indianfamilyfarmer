/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — single source of truth for business details.
 *
 *  Values come from the `.env` file (see `.env.example`). Edit `.env`
 *  and rebuild; you should rarely need to touch this file.
 *  Never hard-code a phone number, email or address that has not
 *  been confirmed by the business.
 * ─────────────────────────────────────────────────────────────
 */

const env = import.meta.env

const clean = (v) => (typeof v === 'string' ? v.trim() : '')

/** Digits only, no "+", no spaces — e.g. 91XXXXXXXXXX */
const whatsappNumber = clean(env.VITE_WHATSAPP_NUMBER).replace(/\D/g, '')

export const siteConfig = {
  name: 'Indian Family Farmer',
  shortName: 'IFF',
  tagline: 'Rooted in Tradition. Growing with Trust.',
  description:
    'Indian Family Farmer is an Indian spice trading company offering Waigaon (Waygaon) turmeric for bulk and wholesale enquiries.',

  /** Production domain, no trailing slash. Used for canonical + Open Graph URLs. */
  siteUrl: (clean(env.VITE_SITE_URL) || 'https://www.example.com').replace(/\/+$/, ''),

  /** Default social share image (put the file in /public). 1200×630 JPG. */
  ogImage: '/og-image.jpg',

  contact: {
    whatsappNumber, // '' when not configured
    phone: clean(env.VITE_BUSINESS_PHONE), // display format, e.g. +91 77988 07557
    email: clean(env.VITE_BUSINESS_EMAIL), // '' when not configured
    address: clean(env.VITE_BUSINESS_ADDRESS), // '' when not configured
  },

  /** Default text used by the floating WhatsApp button and generic CTAs. */
  whatsappDefaultMessage:
    'Hello Indian Family Farmer,\n\nI visited your website and would like to know more about your Waigaon turmeric and bulk supply options.\n\nPlease share product details, available quantities and pricing.\n\nThank you.',

  /** Contact form provider configuration (public client-side values only). */
  form: {
    provider: clean(env.VITE_FORM_PROVIDER).toLowerCase(), // 'web3forms' | 'formspree' | ''
    web3formsAccessKey: clean(env.VITE_WEB3FORMS_ACCESS_KEY),
    formspreeFormId: clean(env.VITE_FORMSPREE_FORM_ID),
  },

  nav: [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Our Spices', to: '/spices' },
    { label: 'Why Choose Us', to: '/#why-us' },
    { label: 'Contact', to: '/contact' },
  ],
}

export const isWhatsAppConfigured = siteConfig.contact.whatsappNumber.length >= 8

if (import.meta.env.DEV && !isWhatsAppConfigured) {
  console.warn(
    '[Indian Family Farmer] VITE_WHATSAPP_NUMBER is not set. WhatsApp links will open WhatsApp without a pre-selected chat until you add it to .env.',
  )
}
