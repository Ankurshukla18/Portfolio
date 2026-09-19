'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Terminal, Search } from 'lucide-react'

export default function TechIntro({ onComplete }: { onComplete?: () => void }) {
  const [shot, setShot] = useState<1 | 2 | 3 | 4>(1)
  const [typedText, setTypedText] = useState('')
  const [isDone, setIsDone] = useState(false)
  const fullCommand = 'init ankur.shukla --backend --production'

  // Storyboard timeline transitions
  useEffect(() => {
    // Shot 1 -> Shot 2 at 2.0s
    const t1 = setTimeout(() => setShot(2), 2000)
    // Shot 2 -> Shot 3 at 3.6s
    const t2 = setTimeout(() => setShot(3), 3600)
    // Shot 3 -> Shot 4 at 5.6s
    const t3 = setTimeout(() => setShot(4), 5600)
    // Shot 4 -> Outro Finish at 7.8s
    const t4 = setTimeout(() => handleComplete(), 7800)

    // Allow escape key to skip
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleComplete()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  // Typing effect in Shot 3
  useEffect(() => {
    if (shot === 3) {
      let currentIdx = 0
      setTypedText('')
      const interval = setInterval(() => {
        if (currentIdx <= fullCommand.length) {
          setTypedText(fullCommand.slice(0, currentIdx))
          currentIdx++
        } else {
          clearInterval(interval)
        }
      }, 38)
      return () => clearInterval(interval)
    }
  }, [shot])

  const handleComplete = () => {
    setIsDone(true)
    if (onComplete) onComplete()
  }

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="tech-intro"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(10px)',
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[99999] bg-[#050505] flex items-center justify-center overflow-hidden font-display select-none"
        >
          {/* Subtle warm center radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at center, rgba(230,48,34,0.18) 0%, rgba(139,26,16,0.06) 40%, transparent 70%)',
            }}
          />

          {/* Grain texture overlay */}
          <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#e63022_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Top Skip button */}
          <div className="absolute top-6 right-6 z-50 flex items-center gap-2">
            <button
              onClick={handleComplete}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#222] hover:border-[#e63022]/60 bg-[#0a0a0a]/80 text-[#777] hover:text-white text-[11px] tracking-[0.2em] uppercase rounded-sm transition-all duration-300"
            >
              <span>SKIP</span>
              <span className="text-[9px] text-[#444]">[ESC]</span>
            </button>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              SHOT 1: The Icon Burst (00:00 – 00:02)
          ───────────────────────────────────────────────────────────── */}
          {shot === 1 && (
            <div className="relative flex flex-col items-center justify-center">
              {/* Spinning high-velocity streak */}
              <motion.div
                initial={{ scaleY: 0.1, scaleX: 1, rotate: 0, opacity: 0 }}
                animate={{
                  scaleY: [0.1, 2.5, 0.2],
                  scaleX: [1, 0.1, 1],
                  rotate: [0, 720],
                  opacity: [0, 1, 0.8],
                }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
                className="w-[3px] h-[120px] bg-[#ff3b2a] rounded-full shadow-[0_0_25px_#e63022]"
              />

              {/* 12-point glowing geometric starburst icon burst */}
              <motion.div
                initial={{ scale: 0, rotate: -90, opacity: 0 }}
                animate={{ scale: [0, 1.25, 1], rotate: [0, 180], opacity: 1 }}
                transition={{ delay: 0.85, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute flex items-center justify-center"
              >
                <Starburst12Point className="w-24 h-24 text-[#e63022] drop-shadow-[0_0_35px_rgba(230,48,34,0.9)]" />
              </motion.div>

              {/* Kinetic expanding shockwave ring */}
              <motion.div
                initial={{ scale: 0.2, opacity: 0 }}
                animate={{ scale: [0.2, 2.4], opacity: [0, 0.8, 0] }}
                transition={{ delay: 0.95, duration: 0.9, ease: 'easeOut' }}
                className="absolute w-28 h-28 rounded-full border border-[#e63022]/80"
              />
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              SHOT 2: UI Expansion & Logo Reveal (00:02 – 00:03.6)
          ───────────────────────────────────────────────────────────── */}
          {shot === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-xl px-6 flex flex-col items-center"
            >
              {/* Logo + Branding */}
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  initial={{ rotate: -45, scale: 0.7 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 0.7, type: 'spring', stiffness: 220 }}
                >
                  <Starburst12Point className="w-10 h-10 text-[#e63022] drop-shadow-[0_0_20px_rgba(230,48,34,0.8)]" />
                </motion.div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                    ANKUR SHUKLA
                    <span className="w-2 h-2 rounded-full bg-[#e63022] animate-pulse" />
                  </h1>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#666]">
                    BACKEND SYSTEMS // DISTRIBUTED APIs
                  </p>
                </div>
              </div>

              {/* Sleek Glassmorphic Floating Search Bar */}
              <motion.div
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.6, type: 'spring', damping: 18 }}
                className="w-full bg-[#0d0d0d]/80 backdrop-blur-xl border border-[#222] shadow-[0_15px_40px_rgba(0,0,0,0.8)] rounded-full p-2 pl-5 flex items-center gap-3"
              >
                <Search className="w-4 h-4 text-[#555]" />
                <span className="text-xs text-[#888] font-mono">
                  Explore architecture, services, and live projects...
                </span>
                <span className="ml-auto px-3 py-1 bg-[#1a1a1a] text-[10px] text-[#555] rounded-full uppercase tracking-wider font-mono">
                  ⌘K
                </span>
              </motion.div>

              {/* Pill-shaped filter buttons popping into place with elastic motion */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
                }}
                className="flex flex-wrap justify-center gap-2 mt-4"
              >
                {['FASTAPI', 'REST APIs', 'PYTHON', 'POSTGRESQL', 'ARCHITECTURE'].map((pill) => (
                  <motion.div
                    key={pill}
                    variants={{
                      hidden: { scale: 0.6, opacity: 0, y: 15 },
                      visible: { scale: 1, opacity: 1, y: 0 },
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    className="px-3.5 py-1.5 rounded-full border border-[#1a1a1a] bg-[#0a0a0a]/90 text-[10px] tracking-wider uppercase text-[#888] hover:border-[#e63022]/40"
                  >
                    {pill}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              SHOT 3: Dynamic Focus & Text Input (00:03.6 – 00:05.6)
          ───────────────────────────────────────────────────────────── */}
          {shot === 3 && (
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1.15, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg px-6 flex flex-col items-center"
            >
              <div className="w-full flex items-center justify-between text-[11px] font-mono text-[#555] mb-2 px-2">
                <span className="flex items-center gap-1.5 text-[#e63022]">
                  <Terminal className="w-3.5 h-3.5" />
                  SHELL_SESSION: ACTIVE
                </span>
                <span>EXEC_MODE</span>
              </div>

              {/* Kinetic Zoomed Text Input Bar */}
              <div className="w-full bg-[#0a0a0a] border-2 border-[#e63022]/70 shadow-[0_0_35px_rgba(230,48,34,0.3)] rounded-2xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 font-mono text-sm md:text-base text-[#f5f5f0] overflow-hidden whitespace-nowrap">
                  <span className="text-[#e63022] font-bold">&gt;</span>
                  <span>{typedText}</span>
                  <span className="w-2 h-5 bg-[#e63022] inline-block animate-pulse" />
                </div>

                {/* Vibrant neon red send icon button lighting up & clicking down */}
                <motion.button
                  animate={{
                    scale: typedText.length > 25 ? [1, 0.88, 1] : 1,
                    backgroundColor:
                      typedText.length > 25 ? '#e63022' : 'rgba(230,48,34,0.15)',
                  }}
                  transition={{ duration: 0.25 }}
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border border-[#e63022] shadow-[0_0_20px_rgba(230,48,34,0.5)]"
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </motion.button>
              </div>

              {/* Depth of field blur ring */}
              <div className="absolute inset-0 -z-10 rounded-3xl blur-2xl bg-gradient-to-r from-[#e63022]/10 to-transparent" />
            </motion.div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              SHOT 4: Code/Data Cascade & Outro Snap (00:05.6 – 00:07.8)
          ───────────────────────────────────────────────────────────── */}
          {shot === 4 && (
            <motion.div
              initial={{ scale: 1.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl px-6 flex flex-col items-center text-center"
            >
              {/* Cascading clean code/markdown printing on dark glass */}
              <div className="w-full bg-[#080808]/90 border border-[#1a1a1a] rounded-xl p-6 text-left font-mono text-xs text-[#888] shadow-2xl mb-8 space-y-1.5 backdrop-blur-md">
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                  className="text-[#e63022] font-semibold"
                >
                  [SYSTEM INITIALIZED] :: BUILD TARGET V2026.1
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-white"
                >
                  ✓ LOADED: FastAPI, Python, PostgreSQL, System Design
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 }}
                  className="text-[#666]"
                >
                  ✓ VERIFIED: College Bus Tracking, Patient Management, Security Core
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.65 }}
                  className="text-[#ff3b2a]"
                >
                  ➜ RESOLVING DISPLAY STACK... READY
                </motion.p>
              </div>

              {/* Resolved centered glowing starburst logo & brand name */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6, type: 'spring' }}
                className="flex flex-col items-center gap-3"
              >
                <Starburst12Point className="w-14 h-14 text-[#e63022] drop-shadow-[0_0_35px_rgba(230,48,34,0.9)] animate-pulse-slow" />
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                  ANKUR SHUKLA
                </h2>
                <p className="text-xs tracking-[0.35em] uppercase text-[#e63022]">
                  ENTER THE PORTFOLIO
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* Bottom progress bar indicating sequence status */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#111]">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 7.6, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-[#8b1a10] via-[#e63022] to-[#ff4d3a]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─────────────────────────────────────────────────────────────
   12-Point Geometric Starburst Icon SVG
───────────────────────────────────────────────────────────── */
function Starburst12Point({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 12 points constructed by combining rotated diamonds/crosses */}
      <g stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M50 5 L53 47 L95 50 L53 53 L50 95 L47 53 L5 50 L47 47 Z" fill="currentColor" fillOpacity="0.25" />
        <path
          d="M50 5 L53 47 L95 50 L53 53 L50 95 L47 53 L5 50 L47 47 Z"
          transform="rotate(30 50 50)"
          fill="currentColor"
          fillOpacity="0.15"
        />
        <path
          d="M50 5 L53 47 L95 50 L53 53 L50 95 L47 53 L5 50 L47 47 Z"
          transform="rotate(60 50 50)"
          fill="currentColor"
          fillOpacity="0.15"
        />
      </g>
      {/* Center glowing circle */}
      <circle cx="50" cy="50" r="6" fill="currentColor" />
    </svg>
  )
}
