import { NavLink } from 'react-router-dom'
import { LinkedInIcon, GitHubIcon, MailIcon, WhatsAppIcon } from './icons.jsx'

const nav = [
  { to: '/', label: 'HOME' },
  { to: '/works', label: 'EXPERIENCE' },
  { to: '/gallery', label: 'PROJECTS' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul className="nav-list">
          {nav.map((n) => (
            <li key={n.to}>
              <NavLink
                to={n.to}
                end={n.to === '/'}
                className={({ isActive }) =>
                  'nav-link' + (isActive ? ' active' : '')
                }
              >
                {n.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="socials">
        <a href="https://in.linkedin.com/in/priyanka-shahasane" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <LinkedInIcon />
        </a>
        <a href="https://github.com/priyanka011097" target="_blank" rel="noreferrer" aria-label="GitHub">
          <GitHubIcon />
        </a>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=shahasanepriyanka@gmail.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Email"
        >
          <MailIcon />
        </a>
        <a
          href="https://wa.me/919975008124"
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
        >
          <WhatsAppIcon />
        </a>
      </div>
    </aside>
  )
}
