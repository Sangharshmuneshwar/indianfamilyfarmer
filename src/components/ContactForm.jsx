import { useId, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, m } from 'motion/react'
import { AlertCircle, ArrowRight, CheckCircle2, Info, Loader2, RotateCcw } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import { productOptions, products } from '../data/products'
import { buildEnquiryMessage, buildWhatsAppUrl } from '../lib/whatsapp'
import { isFormConfigured, submitEnquiry } from '../lib/formSubmit'
import { EASE } from './AnimatedSection'

const EMPTY = {
  name: '',
  company: '',
  email: '',
  phone: '',
  location: '',
  product: '',
  quantity: '',
  message: '',
  botcheck: '',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** mode: 'email' requires email; 'whatsapp' only needs name + message */
function validate(v, mode) {
  const e = {}
  if (!v.name.trim()) e.name = 'Please enter your full name.'
  else if (v.name.trim().length < 2) e.name = 'Name looks too short.'

  if (mode === 'email' && !v.email.trim()) e.email = 'Please enter your email address.'
  else if (v.email.trim() && !EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email address.'

  if (v.phone.trim()) {
    const digits = v.phone.replace(/\D/g, '')
    if (!/^[+\d\s()-]+$/.test(v.phone.trim()) || digits.length < 7 || digits.length > 15)
      e.phone = 'Please enter a valid phone number, including country code.'
  }

  if (!v.message.trim()) e.message = 'Please tell us a little about your requirement.'
  else if (v.message.trim().length < 10) e.message = 'Please add a few more details (at least 10 characters).'
  return e
}

const ORDER = ['name', 'email', 'phone', 'message']

function Field({ id, label, required, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? (
          <span className="ml-0.5 text-terracotta" aria-hidden="true">*</span>
        ) : (
          <span className="ml-1.5 font-normal text-muted">(optional)</span>
        )}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <m.p
            id={`${id}-error`}
            className="mt-2 flex items-center gap-1.5 text-[0.8rem] font-medium text-terracotta"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {error}
          </m.p>
        )}
      </AnimatePresence>
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-[0.78rem] text-muted">
          {hint}
        </p>
      )}
    </div>
  )
}

export default function ContactForm() {
  const uid = useId()
  const [params] = useSearchParams()
  const preset = products.find((p) => p.slug === params.get('product'))
  const [values, setValues] = useState(() => ({ ...EMPTY, product: preset ? preset.name : '' }))
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error | whatsapp
  const [serverError, setServerError] = useState('')
  const formRef = useRef(null)
  const emailReady = isFormConfigured()

  const id = (n) => `${uid}-${n}`

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
    if (status === 'error') setStatus('idle')
  }

  const onBlur = (e) => {
    const { name } = e.target
    if (!values[name]) return
    const err = validate(values, 'email')[name]
    // On blur, only flag format problems, not "required" for email in WhatsApp-only flows
    if (err) setErrors((er) => ({ ...er, [name]: err }))
  }

  const focusFirstError = (errs) => {
    const first = ORDER.find((k) => errs[k])
    if (first) formRef.current?.querySelector(`[name="${first}"]`)?.focus()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'submitting') return
    const errs = validate(values, 'email')
    setErrors(errs)
    if (Object.keys(errs).length) {
      focusFirstError(errs)
      return
    }
    setStatus('submitting')
    setServerError('')
    try {
      await submitEnquiry(values)
      setStatus('success')
      setValues(EMPTY)
    } catch (err) {
      setServerError(err.message || 'Something went wrong.')
      setStatus('error')
    }
  }

  const handleWhatsApp = () => {
    const errs = validate(values, 'whatsapp')
    setErrors(errs)
    if (Object.keys(errs).length) {
      focusFirstError(errs)
      return
    }
    const url = buildWhatsAppUrl(buildEnquiryMessage(values))
    window.open(url, '_blank', 'noopener,noreferrer')
    setStatus('whatsapp')
  }

  const inputProps = (name, extra = {}) => ({
    id: id(name),
    name,
    value: values[name],
    onChange,
    onBlur,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${id(name)}-error` : extra.hint ? `${id(name)}-hint` : undefined,
    className: 'field-input',
  })

  if (status === 'success') {
    return (
      <m.div
        role="status"
        aria-live="polite"
        className="flex flex-col items-start rounded-[1.75rem] border border-line bg-white/70 p-8 sm:p-12"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-forest text-gold">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-serif text-3xl text-charcoal sm:text-4xl">Thank you — enquiry received.</h3>
        <p className="mt-4 max-w-md leading-relaxed text-muted">
          Your message has been delivered to our team. We will review your requirements and get back to you
          using the contact details you provided.
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-outline mt-8">
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> Send another enquiry
        </button>
      </m.div>
    )
  }

  const submitting = status === 'submitting'

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-busy={submitting}
      className="rounded-[1.75rem] border border-line bg-white/55 p-6 shadow-[0_30px_60px_-45px_rgba(36,40,32,0.4)] sm:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={id('name')} label="Full Name" required error={errors.name}>
          <input type="text" autoComplete="name" required aria-required="true" placeholder="Your full name" {...inputProps('name')} />
        </Field>
        <Field id={id('company')} label="Company Name">
          <input type="text" autoComplete="organization" placeholder="Business / company" {...inputProps('company')} />
        </Field>
        <Field id={id('email')} label="Email Address" required error={errors.email}>
          <input type="email" autoComplete="email" inputMode="email" required aria-required="true" placeholder="you@company.com" {...inputProps('email')} />
        </Field>
        <Field id={id('phone')} label="Mobile / WhatsApp Number" error={errors.phone} hint="Include country code, e.g. +91">
          <input type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 …" {...inputProps('phone', { hint: true })} />
        </Field>
        <Field id={id('location')} label="Country / State">
          <input type="text" autoComplete="address-level1" placeholder="e.g. Maharashtra, India" {...inputProps('location')} />
        </Field>
        <Field id={id('product')} label="Product Interested In">
          <div className="relative">
            <select {...inputProps('product')} className="field-input appearance-none pr-10">
              <option value="">Select a product</option>
              {productOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-muted">
              <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            </svg>
          </div>
        </Field>
        <div className="sm:col-span-2">
          <Field id={id('quantity')} label="Quantity Required">
            <input type="text" placeholder="e.g. 5 tonnes, 500 kg per month" {...inputProps('quantity')} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field id={id('message')} label="Message" required error={errors.message}>
            <textarea rows={5} required aria-required="true" placeholder="Tell us about your requirement — product form, packaging, delivery location, timelines…" {...inputProps('message')} className="field-input resize-y" />
          </Field>
        </div>

        {/* Honeypot (spam trap) — hidden from people and assistive tech */}
        <div className="hidden" aria-hidden="true">
          <label>
            Leave this field empty
            <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" value={values.botcheck} onChange={onChange} />
          </label>
        </div>
      </div>

      {/* Feedback */}
      <div aria-live="polite" className="mt-6">
        <AnimatePresence mode="wait">
          {status === 'error' && (
            <m.div
              key="err"
              role="alert"
              className="flex gap-3 rounded-2xl border border-terracotta/30 bg-terracotta/[0.07] p-4 text-sm text-charcoal"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
              <div>
                <p className="font-semibold">Your enquiry was not sent.</p>
                <p className="mt-1 text-muted">{serverError} You can try again or send it via WhatsApp instead.</p>
              </div>
            </m.div>
          )}
          {status === 'whatsapp' && (
            <m.div
              key="wa"
              className="flex gap-3 rounded-2xl border border-[#1f8f4e]/25 bg-[#1f8f4e]/[0.06] p-4 text-sm text-charcoal"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#1f8f4e]" />
              <p>
                WhatsApp has been opened with your enquiry pre-filled. <strong>Please review the message and tap send</strong> in
                WhatsApp to deliver it.
              </p>
            </m.div>
          )}
          {!emailReady && status === 'idle' && (
            <m.div
              key="cfg"
              className="flex gap-3 rounded-2xl bg-cream/70 p-4 text-sm text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
              <p>Email submission is being set up. For now, please use “Send via WhatsApp” to reach us directly.</p>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
        <button type="submit" className="btn-primary group disabled:cursor-not-allowed disabled:opacity-60" disabled={submitting || !emailReady}>
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              Send Enquiry
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </>
          )}
        </button>
        <button type="button" onClick={handleWhatsApp} className="btn-whatsapp">
          <WhatsAppIcon className="h-4 w-4" /> Send via WhatsApp
        </button>
        <p className="text-xs leading-relaxed text-muted sm:ml-auto sm:max-w-[13rem] sm:text-right">
          <span className="text-terracotta">*</span> Required. See our{' '}
          <Link to="/privacy-policy" className="underline underline-offset-2 hover:text-charcoal">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </form>
  )
}
