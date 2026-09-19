'use client'
import dynamic from 'next/dynamic'
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
  return (
    <main className="relative bg-[#050505] min-h-screen">
      <CustomCursor />
      <Navbar />
      <Hero />
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

