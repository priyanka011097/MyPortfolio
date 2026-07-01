import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/icons.jsx'
import Hero3D from '../components/Hero3D.jsx'

const skills = {
  FRONTEND: ['React.js', 'Redux', 'JavaScript', 'HTML5', 'CSS3', 'Flutter'],
  BACKEND: ['Node.js', 'Express.js', 'Ruby on Rails', 'PostgreSQL', 'MongoDB', 'MySQL', 'REST APIs', 'WebSockets'],
  'AI & CLOUD': ['OpenAI APIs', 'Prompt Engineering', 'MCP', 'n8n', 'RAG', 'AWS', 'Docker', 'GitLab', 'OAuth', 'Keycloak'],
}

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

const Section = ({ children }) => (
  <motion.section
    className="section"
    variants={reveal}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '-100px' }}
  >
    {children}
  </motion.section>
)

export default function Home() {
  return (
    <motion.main
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* HERO */}
      <section className="hero">
        <Hero3D />
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          PRIYANKA
          <br />
          SHAHASANE
        </motion.h1>
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Full Stack Engineer / AI Solution Architect
        </motion.p>

        <motion.div
          className="hero-inquiry"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          For business inquiries, email me at
          <br />
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=shahasanepriyanka@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            shahasanepriyanka@gmail.com
          </a>
        </motion.div>
      </section>

      {/* ABOUT */}
      <Section>
        <div className="about-grid">
          <div />
          <div className="about-body">
            <h1 className="section-head" style={{ marginBottom: 36 }}>
              ABOUT ME
            </h1>
            <div className="about-text">
            <p>
              I'm a Full Stack Engineer with 4+ years of experience in system
              design and architecture, building and stabilizing scalable
              applications across web and cloud environments.
            </p>
            <p>
              I have a proven track record of owning complex systems, resolving
              large-scale production issues, and accelerating delayed products
              to delivery.
            </p>
            <p>
              I enjoy integrating AI-driven workflows and agentic systems to
              solve real-world business problems, while leading technical
              initiatives across cross-functional teams.
            </p>
            </div>
          </div>
        </div>
      </Section>

      {/* MOTIVATION */}
      <Section>
        <div className="motivation-grid motivation-grid--no-image">
          <div>
            <h1 className="section-head" style={{ marginBottom: 36 }}>
              MOTIVATION
            </h1>
            <div className="about-text">
              <p>
                I started out building frontends and grew into architecting
                end-to-end systems across web, mobile, and cloud.
              </p>
              <p>
                What drives me now is the intersection of solid engineering and
                AI — building agentic workflows, RAG pipelines, and LLM-powered
                features that solve real problems.
              </p>
              <p>
                I love taking messy, delayed products and giving them structure,
                stability, and a clear path to delivery.
              </p>
            </div>
          </div>
          {/* Photo temporarily hidden — restore by removing this comment wrapper
              and the "motivation-grid--no-image" class above.
          <img
            className="motivation-img"
            src="/priyanka.jpeg"
            alt="Priyanka Shahasane"
            loading="lazy"
          />
          */}
        </div>
      </Section>

      {/* SKILLS */}
      <Section>
        <h1 className="section-head">SKILLS</h1>
        <div className="skills-grid">
          {Object.entries(skills).map(([cat, items]) => (
            <div className="skill-col" key={cat}>
              <h2>{cat}</h2>
              <div className="chips">
                {items.map((s) => (
                  <span className="chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* BIG NAV */}
      <section className="big-nav">
        <Link to="/experience">
          EXPERIENCE <ArrowRight />
        </Link>
        <Link to="/projects">
          PROJECTS <ArrowRight />
        </Link>
      </section>
    </motion.main>
  )
}
