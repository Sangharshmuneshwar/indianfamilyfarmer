/**
 * ─────────────────────────────────────────────────────────────
 *  IMAGE REGISTRY
 *
 *  Every photo on the site is referenced by a key from this file.
 *  If a key's `src` is null, a branded placeholder illustration is shown
 *  instead (see components/SpiceArt.jsx).
 *
 *  TEMPORARY PHOTOS: the current photos are stock images from Pexels
 *  (https://www.pexels.com/license/ — free for commercial use, no
 *  attribution required). They illustrate each category and are NOT
 *  photos of Indian Family Farmer's own produce. Replace them with your
 *  own product / farm photography when available.
 *
 *  To replace a photo:
 *   1. Export as WebP at ~800px and ~1600px wide (same aspect ratio).
 *   2. Put the files in src/assets/images/ (overwrite the same file names
 *      and nothing else needs changing).
 *   3. If the aspect ratio changes, update width/height below.
 * ─────────────────────────────────────────────────────────────
 */

import hero800 from '../assets/images/hero-800.webp'
import hero1600 from '../assets/images/hero-1600.webp'
import heroSec800 from '../assets/images/hero-secondary-800.webp'
import heroSec1600 from '../assets/images/hero-secondary-1600.webp'
import turmeric800 from '../assets/images/turmeric-800.webp'
import turmeric1600 from '../assets/images/turmeric-1600.webp'
import powder800 from '../assets/images/turmeric-powder-800.webp'
import powder1600 from '../assets/images/turmeric-powder-1600.webp'
import intro800 from '../assets/images/intro-800.webp'
import intro1600 from '../assets/images/intro-1600.webp'
import story800 from '../assets/images/story-800.webp'
import story1600 from '../assets/images/story-1600.webp'
import about800 from '../assets/images/about-800.webp'
import about1600 from '../assets/images/about-1600.webp'
import chilli800 from '../assets/images/red-chilli-800.webp'
import chilli1600 from '../assets/images/red-chilli-1600.webp'
import coriander800 from '../assets/images/coriander-800.webp'
import coriander1600 from '../assets/images/coriander-1600.webp'
import cumin800 from '../assets/images/cumin-800.webp'
import cumin1600 from '../assets/images/cumin-1600.webp'
import pepper800 from '../assets/images/black-pepper-800.webp'
import pepper1600 from '../assets/images/black-pepper-1600.webp'
import cardamom800 from '../assets/images/cardamom-800.webp'
import cardamom1600 from '../assets/images/cardamom-1600.webp'

const photo = (sm, lg, w, h, alt, art) => ({
  src: lg,
  srcSet: `${sm} 800w, ${lg} 1600w`,
  width: w,
  height: h,
  alt,
  art,
})

export const images = {
  hero: photo(hero800, hero1600, 1600, 2000, 'Turmeric powder and fresh turmeric roots on a rustic wooden table', 'turmeric'),
  heroSecondary: photo(heroSec800, heroSec1600, 1600, 1600, 'Close-up texture of golden turmeric powder', 'powder'),
  intro: photo(intro800, intro1600, 1600, 1920, 'Farm fields with trees in rural central India', 'field'),
  turmeric: photo(turmeric800, turmeric1600, 1600, 1600, 'A heap of fresh whole turmeric roots', 'turmeric'),
  turmericPowder: photo(powder800, powder1600, 1600, 1920, 'Ground turmeric powder with a wooden spoon', 'powder'),
  story: photo(story800, story1600, 1600, 900, 'Green crop field under a golden morning sky in India', 'field'),
  about: photo(about800, about1600, 1600, 900, 'A farmer working a field with a pair of oxen in rural India', 'harvest'),

  redChilli: photo(chilli800, chilli1600, 1600, 2000, 'Sun-dried Indian red chillies', 'chilli'),
  coriander: photo(coriander800, coriander1600, 1600, 2000, 'Whole coriander seeds', 'coriander'),
  cumin: photo(cumin800, cumin1600, 1600, 2000, 'Whole cumin seeds', 'cumin'),
  blackPepper: photo(pepper800, pepper1600, 1600, 2000, 'Whole black peppercorns', 'pepper'),
  cardamom: photo(cardamom800, cardamom1600, 1600, 2000, 'Green cardamom pods', 'cardamom'),
}
