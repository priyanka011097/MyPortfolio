import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Sidebar from './components/Sidebar.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import Home from './pages/Home.jsx'
import Works from './pages/Works.jsx'
import Gallery from './pages/Gallery.jsx'

export default function App() {
  const location = useLocation()
  return (
    <div className="app-shell">
      <Sidebar />
      <ThemeToggle />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Works />} />
          <Route path="/projects" element={<Gallery />} />
        </Routes>
      </AnimatePresence>
      <span className="copyright">Ⓒ Priyanka Shahasane</span>
      <a
        className="made-with"
        href="https://www.instagram.com/build_with_priyanka/"
        target="_blank"
        rel="noreferrer"
      >
        Made with care @build_with_priyanka
      </a>
    </div>
  )
}
