'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

// Hero code snippets for the right-side visual
const codeSnippets = [
  {
    id: 1,
    code: `@app.get("/api/buses")
async def get_buses():
    return await db.fetch_all(
        "SELECT * FROM buses"
    )`,
    lang: 'python',
    top: '10%',
    right: '5%',
  },
  {
    id: 2,
    code: `POST /api/auth/login
→ 200 OK
{
  "token": "eyJ...",
  "user": { "id": 1 }
}`,
    lang: 'http',
    top: '45%',
    right: '15%',
  },
  {
    id: 3,
    code: `SELECT p.*, a.name
FROM patients p
JOIN admissions a
WHERE p.status = 'active'`,
    lang: 'sql',
    top: '72%',
    right: '3%',
  },
]

export default function Hero() {
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!visualRef.current) return
      const { innerWidth: w, innerHeight: h } = window
      const x = (e.clientX / w - 0.5) * 20
      const y = (e.clientY / h - 0.5) * 20
      visualRef.current.style.transform = `translate(${x}px, ${y}px)`
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Centered background photo with feathered edges & soft alpha blending ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        {/* Tight portrait wrapper matching the subject */}
        <div className="relative h-[85vh] md:h-[92vh] max-h-[850px] aspect-[3/4] flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-photo.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full"
            style={{
              objectFit: 'cover',
              objectPosition: 'center top',
              /* Dark cinematic monochrome with high contrast */
              filter: 'grayscale(1) contrast(1.3) brightness(0.36) sepia(0.08)',
              /* Feathered mask on the image itself: fades out smoothly on all edges */
              maskImage:
                'radial-gradient(ellipse 58% 62% at 50% 40%, black 15%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.45) 48%, rgba(0,0,0,0.1) 62%, transparent 72%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 58% 62% at 50% 40%, black 15%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.45) 48%, rgba(0,0,0,0.1) 62%, transparent 72%)',
            }}
          />

          {/* Directional gradient fades for seamless edge feathering */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent pointer-events-none" />

          {/* Subtle red/crimson rim & ambient glow around subject */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 48% 52% at 50% 40%, rgba(230,48,34,0.14) 0%, rgba(139,26,16,0.06) 45%, transparent 68%)',
            }}
          />
        </div>

        {/* Global heavy vignette fading to deep matte black (#050505) on the borders */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 20%, rgba(5,5,5,0.55) 55%, #050505 90%)',
          }}
        />
      </div>



      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div
          className="red-pulse absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(230,48,34,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          className="red-pulse absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(139,26,16,0.08) 0%, transparent 70%)',
            animationDelay: '3s',
          }}
        />
        {/* Animated particles */}
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-red-500/10"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `floatY ${6 + Math.random() * 6}s ease-in-out ${Math.random() * 4}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Main hero content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-28 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left — Text */}
        <div>
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="inline-flex items-center gap-2 border border-[#e63022]/50 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#e63022] animate-pulse" />
            <span className="font-display text-[10px] tracking-[0.3em] uppercase text-[#e63022]">
              [ SYSTEM / ONLINE ]
            </span>
          </motion.div>

          {/* Sub-eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-display text-sm tracking-[0.25em] uppercase text-[#888] mb-4"
          >
            HI, I&apos;M ANKUR
          </motion.p>

          {/* Headline — two lines */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <h1 className="font-display font-bold leading-[0.9] tracking-tight select-none text-white text-[clamp(3rem,8vw,7.5rem)]">
                Software
              </h1>
            </motion.div>
            <motion.div
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.68, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <h1 className="font-display font-bold leading-[0.9] tracking-tight select-none text-[#e63022] text-[clamp(3rem,8vw,7.5rem)]">
                Developer
              </h1>
            </motion.div>
          </div>

          {/* Role tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex items-center gap-3 mt-6 mb-2"
          >
            <span className="text-[#e63022] text-base">▶</span>
            <span className="font-display text-base md:text-lg text-white font-medium">
              Backend Developer
            </span>
          </motion.div>

          {/* Description lines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="mt-5 space-y-2"
          >
            <p className="text-[#888] text-sm md:text-base leading-relaxed font-light">
              Building software, digital experiences &amp; scalable systems.
            </p>
            <p className="text-[#555] text-sm leading-relaxed font-light">
              Aspiring Software Developer&nbsp;|&nbsp;Backend&nbsp;|&nbsp;APIs &amp; Distributed Systems
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <MagneticButton
              onClick={() =>
                document
                  .getElementById('projects')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              primary
            >
              VIEW MY WORK
            </MagneticButton>
            <MagneticButton
              onClick={() =>
                document
                  .getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              LET&apos;S CONNECT
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right — Abstract visual */}
        <div className="relative h-[420px] md:h-[520px] hidden lg:block">
          <div
            ref={visualRef}
            className="absolute inset-0"
            style={{ transition: 'transform 0.15s ease-out' }}
          >
            {/* Red glow core */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(230,48,34,0.25) 0%, transparent 70%)',
                filter: 'blur(30px)',
              }}
            />

            {/* Geometric shapes */}
            <div
              className="float-anim absolute top-[20%] left-[30%] w-20 h-20 border border-red-500/30 rotate-45"
              style={{ boxShadow: '0 0 30px rgba(230,48,34,0.1)' }}
            />
            <div className="float-anim-2 absolute bottom-[25%] right-[20%] w-12 h-12 border border-red-500/20 rounded-sm rotate-12" />
            <div className="float-anim-3 absolute top-[55%] left-[10%] w-6 h-6 bg-red-500/20 rounded-sm" />
            <div className="float-anim absolute top-[10%] right-[30%] w-3 h-3 bg-red-500/50 rounded-full" />
            <div className="float-anim-2 absolute bottom-[15%] left-[25%] w-2 h-2 bg-red-500/40 rounded-full" />

            {/* Code snippet cards */}
            {codeSnippets.map((snippet, i) => (
              <div
                key={snippet.id}
                className={`float-anim${i > 0 ? `-${i + 1}` : ''} absolute`}
                style={{ top: snippet.top, right: snippet.right }}
              >
                <div
                  className="bg-[#0a0a0a]/90 border border-[#1a1a1a] rounded-sm p-3 backdrop-blur-sm"
                  style={{
                    boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                    minWidth: '220px',
                    maxWidth: '280px',
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/70" />
                    <div className="w-2 h-2 rounded-full bg-[#333]" />
                    <div className="w-2 h-2 rounded-full bg-[#333]" />
                    <span className="ml-auto text-[9px] text-[#444] font-display uppercase tracking-wider">
                      {snippet.lang}
                    </span>
                  </div>
                  <pre className="text-[10px] text-[#666] leading-relaxed font-mono whitespace-pre overflow-hidden">
                    {snippet.code}
                  </pre>
                </div>
              </div>
            ))}

            {/* DB icon floating */}
            <div className="float-anim-2 absolute bottom-[30%] left-[5%]">
              <div className="bg-[#0a0a0a]/80 border border-[#1a1a1a] rounded-sm p-3 flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#e63022"
                  strokeWidth="1.5"
                >
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
                  <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
                </svg>
                <span className="text-[10px] font-display text-[#555] uppercase tracking-wider">
                  PostgreSQL
                </span>
              </div>
            </div>

            {/* Terminal fragment */}
            <div className="float-anim-3 absolute top-[5%] left-[5%]">
              <div className="bg-[#0a0a0a]/80 border border-[#1a1a1a] rounded-sm p-3">
                <p className="text-[10px] font-mono text-[#444]">
                  <span className="text-red-500">$</span> uvicorn main:app
                  --reload
                </p>
                <p className="text-[10px] font-mono text-[#2a6e2a]">
                  INFO: Started server process
                </p>
                <p className="text-[10px] font-mono text-[#2a6e2a]">
                  INFO: Waiting for application startup.
                </p>
                <span className="text-red-500 text-[10px] font-mono cursor-blink">
                  ▌
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-display tracking-[0.25em] uppercase text-[#555]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-red-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}

function MagneticButton({
  children,
  onClick,
  primary = false,
}: {
  children: React.ReactNode
  onClick?: () => void
  primary?: boolean
}) {
  const ref = useRef<HTMLButtonElement>(null)

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`
  }

  const onMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0,0)'
  }

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`
        font-display text-xs tracking-[0.2em] uppercase px-7 py-4 border transition-all duration-300
        ${
          primary
            ? 'bg-[#e63022] border-[#e63022] text-white hover:bg-transparent hover:text-[#e63022]'
            : 'bg-transparent border-[#e63022]/60 text-white hover:border-[#e63022] hover:bg-[#e63022]/8'
        }
      `}
      style={{ transition: 'transform 0.2s ease, background 0.3s ease, color 0.3s ease, border-color 0.3s ease' }}
    >
      {children}
    </button>
  )
}
