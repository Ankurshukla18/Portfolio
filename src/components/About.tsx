'use client'
import { motion } from 'framer-motion'
import { lineReveal, staggerContainer } from '@/lib/utils'

const lines = [
  { text: 'I BUILD SYSTEMS', red: false },
  { text: 'THAT TURN IDEAS', red: false },
  { text: 'INTO REAL PRODUCTS.', red: true },
]

const stats = [
  { value: '4+', label: 'Projects Built' },
  { value: '3+', label: 'Technologies' },
  { value: '2026', label: 'HACKSODH Finalist' },
  { value: '∞', label: 'Curiosity' },
]

export default function About() {
  return (
    <section id="about" className="relative py-32 md:py-44 overflow-hidden">
      {/* Section border top */}
      <div className="absolute top-0 left-6 md:left-12 right-6 md:right-12 h-px bg-[#1a1a1a]" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-xs tracking-[0.35em] uppercase text-[#e63022] mb-12"
        >
          01 / ABOUT
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 items-start">
          {/* Headline lines */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {lines.map((line, i) => (
              <motion.div
                key={i}
                variants={lineReveal}
                className="overflow-hidden"
              >
                <h2
                  className={`font-display font-bold leading-[0.9] tracking-tight mb-1
                    text-[clamp(2.2rem,6vw,6rem)]
                    ${line.red ? 'text-[#e63022]' : 'text-white'}`}
                >
                  {line.text}
                </h2>
              </motion.div>
            ))}

            {/* Body text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 max-w-xl"
            >
              <p className="text-[#888] text-lg leading-relaxed font-light mb-6">
                I&apos;m Ankur Shukla, a BTech Computer Science student passionate
                about building things that work at scale. My focus is backend
                engineering — designing APIs, structuring databases, and writing
                clean, maintainable code.
              </p>
              <p className="text-[#666] text-base leading-relaxed font-light">
                I believe great software is invisible. Users shouldn&apos;t think
                about the backend — they should just experience something that
                works. That&apos;s the standard I hold my work to.
              </p>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 gap-4 lg:mt-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border border-[#1a1a1a] p-6 group hover:border-red-500/40 transition-colors duration-300"
              >
                <div className="font-display font-bold text-4xl text-[#e63022] mb-2">
                  {stat.value}
                </div>
                <div className="text-xs font-display tracking-wider uppercase text-[#555]">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
