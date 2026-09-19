'use client'
import { motion } from 'framer-motion'
import { services } from '@/lib/data'
import { staggerContainer, fadeUp } from '@/lib/utils'

export default function Services() {
  return (
    <section id="services" className="relative py-32 md:py-44 overflow-hidden">
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
            05 / SERVICES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-bold text-[clamp(2rem,5vw,5rem)] leading-tight text-white"
          >
            WHAT I <span className="text-[#e63022]">DO</span>
          </motion.h2>
        </div>

        {/* Services grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: (typeof services)[0] }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="group border border-[#1a1a1a] bg-[#0a0a0a] p-8 md:p-10 hover:border-red-500/40 relative overflow-hidden"
      style={{ transition: 'border-color 0.3s ease' }}
    >
      {/* Number */}
      <div
        className="font-display font-bold text-[5rem] leading-none mb-6 transition-colors duration-400"
        style={{ color: '#111' }}
      >
        <span className="group-hover:text-[#e63022]/15 transition-colors duration-400">
          {service.id}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-4 group-hover:text-white transition-colors duration-300">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-[#666] text-sm leading-relaxed">{service.description}</p>

      {/* Arrow */}
      <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#e63022"
          strokeWidth="1.5"
        >
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>

      {/* Bottom border glow */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-[#e63022] group-hover:w-full transition-all duration-500" />
    </motion.div>
  )
}
