# Indian Family Farmer — Website

Static marketing website for **Indian Family Farmer**, an Indian spice trading company (currently featuring Waigaon turmeric).

Built with React 19 + Vite 7, Tailwind CSS 4, Motion for React, React Router 7 and Lucide icons. No backend, no database. It deploys as plain static files.

---

## Quick start

```bash
npm install
cp .env.example .env      # then fill in real values
npm run dev               # http://localhost:5173
npm run build             # production build → dist/
npm run preview           # serve dist/ locally at http://localhost:4173
```

Requires Node.js 18+ (tested with Node 24).

---

## Where to change things

| What | Where |
|---|---|
| **WhatsApp number** | `.env` → `VITE_WHATSAPP_NUMBER` (international format, digits only, no `+`, e.g. `91` + 10-digit number) |
| **Company email** | `.env` → `VITE_BUSINESS_EMAIL` |
| **Address** | `.env` → `VITE_BUSINESS_ADDRESS` |
| **Website domain** (canonical URLs, sitemap, robots, Open Graph) | `.env` → `VITE_SITE_URL` |
| **Contact form service credentials** | `.env` → `VITE_FORM_PROVIDER` + `VITE_WEB3FORMS_ACCESS_KEY` or `VITE_FORMSPREE_FORM_ID` |
| Default WhatsApp message, tagline, nav links | `src/data/siteConfig.js` |
| **Company logo** | `src/components/Logo.jsx` (instructions in the file); favicon: `public/favicon.svg` |
| **Product images** | `src/data/images.js`: put WebP/AVIF files in `src/assets/images/`, import them and set `src` |
| **Product descriptions, origin, applications** | `src/data/products.js` |
| **Upcoming spice availability** | `src/data/products.js`: change `status: 'coming-soon'` → `'available'` and add details |
| Social share image | `public/og-image.svg`. Replace with a 1200×630 **JPG/PNG** (many social networks don't render SVG) and update `ogImage` in `siteConfig.js` and `og:image` in `index.html` |
| Colours & fonts | `src/styles/globals.css` (`@theme` block) and the Google Fonts link in `index.html` |
| Privacy policy text | `src/pages/PrivacyPolicy.jsx` |

> **Rebuild after editing `.env`.** Values are compiled into the site at build time.

Empty contact fields show a tasteful "to be added" placeholder in the footer and on the contact page. No contact details are invented.

---

## Images

No licensed photography was supplied, so every photo slot currently shows a **branded SVG placeholder illustration**. In development, a small "Placeholder" tag marks each one. When you set `src` for a key in `src/data/images.js`, the real photo replaces the illustration everywhere that key is used.

Recommendations:
- Use only photos you own or are licensed to use, showing the product you actually supply.
- Export as WebP (quality ~75–80). Provide ~800px and ~1600px versions and set `srcSet`.
- Set `width`/`height` to the real pixel size (prevents layout shift).
- The hero image is loaded eagerly with high priority. All other images lazy-load.

---

## Contact form

The form offers two methods:

1. **Send Enquiry (email)** via Web3Forms *or* Formspree. A success message is shown **only** after the provider confirms success. Errors show a clear message and suggest WhatsApp.
2. **Send via WhatsApp** builds a formatted message from the form fields and opens `wa.me` in a new tab. The visitor reviews it and taps send. Nothing is sent automatically.

Until a provider is configured, the email button is disabled and a short notice points visitors to WhatsApp.

### Option A: Web3Forms
1. Get an access key at https://web3forms.com (enter the business email that should receive enquiries).
2. `.env`:
   ```
   VITE_FORM_PROVIDER=web3forms
   VITE_WEB3FORMS_ACCESS_KEY=your-access-key
   ```
3. ⚠ This key is **public by design** (it ships in the browser bundle). In the Web3Forms dashboard, **restrict it to your domain** and turn on spam protection. A hidden honeypot field (`botcheck`) is already included.

### Option B: Formspree
1. Create a form at https://formspree.io and copy its ID (the part after `/f/`).
2. `.env`:
   ```
   VITE_FORM_PROVIDER=formspree
   VITE_FORMSPREE_FORM_ID=xxxxxxxx
   ```
3. In Formspree settings, set **allowed domains** and enable spam filtering. A `_gotcha` honeypot is already sent.

Never put private API secrets in `.env` for this project. Everything prefixed `VITE_` is public.

Tip: link straight to a pre-selected product with `/contact?product=waigaon-turmeric`.

---

## Deployment

Run `npm run build` and upload the **contents** of `dist/`.

The site uses clean URLs (`/about`, `/spices`…), so the host must send unknown paths to `index.html`. Config for each host is already included:

### GoDaddy (cPanel / Apache)
1. Set `VITE_SITE_URL` in `.env` to your live domain and run `npm run build`.
2. In cPanel → **File Manager**, open `public_html/` (or the domain's folder).
3. Upload everything inside `dist/`, **including the hidden `.htaccess` file** (enable "Show Hidden Files" in File Manager settings).
4. The `.htaccess` (from `public/.htaccess`) handles SPA route fallback, caching and compression.
5. Turn on SSL (cPanel → SSL/TLS Status, or GoDaddy's SSL). Then force HTTPS by adding these lines at the top of the rewrite section in `.htaccess`:
   ```apache
   RewriteCond %{HTTPS} off
   RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```
6. Visit `/about` directly and refresh it to confirm the fallback works.

> If the site lives in a sub-folder (e.g. `example.com/site/`), set `base: '/site/'` in `vite.config.js`, change `RewriteBase /` to `RewriteBase /site/`, and change the last rule to `RewriteRule ^ /site/index.html [L]`.

### Netlify
Build command `npm run build`, publish directory `dist`. `public/_redirects` handles routing. Add the `VITE_*` variables under Site settings → Environment variables.

### Vercel
Framework preset **Vite**. `vercel.json` handles routing. Add the `VITE_*` variables in Project → Settings → Environment Variables.

### After launch
- Submit `https://your-domain/sitemap.xml` in Google Search Console. `robots.txt` and `sitemap.xml` are generated at build time from `VITE_SITE_URL`.
- Send a real test enquiry by email and by WhatsApp.
- Run Lighthouse on the live site. No score has been measured yet.

---

## Project structure

```
public/                 .htaccess, _redirects, favicon, og-image
src/
  components/           Navbar, Footer, HeroSection, ContactForm, ProductCard,
                        WhatsAppButton, AnimatedSection, MediaFrame, SpiceArt, …
  pages/                Home, About, Spices, Contact, PrivacyPolicy, NotFound
  data/                 siteConfig.js, products.js, images.js
  lib/                  whatsapp.js (wa.me links), formSubmit.js (form providers)
  styles/globals.css    design tokens + base styles
vite.config.js          build + sitemap/robots generation
```

## Accessibility & motion
- Skip link, semantic landmarks, one `h1` per page, labelled form fields, inline errors linked with `aria-describedby`, focus moves to the first invalid field.
- Visible focus rings. The mobile menu closes with Escape.
- `prefers-reduced-motion` is respected: Motion disables transform animations and CSS transitions are minimised.
- Animations use transform/opacity only and are triggered by IntersectionObserver, with no heavy scroll handlers.

## Content guardrails
Before publishing, confirm with the business:
- the Waigaon turmeric origin wording (`origin` in `products.js` has a TODO)
- the privacy policy text

Do not add certifications, curcumin percentages, lab results, export claims or testimonials unless they are verified.
