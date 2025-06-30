import { useEffect, useRef } from 'react'
import Hero from './Components/Hero'
import About from './Components/About'
import Project from './Components/Project'
import ShowOff from './Components/ShowOff'
import './App.css'

function App() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement

      // ✅ Allow native vertical scroll inside .scroll-wrapper (Project section)
      if (target.closest('.scroll-wrapper')) return

      // 👉 Otherwise, scroll horizontally across sections
      if (e.deltaY === 0) return
      e.preventDefault()
      container.scrollLeft += e.deltaY * 3
    }

    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <div ref={scrollRef} className="horizontal-scroll">
      <Hero />
      <About />
      <Project />
      <ShowOff />
    </div>
  )
}

export default App
