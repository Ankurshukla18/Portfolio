'use client'
import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHoveringProject, setIsHoveringProject] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const raf = useRef<number>(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.innerWidth < 768) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-cursor="project"]')) {
        setIsHoveringProject(true)
        setIsHovering(true)
      } else if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor="hover"]')
      ) {
        setIsHovering(true)
        setIsHoveringProject(false)
      }
    }

    const onLeave = () => {
      setIsHovering(false)
      setIsHoveringProject(false)
    }

    const animate = () => {
      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 6}px, ${pos.current.y - 6}px)`
      }
      // Ring follows with lag
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12
      if (ringRef.current) {
        const size = isHoveringProject ? 80 : isHovering ? 52 : 36
        ringRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`
        ringRef.current.style.width = `${size}px`
        ringRef.current.style.height = `${size}px`
      }
      raf.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(raf.current)
    }
  }, [isHovering, isHoveringProject])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-red-500 pointer-events-none z-[99999] mix-blend-difference hidden md:block"
        style={{ transition: 'background 0.2s' }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border border-red-500/60 pointer-events-none z-[99998] flex items-center justify-center hidden md:flex"
        style={{
          width: '36px',
          height: '36px',
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
          borderColor: isHovering ? '#e63022' : 'rgba(230,48,34,0.4)',
        }}
      >
        {isHoveringProject && (
          <span className="text-[9px] font-display font-semibold tracking-widest text-white uppercase">
            VIEW
          </span>
        )}
      </div>
    </>
  )
}
