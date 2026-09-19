'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDownToLine } from 'lucide-react'

const links = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-[9000] flex items-center justify-between px-6 md:px-12 py-5"
        style={{
          background: scrolled
            ? 'rgba(5,5,5,0.92)'
            : 'rgba(5,5,5,0.1)',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid #1a1a1a' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="font-display font-semibold text-sm tracking-[0.2em] text-white uppercase hover:text-red-500 transition-colors duration-300"
        >
          ANKUR SHUKLA
        </button>

        {/* Desktop Links + Resume Button */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <NavLink key={link} label={link} onClick={() => scrollTo(link)} />
          ))}

          {/* Download Resume Button */}
          <a
            href="/resume.pdf"
            download="Ankur_Shukla_Resume.pdf"
            className="group relative inline-flex items-center gap-2 px-4 py-2 border border-[#e63022]/60 hover:border-[#e63022] bg-[#e63022]/10 hover:bg-[#e63022] text-white transition-all duration-300 rounded-sm font-display text-xs tracking-[0.18em] uppercase overflow-hidden ml-2"
          >
            <ArrowDownToLine className="w-3.5 h-3.5 text-[#e63022] group-hover:text-white group-hover:translate-y-0.5 transition-all duration-300" />
            <span className="group-hover:text-white transition-colors duration-300">
              Resume
            </span>
            {/* Subtle red shine on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-px bg-white transition-all duration-300"
            style={{
              transform: menuOpen ? 'translateY(5px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="block w-6 h-px bg-white transition-all duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-px bg-white transition-all duration-300"
            style={{
              transform: menuOpen ? 'translateY(-5px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[8000] bg-[#050505] flex flex-col items-center justify-center gap-8"
          >
            {links.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                onClick={() => scrollTo(link)}
                className="font-display text-4xl font-bold uppercase tracking-wider text-white hover:text-red-500 transition-colors duration-300"
              >
                {link}
              </motion.button>
            ))}

            {/* Mobile Resume Download Button */}
            <motion.a
              href="/resume.pdf"
              download="Ankur_Shukla_Resume.pdf"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.07, duration: 0.5 }}
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-3 px-8 py-3.5 border border-[#e63022] bg-[#e63022]/15 text-white font-display text-base font-bold uppercase tracking-wider hover:bg-[#e63022] transition-all duration-300 mt-4 rounded-sm"
            >
              <ArrowDownToLine className="w-5 h-5 text-[#e63022]" />
              Download Resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative font-display text-xs tracking-[0.15em] uppercase text-[#888] hover:text-white transition-colors duration-300 group"
    >
      {label}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-500 group-hover:w-full transition-all duration-300" />
    </button>
  )
}
