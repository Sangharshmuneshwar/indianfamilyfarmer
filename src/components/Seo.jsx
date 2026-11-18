import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { siteConfig } from '../data/siteConfig'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Per-page SEO: title, description, canonical, Open Graph, optional JSON-LD.
 * Works in a static SPA without a server.
 */
export default function Seo({ title, description = siteConfig.description, jsonLd }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} | Waigaon Turmeric & Indian Spice Trading`
    const url = `${siteConfig.siteUrl}${pathname === '/' ? '/' : pathname}`
    document.title = fullTitle
    setMeta('name', 'description', description)
    setCanonical(url)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', `${siteConfig.siteUrl}${siteConfig.ogImage}`)

    let script
    if (jsonLd) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.page = 'true'
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }
    return () => script?.remove()
  }, [title, description, pathname, jsonLd])

  return null
}
