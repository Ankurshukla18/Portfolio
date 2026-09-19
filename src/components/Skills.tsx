'use client'
import { motion } from 'framer-motion'
import { skills } from '@/lib/data'
import { staggerContainer, fadeUp } from '@/lib/utils'

const categories = [
  { key: 'backend' as const, label: 'Backend', icon: '⬡' },
  { key: 'programming' as const, label: 'Programming', icon: '◈' },
  { key: 'database' as const, label: 'Database', icon: '◯' },
  { key: 'tools' as const, label: 'Tools & DevOps', icon: '◻' },
]

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute top-0 left-6 md:left-12 right-6 md:right-12 h-px bg-[#1a1a1a]" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-xs tracking-[0.35em] uppercase text-[#e63022] mb-4"
          >
            02 / SKILLS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-bold text-[clamp(2rem,5vw,5rem)] leading-tight text-white"
          >
            WHAT I{' '}
            <span className="text-[#e63022]">WORK WITH</span>
          </motion.h2>
        </div>

        {/* Skills grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {categories.map((cat) => (
            <SkillCard
              key={cat.key}
              label={cat.label}
              icon={cat.icon}
              items={skills[cat.key]}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function SkillCard({
  label,
  icon,
  items,
}: {
  label: string
  icon: string
  items: string[]
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
      className="group relative border border-[#1a1a1a] bg-[#0a0a0a] p-7 hover:border-red-500/60 transition-all duration-400 cursor-pointer"
      style={{
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
      }}
    >
      {/* Red glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-sm"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(230,48,34,0.05) 0%, transparent 70%)',
          boxShadow: '0 0 30px rgba(230,48,34,0.08) inset',
        }}
      />

      {/* Icon + label */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xl text-[#e63022]/60 group-hover:text-[#e63022] transition-colors duration-300">
          {icon}
        </span>
        <h3 className="font-display text-xs tracking-[0.2em] uppercase text-[#555] group-hover:text-[#888] transition-colors duration-300">
          {label}
        </h3>
      </div>

      {/* Skills list */}
      <ul className="space-y-3">
        {items.map((skill) => (
          <li key={skill} className="flex items-center gap-3 group/skill">
            <span className="w-1 h-1 rounded-full bg-[#e63022]/40 group-hover/skill:bg-[#e63022] transition-colors duration-200 flex-shrink-0" />
            <span className="font-display text-sm text-[#666] group-hover:text-[#999] transition-colors duration-300">
              {skill}
            </span>
          </li>
        ))}
      </ul>

      {/* Bottom red line indicator */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-[#e63022] group-hover:w-full transition-all duration-500" />
    </motion.div>
  )
}
