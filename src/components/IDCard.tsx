'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView, useSpring, useTransform, useMotionValue } from 'framer-motion'
import Image from 'next/image'

/* ─────────────────────────────────────────────
   LANYARD + CARD PHYSICS CONSTANTS
───────────────────────────────────────────── */
const SWING_SEQUENCE = [0, 10, -8, 6, -4, 2.5, -1.5, 0.8, -0.4, 0.2, 0]
const SWING_DURATION = 2.8  // seconds for full swing settle

export default function IDCard() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-15% 0px' })

  const controls = useAnimation()
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Mouse-tracking 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), { stiffness: 120, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), { stiffness: 120, damping: 30 })

  // Idle float after swing settles
  const idleY = useMotionValue(0)

  // ── Entry + swing animation ──────────────────
  useEffect(() => {
    if (!isInView || hasAnimated) return
    setHasAnimated(true)
    ;(async () => {
      // 1. Drop in from top
      await controls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
      })
      // 2. Swing sequence
      for (let i = 0; i < SWING_SEQUENCE.length; i++) {
        const deg = SWING_SEQUENCE[i]
        await controls.start({
          rotate: deg,
          transition: {
            duration: SWING_DURATION / SWING_SEQUENCE.length,
            ease: 'easeInOut',
          },
        })
      }
      // 3. Start idle float loop
      controls.start({
        rotate: [0, 0.6, -0.4, 0.3, -0.2, 0],
        transition: {
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatType: 'mirror',
        },
      })
    })()
  }, [isInView, hasAnimated, controls])

  // ── Mouse tracking ───────────────────────────
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    mouseX.set(e.clientX - cx)
    mouseY.set(e.clientY - cy)
  }

  const onMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      ref={sectionRef}
      id="idcard"
      className="relative py-28 md:py-40 overflow-hidden border-t border-[#1a1a1a]"
    >
      {/* ── Background ────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Ambient red glow */}
        <div
          className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(230,48,34,0.07) 0%, transparent 65%)',
          }}
        />
        {/* Geometric lines */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, #e63022 0px, #e63022 1px, transparent 1px, transparent 80px),
              repeating-linear-gradient(90deg, #e63022 0px, #e63022 1px, transparent 1px, transparent 80px)`,
          }}
        />
        {/* Floating particles */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-red-500/10"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatY ${7 + Math.random() * 5}s ease-in-out ${Math.random() * 3}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── LEFT: Editorial Text ───────────── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="order-2 lg:order-1"
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-xs tracking-[0.35em] uppercase text-[#e63022] mb-5"
            >
              07 / IDENTITY
            </motion.p>

            <h2 className="font-display font-bold leading-[0.88] tracking-tight text-[clamp(2.8rem,6vw,6.5rem)] text-white mb-2">
              BEHIND
            </h2>
            <h2 className="font-display font-bold leading-[0.88] tracking-tight text-[clamp(2.8rem,6vw,6.5rem)] text-[#e63022] mb-8">
              THE CODE.
            </h2>

            <p className="text-[#777] text-base md:text-lg leading-relaxed max-w-md mb-10 font-light">
              Software Developer focused on building reliable backend systems,
              APIs and real-world digital products that solve genuine problems.
            </p>

            {/* Status indicator */}
            <div className="flex items-center gap-3 mb-8">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-[#e63022]" />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-[#e63022] animate-ping opacity-60" />
              </div>
              <span className="font-display text-xs tracking-[0.25em] uppercase text-[#e63022]">
                Available for opportunities
              </span>
            </div>

            {/* Quick info pills */}
            <div className="flex flex-wrap gap-2">
              {['Python', 'FastAPI', 'C++', 'REST APIs', 'PostgreSQL'].map((tech) => (
                <span
                  key={tech}
                  className="font-display text-[10px] tracking-wider uppercase px-3 py-1.5 border border-[#1a1a1a] text-[#555] hover:border-[#e63022]/40 hover:text-[#888] transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Hanging ID Card ─────────── */}
          <div className="order-1 lg:order-2 flex flex-col items-center justify-start pt-8">

            {/* Lanyard anchor point at top */}
            <div className="relative flex flex-col items-center">

              {/* ── Lanyard string ── */}
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
                transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
                className="relative origin-top"
                style={{ height: '80px', width: '2px' }}
              >
                {/* Main lanyard stripe */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full"
                  style={{
                    background: 'linear-gradient(180deg, #1a0a0a 0%, #e63022 40%, #8b1a10 70%, #1a0a0a 100%)',
                  }}
                />
                {/* Lanyard width stripe (realistic) */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-[6px] h-full opacity-40"
                  style={{
                    background: 'linear-gradient(180deg, transparent, #e63022 50%, transparent)',
                  }}
                />
              </motion.div>

              {/* ── Metal ring/clip ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.35 }}
                className="relative z-20 -mt-0.5"
              >
                <div
                  className="w-4 h-4 rounded-full border-2"
                  style={{
                    borderColor: '#888',
                    background: 'radial-gradient(circle at 35% 35%, #ccc, #555)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.8), inset 0 1px 2px rgba(255,255,255,0.1)',
                  }}
                />
              </motion.div>

              {/* ── The Card itself ── */}
              <motion.div
                initial={{ y: -120, opacity: 0, rotate: -6 }}
                animate={controls}
                className="relative mt-0 origin-top"
                style={{
                  perspective: 1000,
                }}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                {/* 3D tilt wrapper */}
                <motion.div
                  ref={cardRef}
                  style={{
                    rotateX: rotateX,
                    rotateY: rotateY,
                    transformStyle: 'preserve-3d',
                  }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                >
                  {/* Card shadow */}
                  <motion.div
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-8 rounded-full blur-2xl"
                    animate={{ opacity: isHovered ? 0.5 : 0.25, scale: isHovered ? 1.1 : 1 }}
                    transition={{ duration: 0.4 }}
                    style={{ background: 'rgba(230,48,34,0.3)' }}
                  />

                  {/* ── CARD BODY ── */}
                  <div
                    className="relative w-[260px] md:w-[300px] rounded-lg overflow-hidden"
                    style={{
                      background: 'linear-gradient(160deg, #0e0e0e 0%, #0a0808 50%, #120808 100%)',
                      border: '1px solid rgba(230,48,34,0.25)',
                      boxShadow: isHovered
                        ? '0 30px 80px rgba(0,0,0,0.9), 0 0 40px rgba(230,48,34,0.15), inset 0 1px 0 rgba(255,255,255,0.04)'
                        : '0 20px 60px rgba(0,0,0,0.8), 0 0 20px rgba(230,48,34,0.06), inset 0 1px 0 rgba(255,255,255,0.03)',
                      transition: 'box-shadow 0.4s ease',
                    }}
                  >
                    {/* Holographic shimmer overlay */}
                    <div
                      className="absolute inset-0 opacity-[0.04] pointer-events-none z-10"
                      style={{
                        background: 'linear-gradient(135deg, transparent 30%, rgba(230,48,34,0.5) 50%, transparent 70%)',
                        backgroundSize: '200% 200%',
                      }}
                    />

                    {/* Punched hole at top-center */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          background: '#050505',
                          border: '1.5px solid rgba(230,48,34,0.4)',
                          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.9)',
                        }}
                      />
                    </div>

                    {/* Top red stripe header */}
                    <div
                      className="relative pt-9 pb-3 px-5"
                      style={{
                        background: 'linear-gradient(135deg, #1a0808 0%, #2d0e0e 100%)',
                        borderBottom: '1px solid rgba(230,48,34,0.2)',
                      }}
                    >
                      {/* Header label */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-display text-[8px] tracking-[0.35em] uppercase text-[#e63022]/70 mb-0.5">
                            DEV / IDENTITY
                          </p>
                          <p className="font-display text-[8px] tracking-[0.2em] uppercase text-[#444]">
                            2026 — ACTIVE
                          </p>
                        </div>
                        {/* Red accent bar */}
                        <div className="flex flex-col gap-1">
                          <div className="w-6 h-0.5 bg-[#e63022]" />
                          <div className="w-4 h-0.5 bg-[#e63022]/50" />
                          <div className="w-5 h-0.5 bg-[#e63022]/30" />
                        </div>
                      </div>
                    </div>

                    {/* Card main body */}
                    <div className="px-5 pt-5 pb-6">

                      {/* Profile photo */}
                      <div className="flex gap-4 mb-5">
                        <div
                          className="relative flex-shrink-0 w-[72px] h-[88px] rounded-sm overflow-hidden"
                          style={{
                            border: '1.5px solid rgba(230,48,34,0.35)',
                            boxShadow: '0 0 20px rgba(230,48,34,0.12)',
                            filter: isHovered ? 'brightness(1.08)' : 'brightness(0.92)',
                            transition: 'filter 0.4s ease',
                          }}
                        >
                          <Image
                            src="/profile.jpeg"
                            alt="Ankur Shukla"
                            fill
                            className="object-cover object-top"
                            style={{ filter: 'contrast(1.05) saturate(0.85)' }}
                          />
                          {/* Red gradient overlay at bottom of photo */}
                          <div
                            className="absolute bottom-0 left-0 right-0 h-6"
                            style={{
                              background: 'linear-gradient(transparent, rgba(14,5,5,0.7))',
                            }}
                          />
                        </div>

                        {/* Name + title */}
                        <div className="flex flex-col justify-center min-w-0">
                          <p className="font-display font-bold text-white text-base leading-tight mb-1 truncate">
                            ANKUR SHUKLA
                          </p>
                          <p className="font-display text-[9px] tracking-[0.25em] uppercase text-[#e63022] mb-3">
                            Software Developer
                          </p>
                          {/* ID verified badge */}
                          <motion.div
                            animate={{ opacity: isHovered ? 1 : 0.5 }}
                            transition={{ duration: 0.3 }}
                            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-sm"
                            style={{
                              background: 'rgba(230,48,34,0.08)',
                              border: '1px solid rgba(230,48,34,0.2)',
                            }}
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-[#e63022] animate-pulse" />
                            <span className="font-display text-[8px] tracking-[0.2em] uppercase text-[#e63022]">
                              {isHovered ? 'ID VERIFIED' : 'ONLINE'}
                            </span>
                          </motion.div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div
                        className="w-full h-px mb-4"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(230,48,34,0.3), transparent)',
                        }}
                      />

                      {/* Info rows */}
                      <div className="space-y-2.5">
                        <InfoRow label="PROGRAM" value="B.Tech — Computer Science" />
                        <InfoRow label="ROLE" value="Backend Developer" />
                        <InfoRow label="STACK" value="Python • FastAPI • C++ • APIs" />
                      </div>

                      {/* Bottom row: ID + barcode */}
                      <div
                        className="mt-5 pt-4 flex items-end justify-between"
                        style={{ borderTop: '1px solid #1a1a1a' }}
                      >
                        <div>
                          <p className="font-display text-[8px] tracking-[0.25em] uppercase text-[#333] mb-0.5">
                            CARD ID
                          </p>
                          <p className="font-display font-semibold text-xs text-[#e63022] tracking-wider">
                            AS-2026
                          </p>
                        </div>

                        {/* Mini barcode visual */}
                        <div className="flex items-end gap-[2px] opacity-30">
                          {[3, 5, 2, 7, 3, 6, 2, 4, 8, 3, 5, 2, 6].map((h, i) => (
                            <div
                              key={i}
                              className="bg-[#e63022]"
                              style={{ width: '1.5px', height: `${h * 2.5}px` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card bottom edge glow */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(230,48,34,0.4), transparent)',
                      }}
                    />
                  </div>
                  {/* Card reflection (thin highlight on top edge) */}
                  <div
                    className="absolute top-0 left-4 right-4 h-px rounded-full"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Sub-component: info row ─────────────────── */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display text-[8px] tracking-[0.25em] uppercase text-[#333] mb-0.5">
        {label}
      </p>
      <p className="font-display text-[11px] text-[#888] leading-tight">
        {value}
      </p>
    </div>
  )
}
