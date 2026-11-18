import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Seo from '../components/Seo'
import SpiceArt from '../components/SpiceArt'

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="The page you are looking for could not be found." />
      <section className="container-x grid min-h-[80vh] items-center gap-12 pt-32 pb-20 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Error 404</p>
          <h1 className="mt-6 text-5xl leading-tight text-charcoal sm:text-6xl">This field is still unplanted.</h1>
          <p className="mt-6 max-w-md text-muted">The page you’re looking for doesn’t exist or may have moved.</p>
          <Link to="/" className="btn-primary mt-10">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to home
          </Link>
        </div>
        <div className="mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-full bg-cream">
          <SpiceArt variant="field" className="h-full w-full" />
        </div>
      </section>
    </>
  )
}
