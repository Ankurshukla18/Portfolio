'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import { projects } from '@/lib/data'
import { staggerContainer } from '@/lib/utils'

// Abstract visual for each project (code-driven)
const projectColors: Record<string, string> = {
  '01': '#e63022',
  '02': '#8b1a10',
  '03': '#c0392b',
  '04': '#922b21',
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute top-0 left-6 md:left-12 right-6 md:right-12 h-px bg-[#1a1a1a]" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-xs tracking-[0.35em] uppercase text-[#e63022] mb-4"
            >
              03 / PROJECTS
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display font-bold text-[clamp(2rem,5vw,5rem)] leading-tight text-white"
            >
              SELECTED{' '}
              <span className="text-[#e63022]">PROJECTS</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[#555] text-sm font-display tracking-wider max-w-xs"
          >
            A selection of things I&apos;ve built while learning, experimenting, and solving real problems.
          </motion.p>
        </div>

        {/* Project list */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-6"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      data-cursor="project"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative border border-[#1a1a1a] bg-[#080808] overflow-hidden"
      style={{
        borderColor: hovered ? 'rgba(230,48,34,0.4)' : '#1a1a1a',
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* Red line left indicator */}
      <div
        className="absolute left-0 top-0 w-px bg-[#e63022] transition-all duration-500"
        style={{ height: hovered ? '100%' : '0%' }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-0">
        {/* Content */}
        <div className="p-8 md:p-10">
          <div className="flex items-start justify-between mb-6">
            {/* Number */}
            <span
              className="font-display font-bold text-[4rem] leading-none transition-colors duration-300"
              style={{ color: hovered ? '#e63022' : '#1f1f1f' }}
            >
              {project.id}
            </span>
            {/* Category tag */}
            <span className="font-display text-[10px] tracking-[0.2em] uppercase text-[#444] border border-[#1a1a1a] px-3 py-1.5">
              {project.category}
            </span>
          </div>

          <h3
            className="font-display font-bold text-[clamp(1.5rem,3vw,2.5rem)] leading-tight text-white mb-4 transition-colors duration-300 whitespace-pre-line"
            style={{ color: hovered ? '#fff' : '#e8e8e5' }}
          >
            {project.title}
          </h3>
          <p className="text-[#666] text-sm leading-relaxed mb-8 max-w-lg">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-display text-[10px] tracking-wider uppercase px-3 py-1.5 border border-[#1a1a1a] text-[#555] hover:border-red-500/40 hover:text-[#888] transition-all duration-200"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-display text-xs tracking-[0.15em] uppercase text-[#888] hover:text-white transition-colors duration-300 border border-[#1a1a1a] hover:border-[#333] px-4 py-2.5"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-display text-xs tracking-[0.15em] uppercase text-white hover:text-[#e63022] transition-colors duration-300 border border-[#e63022]/60 hover:border-[#e63022] px-4 py-2.5"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                Live
              </a>
            )}
          </div>
        </div>

        {/* Visual preview panel */}
        <div
          className="relative hidden lg:flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(135deg, #080808 0%, ${projectColors[project.id]}10 100%)`,
            borderLeft: '1px solid #1a1a1a',
          }}
        >
          {/* Abstract visual */}
          <div className="relative w-full h-full flex items-center justify-center p-8">
            {/* Big number watermark */}
            <span
              className="absolute font-display font-bold text-[8rem] leading-none select-none transition-colors duration-500"
              style={{
                color: hovered ? `${projectColors[project.id]}20` : '#0f0f0f',
                right: '-10px',
                bottom: '-20px',
              }}
            >
              {project.id}
            </span>

            {/* Center geometric */}
            <div
              className="relative w-28 h-28 transition-transform duration-500"
              style={{ transform: hovered ? 'scale(1.1) rotate(15deg)' : 'rotate(45deg)' }}
            >
              <div
                className="absolute inset-0 border-2 transition-colors duration-500"
                style={{ borderColor: hovered ? projectColors[project.id] : '#222' }}
              />
              <div
                className="absolute inset-4 border transition-colors duration-500"
                style={{ borderColor: hovered ? `${projectColors[project.id]}80` : '#1a1a1a' }}
              />
              <div
                className="absolute inset-8 transition-colors duration-500"
                style={{ background: hovered ? `${projectColors[project.id]}30` : '#111' }}
              />
            </div>

            {/* Red glow on hover */}
            <div
              className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
              style={{
                opacity: hovered ? 1 : 0,
                background: `radial-gradient(circle at center, ${projectColors[project.id]}15 0%, transparent 70%)`,
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
