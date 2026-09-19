'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { faqs } from '@/lib/data'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute top-0 left-6 md:left-12 right-6 md:right-12 h-px bg-[#1a1a1a]" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-16 items-start">
          {/* Left */}
          <div className="lg:sticky lg:top-32">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-xs tracking-[0.35em] uppercase text-[#e63022] mb-4"
            >
              06 / FAQ
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] leading-tight text-white"
            >
              FREQUENTLY
              <br />
              <span className="text-[#e63022]">ASKED.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 text-[#555] text-sm leading-relaxed"
            >
              Common questions about my work, stack, and availability.
            </motion.p>
          </div>

          {/* Right — Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { q: string; a: string }
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className="border-b border-[#1a1a1a] last:border-b-0"
      style={{ borderColor: isOpen ? 'rgba(230,48,34,0.2)' : '#1a1a1a', transition: 'border-color 0.3s ease' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-6 text-left group"
      >
        {/* Number + Question */}
        <div className="flex items-start gap-4">
          <span className="font-display text-xs text-[#e63022] mt-1 w-5 flex-shrink-0">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className="font-display font-medium text-base md:text-lg transition-colors duration-300"
            style={{ color: isOpen ? '#fff' : '#999' }}
          >
            {faq.q}
          </span>
        </div>

        {/* Indicator */}
        <div
          className="flex-shrink-0 w-6 h-6 border border-[#2a2a2a] flex items-center justify-center transition-all duration-300"
          style={{
            borderColor: isOpen ? '#e63022' : '#2a2a2a',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
            stroke={isOpen ? '#e63022' : '#555'}
            strokeWidth="1.5"
            style={{ transition: 'stroke 0.3s ease' }}
          >
            <path d="M6 1v10M1 6h10" />
          </svg>
        </div>
      </button>

      {/* Answer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="pl-9 pb-6 text-[#666] text-sm md:text-base leading-relaxed">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
