import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, domMax, LazyMotion, m, MotionConfig } from 'motion/react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'

// Secondary pages are code-split to keep the initial bundle small
const About = lazy(() => import('./pages/About'))
const Spices = lazy(() => import('./pages/Spices'))
const Contact = lazy(() => import('./pages/Contact'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const NotFound = lazy(() => import('./pages/NotFound'))

const EASE = [0.22, 1, 0.36, 1]

/** Scrolls to #hash targets once they exist (handles lazy pages + transitions). */
function useHashScroll() {
  const { hash, pathname } = useLocation()
  useEffect(() => {
    if (!hash) return
    let frame
    let tries = 0
    const find = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      } else if (tries++ < 120) {
        frame = requestAnimationFrame(find)
      }
    }
    // Small delay lets the page-enter transition begin first
    const t = setTimeout(find, 60)
    return () => {
      clearTimeout(t)
      cancelAnimationFrame(frame)
    }
  }, [hash, pathname])
}

function PageFallback() {
  return <div className="min-h-screen" aria-hidden="true" />
}

export default function App() {
  const location = useLocation()
  useHashScroll()

  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">
        <Navbar />
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => {
            if (!window.location.hash) window.scrollTo({ top: 0, behavior: 'instant' })
          }}
        >
          <m.main
            id="main"
            key={location.pathname}
            tabIndex={-1}
            className="overflow-x-clip outline-none"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.25, ease: 'easeIn' } }}
          >
            <Suspense fallback={<PageFallback />}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/spices" element={<Spices />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </m.main>
        </AnimatePresence>
        <Footer />
        <ScrollToTop />
        <WhatsAppButton />
      </MotionConfig>
    </LazyMotion>
  )
}
