import { siteConfig } from '../data/siteConfig'

/**
 * Static-site form submission via Web3Forms or Formspree.
 * Configure in .env (VITE_FORM_PROVIDER + key/ID). Both use PUBLIC
 * client-side identifiers — restrict them to your domain in the
 * provider dashboard and enable the provider's spam protection.
 */

const { provider, web3formsAccessKey, formspreeFormId } = siteConfig.form

export function isFormConfigured() {
  if (provider === 'web3forms') return Boolean(web3formsAccessKey)
  if (provider === 'formspree') return Boolean(formspreeFormId)
  return false
}

/**
 * Resolves only when the provider confirms success; otherwise throws an
 * Error with a user-safe message.
 */
export async function submitEnquiry(values) {
  if (!isFormConfigured()) {
    throw new Error('Email submission is not set up yet. Please use “Send via WhatsApp” instead.')
  }

  const payload = {
    name: values.name,
    company: values.company,
    email: values.email,
    phone: values.phone,
    location: values.location,
    product: values.product,
    quantity: values.quantity,
    message: values.message,
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 20000)

  try {
    let res
    if (provider === 'web3forms') {
      res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3formsAccessKey,
          subject: `New enquiry from ${values.name}${values.company ? ` (${values.company})` : ''}`,
          from_name: 'Indian Family Farmer Website',
          replyto: values.email,
          botcheck: values.botcheck || '',
          ...payload,
        }),
        signal: controller.signal,
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data.success !== true) {
        throw new Error(data.message || 'The enquiry could not be sent.')
      }
    } else {
      res = await fetch(`https://formspree.io/f/${encodeURIComponent(formspreeFormId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...payload,
          _subject: `New enquiry from ${values.name}`,
          _replyto: values.email,
          _gotcha: values.botcheck || '',
        }),
        signal: controller.signal,
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data.ok === false || data.errors) {
        const msg = Array.isArray(data.errors) ? data.errors.map((e) => e.message).join(' ') : ''
        throw new Error(msg || 'The enquiry could not be sent.')
      }
    }
    return true
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('The request timed out. Please check your connection and try again.')
    if (err instanceof TypeError) throw new Error('Network error. Please check your connection and try again.')
    throw err
  } finally {
    clearTimeout(timer)
  }
}
