'use client'
import { motion } from 'framer-motion'
import { timeline } from '@/lib/data'

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute top-0 left-6 md:left-12 right-6 md:right-12 h-px bg-[#1a1a1a]" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-xs tracking-[0.35em] uppercase text-[#e63022] mb-4"
          >
            04 / JOURNEY
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-bold text-[clamp(2rem,5vw,5rem)] leading-tight text-white"
          >
            THE <span className="text-[#e63022]">JOURNEY</span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-[#1a1a1a] origin-top"
          />

          <div className="space-y-0">
            {timeline.map((entry, i) => (
              <TimelineEntry key={i} entry={entry} index={i} isLast={i === timeline.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineEntry({
  entry,
  index,
  isLast,
}: {
  entry: (typeof timeline)[0]
  index: number
  isLast: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="relative pl-8 md:pl-24 pb-16 group"
    >
      {/* Red dot */}
      <div className="absolute left-0 md:left-8 top-0 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#e63022] bg-[#050505] group-hover:bg-[#e63022] transition-colors duration-300 z-10" />

      {/* Horizontal connector */}
      <div className="absolute left-0 md:left-8 top-[5px] w-6 md:w-14 h-px bg-[#1a1a1a] group-hover:bg-[#e63022]/30 transition-colors duration-300" />

      {/* Year */}
      <div className="font-display font-bold text-[#e63022] text-sm tracking-[0.2em] mb-3">
        {entry.year}
      </div>

      {/* Title */}
      <h3 className="font-display font-semibold text-xl md:text-2xl text-white mb-3 group-hover:text-white transition-colors duration-300">
        {entry.title}
      </h3>

      {/* Description */}
      <p className="text-[#666] text-sm md:text-base leading-relaxed max-w-lg">
        {entry.description}
      </p>

      {/* Bottom line (except last) */}
      {!isLast && (
        <div className="absolute left-0 md:left-8 top-3 bottom-0 w-px bg-[#1a1a1a]" />
      )}
    </motion.div>
  )
}
