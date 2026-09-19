'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const focuses = [
  'BACKEND ENGINEERING',
  'SYSTEM DESIGN',
  'AI & MACHINE LEARNING',
  'AGENTIC AI',
  'SCALABLE APIS',
]

export default function CurrentFocus() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % focuses.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative py-24 md:py-36 overflow-hidden border-t border-[#1a1a1a]">
      {/* Background accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(230,48,34,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-xs tracking-[0.35em] uppercase text-[#555] mb-6"
        >
          Currently focused on
        </motion.p>

        <div className="h-[80px] md:h-[120px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h2
              key={current}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-display font-bold text-[clamp(1.8rem,5vw,5rem)] leading-none tracking-tight"
            >
              {focuses[current].split(' ').map((word, i) => (
                <span
                  key={i}
                  className={i === 0 ? 'text-[#e63022]' : 'text-white'}
                >
                  {word}{i < focuses[current].split(' ').length - 1 ? ' ' : ''}
                </span>
              ))}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {focuses.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="transition-all duration-300"
              style={{
                width: i === current ? '24px' : '6px',
                height: '4px',
                borderRadius: '2px',
                background: i === current ? '#e63022' : '#2a2a2a',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
