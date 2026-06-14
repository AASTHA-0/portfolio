import { useState, useEffect, useRef } from "react";

const skills = [
  { name: "React", category: "Frontend", level: 80 },
  { name: "JavaScript", category: "Frontend", level: 82 },
  { name: "HTML & CSS", category: "Frontend", level: 90 },
  { name: "Python", category: "Core", level: 88 },
  { name: "Machine Learning", category: "AI/ML", level: 85 },
  { name: "Deep Learning", category: "AI/ML", level: 75 },
  { name: "DSA", category: "Core", level: 78 },
  { name: "Kaggle", category: "AI/ML", level: 72 },
];

const projects = [
  {
    id: 1,
    title: "FairSight",
    subtitle: "Fairness in ML Research",
    desc: "Research framework to detect, measure, and mitigate algorithmic bias in ML models using the COMPAS recidivism dataset.",
    tags: ["Python", "scikit-learn", "Pandas", "Fairness ML"],
    link: "https://github.com/AASTHA-0/fairness-ml-research",
    badge: "Research",
    color: "#6366f1",
  },
  {
    id: 2,
    title: "NeuraVerse",
    subtitle: "Brainwave-Powered Identity",
    desc: "EEG-based biometric authentication using brainwave signals with ESP32 hardware and an Emergency Mode triggered by panic-level heart rate.",
    tags: ["Python", "Random Forest", "EEG", "ESP32"],
    link: "https://github.com/AASTHA-0/neuraverse",
    badge: "Hardware + ML",
    color: "#8b5cf6",
  },
  {
    id: 3,
    title: "Return Fraud Detector",
    subtitle: "E-commerce ML System",
    desc: "ML classification system that detects fraudulent product returns by identifying suspicious patterns in e-commerce data.",
    tags: ["Python", "ML", "Classification"],
    link: "https://github.com/AASTHA-0/return_fraud_detector",
    badge: "ML",
    color: "#06b6d4",
  },
  {
    id: 4,
    title: "Netflix Clone",
    subtitle: "Frontend Project",
    desc: "Pixel-perfect Netflix UI clone with React — dynamic routing, responsive layout, and component-based architecture.",
    tags: ["React", "CSS", "JavaScript"],
    link: "#",
    badge: "Frontend",
    color: "#e11d48",
  },
  {
    id: 5,
    title: "This Portfolio",
    subtitle: "Personal Portfolio",
    desc: "A modern, minimal portfolio built from scratch with React — the very page you're on.",
    tags: ["React", "JavaScript", "CSS"],
    link: "#",
    badge: "Live",
    color: "#10b981",
  },
];

const achievements = [
  { icon: "🏆", title: "Smart India Hackathon", sub: "Team Grievance Go — College Level Participant" },
  { icon: "🎓", title: "9.2 CGPA", sub: "After 2nd Year · NIT Hamirpur" },
  { icon: "📜", title: "ML Internship Offer", sub: "1Stop × IIT Kharagpur — Program Certificate" },
  { icon: "📊", title: "Data Science Internship Offer", sub: "Placify — Program Certificate" },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, y = 30 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.65s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.65s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function SkillBar({ skill, delay }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: "#e2e8f0" }}>{skill.name}</span>
        <span style={{ fontSize: 12, color: "#64748b" }}>{skill.level}%</span>
      </div>
      <div style={{ height: 4, background: "#1e293b", borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: inView ? `${skill.level}%` : "0%",
          background: "linear-gradient(90deg, #6366f1, #a78bfa)",
          borderRadius: 99,
          transition: `width 1s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        }} />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [typed, setTyped] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const fullName = "Aastha Choudhary";

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(fullName.slice(0, i + 1));
      i++;
      if (i >= fullName.length) clearInterval(t);
    }, 80);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "achievements", "contact"];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.35 }
    );
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const nav = ["home", "about", "skills", "projects", "achievements", "contact"];

  return (
    <div style={{ background: "#020817", color: "#e2e8f0", minHeight: "100vh", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        a { color: inherit; text-decoration: none; }
        ::selection { background: #6366f133; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #020817; } ::-webkit-scrollbar-thumb { background: #334155; border-radius: 99px; }

        .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 0 24px; height: 60px; display: flex; align-items: center; justify-content: space-between; max-width: 1100px; margin: 0 auto; }
        .navbar-wrap { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(2,8,23,0.8); backdrop-filter: blur(16px); border-bottom: 1px solid #ffffff08; }
        .nav-logo { font-size: 18px; font-weight: 800; background: linear-gradient(135deg, #6366f1, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; cursor: pointer; }
        .nav-links { display: flex; gap: 32px; }
        .nav-link { font-size: 13px; letter-spacing: 0.05em; color: #64748b; transition: color 0.2s; cursor: pointer; font-weight: 500; }
        .nav-link:hover, .nav-link.active { color: #a78bfa; }
        .hamburger { display: none; background: none; border: none; cursor: pointer; flex-direction: column; gap: 5px; padding: 4px; }
        .hamburger span { display: block; width: 22px; height: 1.5px; background: #94a3b8; }
        .mobile-menu { display: none; flex-direction: column; padding: 16px 24px 20px; gap: 18px; border-top: 1px solid #ffffff08; background: rgba(2,8,23,0.97); }
        .mobile-menu.open { display: flex; }
        .mobile-link { font-size: 14px; color: #94a3b8; cursor: pointer; font-weight: 500; }
        .mobile-link:hover { color: #a78bfa; }
        @media (max-width: 640px) { .nav-links { display: none; } .hamburger { display: flex; } }

        .section-wrap { max-width: 900px; margin: 0 auto; padding: 100px 24px; }

        /* HERO */
        #home { min-height: 100vh; display: flex; align-items: center; position: relative; overflow: hidden; }
        .hero-bg { position: absolute; top: -200px; right: -200px; width: 600px; height: 600px; background: radial-gradient(circle, #6366f122 0%, transparent 70%); pointer-events: none; }
        .hero-bg2 { position: absolute; bottom: -100px; left: -100px; width: 400px; height: 400px; background: radial-gradient(circle, #8b5cf615 0%, transparent 70%); pointer-events: none; }
        .hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; color: #a78bfa; margin-bottom: 24px; border: 1px solid #6366f133; padding: 6px 14px; border-radius: 999px; background: #6366f10a; }
        .hero-dot { width: 6px; height: 6px; background: #a78bfa; border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(0.8); } }
        .hero-name { font-size: clamp(48px, 9vw, 88px); font-weight: 800; line-height: 1.0; letter-spacing: -0.03em; color: #f8fafc; }
        .hero-name .gradient { background: linear-gradient(135deg, #6366f1 0%, #a78bfa 50%, #38bdf8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-cursor { display: inline-block; width: 3px; height: 0.75em; background: #a78bfa; vertical-align: middle; margin-left: 2px; animation: blink 1s step-end infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .hero-role { margin-top: 16px; font-size: 18px; color: #64748b; font-weight: 400; }
        .hero-role span { color: #94a3b8; font-weight: 500; }
        .hero-desc { margin-top: 20px; font-size: 16px; line-height: 1.8; color: #475569; max-width: 500px; }
        .hero-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 28px; }
        .chip { font-size: 12px; padding: 5px 13px; background: #0f172a; border: 1px solid #1e293b; border-radius: 999px; color: #94a3b8; font-weight: 500; }
        .hero-btns { display: flex; gap: 12px; margin-top: 36px; flex-wrap: wrap; }
        .btn-glow { padding: 13px 30px; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #fff; font-size: 13px; font-weight: 600; letter-spacing: 0.04em; border: none; cursor: pointer; border-radius: 8px; transition: opacity 0.2s, transform 0.2s; box-shadow: 0 0 20px #6366f140; }
        .btn-glow:hover { opacity: 0.9; transform: translateY(-1px); }
        .btn-ghost { padding: 13px 30px; background: transparent; color: #94a3b8; font-size: 13px; font-weight: 600; letter-spacing: 0.04em; border: 1px solid #1e293b; cursor: pointer; border-radius: 8px; transition: border-color 0.2s, color 0.2s; }
        .btn-ghost:hover { border-color: #6366f1; color: #a78bfa; }

        /* ABOUT */
        #about { background: #030d1a; }
        .sec-label { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #6366f1; margin-bottom: 10px; font-weight: 600; }
        .sec-title { font-size: clamp(30px, 4vw, 42px); font-weight: 800; color: #f1f5f9; line-height: 1.15; }
        .sec-line { width: 40px; height: 3px; background: linear-gradient(90deg, #6366f1, #a78bfa); border-radius: 99px; margin: 16px 0 36px; }
        .about-grid { display: grid; grid-template-columns: 3fr 2fr; gap: 56px; align-items: start; }
        @media(max-width:640px){.about-grid{grid-template-columns:1fr;gap:32px;}}
        .about-p { font-size: 16px; line-height: 1.9; color: #64748b; margin-bottom: 16px; }
        .about-p strong { color: #94a3b8; font-weight: 600; }
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .stat-box { background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; padding: 20px; text-align: center; transition: border-color 0.2s; }
        .stat-box:hover { border-color: #6366f140; }
        .stat-n { font-size: 32px; font-weight: 800; background: linear-gradient(135deg, #6366f1, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .stat-l { font-size: 11px; color: #475569; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 500; }

        /* SKILLS */
        .skills-cats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; }
        @media(max-width:640px){.skills-cats{grid-template-columns:1fr;}}
        .skill-cat-card { background: #0f172a; border: 1px solid #1e293b; border-radius: 14px; padding: 24px; }
        .skill-cat-title { font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #475569; margin-bottom: 20px; font-weight: 600; }

        /* PROJECTS */
        #projects { background: #030d1a; }
        .projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        @media(max-width:640px){.projects-grid{grid-template-columns:1fr;}}
        .p-card { background: #0f172a; border: 1px solid #1e293b; border-radius: 16px; padding: 26px; transition: border-color 0.25s, transform 0.25s; cursor: default; position: relative; overflow: hidden; }
        .p-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; opacity: 0; transition: opacity 0.25s; }
        .p-card:hover { border-color: #334155; transform: translateY(-3px); }
        .p-card:hover::before { opacity: 1; }
        .p-badge { display: inline-block; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; padding: 3px 10px; border-radius: 999px; margin-bottom: 14px; font-weight: 600; }
        .p-title { font-size: 18px; font-weight: 700; color: #f1f5f9; margin-bottom: 4px; }
        .p-sub { font-size: 12px; color: #475569; margin-bottom: 12px; font-weight: 500; }
        .p-desc { font-size: 14px; line-height: 1.7; color: #64748b; margin-bottom: 18px; }
        .p-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px; }
        .p-tag { font-size: 11px; padding: 3px 9px; background: #020817; border: 1px solid #1e293b; border-radius: 999px; color: #475569; }
        .p-link { font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; display: inline-flex; align-items: center; gap: 6px; transition: gap 0.2s; }
        .p-link:hover { gap: 10px; }

        /* ACHIEVEMENTS */
        .ach-list { display: flex; flex-direction: column; gap: 12px; }
        .ach-row { display: flex; align-items: center; gap: 18px; background: #0f172a; border: 1px solid #1e293b; border-radius: 14px; padding: 20px 24px; transition: border-color 0.2s; }
        .ach-row:hover { border-color: #6366f130; }
        .ach-icon-wrap { width: 44px; height: 44px; background: #020817; border: 1px solid #1e293b; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
        .ach-title { font-size: 15px; font-weight: 600; color: #e2e8f0; }
        .ach-sub { font-size: 13px; color: #475569; margin-top: 3px; }

        /* CONTACT */
        #contact { background: #030d1a; }
        .contact-box { background: #0f172a; border: 1px solid #1e293b; border-radius: 20px; padding: 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
        @media(max-width:640px){.contact-box{grid-template-columns:1fr;padding:28px;gap:28px;}}
        .contact-p { font-size: 16px; line-height: 1.8; color: #64748b; }
        .contact-links { display: flex; flex-direction: column; gap: 14px; }
        .c-link { display: flex; align-items: center; gap: 14px; font-size: 14px; color: #64748b; transition: color 0.2s; font-weight: 500; }
        .c-link:hover { color: #a78bfa; }
        .c-icon { width: 40px; height: 40px; background: #020817; border: 1px solid #1e293b; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; transition: border-color 0.2s; }
        .c-link:hover .c-icon { border-color: #6366f160; }

        footer { border-top: 1px solid #0f172a; padding: 28px 24px; text-align: center; font-size: 12px; color: #1e293b; }
        .footer-accent { background: linear-gradient(135deg, #6366f1, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 600; }
      `}</style>

      {/* NAV */}
      <div className="navbar-wrap">
        <div className="navbar">
          <span className="nav-logo" onClick={() => scrollTo("home")}>AC.</span>
          <div className="nav-links">
            {nav.map(n => <span key={n} className={`nav-link ${activeSection === n ? "active" : ""}`} onClick={() => scrollTo(n)}>{n}</span>)}
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)}><span /><span /><span /></button>
        </div>
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {nav.map(n => <span key={n} className="mobile-link" onClick={() => scrollTo(n)}>{n}</span>)}
        </div>
      </div>

      {/* HERO */}
      <section id="home">
        <div className="hero-bg" /><div className="hero-bg2" />
        <div className="section-wrap">
          <Reveal>
            <div className="hero-eyebrow"><span className="hero-dot" /> Open to Opportunities</div>
            <h1 className="hero-name">
              <span className="gradient">{typed}</span>
              {typed.length < fullName.length && <span className="hero-cursor" />}
            </h1>
            <p className="hero-role">B.Tech · <span>Mathematics & Computing</span> · NIT Hamirpur</p>
            <p className="hero-desc">Building at the intersection of Machine Learning, Data Science, and Frontend Development.</p>
            <div className="hero-chips">
              {["3rd Year", "9.2 CGPA", "ML Researcher", "React Dev", "Kaggle"].map(c => <span key={c} className="chip">{c}</span>)}
            </div>
            <div className="hero-btns">
              <button className="btn-glow" onClick={() => scrollTo("projects")}>View Projects</button>
              <button className="btn-ghost" onClick={() => scrollTo("contact")}>Get in Touch</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="section-wrap">
          <Reveal><div className="sec-label">About</div><h2 className="sec-title">Who I am</h2><div className="sec-line" /></Reveal>
          <div className="about-grid">
            <Reveal delay={100}>
              <p className="about-p">I'm a B.Tech student at <strong>NIT Hamirpur</strong> studying Mathematics & Computing — a degree at the intersection of pure math, ML, and software engineering.</p>
              <p className="about-p">I love building intelligent, user-centric applications by combining data-driven insights with modern web technologies. Whether it's training a fairness-aware ML model or crafting a clean React UI, I care about real-world impact.</p>
              <p className="about-p">Always exploring, always building — and always up for a Kaggle competition.</p>
            </Reveal>
            <Reveal delay={180}>
              <div className="stats-grid">
                {[["9.2", "CGPA"], ["5+", "Projects"], ["2", "Internship Offers"], ["1", "Research Paper"]].map(([n, l]) => (
                  <div key={l} className="stat-box"><div className="stat-n">{n}</div><div className="stat-l">{l}</div></div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="section-wrap">
          <Reveal><div className="sec-label">Skills</div><h2 className="sec-title">What I work with</h2><div className="sec-line" /></Reveal>
          <div className="skills-cats">
            {["Frontend", "AI/ML", "Core"].map((cat, ci) => (
              <Reveal key={cat} delay={ci * 80}>
                <div className="skill-cat-card">
                  <div className="skill-cat-title">{cat}</div>
                  {skills.filter(s => s.category === cat).map((s, i) => <SkillBar key={s.name} skill={s} delay={ci * 80 + i * 60} />)}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="section-wrap">
          <Reveal><div className="sec-label">Projects</div><h2 className="sec-title">Things I've built</h2><div className="sec-line" /></Reveal>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <div className="p-card" style={{ "--card-color": p.color }}>
                  <style>{`.p-card:nth-child(${i + 1})::before { background: linear-gradient(90deg, ${p.color}80, transparent); }`}</style>
                  <span className="p-badge" style={{ background: p.color + "18", color: p.color }}>{p.badge}</span>
                  <div className="p-title">{p.title}</div>
                  <div className="p-sub">{p.subtitle}</div>
                  <p className="p-desc">{p.desc}</p>
                  <div className="p-tags">{p.tags.map(t => <span key={t} className="p-tag">{t}</span>)}</div>
                  {p.link !== "#" && (
                    <a href={p.link} target="_blank" rel="noreferrer" className="p-link" style={{ color: p.color }}>
                      GitHub →
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements">
        <div className="section-wrap">
          <Reveal><div className="sec-label">Achievements</div><h2 className="sec-title">Highlights</h2><div className="sec-line" /></Reveal>
          <div className="ach-list">
            {achievements.map((a, i) => (
              <Reveal key={i} delay={i * 55}>
                <div className="ach-row">
                  <div className="ach-icon-wrap">{a.icon}</div>
                  <div><div className="ach-title">{a.title}</div><div className="ach-sub">{a.sub}</div></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="section-wrap">
          <Reveal><div className="sec-label">Contact</div><h2 className="sec-title">Let's connect</h2><div className="sec-line" /></Reveal>
          <div className="contact-box">
            <Reveal delay={80}>
              <p className="contact-p">I'm open to internships, research collaborations, and interesting ML or frontend projects.</p>
              <p className="contact-p" style={{ marginTop: 14 }}>Drop me an email or find me on GitHub and Kaggle — I'd love to hear from you.</p>
            </Reveal>
            <Reveal delay={160}>
              <div className="contact-links">
                <a href="mailto:24bma001@gmail.com" className="c-link"><div className="c-icon">✉️</div>24bma001@gmail.com</a>
                <a href="https://github.com/AASTHA-0" target="_blank" rel="noreferrer" className="c-link">
                  <div className="c-icon" style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 800, color: "#475569" }}>GH</div>
                  github.com/AASTHA-0
                </a>
                <a href="https://www.kaggle.com/aasthabhakar" target="_blank" rel="noreferrer" className="c-link"><div className="c-icon">📊</div>kaggle.com/aasthabhakar</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <footer>
        <span className="footer-accent">Aastha Choudhary</span> · NIT Hamirpur · 2025
      </footer>
    </div>
  );
}
