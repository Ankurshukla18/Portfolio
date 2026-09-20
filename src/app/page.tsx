'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import TechIntro from '@/components/TechIntro'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import IDCard from '@/components/IDCard'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import CurrentFocus from '@/components/CurrentFocus'
import Services from '@/components/Services'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

// Disable SSR for cursor (uses window)
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
  ssr: false,
})

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false)

  return (
    <main className="relative bg-[#050505] min-h-screen">
      {/* High-tech cinematic intro animation sequence with Enter Portfolio trigger */}
      <TechIntro onComplete={() => setHasEntered(true)} />

      <CustomCursor />
      <Navbar />
      <Hero hasEntered={hasEntered} />
      <About />
      <IDCard />
      <Skills />
      <Projects />
      <Experience />
      <CurrentFocus />
      <Services />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}

