import { useId } from 'react'

/**
 * Branded placeholder illustrations used until real, licensed photography
 * is added in data/images.js. Pure SVG: zero network cost, crisp at any size.
 */

// Deterministic pseudo-random so illustrations render identically every time
function rng(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function scatter(count, seed, box) {
  const r = rng(seed)
  return Array.from({ length: count }, () => ({
    x: box.x + r() * box.w,
    y: box.y + r() * box.h,
    r: 0.6 + r() * 2.2,
    a: r() * 360,
    o: 0.35 + r() * 0.6,
  }))
}

/* A single turmeric rhizome: main body, side fingers, growth rings */
function Rhizome({ x, y, rot = 0, s = 1, skin = '#B97A2B', ring = '#8E5A1C' }) {
  const finger = (fx, fy, w, h, a) => (
    <g transform={`translate(${fx} ${fy}) rotate(${a})`}>
      <rect x={0} y={-h / 2} width={w} height={h} rx={h / 2} fill={skin} />
      {Array.from({ length: Math.floor(w / 16) }, (_, i) => (
        <path
          key={i}
          d={`M${10 + i * 16} ${-h / 2 + 3} q4 ${h / 2 - 3} 0 ${h - 6}`}
          stroke={ring}
          strokeWidth="1.4"
          fill="none"
          opacity=".55"
        />
      ))}
    </g>
  )
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      {finger(30, -6, 70, 26, -48)}
      {finger(70, 4, 62, 24, 38)}
      {finger(-40, 2, 58, 24, 200)}
      {finger(-60, 0, 150, 40, 0)}
      <ellipse cx="-10" cy="-8" rx="14" ry="5" fill="#fff" opacity=".12" />
    </g>
  )
}

/* Cut cross-section showing the vivid interior */
function Slice({ x, y, r = 34 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="#9A6020" />
      <circle r={r - 4} fill="#E3821F" />
      <circle r={r * 0.62} fill="#EE9A2B" />
      <circle r={r * 0.62} fill="none" stroke="#C96A14" strokeWidth="1.2" strokeDasharray="2 4" />
      <circle r={r * 0.22} fill="#F6B44A" />
    </g>
  )
}

function Leaf({ x, y, rot = 0, s = 1, fill = '#3E6249' }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0 C40 -30 120 -34 190 0 C120 34 40 30 0 0Z" fill={fill} />
      <path d="M6 0 H180" stroke="#2A4535" strokeWidth="1.5" opacity=".6" />
    </g>
  )
}

function Turmeric({ id }) {
  const dust = scatter(140, 7, { x: 30, y: 300, w: 340, h: 180 })
  return (
    <>
      <defs>
        <radialGradient id={`${id}bg`} cx="50%" cy="38%" r="75%">
          <stop offset="0" stopColor="#F6EBD3" />
          <stop offset="1" stopColor="#E7D4B1" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}bg)`} />
      <circle cx="292" cy="128" r="92" fill="#D69A24" opacity=".22" />
      <Leaf x={40} y={120} rot={-24} s={1.05} />
      <Leaf x={70} y={150} rot={-6} s={0.85} fill="#4C7357" />
      <Rhizome x={190} y={262} rot={-12} s={1.15} />
      <Rhizome x={250} y={360} rot={18} s={0.9} skin="#C4873A" />
      <Slice x={110} y={372} r={36} />
      <Slice x={168} y={420} r={24} />
      <ellipse cx="300" cy="448" rx="78" ry="16" fill="#D69A24" opacity=".75" />
      <ellipse cx="300" cy="442" rx="56" ry="10" fill="#E5AE3A" />
      {dust.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r * 0.7} fill="#D69A24" opacity={d.o * 0.6} />
      ))}
    </>
  )
}

function Powder({ id }) {
  const grains = scatter(120, 13, { x: 40, y: 330, w: 320, h: 140 })
  return (
    <>
      <defs>
        <radialGradient id={`${id}bg`} cx="50%" cy="30%" r="80%">
          <stop offset="0" stopColor="#30503F" />
          <stop offset="1" stopColor="#1B2C24" />
        </radialGradient>
        <linearGradient id={`${id}mound`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2B640" />
          <stop offset="1" stopColor="#D08A1A" />
        </linearGradient>
        <linearGradient id={`${id}bowl`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C77850" />
          <stop offset="1" stopColor="#8E4D2E" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}bg)`} />
      <circle cx="200" cy="210" r="150" fill="#D69A24" opacity=".08" />
      <path d="M90 262 C120 160 170 128 200 128 C232 128 280 160 310 262Z" fill={`url(#${id}mound)`} />
      <path d="M150 190 C170 156 190 146 204 146" stroke="#FAD27A" strokeWidth="6" strokeLinecap="round" fill="none" opacity=".55" />
      <ellipse cx="200" cy="262" rx="140" ry="26" fill="#E4A030" />
      <path d="M60 262 C60 350 130 392 200 392 C270 392 340 350 340 262Z" fill={`url(#${id}bowl)`} />
      <ellipse cx="200" cy="262" rx="140" ry="26" fill="none" stroke="#D88A5E" strokeWidth="4" />
      <path d="M92 300 C120 350 160 366 200 368" stroke="#E7A07A" strokeWidth="3" fill="none" opacity=".4" />
      <g transform="rotate(-18 300 410)">
        <rect x="220" y="402" width="150" height="12" rx="6" fill="#9C6B3D" />
        <ellipse cx="226" cy="408" rx="30" ry="18" fill="#B07C48" />
        <ellipse cx="226" cy="406" rx="22" ry="11" fill="#E6A534" />
      </g>
      {grains.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y + 40} r={d.r * 0.8} fill="#E5A532" opacity={d.o * 0.7} />
      ))}
    </>
  )
}

function Field({ id }) {
  const rows = Array.from({ length: 14 }, (_, i) => i)
  return (
    <>
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F5E6C6" />
          <stop offset=".55" stopColor="#EFCF8E" />
          <stop offset="1" stopColor="#E3B061" />
        </linearGradient>
        <linearGradient id={`${id}ground`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3F6149" />
          <stop offset="1" stopColor="#1F3329" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}sky)`} />
      <circle cx="270" cy="190" r="54" fill="#F7D98C" />
      <circle cx="270" cy="190" r="86" fill="#F7D98C" opacity=".25" />
      <path d="M0 236 C80 206 150 222 220 212 C290 202 340 214 400 204 V500 H0Z" fill="#7A8A5C" opacity=".55" />
      <path d="M0 258 C90 236 170 250 250 240 C320 232 360 240 400 236 V500 H0Z" fill="#56704F" />
      <path d="M0 280 H400 V500 H0Z" fill={`url(#${id}ground)`} />
      {rows.map((i) => {
        const x = -360 + i * 66
        return (
          <path
            key={i}
            d={`M200 282 Q${200 + (x - 200) * 0.45} 380 ${x} 520`}
            stroke={i % 2 ? '#2B4636' : '#5C8462'}
            strokeWidth={i % 2 ? 10 : 6}
            fill="none"
            strokeLinecap="round"
            opacity=".85"
          />
        )
      })}
      <g opacity=".9">
        {[60, 340].map((tx, i) => (
          <g key={i} transform={`translate(${tx} 252)`}>
            <rect x="-3" y="-2" width="6" height="30" fill="#2A3B2E" />
            <circle cy="-20" r="26" fill="#2E4A39" />
            <circle cx="-14" cy="-8" r="16" fill="#355542" />
          </g>
        ))}
      </g>
    </>
  )
}

function Harvest({ id }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}bg`} cx="40%" cy="30%" r="85%">
          <stop offset="0" stopColor="#F3E3C4" />
          <stop offset="1" stopColor="#D9BE8E" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}bg)`} />
      <Leaf x={-10} y={90} rot={10} s={1.4} />
      <Leaf x={20} y={60} rot={-14} s={1.2} fill="#4C7357" />
      <Leaf x={410} y={140} rot={170} s={1.3} fill="#4C7357" />
      <ellipse cx="200" cy="430" rx="170" ry="36" fill="#8E5A2E" opacity=".25" />
      <Rhizome x={150} y={330} rot={-22} s={1.05} />
      <Rhizome x={250} y={300} rot={14} s={1} skin="#C4873A" />
      <Rhizome x={200} y={390} rot={4} s={1.2} skin="#B07028" />
      <Rhizome x={120} y={230} rot={30} s={0.8} skin="#C99044" />
      <Slice x={300} y={410} r={30} />
    </>
  )
}

/* ── Small spice motifs for catalogue cards ── */
function SpiceBg({ id, tint }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}bg`} cx="50%" cy="45%" r="70%">
          <stop offset="0" stopColor="#FBF6EC" />
          <stop offset="1" stopColor="#EFE4CF" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}bg)`} />
      <circle cx="200" cy="240" r="140" fill={tint} opacity=".12" />
    </>
  )
}

function Chilli({ id }) {
  const pod = (x, y, rot, s, c) => (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0 C40 -10 120 10 170 80 C120 40 50 30 0 26 Z" fill={c} />
      <path d="M10 6 C60 4 110 20 150 60" stroke="#fff" strokeWidth="3" opacity=".25" fill="none" strokeLinecap="round" />
      <path d="M0 13 C-14 10 -22 -2 -30 -16" stroke="#4C7357" strokeWidth="7" strokeLinecap="round" fill="none" />
      <ellipse cx="-2" cy="13" rx="9" ry="15" fill="#3E6249" />
    </g>
  )
  return (
    <>
      <SpiceBg id={id} tint="#B5432A" />
      {pod(110, 170, 12, 1.1, '#A8321F')}
      {pod(90, 250, -4, 1.2, '#B9402A')}
      {pod(140, 320, 18, 0.95, '#9C2D1C')}
    </>
  )
}

function SeedField({ id, tint, seed, count, draw }) {
  const pts = scatter(count, seed, { x: 90, y: 120, w: 220, h: 240 })
  return (
    <>
      <SpiceBg id={id} tint={tint} />
      {pts.map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y}) rotate(${p.a})`}>
          {draw(i)}
        </g>
      ))}
    </>
  )
}

const Coriander = ({ id }) => (
  <SeedField
    id={id}
    tint="#A88A4A"
    seed={21}
    count={38}
    draw={(i) => (
      <>
        <circle r="13" fill={i % 3 ? '#B89A5E' : '#A5864A'} />
        <path d="M-10 -5 Q0 -9 10 -5 M-12 2 Q0 -2 12 2 M-10 8 Q0 5 10 8" stroke="#7C6334" strokeWidth="1.3" fill="none" opacity=".6" />
        <circle cx="-4" cy="-5" r="3" fill="#fff" opacity=".25" />
      </>
    )}
  />
)

const Cumin = ({ id }) => (
  <SeedField
    id={id}
    tint="#7A5A35"
    seed={33}
    count={46}
    draw={(i) => (
      <>
        <path d="M-18 0 C-10 -7 10 -7 18 0 C10 7 -10 7 -18 0Z" fill={i % 2 ? '#8A6A42' : '#7A5B36'} />
        <path d="M-14 0 H14 M-12 -3 H12 M-12 3 H12" stroke="#5A4126" strokeWidth=".9" opacity=".6" />
        <path d="M18 0 l7 -2" stroke="#7A5B36" strokeWidth="1.5" strokeLinecap="round" />
      </>
    )}
  />
)

const Pepper = ({ id }) => (
  <SeedField
    id={id}
    tint="#2E2A24"
    seed={44}
    count={40}
    draw={(i) => (
      <>
        <circle r="12" fill={i % 3 ? '#2F2A24' : '#3B342C'} />
        <path d="M-8 -4 q4 3 8 0 t8 1 M-7 5 q5 -3 9 1" stroke="#5B5145" strokeWidth="1.4" fill="none" />
        <circle cx="-4" cy="-5" r="3" fill="#fff" opacity=".18" />
      </>
    )}
  />
)

const Cardamom = ({ id }) => (
  <SeedField
    id={id}
    tint="#5E8A55"
    seed={55}
    count={22}
    draw={(i) => (
      <>
        <path d="M-24 0 C-16 -14 16 -14 26 0 C16 14 -16 14 -24 0Z" fill={i % 2 ? '#7FA068' : '#6C9058'} />
        <path d="M-20 -3 C-6 -8 10 -8 22 -2 M-20 3 C-6 8 10 8 22 2" stroke="#4D6E40" strokeWidth="1.2" fill="none" opacity=".7" />
        <path d="M26 0 l6 0" stroke="#5B7C48" strokeWidth="2" strokeLinecap="round" />
      </>
    )}
  />
)

const VARIANTS = {
  turmeric: Turmeric,
  powder: Powder,
  field: Field,
  harvest: Harvest,
  chilli: Chilli,
  coriander: Coriander,
  cumin: Cumin,
  pepper: Pepper,
  cardamom: Cardamom,
}

export default function SpiceArt({ variant = 'turmeric', className = '', title }) {
  const rawId = useId()
  const id = rawId.replace(/[^a-zA-Z0-9]/g, '')
  const Art = VARIANTS[variant] || Turmeric
  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <Art id={id} />
    </svg>
  )
}
