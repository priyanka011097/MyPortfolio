import { useEffect, useRef } from 'react'
import Hero from './Components/Hero'
import './App.css'
import About from './Components/About'

function App() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return
      e.preventDefault()
      container.scrollLeft += e.deltaY
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
    </div>
  )
}

export default App
