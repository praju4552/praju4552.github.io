import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import PROJECTS from "./data/knowledge/projects.json";
import SKILLS from "./data/knowledge/skills.json";
import { EngineeringLabShell } from "./components/blueprint/EngineeringLabShell";

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

// ── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar({ onLaunchLab }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };
  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        PA<span className="nav__dot">.</span>
      </div>
      <div className={`nav__links ${open ? "nav__links--open" : ""}`}>
        {["about","experience"].map(id => (
          <button key={id} className="nav__link" onClick={() => go(id)}>{id}</button>
        ))}
        <button className="nav__link" onClick={onLaunchLab}>Engineering Lab</button>
        {["contact"].map(id => (
          <button key={id} className="nav__link" onClick={() => go(id)}>{id}</button>
        ))}
        <a href="https://github.com/praju4552" target="_blank" rel="noreferrer" className="nav__gh">
          GitHub ↗
        </a>
      </div>
      <button className={`nav__burger ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
        <span/><span/><span/>
      </button>
    </nav>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
function Hero({ onLaunchLab }) {
  const typed = useTyping(["AI Systems Builder", "Full Stack Developer", "Prompt Engineer", "Hardware Integrator"]);
  const glowRef = useMouseGlow();
  return (
    <section className="hero" ref={glowRef}>
      <div className="hero__glow" />
      <div className="hero__content">
        <div className="hero__eyebrow">
          <span className="hero__status" />
          Available · Bengaluru, India
          <span className="hero__sep">|</span>
          ECE Graduate 2026
        </div>
        <h1 className="hero__name">Prajwal<span className="hero__accent"> A</span></h1>
        <div className="hero__typed">
          <span className="hero__mono">// </span>
          <span>{typed}</span>
          <span className="hero__cursor">▋</span>
        </div>
        <p className="hero__sub">
          I build AI systems that work in production — not just in demos.
          Live e-commerce platform. Custom PTZ hardware. Local LLM integration.
          Real ownership. Real maintenance.
        </p>
        <div className="hero__actions">
          <button className="btn btn--primary" onClick={onLaunchLab}>
            View Work →
          </button>
          <a href="mailto:prajwalshetty4552@gmail.com" className="btn btn--ghost">
            Get in Touch
          </a>
        </div>
        <div className="hero__metrics">
          <div className="metric">
            <span className="metric__val">01</span>
            <span className="metric__key">Live production system</span>
          </div>
          <div className="metric__line" />
          <div className="metric">
            <span className="metric__val">4+</span>
            <span className="metric__key">Months uptime</span>
          </div>
          <div className="metric__line" />
          <div className="metric">
            <span className="metric__val">100+</span>
            <span className="metric__key">Production commits</span>
          </div>
          <div className="metric__line" />
          <div className="metric">
            <span className="metric__val">05</span>
            <span className="metric__key">ML models benchmarked</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
function About() {
  const [ref, inView] = useInView();
  return (
    <section className="section" id="about" ref={ref}>
      <div className={`reveal ${inView ? "revealed" : ""}`}>
        <div className="section__label"><span className="mono">00 →</span> About</div>
        <div className="about__grid">
          <div className="about__left">
            <h2 className="section__title">I think in systems,<br /><em>not just code</em></h2>
            <p className="about__text">
              Recent ECE graduate from Dayananda Sagar University, Bengaluru.
              During my internship I built a full production platform from scratch —
              payment gateway, custom PCB file viewer, database, APIs, deployment —
              and I maintain it today, alone.
            </p>
            <p className="about__text">
              For my major project I designed and assembled custom PTZ hardware,
              tested five different ML models before picking the right one,
              and integrated a local LLM that runs entirely offline.
              I care about the full system — hardware to frontend — and why every decision was made.
            </p>
            <div className="about__links">
              <a href="https://linkedin.com/in/prajwal4552" target="_blank" rel="noreferrer" className="about__link">LinkedIn ↗</a>
              <a href="https://github.com/praju4552" target="_blank" rel="noreferrer" className="about__link">GitHub ↗</a>
              <a href="https://pulsewritexsolutions.com" target="_blank" rel="noreferrer" className="about__link">Live Site ↗</a>
            </div>
          </div>
          <div className="about__right">
            {[
              { label: "Education", val: "B.Tech ECE", sub: "Dayananda Sagar University · 2026" },
              { label: "Superpower", val: "Systems Architecture", sub: "HW + SW + AI in one product" },
              { label: "Location", val: "Bengaluru, India", sub: "Open to onsite roles" },
              { label: "Status", val: "Open to Work", sub: "Available immediately" },
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

// ── EXPERIENCE ────────────────────────────────────────────────────────────────
function Experience() {
  const [ref, inView] = useInView();
  return (
    <section className="section" id="experience" ref={ref}>
      <div className={`reveal ${inView ? "revealed" : ""}`}>
        <div className="section__label"><span className="mono">01 →</span> Experience</div>
        <h2 className="section__title">Where I worked</h2>
        <div className="exp__card">
          <div className="exp__header">
            <div>
              <div className="exp__role">Full Stack Developer — Intern</div>
              <div className="exp__company">PulsewriteX Solutions Pvt. Ltd.</div>
            </div>
            <div className="exp__meta">
              <div className="exp__period">Feb 2026 – Present</div>
              <div className="exp__loc">Bengaluru, India</div>
            </div>
          </div>
          <div className="exp__divider" />
          <ul className="exp__list">
            {[
              "Sole developer — designed, built, deployed, and maintain a live production platform end-to-end",
              "Built custom Gerber file viewer rendering PCB designs with 0.1mm dimension accuracy",
              "Integrated Razorpay payment gateway — UPI, netbanking, cards, account transfer",
              "Set up and maintained CI/CD pipeline with 100+ production commits across two projects",
              "Recommended and implemented Hostinger VPS based on 100–200 user load analysis and budget",
              "Actively monitor error logs, resolve production bugs, maintain server stability",
            ].map((p, i) => (
              <li key={i} className="exp__item">
                <span className="exp__arrow">→</span>{p}
              </li>
            ))}
          </ul>
          <div className="exp__stack">
            {["React", "TypeScript", "Node.js", "MySQL", "Prisma", "Razorpay", "Google OAuth", "Hostinger"].map(t => (
              <span key={t} className="tag">{t}</span>
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
        <div className="section__label"><span className="mono">04 →</span> Contact</div>
        <h2 className="section__title">Let's build<br /><em>something real</em></h2>
        <p className="contact__sub">
          Actively looking for AI/ML Engineer and Full Stack Developer roles in Bengaluru.
          Available to join immediately.
        </p>
        <div className="contact__grid">
          {[
            { icon: "✉", label: "Email", val: "prajwalshetty4552@gmail.com", href: "mailto:prajwalshetty4552@gmail.com" },
            { icon: "in", label: "LinkedIn", val: "linkedin.com/in/prajwal4552", href: "https://linkedin.com/in/prajwal4552" },
            { icon: "⌥", label: "GitHub", val: "github.com/praju4552", href: "https://github.com/praju4552" },
            { icon: "↗", label: "Live Project", val: "pulsewritexsolutions.com", href: "https://pulsewritexsolutions.com" },
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
    if (labActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [labActive]);

  return (
    <div className="app">
      <Navbar onLaunchLab={() => setLabActive(true)} />
      <Hero onLaunchLab={() => setLabActive(true)} />
      <About />
      <Experience />
      {/* Projects and Skills are replaced by Engineering Lab and removed from baseline */}
      <Contact />
      <footer className="footer">
        <span className="mono">Prajwal A · {new Date().getFullYear()}</span>
        <span className="footer__sep">·</span>
        <span>Built with React · Hosted on GitHub Pages</span>
      </footer>

      {/* Engineering Lab Viewport Overlay */}
      {labActive && (
        <EngineeringLabShell onClose={() => setLabActive(false)} />
      )}
    </div>
  );
}
