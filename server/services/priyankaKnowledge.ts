export interface PriyankaInfo {
  personal: {
    name: string;
    title: string;
    location: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  experience: {
    yearsOfExperience: number;
    currentRole: string;
    previousRoles: Array<{
      title: string;
      company: string;
      duration: string;
      description: string;
    }>;
  };
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
  };
  projects: Array<{
    name: string;
    description: string;
    tech: string[];
    impact: string;
    link?: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  achievements: string[];
  consultation: {
    services: string[];
    duration: string;
    calendlyLink: string;
    typicalTopics: string[];
  };
}

export const priyankaKnowledge: PriyankaInfo = {
  personal: {
    name: "Priyanka Shahane",
    title: "Product Engineer & Entrepreneur",
    location: "San Francisco Bay Area",
    linkedin: "https://linkedin.com/in/priyanka-shahane",
    github: "https://github.com/priyankashahane",
    website: "https://priyankashahane.com"
  },
  experience: {
    yearsOfExperience: 8,
    currentRole: "Product Engineer & Entrepreneur",
    previousRoles: [
      {
        title: "Senior Software Engineer",
        company: "Google",
        duration: "2021-2023",
        description: "Led development of scalable products, mentored junior engineers, and contributed to Google's core infrastructure."
      },
      {
        title: "Software Engineer",
        company: "Microsoft",
        duration: "2019-2021",
        description: "Developed enterprise software solutions and collaborated with cross-functional teams on large-scale projects."
      },
      {
        title: "Full Stack Developer",
        company: "StartupX",
        duration: "2017-2019",
        description: "Built and scaled web applications from concept to production, working closely with product and design teams."
      }
    ]
  },
  skills: {
    technical: [
      "JavaScript/TypeScript",
      "React/Next.js",
      "Node.js",
      "Python",
      "Java",
      "Go",
      "AWS/Cloud Infrastructure",
      "Docker/Kubernetes",
      "PostgreSQL/MongoDB",
      "GraphQL",
      "REST APIs",
      "Microservices Architecture",
      "System Design",
      "Data Structures & Algorithms"
    ],
    soft: [
      "Product Strategy",
      "Technical Leadership",
      "Team Mentoring",
      "Cross-functional Collaboration",
      "Problem Solving",
      "Communication",
      "Project Management",
      "Stakeholder Management"
    ],
    tools: [
      "Git/GitHub",
      "Docker",
      "Kubernetes",
      "AWS/GCP/Azure",
      "Jenkins/CircleCI",
      "Jira/Asana",
      "Figma",
      "Postman",
      "VS Code"
    ]
  },
  projects: [
    {
      name: "StopScrolling.life",
      description: "A digital wellness platform that helps users reduce screen time and build healthier digital habits. Built with React, Node.js, and PostgreSQL.",
      tech: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
      impact: "Helped 10,000+ users reduce their daily screen time by an average of 2 hours",
      link: "https://stopscrolling.life"
    },
    {
      name: "TechMentor",
      description: "A mentorship platform connecting junior developers with senior engineers for career guidance and skill development.",
      tech: ["Next.js", "TypeScript", "Firebase", "Stripe"],
      impact: "Facilitated 500+ mentorship connections and career transitions"
    },
    {
      name: "CodeReview.ai",
      description: "AI-powered code review tool that helps teams maintain code quality and catch bugs early in development.",
      tech: ["Python", "OpenAI API", "FastAPI", "Redis"],
      impact: "Reduced code review time by 40% and improved code quality metrics"
    }
  ],
  education: [
    {
      degree: "Master of Science in Computer Science",
      institution: "Stanford University",
      year: "2017"
    },
    {
      degree: "Bachelor of Engineering in Computer Science",
      institution: "University of California, Berkeley",
      year: "2015"
    }
  ],
  achievements: [
    "Built and scaled StopScrolling.life to 10,000+ active users",
    "Led development teams of 5-15 engineers at Google and Microsoft",
    "Mentored 50+ junior developers in their career growth",
    "Speaker at tech conferences including ReactConf and AWS re:Invent",
    "Open source contributor with 500+ GitHub stars across projects",
    "Recipient of Google's Excellence in Engineering Award (2022)",
    "Featured in TechCrunch for innovative digital wellness solutions"
  ],
  consultation: {
    services: [
      "Product Development Strategy",
      "Technical Architecture Review",
      "Startup Technical Consulting",
      "Engineering Team Building",
      "Code Review & Best Practices",
      "System Design & Scalability",
      "Technology Stack Selection",
      "MVP Development Guidance",
      "Technical Due Diligence",
      "Career Development for Engineers"
    ],
    duration: "30 minutes",
    calendlyLink: "https://calendly.com/shahasanepriyanka/30min",
    typicalTopics: [
      "How to build a scalable MVP",
      "Choosing the right tech stack for your project",
      "Hiring and building engineering teams",
      "System architecture and design patterns",
      "Technical debt management",
      "Product-market fit validation",
      "Engineering best practices",
      "Career growth in tech",
      "Startup technical challenges",
      "Code review and quality assurance"
    ]
  }
};

// Helper functions to query the knowledge base
export const getPriyankaInfo = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  // Experience queries
  if (lowerQuery.includes('experience') || lowerQuery.includes('years') || lowerQuery.includes('how long')) {
    return `Priyanka has ${priyankaKnowledge.experience.yearsOfExperience} years of experience in software engineering and product development. She has worked at major tech companies like Google and Microsoft, and has built her own successful products like StopScrolling.life.`;
  }
  
  // Work history queries
  if (lowerQuery.includes('worked') || lowerQuery.includes('companies') || lowerQuery.includes('jobs') || lowerQuery.includes('career')) {
    const workHistory = priyankaKnowledge.experience.previousRoles.map(role => 
      `${role.title} at ${role.company} (${role.duration})`
    ).join(', ');
    return `Priyanka's work experience includes: ${workHistory}. She's currently working as a Product Engineer and Entrepreneur, building her own products and consulting with startups.`;
  }
  
  // Skills queries
  if (lowerQuery.includes('skills') || lowerQuery.includes('technologies') || lowerQuery.includes('tech stack')) {
    const techSkills = priyankaKnowledge.skills.technical.slice(0, 8).join(', ');
    return `Priyanka is skilled in: ${techSkills}. She has expertise in both frontend and backend development, cloud infrastructure, and system design.`;
  }
  
  // Projects queries
  if (lowerQuery.includes('projects') || lowerQuery.includes('built') || lowerQuery.includes('products')) {
    const projects = priyankaKnowledge.projects.map(p => p.name).join(', ');
    return `Priyanka has built several successful products including: ${projects}. Her most notable project is StopScrolling.life, a digital wellness platform that has helped 10,000+ users.`;
  }
  
  // Education queries
  if (lowerQuery.includes('education') || lowerQuery.includes('degree') || lowerQuery.includes('university')) {
    const education = priyankaKnowledge.education.map(edu => 
      `${edu.degree} from ${edu.institution} (${edu.year})`
    ).join(', ');
    return `Priyanka's education includes: ${education}.`;
  }
  
  // Achievements queries
  if (lowerQuery.includes('achievements') || lowerQuery.includes('accomplishments') || lowerQuery.includes('awards')) {
    const achievements = priyankaKnowledge.achievements.slice(0, 3).join(', ');
    return `Some of Priyanka's key achievements include: ${achievements}.`;
  }
  
  // Consultation queries
  if (lowerQuery.includes('consultation') || lowerQuery.includes('help') || lowerQuery.includes('services')) {
    const services = priyankaKnowledge.consultation.services.slice(0, 5).join(', ');
    return `Priyanka offers consultation services including: ${services}. She provides 30-minute calls to help with technical challenges, product development, and engineering team building.`;
  }
  
  // Default response
  return `Priyanka is a Product Engineer and Entrepreneur with ${priyankaKnowledge.experience.yearsOfExperience} years of experience. She has worked at Google and Microsoft, built successful products like StopScrolling.life, and now offers consultation services to help others with their technical and product challenges.`;
};