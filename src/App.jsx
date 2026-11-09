import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { TRACKS, RESUMES, PROJECTS, SKILLS } from "./data/portfolio";
import { EngineeringLabShell } from "./components/blueprint/EngineeringLabShell";

const EMAIL = "prajwalshetty4552@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/prajwal4552";
const GITHUB = "https://github.com/praju4552";

// Months in production since the internship started (Feb 2026), counted inclusively.
function monthsSince(year, monthIndex) {
  const now = new Date();
  return Math.max(1, (now.getFullYear() - year) * 12 + (now.getMonth() - monthIndex) + 1);
}

// ── HOOKS ─────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
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

function useTyping(words, speed = 75, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[wIdx];
    const delay = del ? speed / 2 : cIdx === word.length ? pause : speed;
    const t = setTimeout(() => {
      if (!del && cIdx < word.length) { setDisplay(word.slice(0, cIdx + 1)); setCIdx(c => c + 1); }
      else if (!del && cIdx === word.length) setDel(true);
      else if (del && cIdx > 0) { setDisplay(word.slice(0, cIdx - 1)); setCIdx(c => c - 1); }
      else { setDel(false); setWIdx(i => (i + 1) % words.length); }
    }, delay);
    return () => clearTimeout(t);
  }, [cIdx, del, wIdx, words, speed, pause]);
  return display;
}

function useMouseGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, []);
  return ref;
}

const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

// ── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar({ onLaunchLab }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = (id) => { goTo(id); setOpen(false); };
  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        PA<span className="nav__dot">.</span>
      </div>
      <div className={`nav__links ${open ? "nav__links--open" : ""}`}>
        {["projects", "experience", "skills", "about", "contact"].map(id => (
          <button key={id} className="nav__link" onClick={() => go(id)}>{id}</button>
        ))}
        <button className="nav__link" onClick={() => { setOpen(false); onLaunchLab(); }}>engineering lab</button>
        <a href={RESUMES[0].href} target="_blank" rel="noreferrer" className="nav__gh">
          Resume ↓
        </a>
      </div>
      <button className={`nav__burger ${open ? "open" : ""}`} onClick={() => setOpen(!open)} aria-label="Menu">
        <span/><span/><span/>
      </button>
    </nav>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
const ROLES = ["Python & GenAI Developer", "Embedded Systems Engineer", "Full Stack Developer"];

function Hero() {
  const typed = useTyping(ROLES);
  const glowRef = useMouseGlow();
  const months = monthsSince(2026, 1);
  return (
    <section className="hero" ref={glowRef}>
      <div className="hero__glow" />
      <div className="hero__content">
        <div className="hero__eyebrow">
          <span className="hero__status" />
          Open to work · Bengaluru · Joins immediately
          <span className="hero__sep">|</span>
          B.Tech ECE 2026
        </div>
        <h1 className="hero__name">Prajwal<span className="hero__accent"> A</span></h1>
        <div className="hero__typed" aria-label={ROLES.join(", ")}>
          <span className="hero__mono">// </span>
          <span>{typed}</span>
          <span className="hero__cursor">▋</span>
        </div>
        <p className="hero__sub">
          ECE graduate who builds complete systems: Raspberry Pi hardware, Python and local-LLM
          pipelines, and production web apps. Sole developer of a live ordering platform that real
          customers pay through, and builder of an AI classroom system with custom camera hardware.
        </p>
        <div className="hero__actions">
          <button className="btn btn--primary" onClick={() => goTo("projects")}>
            View projects →
          </button>
          <a href={`mailto:${EMAIL}`} className="btn btn--ghost">Email me</a>
        </div>
        <div className="hero__resumes">
          <span className="hero__resumes-label">Resume (PDF):</span>
          {RESUMES.map(r => (
            <a key={r.href} href={r.href} target="_blank" rel="noreferrer" className="hero__resume">{r.label} ↓</a>
          ))}
        </div>
        <div className="hero__metrics">
          <div className="metric">
            <span className="metric__val">02</span>
            <span className="metric__key">Live production platforms</span>
          </div>
          <div className="metric__line" />
          <div className="metric">
            <span className="metric__val">{String(months).padStart(2, "0")}</span>
            <span className="metric__key">Months in production</span>
          </div>
          <div className="metric__line" />
          <div className="metric">
            <span className="metric__val">100+</span>
            <span className="metric__key">Production commits</span>
          </div>
          <div className="metric__line" />
          <div className="metric">
            <span className="metric__val">05</span>
            <span className="metric__key">Vision models benchmarked</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── PROJECTS ──────────────────────────────────────────────────────────────────
function Projects() {
  const [ref, inView] = useInView(0.05);
  const [track, setTrack] = useState("all");
  const list = PROJECTS.filter(p => track === "all" || p.tracks.includes(track));
  return (
    <section className="section" id="projects" ref={ref}>
      <div className={`reveal ${inView ? "revealed" : ""}`}>
        <div className="section__label"><span className="mono">01 →</span> Projects</div>
        <h2 className="section__title">What I've built</h2>
        <div className="filters" role="group" aria-label="Filter projects by track">
          {TRACKS.map(t => (
            <button
              key={t.id}
              type="button"
              className={`filter ${track === t.id ? "filter--on" : ""}`}
              aria-pressed={track === t.id}
              onClick={() => setTrack(t.id)}
            >
              {t.label}
              <span className="filter__count">
                {t.id === "all" ? PROJECTS.length : PROJECTS.filter(p => p.tracks.includes(t.id)).length}
              </span>
            </button>
          ))}
        </div>
        <div className="projects__grid">
          {list.map(p => (
            <article key={p.title} className={`project ${p.featured ? "project--featured" : ""}`}>
              <div className="project__top">
                <span className={`project__tag ${p.badge === "Live in production" ? "project__tag--live" : ""}`}>{p.badge}</span>
                {p.period && <span className="project__year">{p.period}</span>}
              </div>
              <h3 className="project__title">{p.title}</h3>
              <p className="project__desc">{p.summary}</p>
              <ul className="project__points">
                {p.points.map(pt => <li key={pt}>{pt}</li>)}
              </ul>
              <div className="project__stack">
                {p.stack.map(s => <span key={s} className="tag">{s}</span>)}
              </div>
              {p.links.length > 0 && (
                <div className="project__links">
                  {p.links.map(l => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="project__link">{l.label} ↗</a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── EXPERIENCE ────────────────────────────────────────────────────────────────
function Experience() {
  const [ref, inView] = useInView();
  return (
    <section className="section" id="experience" ref={ref}>
      <div className={`reveal ${inView ? "revealed" : ""}`}>
        <div className="section__label"><span className="mono">02 →</span> Experience</div>
        <h2 className="section__title">Where I've worked</h2>
        <div className="exp__card">
          <div className="exp__header">
            <div>
              <div className="exp__role">Full Stack Developer Intern</div>
              <div className="exp__company">PulseWriteX Solutions Pvt. Ltd.</div>
            </div>
            <div className="exp__meta">
              <div className="exp__period">Feb 2026 – Present</div>
              <div className="exp__loc">Hybrid</div>
            </div>
          </div>
          <div className="exp__divider" />
          <ul className="exp__list">
            {[
              "Sole developer of PulseX, a live ordering platform for PCB fabrication, 3D printing and laser cutting that replaced a fully offline process",
              "Built the backend end to end: Node.js/Express REST APIs, MySQL with Prisma ORM, Google OAuth, Razorpay payments (UPI, net banking, cards)",
              "Built a custom Gerber file viewer with 0.1 mm dimensional accuracy and a 360° 3D model viewer",
              "Hardened a second live platform (Rizzo Education): PM2 cluster behind Nginx, versioned migrations, automated backups, rollback, gated GitHub Actions CI/CD",
              "Sized the production VPS from a 100–200 user load estimate; monitor logs and fix production bugs; 100+ production commits across both platforms",
            ].map((p, i) => (
              <li key={i} className="exp__item">
                <span className="exp__arrow">→</span>{p}
              </li>
            ))}
          </ul>
          <div className="exp__stack">
            {["React", "TypeScript", "Node.js", "Express", "MySQL", "PostgreSQL", "Prisma", "Razorpay", "Nginx", "PM2", "GitHub Actions"].map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SKILLS ────────────────────────────────────────────────────────────────────
function Skills() {
  const [ref, inView] = useInView();
  return (
    <section className="section" id="skills" ref={ref}>
      <div className={`reveal ${inView ? "revealed" : ""}`}>
        <div className="section__label"><span className="mono">03 →</span> Skills</div>
        <h2 className="section__title">Three tracks, one engineer</h2>
        <div className="skills__grid">
          {SKILLS.map(g => (
            <div className="skill__group" key={g.track}>
              <div className="skill__header">
                <span className="skill__cat">{g.label}</span>
              </div>
              <div className="skill__tags">
                {g.items.map(s => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
function About({ onLaunchLab }) {
  const [ref, inView] = useInView();
  return (
    <section className="section" id="about" ref={ref}>
      <div className={`reveal ${inView ? "revealed" : ""}`}>
        <div className="section__label"><span className="mono">04 →</span> About</div>
        <div className="about__grid">
          <div className="about__left">
            <h2 className="section__title">I think in systems,<br /><em>not just code</em></h2>
            <p className="about__text">
              I graduated in Electronics and Communication Engineering from Dayananda Sagar University,
              Bengaluru, in 2026. During my internship I built a production platform from scratch
              (payments, a PCB file viewer, database, APIs, deployment) and I still keep it running.
            </p>
            <p className="about__text">
              For my capstone I assembled a pan-tilt camera, compared five face-recognition methods
              before picking one, and added a local LLM that runs entirely offline. I like owning the
              whole system, from the circuit to the screen, and being able to explain every decision.
            </p>
            <div className="about__links">
              <a href={LINKEDIN} target="_blank" rel="noreferrer" className="about__link">LinkedIn ↗</a>
              <a href={GITHUB} target="_blank" rel="noreferrer" className="about__link">GitHub ↗</a>
              <button type="button" className="about__link about__link--btn" onClick={onLaunchLab}>
                Engineering Lab: project deep dives →
              </button>
            </div>
          </div>
          <div className="about__right">
            {[
              { label: "Education", val: "B.Tech ECE", sub: "Dayananda Sagar University · 2026" },
              { label: "Looking for", val: "Entry-level roles", sub: "Python / GenAI · Embedded / IoT · Software" },
              { label: "Location", val: "Bengaluru, India", sub: "On-site, hybrid or remote" },
              { label: "Availability", val: "Immediate", sub: "No notice period" },
            ].map((c, i) => (
              <div className="about__card" key={i}>
                <div className="about__card-label">{c.label}</div>
                <div className="about__card-val">{c.val}</div>
                <div className="about__card-sub">{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────────────────
function Contact() {
  const [ref, inView] = useInView();
  return (
    <section className="section contact" id="contact" ref={ref}>
      <div className={`reveal ${inView ? "revealed" : ""}`}>
        <div className="section__label"><span className="mono">05 →</span> Contact</div>
        <h2 className="section__title">Let's build<br /><em>something real</em></h2>
        <p className="contact__sub">
          Looking for entry-level Python / GenAI, Embedded / IoT and Software Engineer roles in Bengaluru.
          Available to join immediately.
        </p>
        <div className="contact__grid">
          {[
            { icon: "✉", label: "Email", val: EMAIL, href: `mailto:${EMAIL}` },
            { icon: "in", label: "LinkedIn", val: "linkedin.com/in/prajwal4552", href: LINKEDIN },
            { icon: "⌥", label: "GitHub", val: "github.com/praju4552", href: GITHUB },
            { icon: "↗", label: "Live project", val: "pulsewritexsolutions.com", href: "https://www.pulsewritexsolutions.com" },
          ].map((c, i) => (
            <a key={i} href={c.href} target="_blank" rel="noreferrer" className="contact__card">
              <div className="contact__icon">{c.icon}</div>
              <div>
                <div className="contact__label">{c.label}</div>
                <div className="contact__val">{c.val}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [labActive, setLabActive] = useState(false);

  useEffect(() => {
    document.body.style.overflow = labActive ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [labActive]);

  const openLab = () => setLabActive(true);

  return (
    <div className="app">
      <Navbar onLaunchLab={openLab} />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <About onLaunchLab={openLab} />
        <Contact />
      </main>
      <footer className="footer">
        <span className="mono">Prajwal A · {new Date().getFullYear()}</span>
        <span className="footer__sep">·</span>
        <span>Built with React · Hosted on GitHub Pages</span>
      </footer>

      {labActive && <EngineeringLabShell onClose={() => setLabActive(false)} />}
    </div>
  );
}
