import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// ── HOOKS ─────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useTyping(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[wordIdx];
    const delay = deleting ? speed / 2 : charIdx === word.length ? pause : speed;
    const t = setTimeout(() => {
      if (!deleting && charIdx < word.length) {
        setDisplay(word.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === word.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setDisplay(word.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      } else {
        setDeleting(false);
        setWordIdx(i => (i + 1) % words.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return display;
}

// ── DATA ──────────────────────────────────────────────────────────────────────
const NAV = ["About", "Experience", "Projects", "Skills", "Contact"];

const PROJECTS = [
  {
    title: "Omni Room Management System",
    tag: "AI + Hardware + LLM",
    tagColor: "#7c3aed",
    year: "2025 – 2026",
    desc: "AI-powered smart classroom platform built entirely solo. Custom PTZ hardware with Raspberry Pi 4, Sony IMX camera, and servo motors. HOG + CNN face recognition pipeline for automated attendance. Echo Minds — a local Ollama LLM module generating summaries, flashcards, mind maps, and quizzes from class audio.",
    stack: ["Python", "React", "Node.js", "MySQL", "OpenCV", "CNN", "Ollama", "Raspberry Pi"],
    link: "https://github.com/praju4552",
    highlight: true,
  },
  {
    title: "Prototyping Services Platform",
    tag: "Live Production",
    tagColor: "#059669",
    year: "2026 – Present",
    desc: "Full e-commerce platform for PCB manufacturing, 3D printing, and laser cutting orders. Built, deployed, and actively maintained solo in production for 4+ months. Custom Gerber file viewer with 0.1mm accuracy, Razorpay integration, multi-file ordering.",
    stack: ["React", "TypeScript", "Node.js", "MySQL", "Razorpay", "Hostinger"],
    link: "https://pulsewritexsolutions.com",
    highlight: false,
  },
  {
    title: "Fluid AI — Autonomous Agent",
    tag: "Agentic AI",
    tagColor: "#d97706",
    year: "2026",
    desc: "Autonomous AI agent built for Fluid AI assignment. FastAPI backend with four-stage pipeline — validate, plan, generate, build. Accepts natural language requests, autonomously creates execution plans, and generates polished Word documents. Includes retry logic and error recovery.",
    stack: ["Python", "FastAPI", "Groq LLM", "python-docx", "Pydantic"],
    link: "https://github.com/praju4552",
    highlight: false,
  },
  {
    title: "Predictive Maintenance — IIoT Edge ML",
    tag: "Edge AI",
    tagColor: "#0891b2",
    year: "2025",
    desc: "Anomaly detection system for motor vibration and temperature sensor data. Full data preprocessing pipeline with feature extraction and windowing. Benchmarked multiple classical ML models, achieving 0.88 precision. Designed for edge inference with no cloud dependency.",
    stack: ["Python", "Scikit-learn", "Pandas", "Edge ML"],
    link: "https://github.com/praju4552",
    highlight: false,
  },
];

const SKILLS = [
  { category: "AI / ML", items: ["Python", "Machine Learning", "Deep Learning", "Computer Vision", "Face Recognition", "HOG + CNN", "OpenCV", "DeepFace"] },
  { category: "Generative AI", items: ["Ollama LLM", "Groq", "Prompt Engineering", "Few-Shot Prompting", "Chain of Thought", "LLM Inference", "Agentic AI"] },
  { category: "Full Stack", items: ["React", "TypeScript", "Node.js", "REST APIs", "FastAPI", "HTML", "CSS", "Prisma ORM"] },
  { category: "Database", items: ["MySQL", "SQL", "RDBMS"] },
  { category: "Hardware", items: ["Raspberry Pi 4", "Arduino", "Servo Motors", "Sony IMX Camera", "PTZ Assembly", "KiCad", "Embedded C"] },
  { category: "DevOps", items: ["Git", "GitHub", "CI/CD", "Hostinger", "Linux", "Shell Scripting"] },
];

const EXPERIENCE = [
  {
    role: "Full Stack Developer — Intern",
    company: "PulsewriteX Solutions Pvt. Ltd.",
    period: "Feb 2026 – Present",
    location: "Bengaluru, India",
    points: [
      "Sole developer — designed, built, deployed, and maintain a live production platform",
      "Built custom Gerber file viewer with 0.1mm PCB dimension accuracy",
      "Integrated Razorpay payment gateway and Google OAuth authentication",
      "Deployed on Hostinger VPS — 4+ months uptime, zero downtime incidents",
      "Set up and maintained CI/CD pipeline with 100+ production commits",
    ],
  },
];

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        PA<span className="dot-accent">.</span>
      </div>
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        {NAV.map(n => (
          <button key={n} className={`nav-link ${active === n ? "active" : ""}`} onClick={() => scrollTo(n)}>
            {n}
          </button>
        ))}
        <a href="https://github.com/praju4552" target="_blank" rel="noreferrer" className="nav-cta">GitHub</a>
      </div>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span /><span /><span />
      </button>
    </nav>
  );
}

function Hero() {
  const typed = useTyping(["AI Systems Builder", "Full Stack Developer", "Hardware Integrator", "Prompt Engineer"]);
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        {[...Array(18)].map((_, i) => (
          <div key={i} className="grid-dot" style={{ "--i": i }} />
        ))}
      </div>
      <div className="hero-content">
        <div className="hero-badge">Available for work · Bengaluru</div>
        <h1 className="hero-name">Prajwal<span className="accent"> A</span></h1>
        <div className="hero-typed">
          <span>{typed}</span>
          <span className="cursor">|</span>
        </div>
        <p className="hero-sub">
          ECE graduate who builds AI systems that work in the real world — not just in theory.
          Deployed a live production platform, built custom PTZ hardware, and ran a local LLM from scratch.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}>
            View Projects
          </button>
          <a href="mailto:prajwalshetty4552@gmail.com" className="btn-secondary">Get in Touch</a>
        </div>
        <div className="hero-stats">
          <div className="stat"><span className="stat-num">1</span><span className="stat-label">Live production system</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">4+</span><span className="stat-label">Months in production</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">100+</span><span className="stat-label">Production commits</span></div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const [ref, inView] = useInView();
  return (
    <section className="section about-section" id="about" ref={ref}>
      <div className={`about-grid fade-up ${inView ? "visible" : ""}`}>
        <div className="about-left">
          <div className="section-label">About me</div>
          <h2 className="section-title">I think in systems,<br /><span className="accent">not just code</span></h2>
          <p className="about-text">
            I am a recent Electronics and Communication Engineering graduate from Dayananda Sagar University, Bengaluru.
            What makes me different is not what I know — it is what I have built and shipped.
          </p>
          <p className="about-text">
            During my internship I built and deployed a full production platform entirely solo — payment gateway, custom file viewers, database, APIs, deployment — and I maintain it today.
            For my major project I designed custom PTZ hardware, trained a face recognition pipeline after testing five models, and integrated a local LLM for AI-generated learning content.
          </p>
          <p className="about-text">
            I care deeply about how everything connects. I do not just write features — I own systems end to end.
          </p>
          <div className="about-links">
            <a href="https://linkedin.com/in/prajwal4552" target="_blank" rel="noreferrer" className="about-link">LinkedIn →</a>
            <a href="https://github.com/praju4552" target="_blank" rel="noreferrer" className="about-link">GitHub →</a>
            <a href="https://pulsewritexsolutions.com" target="_blank" rel="noreferrer" className="about-link">Live Site →</a>
          </div>
        </div>
        <div className="about-right">
          <div className="about-card">
            <div className="about-card-icon">🎓</div>
            <div className="about-card-title">Education</div>
            <div className="about-card-text">B.Tech — ECE</div>
            <div className="about-card-sub">Dayananda Sagar University, Bengaluru · 2026</div>
          </div>
          <div className="about-card">
            <div className="about-card-icon">⚡</div>
            <div className="about-card-title">Superpower</div>
            <div className="about-card-text">Systems Architecture</div>
            <div className="about-card-sub">Hardware + Software + AI in one product</div>
          </div>
          <div className="about-card">
            <div className="about-card-icon">📍</div>
            <div className="about-card-title">Location</div>
            <div className="about-card-text">Bengaluru, Karnataka</div>
            <div className="about-card-sub">Open to onsite and hybrid roles</div>
          </div>
          <div className="about-card">
            <div className="about-card-icon">🚀</div>
            <div className="about-card-title">Status</div>
            <div className="about-card-text">Open to Work</div>
            <div className="about-card-sub">Available to join immediately</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const [ref, inView] = useInView();
  return (
    <section className="section" id="experience" ref={ref}>
      <div className={`fade-up ${inView ? "visible" : ""}`}>
        <div className="section-label">Work</div>
        <h2 className="section-title">Experience</h2>
        <div className="exp-timeline">
          {EXPERIENCE.map((e, i) => (
            <div className="exp-item" key={i}>
              <div className="exp-dot" />
              <div className="exp-content">
                <div className="exp-header">
                  <div>
                    <div className="exp-role">{e.role}</div>
                    <div className="exp-company">{e.company}</div>
                  </div>
                  <div className="exp-meta">
                    <div className="exp-period">{e.period}</div>
                    <div className="exp-location">{e.location}</div>
                  </div>
                </div>
                <ul className="exp-points">
                  {e.points.map((p, j) => (
                    <li key={j}><span className="exp-bullet">→</span>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`project-card ${project.highlight ? "featured" : ""} fade-up ${inView ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      {project.highlight && <div className="featured-badge">Featured Project</div>}
      <div className="project-top">
        <span className="project-tag" style={{ background: project.tagColor + "22", color: project.tagColor, border: `1px solid ${project.tagColor}44` }}>
          {project.tag}
        </span>
        <span className="project-year">{project.year}</span>
      </div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.desc}</p>
      <div className="project-stack">
        {project.stack.map(s => <span key={s} className="stack-tag">{s}</span>)}
      </div>
      <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
        View Project →
      </a>
    </div>
  );
}

function Projects() {
  return (
    <section className="section" id="projects">
      <div className="section-label">Work</div>
      <h2 className="section-title">Projects</h2>
      <div className="projects-grid">
        {PROJECTS.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
      </div>
    </section>
  );
}

function Skills() {
  const [ref, inView] = useInView();
  return (
    <section className="section" id="skills" ref={ref}>
      <div className={`fade-up ${inView ? "visible" : ""}`}>
        <div className="section-label">Toolkit</div>
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid">
          {SKILLS.map((cat, i) => (
            <div className="skill-group" key={i} style={{ transitionDelay: `${i * 0.07}s` }}>
              <div className="skill-category">{cat.category}</div>
              <div className="skill-tags">
                {cat.items.map(item => (
                  <span key={item} className="skill-tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [ref, inView] = useInView();
  return (
    <section className="section contact-section" id="contact" ref={ref}>
      <div className={`contact-inner fade-up ${inView ? "visible" : ""}`}>
        <div className="section-label">Get in touch</div>
        <h2 className="section-title">Let's build<br /><span className="accent">something real</span></h2>
        <p className="contact-sub">
          I am actively looking for AI/ML Engineer and Full Stack Developer roles in Bengaluru.
          If you are building something that matters, I want to be part of it.
        </p>
        <div className="contact-links">
          <a href="mailto:prajwalshetty4552@gmail.com" className="contact-card">
            <span className="contact-icon">✉</span>
            <div>
              <div className="contact-label">Email</div>
              <div className="contact-value">prajwalshetty4552@gmail.com</div>
            </div>
          </a>
          <a href="https://linkedin.com/in/prajwal4552" target="_blank" rel="noreferrer" className="contact-card">
            <span className="contact-icon">in</span>
            <div>
              <div className="contact-label">LinkedIn</div>
              <div className="contact-value">linkedin.com/in/prajwal4552</div>
            </div>
          </a>
          <a href="https://github.com/praju4552" target="_blank" rel="noreferrer" className="contact-card">
            <span className="contact-icon">⌥</span>
            <div>
              <div className="contact-label">GitHub</div>
              <div className="contact-value">github.com/praju4552</div>
            </div>
          </a>
          <a href="https://pulsewritexsolutions.com" target="_blank" rel="noreferrer" className="contact-card">
            <span className="contact-icon">↗</span>
            <div>
              <div className="contact-label">Live Project</div>
              <div className="contact-value">pulsewritexsolutions.com</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("Hero");

  useEffect(() => {
    const sections = NAV.map(n => document.getElementById(n.toLowerCase())).filter(Boolean);
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setActiveSection(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1));
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="app">
      <Navbar active={activeSection} />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <footer className="footer">
        <span>Built by Prajwal A · {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
