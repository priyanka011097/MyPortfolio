import { motion } from 'framer-motion'

const items = [
  { title: 'ProEase Global', role: 'Full Stack Developer', type: 'E-commerce', link: 'https://proeaseglobal.com/', img: '/previews/proease.png', g: 'linear-gradient(135deg, #3a1f2b, #74405e)' },
  { title: 'FlatsWale', role: 'Co-founder', type: 'Website', link: 'https://www.flatswale.com/', img: '/previews/flatswale.png', g: 'linear-gradient(135deg, #06222b, #0d4754)' },
  { title: 'Interview Study Cards', role: 'Full Stack Developer', type: 'Web App', link: 'https://jolly-tooth-11c7.shahasanepriyanka.workers.dev/', img: '/previews/interviewcards.png', g: 'linear-gradient(135deg, #1a2340, #3a4a8a)' },
]

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Gallery() {
  return (
    <motion.main
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="gallery-wrap">
        <div className="gallery-head">
          <h1>Personal Projects</h1>
          <a
            className="handle"
            href="https://www.instagram.com/priyanka_shahasane/"
            target="_blank"
            rel="noreferrer"
          >
            @priyanka-shahasane
          </a>
        </div>

        <div className="gallery-grid">
          {items.map((it, idx) => (
            <motion.figure
              className="gallery-item"
              key={it.title}
              custom={idx}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
            >
              <a
                className="art-wrap"
                href={it.link || undefined}
                target={it.link ? '_blank' : undefined}
                rel={it.link ? 'noreferrer' : undefined}
                style={{ display: 'block', cursor: it.link ? 'pointer' : 'default' }}
              >
                {it.img ? (
                  <img className="art" src={it.img} alt={`${it.title} homepage preview`} loading="lazy" />
                ) : (
                  <div className="art" style={{ background: it.g }} />
                )}
              </a>
              <h3>{it.title}</h3>
              <div className="gallery-row">
                <span>Role</span>
                <span>{it.role}</span>
              </div>
              <div className="gallery-row">
                <span>Type</span>
                <span>{it.type}</span>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </motion.main>
  )
}
