import { motion } from 'framer-motion'

const works = [
  {
    title: 'AI SOLUTION ARCHITECT',
    category: 'Futurescape · Aug 2025 – Apr 2026',
    desc: 'Architected and delivered a Flutter-based delivery app (Food Dialer) from concept to production in 3 months. Took ownership of a 2-year-delayed fintech product, resolved 500+ defects leading a team of 3, and launched Phase 1 in 2.5 months.',
  },
  {
    title: 'TECHNICAL ARCHITECT',
    category: 'Workverse · Jan 2024 – Jan 2025',
    desc: 'Led a team of 5 to build a simulator game platform with React.js and Node.js on AWS. Built dashboards with parallax scroll, 3D carousel and motion design, integrated OpenAI-powered features, and shipped to the Play Store and App Store.',
  },
  {
    title: 'FREELANCE FULL STACK DEVELOPER',
    category: 'Independent · Jan 2025 – Aug 2025',
    desc: 'Delivered end-to-end solutions for 5 clients — owning architecture, development, and deployment. Built and launched Flatswale, a property catalog platform, acquiring its first 100 users.',
  },
  {
    title: 'SOLUTION ENGINEER',
    category: 'Deqode · Apr 2022 – Dec 2023',
    desc: 'Built a microservices domain-management platform (React.js + Ruby on Rails) and implemented NFT functionality and a loan system for a blockchain platform. Created reusable components and monitored with Kibana and Rancher.',
  },
  {
    title: 'FRONTEND WEB DEVELOPER',
    category: 'e-InnoSec · Oct 2021 – Mar 2022',
    desc: 'Led development of the “ServingNotice” platform using the MERN stack. Designed the data structure, optimized data flow, managed the development team, and delivered the beta within 40 days.',
  },
]

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Works() {
  return (
    <motion.main
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="works-list">
        <div className="work-head">
          <span className="label">EXPERIENCE</span>
          <a
            className="handle"
            href="https://www.linkedin.com/in/priyanka-shahasane/"
            target="_blank"
            rel="noreferrer"
          >
            /priyanka-shahasane
          </a>
        </div>

        {works.map((w, idx) => (
          <motion.article
            className="work-entry"
            key={w.title}
            custom={idx}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="work-counter">
              [ {String(idx + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')} ]
            </div>
            <h1 className="work-title">{w.title}</h1>
            <p className="work-cat">{w.category}</p>
            <p className="work-desc">{w.desc}</p>
          </motion.article>
        ))}
      </div>
    </motion.main>
  )
}
