import { siteConfig } from '../data/siteConfig'

/**
 * Builds an official wa.me click-to-chat URL with an encoded, pre-filled
 * message. The visitor reviews and sends the message themselves —
 * nothing is ever sent automatically.
 */
export function buildWhatsAppUrl(message = siteConfig.whatsappDefaultMessage) {
  const number = siteConfig.contact.whatsappNumber
  const text = encodeURIComponent(message)
  // Without a configured number, wa.me lets the visitor choose a chat.
  return number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`
}

/** Composes a professional enquiry message from contact-form values. */
export function buildEnquiryMessage(v = {}) {
  const line = (label, value) =>
    value && String(value).trim() ? `${label}: ${String(value).trim()}` : null
  return [
    'Hello Indian Family Farmer,',
    '',
    'I would like to enquire about your spices.',
    '',
    line('Name', v.name),
    line('Company', v.company),
    line('Email', v.email),
    line('Phone', v.phone),
    line('Product', v.product),
    line('Required Quantity', v.quantity),
    line('Location', v.location),
    line('Message', v.message),
    '',
    'Please share further details.',
  ]
    .filter((l) => l !== null)
    .join('\n')
}

export function productEnquiryMessage(productName) {
  return `Hello Indian Family Farmer,\n\nI would like to enquire about ${productName} for bulk supply.\n\nPlease share further details.`
}
