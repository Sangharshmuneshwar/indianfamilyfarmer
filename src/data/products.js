/**
 * ─────────────────────────────────────────────────────────────
 *  PRODUCT CATALOGUE
 *
 *  To add a product: copy an object, give it a unique `slug`, and
 *  set `status` to 'available' or 'coming-soon'.
 *  To make an upcoming spice available: change its status to 'available'
 *  and fill in description / origin / applications.
 *
 *  `art`   → built-in placeholder illustration (see components/SpiceArt.jsx)
 *  `image` → optional real photo key from data/images.js (overrides art)
 *
 *  ⚠ Only publish information the business has confirmed. Do not add
 *    curcumin %, lab results, grades or certifications unless verified.
 * ─────────────────────────────────────────────────────────────
 */

export const PRODUCT_STATUS = {
  available: { label: 'Available for Enquiry', tone: 'available' },
  'coming-soon': { label: 'Coming Soon', tone: 'soon' },
}

export const products = [
  {
    slug: 'waigaon-turmeric',
    name: 'Waigaon Turmeric',
    localName: 'वायगाव हळद',
    altNames: ['Waygaon Turmeric'],
    status: 'available',
    featured: true,
    art: 'turmeric',
    image: 'turmeric', // main photo key — see data/images.js
    gallery: ['turmericPowder', 'intro'], // extra photo keys on the Our Spices page
    shortDescription:
      'A regional turmeric from Maharashtra, traditionally valued for its deep golden colour and warm, earthy aroma.',
    description: [
      'Waigaon turmeric takes its name from the Waigaon area of Wardha district in Maharashtra, where turmeric has long been part of the local farming tradition.',
      'It is traditionally prized for its rich golden hue and characteristic aroma — qualities that make it a familiar choice in Indian kitchens and spice preparation.',
      'We work with buyers to understand their requirements and share the information they need to make a confident sourcing decision.',
    ],
    // TODO(business): confirm the exact sourcing region before publishing.
    origin: 'Waigaon region, Wardha district, Maharashtra, India',
    originNote: 'Origin details to be confirmed per consignment.',
    applications: [
      'Turmeric powder processing and grinding',
      'Spice blends and masala manufacturing',
      'Food manufacturing and ready-to-cook products',
      'Wholesale and distribution',
      'Traditional and household culinary use',
    ],
    // Information buyers can request. Keep these as "on request" until confirmed.
    availableInfo: [
      { label: 'Product forms', value: 'Discussed per enquiry' },
      { label: 'Packaging', value: 'Discussed per enquiry' },
      { label: 'Quantity', value: 'Bulk & wholesale enquiries welcome' },
      { label: 'Specifications', value: 'Shared on request' },
    ],
  },
  {
    slug: 'red-chilli',
    name: 'Red Chilli',
    localName: 'लाल मिरची',
    status: 'coming-soon',
    art: 'chilli',
    image: 'redChilli',
    shortDescription:
      'Sun-dried Indian red chillies that bring colour and heat to masalas, chilli powders and everyday cooking.',
  },
  {
    slug: 'coriander',
    name: 'Coriander',
    localName: 'धणे',
    status: 'coming-soon',
    art: 'coriander',
    image: 'coriander',
    shortDescription:
      'Whole coriander seed with a mild, citrusy aroma — a cornerstone of Indian spice blends and coriander powder.',
  },
  {
    slug: 'cumin',
    name: 'Cumin',
    localName: 'जिरे',
    status: 'coming-soon',
    art: 'cumin',
    image: 'cumin',
    shortDescription:
      'Earthy, warm cumin seed used for tempering, roasting and grinding into garam masala and other blends.',
  },
  {
    slug: 'black-pepper',
    name: 'Black Pepper',
    localName: 'काळी मिरी',
    status: 'coming-soon',
    art: 'pepper',
    image: 'blackPepper',
    shortDescription:
      'Bold, pungent whole peppercorns — long known as the “king of spices” and a staple in kitchens worldwide.',
  },
  {
    slug: 'cardamom',
    name: 'Cardamom',
    localName: 'वेलची',
    status: 'coming-soon',
    art: 'cardamom',
    image: 'cardamom',
    shortDescription:
      'Fragrant green cardamom pods, the “queen of spices”, prized in sweets, chai, biryani and spice blends.',
  },
]

export const featuredProduct = products.find((p) => p.featured)
export const availableProducts = products.filter((p) => p.status === 'available')
export const upcomingProducts = products.filter((p) => p.status === 'coming-soon')

/** Options for the contact form "Product Interested In" select. */
export const productOptions = [
  ...availableProducts.map((p) => p.name),
  ...upcomingProducts.map((p) => `${p.name} (Coming Soon)`),
  'Other / General Enquiry',
]
