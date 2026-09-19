'use client'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact']

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-[#1a1a1a] py-16">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <p className="font-display font-semibold text-sm tracking-[0.2em] uppercase text-white mb-2">
              ANKUR SHUKLA
            </p>
            <p className="font-display text-xs tracking-[0.15em] uppercase text-[#555]">
              Software Developer
            </p>
            <p className="mt-4 text-[#444] text-sm leading-relaxed max-w-xs">
              Backend engineer focused on building clean, scalable systems.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="font-display text-xs tracking-[0.25em] uppercase text-[#333] mb-5">
              Navigation
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(link)}
                    className="font-display text-sm text-[#555] hover:text-white transition-colors duration-300 tracking-wide group flex items-center gap-2"
                  >
                    <span className="w-0 h-px bg-[#e63022] group-hover:w-4 transition-all duration-300" />
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="font-display text-xs tracking-[0.25em] uppercase text-[#333] mb-5">
              Connect
            </p>
            <div className="flex flex-col gap-3">
              {[
                { href: 'https://github.com/Ankurshukla18', icon: Github, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/ankur-shukla-5a1b332a1/', icon: Linkedin, label: 'LinkedIn' },
                { href: 'mailto:ankuromshukla161@gmail.com', icon: Mail, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-display text-sm text-[#555] hover:text-[#e63022] transition-colors duration-300 group"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                  <span className="ml-auto text-[#2a2a2a] group-hover:text-[#e63022] transition-colors duration-300 text-xs">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1a1a1a] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#333] text-xs font-display tracking-wider">
            © 2026 Ankur Shukla. All rights reserved.
          </p>
          <p className="text-[#2a2a2a] text-xs font-display tracking-wider">
            Designed & Built with{' '}
            <span className="text-[#e63022]">code</span>.
          </p>
        </div>
      </div>
    </footer>
  )
}
