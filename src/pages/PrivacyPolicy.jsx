import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import { Reveal } from '../components/AnimatedSection'
import { siteConfig } from '../data/siteConfig'

/**
 * Plain-language privacy notice describing how this static site handles
 * enquiry data. Review with the business (and legal advice if needed)
 * before launch, and update the "Last updated" date when it changes.
 */
const LAST_UPDATED = '18 November 2026'

export default function PrivacyPolicy() {
  const { email, address } = siteConfig.contact
  const provider = siteConfig.form.provider
  const providerName =
    provider === 'web3forms' ? 'Web3Forms' : provider === 'formspree' ? 'Formspree' : 'a third-party form service'

  return (
    <>
      <Seo
        title="Privacy Policy"
        description="How Indian Family Farmer handles information submitted through the website contact form and WhatsApp enquiries."
      />
      <PageHeader crumb="Privacy Policy" eyebrow="Legal" title="Privacy Policy" intro={`Last updated: ${LAST_UPDATED}`} />

      <section className="container-x pb-24 lg:pb-32">
        <Reveal className="max-w-3xl space-y-10 text-[1.02rem] leading-relaxed text-muted [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:text-charcoal [&_h2]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_strong]:text-charcoal">
          <div>
            <p>
              This page explains what information Indian Family Farmer (“we”, “us”) collects through this website,
              how it is used, and the choices you have. This website is a simple informational site; it does not
              offer user accounts, online payments or shopping.
            </p>
          </div>

          <div>
            <h2>Information you choose to share</h2>
            <p>When you send an enquiry using our contact form, you may provide:</p>
            <ul className="mt-4">
              <li>Your name and company name</li>
              <li>Email address and mobile / WhatsApp number</li>
              <li>Country or state</li>
              <li>Product of interest, quantity required and your message</li>
            </ul>
            <p className="mt-4">Only the name, email and message fields are required. Please do not include sensitive personal information in your message.</p>
          </div>

          <div>
            <h2>How enquiries are delivered</h2>
            <p>
              <strong>Email form:</strong> when you click “Send Enquiry”, the details you entered are sent to{' '}
              {providerName}, a form-handling service that forwards your enquiry to our business email. That
              service processes the data under its own privacy policy.
            </p>
            <p className="mt-4">
              <strong>WhatsApp:</strong> when you click “Send via WhatsApp” or any WhatsApp button, your browser opens
              WhatsApp with a pre-filled message. Nothing is sent until you choose to send it in WhatsApp. Messages
              sent through WhatsApp are subject to WhatsApp’s own terms and privacy policy.
            </p>
          </div>

          <div>
            <h2>How we use your information</h2>
            <p>We use the details you provide only to respond to your enquiry and to discuss a potential business relationship with you. We do not sell your information.</p>
          </div>

          <div>
            <h2>Cookies and analytics</h2>
            <p>
              This website does not use its own advertising or analytics cookies. Fonts are loaded from Google Fonts,
              which may receive your IP address as part of delivering the font files. If analytics are added in the
              future, this page will be updated.
            </p>
          </div>

          <div>
            <h2>Retention</h2>
            <p>We keep enquiry details only for as long as reasonably needed to respond to you and to maintain records of our business communication.</p>
          </div>

          <div>
            <h2>Your choices</h2>
            <p>You may ask us to access, correct or delete the information you have shared with us by contacting us using the details below.</p>
          </div>

          <div>
            <h2>Contact</h2>
            <p>
              {email ? (
                <>
                  Email:{' '}
                  <a href={`mailto:${email}`} className="text-charcoal underline underline-offset-2">
                    {email}
                  </a>
                </>
              ) : (
                <>
                  Please reach us through our <Link to="/contact" className="text-charcoal underline underline-offset-2">contact page</Link>.
                </>
              )}
            </p>
            {address && <p className="mt-2">Address: {address}</p>}
          </div>
        </Reveal>
      </section>
    </>
  )
}
