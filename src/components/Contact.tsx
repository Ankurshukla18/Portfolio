'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'

export default function Contact() {
  const buttonRef = useRef<HTMLAnchorElement>(null)

  const onMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    buttonRef.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
  }
  const onMouseLeave = () => {
    if (!buttonRef.current) return
    buttonRef.current.style.transform = 'translate(0,0)'
  }

  return (
    <section id="contact" className="relative py-32 md:py-48 overflow-hidden">
      <div className="absolute top-0 left-6 md:left-12 right-6 md:right-12 h-px bg-[#1a1a1a]" />

      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom, rgba(230,48,34,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-xs tracking-[0.35em] uppercase text-[#e63022] mb-8 text-center"
        >
          LET&apos;S BUILD
        </motion.p>

        {/* Main headline */}
        <div className="text-center mb-16">
          {['SOMETHING', 'WORTH', 'BUILDING.'].map((word, i) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                delay: i * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <h2
                className={`font-display font-bold leading-[0.88] tracking-tight
                  text-[clamp(3rem,9vw,9rem)]
                  ${word === 'WORTH' ? 'text-[#e63022]' : 'text-white'}`}
              >
                {word}
              </h2>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex justify-center mb-20"
        >
          <a
            ref={buttonRef}
            href="mailto:ankuromshukla161@gmail.com"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="group flex items-center gap-3 font-display text-sm tracking-[0.25em] uppercase text-white border border-[#e63022]/60 hover:border-[#e63022] px-10 py-5 hover:bg-[#e63022]/8 transition-all duration-300"
            style={{ transition: 'transform 0.2s ease, background 0.3s ease, border-color 0.3s ease' }}
          >
            START A CONVERSATION
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </a>
        </motion.div>

        {/* Contact links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-wrap justify-center gap-8"
        >
          <ContactLink
            href="mailto:ankuromshukla161@gmail.com"
            icon={<Mail className="w-4 h-4" />}
            label="Email"
            value="ankuromshukla161@gmail.com"
          />
          <ContactLink
            href="https://github.com/Ankurshukla18"
            icon={<Github className="w-4 h-4" />}
            label="GitHub"
            value="github.com/Ankurshukla18"
          />
          <ContactLink
            href="https://www.linkedin.com/in/ankur-shukla-5a1b332a1/"
            icon={<Linkedin className="w-4 h-4" />}
            label="LinkedIn"
            value="linkedin.com/in/ankur-shukla-5a1b332a1"
          />
        </motion.div>
      </div>
    </section>
  )
}

function ContactLink({
  href,
  icon,
  label,
  value,
}: {
  href: string
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center gap-2 text-center"
    >
      <div className="flex items-center gap-2 text-[#555] group-hover:text-[#e63022] transition-colors duration-300">
        {icon}
        <span className="font-display text-xs tracking-[0.2em] uppercase">{label}</span>
      </div>
      <span className="text-sm text-[#444] group-hover:text-[#888] transition-colors duration-300">
        {value}
      </span>
    </a>
  )
}
