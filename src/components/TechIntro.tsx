'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell,
  Clock,
  MessageSquare,
  BarChart2,
  Sparkles,
  ArrowRight,
  Search,
  CheckCircle2,
} from 'lucide-react'

export default function TechIntro({ onComplete }: { onComplete?: () => void }) {
  const [shot, setShot] = useState<1 | 2 | 3 | 4 | 5>(1)
  const [isDone, setIsDone] = useState(false)
  const [typedQuestion, setTypedQuestion] = useState('')
  const fullQuestion = "Can you summarize Ankur's backend engineering capabilities and projects?"

  // Storyboard timeline transitions (accelerated snappy pacing)
  useEffect(() => {
    // Shot 1 -> Shot 2 at 1.5s
    const t1 = setTimeout(() => setShot(2), 1500)
    // Shot 2 -> Shot 3 at 3.4s
    const t2 = setTimeout(() => setShot(3), 3400)
    // Shot 3 -> Shot 4 at 5.6s
    const t3 = setTimeout(() => setShot(4), 5600)
    // Shot 4 -> Shot 5 at 7.8s
    const t4 = setTimeout(() => setShot(5), 7800)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [])

  // Keyboard shortcut listener (ESC to skip anytime, ENTER to enter in Shot 5)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleComplete()
      if (e.key === 'Enter' && shot === 5) handleComplete()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [shot])

  // Faster typing effect in Shot 3 (User AI Chat question)
  useEffect(() => {
    if (shot === 3) {
      let currentIdx = 0
      setTypedQuestion('')
      const interval = setInterval(() => {
        if (currentIdx <= fullQuestion.length) {
          setTypedQuestion(fullQuestion.slice(0, currentIdx))
          currentIdx++
        } else {
          clearInterval(interval)
        }
      }, 12)
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
            filter: 'blur(12px)',
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[99999] bg-[#050505] flex items-center justify-center overflow-hidden font-display select-none"
        >
          {/* Subtle neon red radial ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at center, rgba(230,48,34,0.18) 0%, rgba(139,26,16,0.06) 45%, transparent 70%)',
            }}
          />

          {/* Dark geometric grid background matching the portfolio */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #e63022 1px, transparent 1px),
                linear-gradient(to bottom, #e63022 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Top Skip button */}
          <div className="absolute top-6 right-6 z-50 flex items-center gap-2">
            <button
              onClick={handleComplete}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#222] hover:border-[#e63022]/60 bg-[#0a0a0a]/80 text-[#777] hover:text-white text-[11px] tracking-[0.2em] uppercase rounded-sm transition-all duration-300"
            >
              <span>SKIP</span>
              <span className="text-[9px] text-[#555]">[ESC]</span>
            </button>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              SHOT 1: Brand Intro & Dashboard Reveal (00:00 – 00:02.2)
          ───────────────────────────────────────────────────────────── */}
          {shot === 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15, filter: 'blur(8px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center justify-center w-full max-w-xl px-6"
            >
              {/* Glowing neon red four-pointed star logo */}
              <motion.div
                initial={{ scale: 0, rotate: -90, opacity: 0 }}
                animate={{ scale: [0, 1.25, 1], rotate: [0, 90, 0], opacity: 1 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative mb-5"
              >
                <div className="absolute -inset-4 rounded-full bg-[#e63022]/30 blur-xl pointer-events-none animate-pulse" />
                <FourPointStar className="w-16 h-16 text-[#ff3b2a] drop-shadow-[0_0_30px_rgba(230,48,34,0.9)]" />
              </motion.div>

              {/* Crisp white title text */}
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-1.5 text-center"
              >
                ANKUR SHUKLA
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.7 }}
                className="text-xs tracking-[0.3em] uppercase text-[#e63022] mb-8 font-mono text-center"
              >
                SOFTWARE DEVELOPER // ARCHITECTURE
              </motion.p>

              {/* Smooth zoom transition into 3D dark-mode glassmorphic search dashboard */}
              <motion.div
                initial={{ y: 40, opacity: 0, scale: 0.85, rotateX: 20 }}
                animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ delay: 0.65, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="w-full bg-[#0d0707]/85 border border-[#e63022]/40 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(230,48,34,0.25)] backdrop-blur-xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Glowing red header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e63022]/20">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#e63022] shadow-[0_0_8px_#e63022]" />
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#ff4d3a]">
                      SYSTEM DASHBOARD // V2.6
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#222]" />
                    <span className="w-2 h-2 rounded-full bg-[#222]" />
                    <span className="w-2 h-2 rounded-full bg-[#222]" />
                  </div>
                </div>

                {/* Search bar inside dashboard */}
                <div className="flex items-center gap-2.5 bg-[#050505] border border-[#222] rounded-xl px-3.5 py-2.5 text-xs text-[#777]">
                  <Search className="w-4 h-4 text-[#e63022]" />
                  <span>Searching backend services, APIs, and real-time systems...</span>
                </div>

                {/* Rounded floating UI elements */}
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {['API Engine', 'Distributed DB', 'Microservices'].map((tag, i) => (
                    <motion.div
                      key={tag}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                      className="py-1.5 px-2 bg-[#180909] border border-[#e63022]/25 rounded-lg text-[9.5px] font-mono text-center text-[#ff9e94]"
                    >
                      {tag}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              SHOT 2: Concentric Radar & Orbital Badges (00:02.2 – 00:05.0)
          ───────────────────────────────────────────────────────────── */}
          {shot === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15, filter: 'blur(8px)' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center w-[400px] h-[400px] md:w-[480px] md:h-[480px]"
            >
              {/* Concentric Circular Rings */}
              {[120, 200, 280, 360].map((dim, idx) => (
                <motion.div
                  key={dim}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.12, duration: 0.7, ease: 'easeOut' }}
                  className="absolute rounded-full border border-[#e63022]/30"
                  style={{
                    width: dim,
                    height: dim,
                    boxShadow: idx === 1 ? '0 0 25px rgba(230,48,34,0.18)' : 'none',
                  }}
                />
              ))}

              {/* Radar Sweep Beam */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
                className="absolute w-[360px] h-[360px] rounded-full pointer-events-none"
                style={{
                  background:
                    'conic-gradient(from 0deg, rgba(230,48,34,0.25) 0deg, transparent 60deg, transparent 360deg)',
                }}
              />

              {/* Center "New Updates" core badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.15, 1] }}
                transition={{ delay: 0.25, duration: 0.6, type: 'spring' }}
                className="relative z-10 flex flex-col items-center justify-center w-24 h-24 rounded-full bg-[#120707] border-2 border-[#e63022] shadow-[0_0_30px_rgba(230,48,34,0.6)]"
              >
                <div className="w-2 h-2 rounded-full bg-[#ff3b2a] animate-ping mb-1" />
                <span className="text-[10px] font-bold text-white tracking-widest uppercase">
                  NEW
                </span>
                <span className="text-[9px] font-mono text-[#e63022] tracking-wider uppercase">
                  UPDATES
                </span>
              </motion.div>

              {/* Small red glowing icon pills orbiting on the circular paths */}
              <OrbitalBadge
                icon={<Bell className="w-3.5 h-3.5 text-white" />}
                label="Alerts"
                radius={100}
                speed={8}
                initialAngle={0}
                delay={0.3}
              />
              <OrbitalBadge
                icon={<Clock className="w-3.5 h-3.5 text-white" />}
                label="Uptime 99.9%"
                radius={140}
                speed={10}
                initialAngle={90}
                delay={0.45}
              />
              <OrbitalBadge
                icon={<MessageSquare className="w-3.5 h-3.5 text-white" />}
                label="APIs Live"
                radius={180}
                speed={12}
                initialAngle={180}
                delay={0.6}
              />
              <OrbitalBadge
                icon={<BarChart2 className="w-3.5 h-3.5 text-white" />}
                label="Telemetry"
                radius={140}
                speed={9}
                initialAngle={270}
                delay={0.75}
              />
            </motion.div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              SHOT 3: AI Chat Interface & Card Pop-up (00:05.0 – 00:08.2)
          ───────────────────────────────────────────────────────────── */}
          {shot === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl px-6 flex flex-col gap-4"
            >
              {/* User Chat Bubble with Glowing Red Border */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="self-end max-w-md bg-[#120707]/90 border border-[#e63022]/60 rounded-2xl rounded-tr-sm p-4 shadow-[0_10px_30px_rgba(230,48,34,0.25)] backdrop-blur-md"
              >
                <div className="flex items-center gap-1.5 mb-1.5 text-[10px] font-mono text-[#e63022]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e63022]" />
                  <span>USER QUERY</span>
                </div>
                <p className="font-mono text-xs md:text-sm text-white leading-relaxed">
                  {typedQuestion}
                  <span className="w-2 h-4 inline-block bg-[#ff3b2a] ml-1 animate-pulse" />
                </p>
              </motion.div>

              {/* AI Agent Card Slide-in with Glowing Red Sparkle Icon */}
              <motion.div
                initial={{ opacity: 0, x: -30, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.95, duration: 0.6, type: 'spring', damping: 20 }}
                className="self-start w-full bg-[#0e0606]/95 border-2 border-[#e63022] rounded-2xl rounded-tl-sm p-5 shadow-[0_15px_45px_rgba(0,0,0,0.8),0_0_35px_rgba(230,48,34,0.3)] backdrop-blur-xl"
              >
                {/* Header with Sparkle Icon */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e63022]/30">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#e63022]/20 border border-[#e63022] flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-[#ff3b2a] animate-pulse" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">
                        ANKUR_AI // INTELLIGENCE AGENT
                      </span>
                      <span className="text-[9px] font-mono text-[#e63022] block">
                        VERIFIED PROFILE ANALYSIS
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    MATCH: 100%
                  </span>
                </div>

                {/* Animated Bullet Points */}
                <div className="space-y-2 font-mono text-xs text-[#ddd]">
                  {[
                    'High-performance FastAPI & Python backend architectures',
                    'Scalable distributed systems, authentication & RESTful APIs',
                    'PostgreSQL schema optimization & real-time telemetry pipelines',
                  ].map((bullet, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.25 + i * 0.16, duration: 0.45 }}
                      className="flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ff3b2a] mt-0.5 flex-shrink-0" />
                      <span className="text-[#eee]">{bullet}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              SHOT 4: 3D Glassmorphic Card Carousel (00:08.2 – 00:11.4)
          ───────────────────────────────────────────────────────────── */}
          {shot === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center justify-center w-full max-w-2xl px-6"
            >
              <div className="text-center mb-6">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#e63022] block mb-1">
                  CORE HIGHLIGHTS // 3D CAROUSEL
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  FEATURED ENGINEERING STACK
                </h3>
              </div>

              {/* 3D Carousel container */}
              <div
                className="relative w-full h-[240px] flex items-center justify-center"
                style={{ perspective: '1200px' }}
              >
                {[
                  { title: 'FastAPI & Python', sub: 'Async Backend & ORM', tag: '01' },
                  { title: 'College Bus Tracking', sub: 'Live GPS & Route Alerts', tag: '02' },
                  { title: 'Patient Management', sub: 'Secure Health Record API', tag: '03' },
                  { title: 'PostgreSQL & Docker', sub: 'Containerized Datastores', tag: '04' },
                ].map((card, i) => {
                  const angle = (i * 90) % 360
                  return (
                    <motion.div
                      key={card.tag}
                      animate={{
                        rotateY: [angle, angle + 360],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 10,
                        ease: 'linear',
                      }}
                      className="absolute w-[220px] h-[170px] rounded-2xl p-5 border border-[#e63022]/50 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(230,48,34,0.3)] backdrop-blur-2xl flex flex-col justify-between"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(35,10,10,0.85) 0%, rgba(12,6,6,0.95) 100%)',
                        transformStyle: 'preserve-3d',
                        transformOrigin: '50% 50% -180px',
                      }}
                    >
                      {/* Card glow shimmer & reflection */}
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono text-[#e63022] tracking-wider">
                          STACK #{card.tag}
                        </span>
                        <FourPointStar className="w-3.5 h-3.5 text-[#ff3b2a]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white leading-snug mb-1">
                          {card.title}
                        </h4>
                        <p className="text-[10px] text-[#aaa] font-mono">{card.sub}</p>
                      </div>
                      <div className="h-0.5 w-full bg-gradient-to-r from-[#e63022] to-transparent rounded-full" />
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              SHOT 5: Outro Spotlight Reveal (00:11.4 – Click to Enter)
          ───────────────────────────────────────────────────────────── */}
          {shot === 5 && (
            <motion.div
              initial={{ scale: 1.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl px-6 flex flex-col items-center text-center"
            >
              {/* Vibrant Crimson/Red Overhead Spotlights */}
              <div
                className="absolute -top-64 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at center top, rgba(230,48,34,0.35) 0%, rgba(139,26,16,0.12) 40%, transparent 70%)',
                  filter: 'blur(30px)',
                }}
              />

              {/* Spotlight Cones */}
              <div
                className="absolute -top-48 left-1/4 w-32 h-96 opacity-30 pointer-events-none rotate-12"
                style={{
                  background: 'linear-gradient(to bottom, #e63022 0%, transparent 80%)',
                  filter: 'blur(20px)',
                }}
              />
              <div
                className="absolute -top-48 right-1/4 w-32 h-96 opacity-30 pointer-events-none -rotate-12"
                style={{
                  background: 'linear-gradient(to bottom, #e63022 0%, transparent 80%)',
                  filter: 'blur(20px)',
                }}
              />

              {/* Centered Glowing Four-Pointed Star Logo */}
              <motion.div
                initial={{ scale: 0.5, rotate: -45, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
                className="relative mb-5"
              >
                <div className="absolute -inset-6 rounded-full bg-[#e63022]/40 blur-2xl pointer-events-none animate-pulse" />
                <FourPointStar className="w-16 h-16 text-[#ff3b2a] drop-shadow-[0_0_35px_rgba(230,48,34,0.9)]" />
              </motion.div>

              {/* Modern White Typography */}
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2"
              >
                ANKUR SHUKLA
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="text-xs tracking-[0.35em] uppercase text-[#ff3b2a] font-mono mb-8"
              >
                SOFTWARE DEVELOPER // SYSTEM READY
              </motion.p>

              {/* ── ENTER PORTFOLIO BUTTON (Portfolio Theme: Neon Red) ── */}
              <motion.div
                initial={{ opacity: 0, y: 25, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.25, duration: 0.45, type: 'spring', stiffness: 300, damping: 20 }}
                className="flex flex-col items-center gap-2"
              >
                <button
                  onClick={handleComplete}
                  className="group relative flex items-center gap-3 px-8 py-4 border-2 border-[#e63022] bg-[#e63022]/15 hover:bg-[#e63022] text-white font-display text-sm md:text-base font-bold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 shadow-[0_0_30px_rgba(230,48,34,0.4)] hover:shadow-[0_0_50px_rgba(230,48,34,0.8)] overflow-hidden cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-[#ff3b2a] animate-ping" />
                  <span>ENTER PORTFOLIO</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform duration-300" />

                  {/* Light sweep animation */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                </button>
                <span className="text-[10px] font-mono text-[#666] tracking-widest uppercase">
                  [ Click to Enter or Press ENTER ]
                </span>
              </motion.div>
            </motion.div>
          )}

          {/* Bottom sequence progress bar in portfolio red */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#111]">
            <motion.div
              initial={{ width: '0%' }}
              animate={{
                width:
                  shot === 5
                    ? '100%'
                    : shot === 4
                    ? '80%'
                    : shot === 3
                    ? '60%'
                    : shot === 2
                    ? '40%'
                    : '20%',
              }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-[#8b1a10] via-[#e63022] to-[#ff3b2a]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─────────────────────────────────────────────────────────────
   Orbital Badge for Shot 2 Concentric Radar (Red Neon Theme)
───────────────────────────────────────────────────────────── */
function OrbitalBadge({
  icon,
  label,
  radius,
  speed,
  initialAngle = 0,
  delay = 0,
}: {
  icon: React.ReactNode
  label: string
  radius: number
  speed: number
  initialAngle?: number
  delay?: number
}) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        rotate: [initialAngle, initialAngle + 360],
      }}
      transition={{
        scale: { delay, duration: 0.5, type: 'spring' },
        opacity: { delay, duration: 0.5 },
        rotate: { repeat: Infinity, duration: speed, ease: 'linear' },
      }}
      className="absolute flex items-center justify-center pointer-events-none"
      style={{
        width: radius * 2,
        height: radius * 2,
      }}
    >
      <div
        className="absolute top-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#180909] border border-[#e63022]/60 shadow-[0_0_15px_rgba(230,48,34,0.5)] -translate-y-1/2"
        style={{ transform: 'translateY(-50%) rotate(0deg)' }}
      >
        {icon}
        <span className="text-[8.5px] font-mono text-[#ffdeda] whitespace-nowrap">{label}</span>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Glowing Neon 4-Pointed Star SVG Logo
───────────────────────────────────────────────────────────── */
function FourPointStar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M50 0 C50 35 35 50 0 50 C35 50 50 65 50 100 C50 65 65 50 100 50 C65 50 50 35 50 0 Z"
        fill="currentColor"
      />
    </svg>
  )
}
