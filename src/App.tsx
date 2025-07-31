import { useEffect, useRef, useState } from 'react'
import Hero from './Components/Hero'
import About from './Components/About'
import Project from './Components/Project'
// import ShowOff from './Components/ShowOff'
import CursorFollower from "../src/Components/AdditionStyles/CursorFollower";
import ChatWidget from './Components/ChatWidget'
import './App.css'

function App() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    // --- WHEEL SCROLL ---
    const handleWheel = (e: WheelEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest('.scroll-wrapper')) return
      if (e.deltaY === 0) return
      e.preventDefault()
      container.scrollLeft += e.deltaY * 3
    }

    // --- KEYBOARD ARROW SCROLL ---
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        container.scrollLeft += 1000
      } else if (e.key === 'ArrowLeft') {
        container.scrollLeft -= 1000
      }
    }

    // --- MOUSE DRAG SCROLL ---
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true
      startX.current = e.pageX - container.offsetLeft
      scrollLeft.current = container.scrollLeft
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      e.preventDefault()
      const x = e.pageX - container.offsetLeft
      const walk = (x - startX.current) * 1.5
      container.scrollLeft = scrollLeft.current - walk
    }

    const stopDragging = () => {
      isDragging.current = false
    }

    // --- TOUCH SCROLL ---
    let touchStartX = 0
    let touchScrollLeft = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].pageX
      touchScrollLeft = container.scrollLeft
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touchX = e.touches[0].pageX
      const walk = (touchX - touchStartX) * -1
      container.scrollLeft = touchScrollLeft + walk
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    container.addEventListener('mousedown', handleMouseDown)
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseup', stopDragging)
    container.addEventListener('mouseleave', stopDragging)
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      container.removeEventListener('mousedown', handleMouseDown)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseup', stopDragging)
      container.removeEventListener('mouseleave', stopDragging)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return (
    <div ref={scrollRef} className="horizontal-scroll">
      <CursorFollower />
      <Hero />
      <About />
      <Project />
      {/* <ShowOff /> */}
      
      {/* Chat Widget */}
      {showChat && <ChatWidget onClose={() => setShowChat(false)} />}
      
      {/* Chat Toggle Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgb(255, 255, 255), rgb(0, 247, 255))',
          border: 'none',
          cursor: 'pointer',
          fontSize: '24px',
          boxShadow: '0 4px 20px rgba(0, 247, 255, 0.3)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#000',
          fontWeight: 'bold'
        }}
      >
        💬
      </button>
    </div>
  )
}

export default App
