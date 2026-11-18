import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Generates robots.txt and sitemap.xml at build time using VITE_SITE_URL,
 * so the production domain only has to be set in one place (.env).
 */
function seoFiles(siteUrl) {
  const routes = ['/', '/about', '/spices', '/contact', '/privacy-policy']
  const base = siteUrl.replace(/\/+$/, '')
  return {
    name: 'seo-files',
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      const urls = routes
        .map(
          (r) =>
            `  <url>\n    <loc>${base}${r === '/' ? '/' : r}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
        )
        .join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = env.VITE_SITE_URL || 'https://www.example.com'
  return {
    plugins: [react(), tailwindcss(), seoFiles(siteUrl)],
    build: {
      target: 'es2020',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return
            if (/[\\/](react|react-dom|scheduler|react-router|react-router-dom)[\\/]/.test(id)) return 'react'
            if (/[\\/](motion|framer-motion|motion-dom|motion-utils)[\\/]/.test(id)) return 'motion'
            if (id.includes('lucide-react')) return 'icons'
          },
        },
      },
    },
  }
})
