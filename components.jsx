// Portfolio v2 — interactive aerospace-themed components
// Adds: HUD nav, radar hero, scroll-progress instrument cluster,
// tabbed Lab/Code workbench, live SPC chart, rotating DMAIC ring,
// scroll-reveal panels, telemetry overlays.

// Read React off window at function-call time so Babel-deferred init order is safe.
const useState = React.useState;
const useEffect = React.useEffect;
const useRef = React.useRef;
const useMemo = React.useMemo;

// ─────────────────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────────────────
function useInView(opts = { threshold: 0.18 }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, opts);
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return p;
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 120;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return active;
}

function useCountUp(target, start, decimals = 0, duration = 1200) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf, t0;
    const tick = (t) => {
      if (!t0) t0 = t;
      const k = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      setV(target * eased);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return decimals === 0 ? Math.round(v) : v.toFixed(decimals);
}

// ─────────────────────────────────────────────────────────
// Cursor / HUD overlay
// ─────────────────────────────────────────────────────────
function HUDOverlay() {
  const [time, setTime] = useState(() => new Date());
  const progress = useScrollProgress();
  const active = useActiveSection(['top', 'lab', 'code', 'experience', 'contact']);
  const sectionLabel = {
    top: 'HERO', lab: 'LAB', code: 'CODE',
    experience: 'EXP', contact: 'CONTACT'
  }[active] || 'HERO';

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const ts = time.toISOString().slice(11, 19);

  return (
    <div className="hud" aria-hidden="true">
      <div className="hud__corner hud__corner--tl">
        <span className="mono">SP · PORTFOLIO v3</span>
        <span className="mono hud__dim">§ {sectionLabel} · {Math.round(progress * 100)}% ↓</span>
        <span className="mono hud__dim">{ts} UTC</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Nav
// ─────────────────────────────────────────────────────────
const RESUME_URL = 'Resume.pdf';
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(['top', 'lab', 'code', 'experience', 'contact']);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['Lab', 'lab'], ['Code', 'code'], ['Experience', 'experience'], ['Contact', 'contact'],
  ];

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#top" className="nav__logo" aria-label="Home">
          <span className="nav__mark">
            <svg viewBox="0 0 32 32" width="20" height="20" fill="none" aria-hidden="true">
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M10 18 Q 16 8, 22 18" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              <circle cx="16" cy="16" r="2" fill="currentColor"/>
            </svg>
          </span>
          <span className="nav__name">
            <span className="nav__name-id mono">SP–01</span>
            <span className="nav__name-role mono">QUALITY ENG · UIUC</span>
          </span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {links.map(([label, id], i) => (
            <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''}>
              <span className="mono nav__link-num">0{i+1}</span>
              <span>{label}</span>
            </a>
          ))}
        </nav>
        <div className="nav__actions">
          <a className="btn btn--primary btn--sm" href={RESUME_URL} target="_blank" rel="noreferrer">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 2v6M6 8L4 6M6 8l2-2M3 10h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Resume
          </a>
          <button className="nav__burger" onClick={() => setOpen(!open)} aria-label="Menu">
            <span></span><span></span>
          </button>
        </div>
      </div>
      {open && (
        <div className="nav__mobile">
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </div>
      )}
    </header>
  );
}

// ─────────────────────────────────────────────────────────
// Hero — Character Sheet
// ─────────────────────────────────────────────────────────
const CS_SKILLS = [
  'pFMEA (AIAG FMEA-4)', 'SPC / Cp/Cpk', '8D Problem Solving',
  'GD&T (ASME Y14.5)', 'RCCA / CAPA', 'MRB Disposition',
  'Python', 'Streamlit', 'ABAQUS FEA', 'Lean Principles',
  'Prepreg Layup', 'CMM Inspection',
];

function Hero() {
  const [ref, seen] = useInView({ threshold: 0.1 });
  return (
    <section id="top" className="hero" ref={ref}>
      <HeroBackdrop />
      <div className="container hero__inner">

        <div className="cs__header">
          <div className="badge badge--status">
            <span className="badge__dot"></span>
            Open to Full-Time Roles
          </div>
          <p className="cs__kicker mono">ABOUT</p>
        </div>

        <h1 className="cs__title">About Me</h1>

        <div className={`cs__card ${seen ? 'is-seen' : ''}`}>

          {/* ── Left: Photo ── */}
          <div className="cs__photo-col">
            <div className="cs__photo-frame">
              <img src="headshot.jpg" alt="Siddardth Pathipaka" className="cs__photo-img" />
            </div>
            <div className="cs__photo-overlay">
              <div>
                <p className="cs__photo-name">Siddardth Pathipaka</p>
                <p className="cs__photo-role mono">QUALITY ENGINEER</p>
              </div>
              <span className="cs__level mono">GB ★</span>
            </div>
          </div>

          {/* ── Right: Info ── */}
          <div className="cs__info-col">

            <p className="cs__bio">
              Hi, I'm <strong>Siddardth Pathipaka</strong>, an M.S. Aerospace Engineering
              candidate at <span className="cs__accent">UIUC</span>. I specialize in quality
              systems, Six Sigma methodology, and composites manufacturing — from{' '}
              <strong>8D problem-solving that cut nonconformance cycle time by 22%</strong> at
              Tata Boeing Aerospace, to building live SPC and pFMEA tools that automate what
              engineers do in spreadsheets.
            </p>

            <div className="cs__section">
              <p className="cs__section-title mono">EDUCATION</p>
              <div className="cs__badges">
                <span className="cs__badge mono">🎓 UIUC · M.S. Aerospace Engineering · 2024–2026</span>
                <span className="cs__badge mono">🎓 VNR VJIET · B.Tech Mechanical Engineering · 2019–2023</span>
              </div>
            </div>

            <div className="cs__section">
              <p className="cs__section-title mono">CERTIFICATIONS</p>
              <div className="cs__badges">
                <span className="cs__badge cs__badge--green mono">★ Six Sigma Green Belt · CSSC</span>
                <span className="cs__badge cs__badge--orange mono">★ Inspection &amp; Quality Control · NPTEL · IIT Roorkee</span>
              </div>
            </div>

            <div className="cs__section">
              <p className="cs__section-title mono">SKILLS</p>
              <div className="cs__chips">
                {CS_SKILLS.map(s => <span key={s} className="cs__chip">{s}</span>)}
              </div>
            </div>

            <div className="cs__section">
              <p className="cs__section-title mono">CONNECT</p>
              <div className="cs__connect">
                <a href="https://linkedin.com/in/siddardth-pathipaka" target="_blank"
                   rel="noreferrer" className="cs__icon-btn" aria-label="LinkedIn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                <a href="mailto:siddardth1524@gmail.com" className="cs__icon-btn" aria-label="Email" rel="noreferrer">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </a>
                <a href="https://github.com/Siddardth7" target="_blank"
                   rel="noreferrer" className="cs__icon-btn" aria-label="GitHub">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.7 18 5 18 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 0z"/>
                  </svg>
                </a>
                <a href={RESUME_URL} className="btn btn--primary btn--sm cs__resume-btn" target="_blank" rel="noreferrer">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M3 6h6M6 3v6M6 9l-2-2M6 9l2-2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                  </svg>
                  Resume
                </a>
                <a className="btn btn--ghost btn--sm" href="#lab">
                  View My Work
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M3 6h6M9 6l-3-3M9 6l-3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                  </svg>
                </a>
              </div>
            </div>

            <p className="cs__footer-tagline mono">
              Tata Boeing Aerospace · UIUC · Beckman Institute · 160+ Unit Tests
            </p>

          </div>
        </div>

      </div>
      <SectionRail />
    </section>
  );
}

function HeroBackdrop() {
  return (
    <div className="hero__backdrop" aria-hidden="true">
      <div className="hero__grid-bg"></div>
      <svg className="hero__crosshair" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="crossfade">
            <stop offset="0%" stopColor="rgba(59,130,246,0.18)"/>
            <stop offset="60%" stopColor="rgba(59,130,246,0)"/>
          </radialGradient>
        </defs>
        <circle cx="900" cy="400" r="360" fill="url(#crossfade)"/>
      </svg>
    </div>
  );
}

// Quality Engineering Dashboard — replaces the composite weave in the hero.
// Immediately communicates "quality engineering" to any hiring manager.
// DMAIC phases are clickable; SPC chart animates live.
function QualityDashboard() {
  const [tick, setTick] = useState(0);
  const [activePhase, setActivePhase] = useState(2);
  const [hoveredPhase, setHoveredPhase] = useState(null);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 700);
    return () => clearInterval(id);
  }, []);

  const phases = [
    { label: 'Define',   letter: 'D', color: '#60a5fa' },
    { label: 'Measure',  letter: 'M', color: '#34d399' },
    { label: 'Analyze',  letter: 'A', color: '#fbbf24' },
    { label: 'Improve',  letter: 'I', color: '#f87171' },
    { label: 'Control',  letter: 'C', color: '#a78bfa' },
  ];

  const spcPoints = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => {
      const v = Math.sin((tick * 0.28 + i) * 0.75) * 11 + Math.sin((tick * 0.18 + i) * 1.5) * 5;
      return 55 + v;
    });
  }, [tick]);

  const cpk  = (1.28 + Math.sin(tick * 0.14) * 0.17).toFixed(2);
  const yld  = (99.3 + Math.sin(tick * 0.09) * 0.4).toFixed(1);
  const ppm  = Math.round(6720 - Math.sin(tick * 0.07) * 420);
  const shown = hoveredPhase !== null ? hoveredPhase : activePhase;

  return (
    <div className="qdash" aria-hidden="true">
      <div className="qdash__chrome">
        <span className="mono">QMS · LIVE DASHBOARD</span>
        <span className="mono qdash__status">
          <span className="dot dot--green"></span>MONITORING
        </span>
      </div>
      <div className="qdash__dmaic">
        {phases.map((p, i) => (
          <button
            key={p.label}
            className={`qdash__phase ${activePhase === i ? 'is-active' : ''}`}
            style={{ '--phase-color': p.color }}
            onClick={() => setActivePhase(i)}
            onMouseEnter={() => setHoveredPhase(i)}
            onMouseLeave={() => setHoveredPhase(null)}
          >
            <span className="qdash__phase-dot"></span>
            <span>{p.letter}</span>
          </button>
        ))}
        <span className="qdash__phase-label mono">{phases[shown].label.toUpperCase()}</span>
      </div>
      <svg viewBox="0 0 320 100" className="qdash__spc">
        <line x1="8" y1="28" x2="304" y2="28" stroke="rgba(245,158,11,0.3)" strokeWidth="1" strokeDasharray="3 3"/>
        <line x1="8" y1="55" x2="304" y2="55" stroke="rgba(245,158,11,0.55)" strokeWidth="1"/>
        <line x1="8" y1="82" x2="304" y2="82" stroke="rgba(245,158,11,0.3)" strokeWidth="1" strokeDasharray="3 3"/>
        <text x="308" y="31" fontFamily="JetBrains Mono" fontSize="7" fill="rgba(245,158,11,0.6)">UCL</text>
        <text x="308" y="58" fontFamily="JetBrains Mono" fontSize="7" fill="rgba(245,158,11,0.6)">x̄</text>
        <text x="308" y="85" fontFamily="JetBrains Mono" fontSize="7" fill="rgba(245,158,11,0.6)">LCL</text>
        <polyline
          points={spcPoints.map((y, i) => `${12 + i * 18},${y}`).join(' ')}
          fill="none" stroke={phases[activePhase].color} strokeWidth="1.5"
          style={{ transition: 'stroke 0.3s' }}
        />
        {spcPoints.map((y, i) => (
          <circle key={i} cx={12 + i * 18} cy={y} r="2.2"
            fill={phases[activePhase].color} style={{ transition: 'fill 0.3s' }}/>
        ))}
        <text x="8" y="12" fontFamily="JetBrains Mono" fontSize="8" fill="rgba(255,255,255,0.3)">X̄-R CONTROL CHART · LIVE</text>
      </svg>
      <div className="qdash__metrics">
        <div className="qdash__met">
          <span className="qdash__met-val" style={{ color: '#34d399' }}>{cpk}</span>
          <span className="mono qdash__met-lbl">Cpk</span>
        </div>
        <div className="qdash__met">
          <span className="qdash__met-val" style={{ color: '#60a5fa' }}>{yld}%</span>
          <span className="mono qdash__met-lbl">Yield</span>
        </div>
        <div className="qdash__met">
          <span className="qdash__met-val" style={{ color: '#fbbf24' }}>{ppm.toLocaleString()}</span>
          <span className="mono qdash__met-lbl">PPM</span>
        </div>
        <div className="qdash__met">
          <span className="qdash__met-val" style={{ color: '#a78bfa' }}>6σ</span>
          <span className="mono qdash__met-lbl">Belt</span>
        </div>
      </div>
      <p className="mono qdash__hint">▸ CLICK DMAIC PHASES · LIVE METRICS</p>
    </div>
  );
}

// Interactive composite weave + airfoil pressure plot — replaces the radar.
// Mouse moves the AOA/inspection point; the weave stress field updates live.
function CompositeWeave() {
  const [pt, setPt] = useState({ x: 0.62, y: 0.42 });
  const wrapRef = useRef(null);
  const onMove = (e) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = Math.max(0.06, Math.min(0.94, (e.clientX - r.left) / r.width));
    const y = Math.max(0.08, Math.min(0.92, (e.clientY - r.top) / r.height));
    setPt({ x, y });
  };
  // derive readouts from cursor
  const aoa = ((pt.x - 0.5) * 18).toFixed(1); // -9° to +9°
  const cl = (0.42 + (pt.x) * 0.55).toFixed(2);
  const stress = Math.round(40 + (1 - pt.y) * 60); // ksi
  const cpk = (1.05 + (pt.x * 0.7)).toFixed(2);

  // 8x8 weave grid; cell stress = falloff from cursor → tints cells
  const cells = useMemo(() => {
    const arr = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const cx = (c + 0.5) / 8, cy = (r + 0.5) / 8;
        const d = Math.hypot(cx - pt.x, cy - pt.y);
        const intensity = Math.max(0, 1 - d * 2.4);
        arr.push({ r, c, intensity });
      }
    }
    return arr;
  }, [pt.x, pt.y]);

  return (
    <div className="weave" ref={wrapRef} onMouseMove={onMove} aria-hidden="true">
      <div className="weave__chrome">
        <span className="weave__chrome-id mono">CFRP_LAYUP · LIVE_FEM</span>
        <span className="weave__chrome-status mono"><span className="dot dot--green"></span>SOLVING</span>
      </div>
      <svg viewBox="0 0 320 320" className="weave__svg">
        <defs>
          <linearGradient id="wgr" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(59,130,246,0.05)"/>
            <stop offset="100%" stopColor="rgba(59,130,246,0)"/>
          </linearGradient>
          <radialGradient id="hot">
            <stop offset="0%" stopColor="#fbbf24"/>
            <stop offset="60%" stopColor="rgba(245,158,11,0.5)"/>
            <stop offset="100%" stopColor="rgba(245,158,11,0)"/>
          </radialGradient>
        </defs>
        <rect width="320" height="320" fill="url(#wgr)"/>

        {/* weave cells */}
        {cells.map(({ r, c, intensity }) => {
          const x = 24 + c * 34, y = 24 + r * 34;
          const fill = intensity > 0.55
            ? `rgba(245,158,11,${intensity * 0.55})`
            : `rgba(59,130,246,${0.06 + intensity * 0.3})`;
          const stroke = intensity > 0.4 ? 'rgba(245,158,11,0.55)' : 'rgba(59,130,246,0.28)';
          return (
            <g key={`${r}-${c}`}>
              <rect x={x} y={y} width="30" height="30" fill={fill} stroke={stroke} strokeWidth="0.7" rx="1.5"/>
              {/* warp/weft fibers */}
              {(r + c) % 2 === 0 ? (
                <line x1={x + 2} y1={y + 15} x2={x + 28} y2={y + 15} stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
              ) : (
                <line x1={x + 15} y1={y + 2} x2={x + 15} y2={y + 28} stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
              )}
            </g>
          );
        })}

        {/* airfoil overlay */}
        <path d="M30 200 Q 110 138 200 156 Q 270 168 290 188 Q 240 196 180 196 Q 100 196 30 200 Z"
              fill="rgba(59,130,246,0.07)" stroke="rgba(96,165,250,0.55)" strokeWidth="1.2"/>

        {/* cursor reticle */}
        <g style={{ transform: `translate(${pt.x * 320}px, ${pt.y * 320}px)` }} className="weave__cursor">
          <circle r="34" fill="url(#hot)"/>
          <circle r="11" fill="none" stroke="#fbbf24" strokeWidth="1.2"/>
          <circle r="3" fill="#fbbf24"/>
          <line x1="-22" y1="0" x2="-14" y2="0" stroke="#fbbf24" strokeWidth="1.2"/>
          <line x1="14" y1="0" x2="22" y2="0" stroke="#fbbf24" strokeWidth="1.2"/>
          <line x1="0" y1="-22" x2="0" y2="-14" stroke="#fbbf24" strokeWidth="1.2"/>
          <line x1="0" y1="14" x2="0" y2="22" stroke="#fbbf24" strokeWidth="1.2"/>
        </g>

        {/* corner brackets */}
        <g stroke="rgba(96,165,250,0.6)" strokeWidth="1" fill="none">
          <path d="M14 26 V 14 H 26"/>
          <path d="M306 26 V 14 H 294"/>
          <path d="M14 294 V 306 H 26"/>
          <path d="M306 294 V 306 H 294"/>
        </g>
      </svg>

      <div className="weave__readouts">
        <div className="weave__r"><span className="mono hud__dim">AOA</span><span className="mono">{aoa}°</span></div>
        <div className="weave__r"><span className="mono hud__dim">Cl</span><span className="mono">{cl}</span></div>
        <div className="weave__r"><span className="mono hud__dim">σ</span><span className="mono">{stress} ksi</span></div>
        <div className="weave__r"><span className="mono hud__dim">Cpk</span><span className="mono">{cpk}</span></div>
      </div>
      <p className="weave__hint mono">▸ MOVE CURSOR · LIVE STRESS FIELD</p>
    </div>
  );
}

// Section rail — full-width interactive horizontal section index at bottom of hero.
// Replaces the small HUD scroll bar with a big legible bar.
function SectionRail() {
  const sections = [
    { id: 'lab', n: '01', label: 'Lab' },
    { id: 'code', n: '02', label: 'Code' },
    { id: 'experience', n: '03', label: 'Experience' },
    { id: 'contact', n: '04', label: 'Contact' },
  ];
  const progress = useScrollProgress();
  return (
    <div className="section-rail" aria-hidden="true">
      <div className="container section-rail__inner">
        <span className="section-rail__lbl mono">EXPLORE</span>
        <div className="section-rail__track">
          <div className="section-rail__fill" style={{ width: `${Math.min(100, progress * 100)}%` }}></div>
          {sections.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="section-rail__node"
              style={{ left: `${(i + 1) / (sections.length + 1) * 100}%` }}
            >
              <span className="section-rail__node-dot"></span>
              <span className="section-rail__node-num mono">{s.n}</span>
              <span className="section-rail__node-lbl">{s.label}</span>
            </a>
          ))}
        </div>
        <span className="section-rail__pct mono">{(progress * 100).toFixed(0)}%</span>
      </div>
    </div>
  );
}

function Headshot({ style }) {
  return (
    <div className={`headshot headshot--${style}`}>
      <div className="headshot__frame">
        <svg className="headshot__placeholder" viewBox="0 0 320 380" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <pattern id="diag" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            </pattern>
            <linearGradient id="hsg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1c1c20"/>
              <stop offset="100%" stopColor="#0e0e10"/>
            </linearGradient>
          </defs>
          <rect width="320" height="380" fill="url(#hsg)"/>
          <rect width="320" height="380" fill="url(#diag)"/>
          <circle cx="160" cy="148" r="56" fill="rgba(255,255,255,0.06)"/>
          <path d="M60 380 C 60 280, 100 230, 160 230 C 220 230, 260 280, 260 380 Z" fill="rgba(255,255,255,0.06)"/>
        </svg>
        <div className="headshot__brackets" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
        </div>
        <div className="headshot__label mono">
          <span>SUBJECT_01</span>
          <span>320 × 380</span>
        </div>
        <div className="headshot__telemetry mono">
          <span>FOCUS · LOCKED</span>
          <span className="headshot__telemetry-dot"></span>
        </div>
      </div>
      <div className="headshot__meta mono">
        <div className="headshot__meta-row"><span className="hud__dim">LOC</span><span>Champaign · IL</span></div>
        <div className="headshot__meta-row"><span className="hud__dim">EDU</span><span>M.S. Aero · UIUC</span></div>
        <div className="headshot__meta-row"><span className="hud__dim">REF</span><span>SP–2026.04</span></div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Section header
// ─────────────────────────────────────────────────────────
function SectionHeader({ kicker, title, subtitle, accent, count }) {
  return (
    <div className={`section-header section-header--${accent || 'blue'}`}>
      <div className="section-header__top">
        <div className="section-header__kicker">
          <span className="section-header__rule"></span>
          <span className="mono">{kicker}</span>
        </div>
        {count && <span className="section-header__count mono">[ {count} ]</span>}
      </div>
      <h2 className="section-header__title">{title}</h2>
      {subtitle && <p className="section-header__sub">{subtitle}</p>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Built in the Lab — interactive workbench
// ─────────────────────────────────────────────────────────
const LAB_PROJECTS = [
  {
    n: '01', tag: 'Competition', detailId: 'lab-sampe',
    title: 'SAMPE Fuselage Competition',
    role: 'Manufacturing Lead', date: 'Jan–May 2025',
    metricBits: [['2,700', 'lbf load'], ['38%', 'deflection ↓']],
    description: '2,700 lbf structural test · 38% deflection reduction. Carbon fiber/epoxy composite fuselage manufactured under autoclave cure with ply-drop optimization.',
    schematic: 'fuselage',
  },
  {
    n: '02', tag: 'Competition', detailId: 'lab-esvc',
    title: 'Electric Solar Vehicle Championship',
    role: 'Manufacturing Lead', date: '2019–2023',
    metricBits: [['7th', 'national'], ['180.43', '/200 cross pad']],
    description: '7th place nationally · 180.43/200 Cross Pad · zero mechanical failures across four-year campaign.',
    schematic: 'vehicle',
  },
  {
    n: '03', tag: 'Academic', detailId: 'lab-borosilicate',
    title: 'Borosilicate Glass-Ceramic Composites',
    role: 'Project Lead', date: 'Aug 2022–Apr 2023',
    metricBits: [['+27%', 'hardness'], ['24', 'formulations']],
    description: '27% hardness improvement (548→699 HV) across 24 powder-metallurgy formulations with sintering-cycle DOE.',
    schematic: 'specimen',
  },
  {
    n: '04', tag: 'Academic', detailId: 'lab-aero',
    title: 'SAE Aero Design Challenge',
    role: 'CFD Lead', date: 'Aug 2021–Mar 2022',
    metricBits: [['85%', 'CFD ↔ theory'], ['92"', 'tapered wing']],
    description: '85% CFD-to-theory correlation · 92" tapered wing validated in ANSYS Fluent against Prandtl lifting-line.',
    schematic: 'wing',
  },
];

function LabSection() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(0);
  const [ref, seen] = useInView();

  const handleSelect = (i) => {
    setPrev(active);
    setActive(i);
  };

  return (
    <section id="lab" className="section section--lab" ref={ref}>
      <div className="container">
        <SectionHeader
          kicker="01 / HARDWARE · 2021–2025"
          title={<>Projects Built in the Lab<span className="title-cursor" aria-hidden="true"></span></>}
          subtitle="From competition floors to university labs — hands-on engineering with measurable results."
          accent="green"
          count={`04 PROJECTS`}
        />

        <div className={`workbench ${seen ? 'is-seen' : ''}`}>
          <aside className="workbench__list" role="tablist" aria-label="Lab projects">
            {LAB_PROJECTS.map((p, i) => (
              <button
                key={p.n}
                role="tab"
                aria-selected={active === i}
                className={`workbench__tab ${active === i ? 'is-active' : ''}`}
                onClick={() => handleSelect(i)}
                onMouseEnter={() => handleSelect(i)}
              >
                <span className="workbench__tab-num mono">{p.n}</span>
                <div className="workbench__tab-body">
                  <span className={`chip chip--${p.tag.toLowerCase()}`}>{p.tag}</span>
                  <span className="workbench__tab-title">{p.title}</span>
                  <span className="workbench__tab-meta mono">{p.date}</span>
                </div>
                {active === i && <span className="workbench__tab-rule" aria-hidden="true"></span>}
              </button>
            ))}
          </aside>

          <div className="workbench__panel">
            <div className="workbench__panel-head">
              <div className="workbench__panel-bar" aria-hidden="true">
                <span></span><span></span><span></span>
              </div>
              <span className="mono workbench__panel-id">PROJ_{LAB_PROJECTS[active].n} · LAB</span>
              <span className="mono workbench__panel-status">
                <span className="dot dot--green"></span>
                ARCHIVED · DATA LOCKED
              </span>
            </div>

            <div className="workbench__panel-body" key={active}>
              <div className="workbench__visual">
                <Schematic kind={LAB_PROJECTS[active].schematic} index={active} />
              </div>
              <div className="workbench__details">
                <h3 className="workbench__title">{LAB_PROJECTS[active].title}</h3>
                <p className="workbench__role mono">
                  {LAB_PROJECTS[active].role} <span className="dot-sep">·</span> {LAB_PROJECTS[active].date}
                </p>
                <p className="workbench__desc">{LAB_PROJECTS[active].description}</p>
                <div className="workbench__metrics">
                  {LAB_PROJECTS[active].metricBits.map(([num, lbl], i) => (
                    <div key={i} className="metric-pill metric-pill--lg">
                      <span className="metric-pill__num">{num}</span>
                      <span className="metric-pill__lbl">{lbl}</span>
                    </div>
                  ))}
                </div>
                <button className="link link--green link--btn" onClick={() => window.openDetail(LAB_PROJECTS[active].detailId)}>
                  View Case Study
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                    <path d="M3 6.5h7M10 6.5l-3-3M10 6.5l-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Schematic({ kind, index }) {
  const [highlight, setHighlight] = useState(null);
  const common = (
    <defs>
      <pattern id={`schem-grid-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M20 0H0V20" fill="none" stroke="rgba(16,185,129,0.07)" strokeWidth="1"/>
      </pattern>
    </defs>
  );
  const hl = (id) => highlight === id;
  const hProps = (id) => ({
    onMouseEnter: () => setHighlight(id),
    onMouseLeave: () => setHighlight(null),
    onClick: () => setHighlight(hl(id) ? null : id),
    style: { cursor: 'pointer' },
  });

  return (
    <svg className="schematic" viewBox="0 0 480 320" key={`${kind}-${index}`}>
      {common}
      <rect width="480" height="320" fill={`url(#schem-grid-${index})`}/>
      {kind === 'fuselage' && (
        <g className="schem-anim">
          <path d="M40 160 Q 100 120 200 120 L 380 120 Q 420 120 440 140 L 440 180 Q 420 200 380 200 L 200 200 Q 100 200 40 160 Z"
                fill={hl('body') ? 'rgba(16,185,129,0.12)' : 'rgba(16,185,129,0.04)'}
                stroke="#10b981" strokeWidth="1.5"
                {...hProps('body')}/>
          <line x1="60" y1="160" x2="430" y2="160" stroke="rgba(16,185,129,0.4)" strokeWidth="1" strokeDasharray="4 4"/>
          {[140, 145, 150, 170, 175, 180].map((y, i) => (
            <line key={i} x1="80" y1={y} x2="420" y2={y} stroke="rgba(16,185,129,0.25)" strokeWidth="0.6"/>
          ))}
          {[120, 240, 360].map((x, i) => (
            <g key={i} stroke={hl(`arrow-${i}`) ? '#34d399' : '#34d399'} strokeWidth="1.3" fill="none"
               style={{ opacity: hl(`arrow-${i}`) ? 1 : 0.7, cursor: 'pointer', transition: 'opacity 0.2s' }}
               {...hProps(`arrow-${i}`)}>
              <path d={`M${x} 90 L${x} 115 M${x-5} 110 L${x} 117 L${x+5} 110`}/>
            </g>
          ))}
          <text x="240" y="80" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,0.4)" letterSpacing="2">2,700 LBF · UNIFORM</text>
          <text x="240" y="240" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(16,185,129,0.7)" letterSpacing="2">CFRP / 12-PLY / AUTOCLAVE</text>
          {hl('body') && <text x="240" y="165" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(52,211,153,0.9)" letterSpacing="1">38% DEFLECTION ↓</text>}
        </g>
      )}
      {kind === 'vehicle' && (
        <g className="schem-anim">
          <path d="M60 200 L 100 200 L 130 170 L 350 170 L 380 200 L 420 200" fill="none" stroke="#10b981" strokeWidth="1.5"/>
          <rect x="160" y="120" width="160" height="50"
                fill={hl('solar') ? 'rgba(16,185,129,0.14)' : 'rgba(16,185,129,0.04)'}
                stroke="rgba(16,185,129,0.6)" strokeWidth="1"
                {...hProps('solar')}/>
          {[0,1,2,3,4,5,6,7].map(i => (
            <line key={i} x1={165 + i*20} y1="125" x2={165 + i*20} y2="165" stroke="rgba(16,185,129,0.5)" strokeWidth="0.8"/>
          ))}
          {[{cx:125},{cx:355}].map((w, i) => (
            <g key={i} {...hProps(`wheel-${i}`)} style={{cursor:'pointer'}}>
              <circle cx={w.cx} cy="220" r="22" fill={hl(`wheel-${i}`) ? 'rgba(16,185,129,0.1)' : 'none'} stroke="#10b981" strokeWidth="1.5"/>
              <circle cx={w.cx} cy="220" r="10" fill="none" stroke="rgba(16,185,129,0.4)"/>
            </g>
          ))}
          {hl('solar') && <text x="240" y="145" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="rgba(52,211,153,0.9)">SOLAR ARRAY · 160W</text>}
          <text x="240" y="50" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,0.4)" letterSpacing="2">RANK 7 / 200 PT · CROSS PAD</text>
          <text x="240" y="288" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(16,185,129,0.7)" letterSpacing="2">CHASSIS · CFRP MONOCOQUE</text>
        </g>
      )}
      {kind === 'specimen' && (
        <g className="schem-anim">
          {Array.from({length: 24}).map((_, i) => {
            const c = i % 6, r = Math.floor(i / 6);
            const x = 100 + c * 50, y = 80 + r * 50;
            const intensity = (i / 24);
            const isHl = hl(`cell-${i}`);
            return (
              <g key={i} {...hProps(`cell-${i}`)}>
                <rect x={x} y={y} width="36" height="36"
                      fill={isHl ? `rgba(16,185,129,${0.3 + intensity * 0.4})` : `rgba(16,185,129,${0.05 + intensity * 0.35})`}
                      stroke={isHl ? '#34d399' : 'rgba(16,185,129,0.5)'} strokeWidth={isHl ? 1.2 : 0.7}/>
                <text x={x+18} y={y+22} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="rgba(255,255,255,0.45)">{String(i+1).padStart(2,'0')}</text>
                {isHl && <text x={x+18} y={y+33} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6" fill="rgba(52,211,153,0.9)">{Math.round(548 + (i/23)*151)} HV</text>}
              </g>
            );
          })}
          <text x="240" y="60" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,0.4)" letterSpacing="2">FORMULATION MATRIX · 24×</text>
          <text x="240" y="300" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(16,185,129,0.7)" letterSpacing="2">548 → 699 HV · +27%</text>
        </g>
      )}
      {kind === 'wing' && (
        <g className="schem-anim">
          <path d="M60 160 L 60 178 L 240 175 L 420 168 L 420 152 L 240 145 L 60 142 Z"
                fill={hl('wing') ? 'rgba(16,185,129,0.10)' : 'rgba(16,185,129,0.04)'}
                stroke="#10b981" strokeWidth="1.5"
                {...hProps('wing')}/>
          {[80, 130, 180, 230, 280, 330, 380].map((x, i) => (
            <line key={i} x1={x} y1={142 + i*0.3} x2={x} y2={178 - i*0.3}
                  stroke={hl('wing') ? 'rgba(52,211,153,0.7)' : 'rgba(16,185,129,0.4)'} strokeWidth="0.7"/>
          ))}
          {[100, 110, 200, 210, 220].map((y, i) => (
            <path key={i} d={`M30 ${y} Q 240 ${y - 8} 450 ${y - 4}`} fill="none"
                  stroke={`rgba(52,211,153,${0.4 - i*0.05})`} strokeWidth="0.8" className={`stream stream-${i}`}/>
          ))}
          {hl('wing') && <text x="240" y="132" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(52,211,153,0.9)">CL=1.24 · α=4.2°</text>}
          <text x="240" y="60" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,0.4)" letterSpacing="2">CL · 92" SPAN · TAPERED</text>
          <text x="240" y="290" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(16,185,129,0.7)" letterSpacing="2">CFD ↔ THEORY · 85% MATCH</text>
        </g>
      )}
      <g stroke="rgba(16,185,129,0.5)" strokeWidth="1" fill="none">
        <path d="M10 22 V 10 H 22"/>
        <path d="M470 22 V 10 H 458"/>
        <path d="M10 298 V 310 H 22"/>
        <path d="M470 298 V 310 H 458"/>
      </g>
    </svg>
  );
}
// ─────────────────────────────────────────────────────────
// Built in Code — terminal stack with live SPC chart
// ─────────────────────────────────────────────────────────
const CODE_TOOLS = [
  {
    n: '01', name: 'FMEA Risk Analyzer', detailId: 'code-fmea',
    purpose: 'Automates AIAG FMEA-4 risk priority calculation and Pareto analysis from imported failure-mode data.',
    stack: ['Python', 'Streamlit', 'Plotly', 'AIAG FMEA-4'],
    metric: '78', metricLbl: 'unit tests',
    hasDemo: true, viz: 'pareto',
    demoUrl: 'https://fmea-risk-analyzer-mhwzcki9sdzfz5d8rbzsdn.streamlit.app/',
    githubUrl: 'https://github.com/Siddardth7/fmea-risk-analyzer',
  },
  {
    n: '02', name: 'SPC Manufacturing Dashboard', detailId: 'code-spc',
    purpose: 'Live X̄-R, X̄-S, p, np, and c charts with rolling Cp/Cpk capability indices for production lots.',
    stack: ['Python', 'Streamlit', '5 chart types', 'Cp/Cpk'],
    metric: '83', metricLbl: 'unit tests',
    hasDemo: true, viz: 'spc',
    demoUrl: 'https://manufacturing-spc-dashboard-k8hyyj2fylnvjfrpcgqhyr.streamlit.app',
    githubUrl: 'https://github.com/Siddardth7/manufacturing-spc-dashboard',
  },
  {
    n: '03', name: 'Virtual Composite Design Toolkit', detailId: 'code-composite',
    purpose: 'Classical Lamination Theory layup optimizer cross-validated against CalculiX FEA via simulated annealing.',
    stack: ['Python', 'CLT', 'CalculiX FEA', 'Simulated Annealing'],
    metric: '<1%', metricLbl: 'FEA error',
    hasDemo: false, viz: 'layup',
    githubUrl: 'https://github.com/Siddardth7/Virtual-Composite-Design-Optimization',
  },
];

function CodeSection() {
  return (
    <section id="code" className="section section--code">
      <div className="container">
        <SectionHeader
          kicker="02 / SOFTWARE · DEPLOYED"
          title={<>Built Projects in Code<span className="title-cursor title-cursor--amber" aria-hidden="true"></span></>}
          subtitle={<>I build the tools quality engineers wish they had. Each runs live — built in Python, deployed on Streamlit, with <strong style={{color:'var(--amber-1)'}}>160+ unit tests</strong> across all three.</>}
          accent="amber"
          count="03 TOOLS"
        />
        <div className="code-grid">
          {CODE_TOOLS.map((t, i) => <CodeCard key={t.n} {...t} delay={i * 80} />)}
        </div>
      </div>
    </section>
  );
}

function CodeCard({ n, name, purpose, stack, metric, metricLbl, hasDemo, viz, delay, demoUrl, githubUrl, detailId }) {
  const [ref, seen] = useInView({ threshold: 0.25 });
  const [hover, setHover] = useState(false);
  return (
    <article
      ref={ref}
      className={`code-card ${seen ? 'is-seen' : ''} ${hover ? 'is-hover' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <header className="code-card__terminal">
        <div className="code-card__dots" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
        <span className="code-card__path mono">~/tools/{name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-+$/,'')}.py</span>
        <span className="code-card__index mono">{n}</span>
      </header>

      <div className="code-card__viz">
        {viz === 'pareto' && <ParetoViz hover={hover} />}
        {viz === 'spc' && <SPCViz hover={hover} />}
        {viz === 'layup' && <LayupViz hover={hover} />}
      </div>

      <div className="code-card__body">
        <h3 className="code-card__title">{name}</h3>
        <p className="code-card__purpose">{purpose}</p>
        <div className="code-card__stack">
          {stack.map((s) => <span key={s} className="stack-chip mono">{s}</span>)}
        </div>
        <div className="code-card__metric">
          <span className="code-card__metric-num">{metric}</span>
          <span className="code-card__metric-lbl mono">{metricLbl}</span>
        </div>
      </div>

      <footer className="code-card__actions">
        {hasDemo ? (
          <a className="btn btn--amber btn--sm" href={demoUrl} target="_blank" rel="noreferrer">
            <span className="btn__pulse" aria-hidden="true"></span>
            Live Demo
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <path d="M4 7l3-3M7 4H4.5M7 4v2.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
            </svg>
          </a>
        ) : (
          <span className="btn btn--disabled btn--sm mono">Source-only</span>
        )}
        <a className="btn btn--ghost btn--sm" href={githubUrl} target="_blank" rel="noreferrer">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            <path d="M6 0a6 6 0 0 0-1.9 11.7c.3.05.4-.13.4-.29v-1c-1.66.36-2-.8-2-.8-.27-.69-.66-.87-.66-.87-.55-.37.04-.36.04-.36.6.04.92.62.92.62.54.92 1.4.65 1.74.5.05-.39.21-.65.38-.8-1.32-.15-2.71-.66-2.71-2.94 0-.65.23-1.18.62-1.6-.06-.15-.27-.76.06-1.59 0 0 .5-.16 1.65.61a5.7 5.7 0 0 1 3 0c1.14-.77 1.65-.61 1.65-.61.33.83.12 1.44.06 1.59.38.42.62.95.62 1.6 0 2.29-1.4 2.79-2.72 2.94.21.18.4.54.4 1.09v1.62c0 .16.1.34.4.28A6 6 0 0 0 6 0Z"/>
          </svg>
          GitHub
        </a>
        <button className="btn btn--ghost btn--sm" onClick={() => window.openDetail(detailId)}>
          Case Study
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M3 6h6M9 6l-3-3M9 6l-3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
          </svg>
        </button>
      </footer>
    </article>
  );
}

function ParetoViz({ hover }) {
  const bars = [78, 64, 51, 38, 24, 12];
  return (
    <svg viewBox="0 0 280 120" className="viz">
      <line x1="20" y1="100" x2="270" y2="100" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
      <line x1="20" y1="20" x2="20" y2="100" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
      {bars.map((h, i) => (
        <rect key={i} x={30 + i*40} y={100 - h} width="28" height={h}
              fill={hover ? '#fbbf24' : '#f59e0b'} opacity={0.4 + (bars.length - i) * 0.1}
              style={{ transition: 'all 0.4s', transform: hover ? `translateY(-${i*0.5}px)` : 'none' }}/>
      ))}
      {/* cumulative line */}
      <polyline
        points={bars.reduce((acc, _, i) => {
          const cum = bars.slice(0, i+1).reduce((s,v)=>s+v,0) / bars.reduce((s,v)=>s+v,0);
          return acc + ` ${44 + i*40},${100 - cum*78}`;
        }, '').trim()}
        fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
      {bars.map((_, i) => {
        const cum = bars.slice(0, i+1).reduce((s,v)=>s+v,0) / bars.reduce((s,v)=>s+v,0);
        return <circle key={i} cx={44 + i*40} cy={100 - cum*78} r="2.5" fill="#fbbf24"/>;
      })}
      <text x="20" y="14" fontFamily="JetBrains Mono" fontSize="8" fill="rgba(255,255,255,0.4)">RPN · pareto</text>
    </svg>
  );
}

function SPCViz({ hover }) {
  // animated SPC chart
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), hover ? 200 : 600);
    return () => clearInterval(id);
  }, [hover]);
  const points = useMemo(() => {
    const seed = tick;
    return Array.from({length: 18}, (_, i) => {
      const noise = Math.sin((seed + i) * 0.7) * 12 + Math.sin((seed + i) * 1.3) * 6;
      return 60 + noise;
    });
  }, [tick]);
  return (
    <svg viewBox="0 0 280 120" className="viz">
      {/* control limits */}
      <line x1="10" y1="40" x2="270" y2="40" stroke="rgba(245,158,11,0.4)" strokeWidth="1" strokeDasharray="3 3"/>
      <line x1="10" y1="80" x2="270" y2="80" stroke="rgba(245,158,11,0.4)" strokeWidth="1" strokeDasharray="3 3"/>
      <line x1="10" y1="60" x2="270" y2="60" stroke="rgba(245,158,11,0.5)" strokeWidth="1"/>
      <text x="272" y="42" fontFamily="JetBrains Mono" fontSize="7" fill="rgba(245,158,11,0.6)">UCL</text>
      <text x="272" y="62" fontFamily="JetBrains Mono" fontSize="7" fill="rgba(245,158,11,0.6)">x̄</text>
      <text x="272" y="82" fontFamily="JetBrains Mono" fontSize="7" fill="rgba(245,158,11,0.6)">LCL</text>
      <polyline
        points={points.map((y, i) => `${15 + i * 14},${y}`).join(' ')}
        fill="none" stroke="#fbbf24" strokeWidth="1.5"
      />
      {points.map((y, i) => (
        <circle key={i} cx={15 + i * 14} cy={y} r="2" fill="#fbbf24"/>
      ))}
      <text x="10" y="14" fontFamily="JetBrains Mono" fontSize="8" fill="rgba(255,255,255,0.4)">x̄-R · live</text>
      <text x="220" y="14" fontFamily="JetBrains Mono" fontSize="8" fill="rgba(245,158,11,0.7)">Cpk 1.41</text>
    </svg>
  );
}

function LayupViz({ hover }) {
  const angles = [0, 45, -45, 90, 90, -45, 45, 0];
  return (
    <svg viewBox="0 0 280 120" className="viz">
      <text x="10" y="14" fontFamily="JetBrains Mono" fontSize="8" fill="rgba(255,255,255,0.4)">[0/±45/90]s · CLT</text>
      {angles.map((a, i) => {
        const y = 30 + i * 9;
        return (
          <g key={i} transform={`translate(20, ${y})`}>
            <rect x="0" y="0" width="240" height="6" fill="rgba(245,158,11,0.06)" stroke="rgba(245,158,11,0.3)" strokeWidth="0.5"/>
            {/* fiber direction lines */}
            <g style={{ transformOrigin: '120px 3px' }}>
              {Array.from({length: 12}).map((_, j) => {
                const x = 12 + j * 20;
                const dx = Math.cos(a * Math.PI / 180) * 14;
                const dy = Math.sin(a * Math.PI / 180) * 3;
                return <line key={j} x1={x - dx/2} y1={3 - dy/2} x2={x + dx/2} y2={3 + dy/2} stroke={hover ? '#fbbf24' : 'rgba(245,158,11,0.7)'} strokeWidth="0.8"/>;
              })}
            </g>
            <text x="248" y="5" fontFamily="JetBrains Mono" fontSize="7" fill="rgba(255,255,255,0.5)">{a >= 0 ? '+' : ''}{a}°</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────
// Experience timeline
// ─────────────────────────────────────────────────────────
const ROLES = [
  {
    type: 'Industry', title: 'Quality and MRB Intern', detailId: 'exp-tata',
    company: 'Tata Boeing Aerospace', dates: 'Oct 2022–Mar 2023',
    location: 'Nagpur, India',
    summary: 'Embedded with the AH-64 Apache fuselage line. Introduced 8D problem-solving to MRB disposition, drove Pareto-led RCCA on top failure modes, and rebuilt the FAI process for nonconforming composites.',
    metricBits: [['-22%', 'NCR cycle time'], ['15→3%', 'defect rate'], ['~$3k', 'scrap recovered'], ['AS9100', 'standard']],
    timeline: [
      { t: 'WK 01', label: 'Onboarded · MRB shadow' },
      { t: 'WK 04', label: '8D rolled out · top-3 modes' },
      { t: 'WK 12', label: 'CAPA loop closed · 22% ↓' },
      { t: 'WK 24', label: 'Standard work published' },
    ],
    skills: ['8D', 'pFMEA', 'AS9100', 'GD&T', 'CMM', 'AIAG FMEA-4'],
  },
  {
    type: 'Research', title: 'Graduate Research Assistant', detailId: 'exp-beckman',
    company: 'Beckman Institute, UIUC', dates: 'May–Dec 2024',
    location: 'Urbana, IL',
    summary: 'Built a closed-loop optimizer for resin cure cycles. Replaced overnight DOE sweeps with a Bayesian search over time/temp/pressure that converges in minutes — same Tg target, 94% less wall-clock.',
    metricBits: [['8h → 5m', 'cure cycle'], ['-94%', 'optimization'], ['+12°C', 'Tg margin'], ['38', 'runs/day']],
    timeline: [
      { t: 'M 01', label: 'Literature · DSC baselines' },
      { t: 'M 03', label: 'Bayesian opt prototype' },
      { t: 'M 05', label: 'Closed loop on autoclave' },
      { t: 'M 08', label: 'Paper draft submitted' },
    ],
    skills: ['Bayesian Opt', 'DSC', 'Autoclave', 'Python', 'CLT'],
  },
  {
    type: 'Industry', title: 'Manufacturing Intern', detailId: 'exp-eqic',
    company: 'EQIC Dies & Moulds Engineers', dates: 'Jun–Aug 2022',
    location: 'Hyderabad, India',
    summary: 'Owned tool-room workflow on a 12-stage progressive die for HPDC housings. Verified GD&T to ±0.02 mm on CMM, ran process FMEAs on EDM and grinding, mapped the entire route with cycle-time evidence.',
    metricBits: [['12-stage', 'die workflow'], ['±0.02mm', 'GD&T tol'], ['HPDC', 'process'], ['3', 'FMEAs run']],
    timeline: [
      { t: 'WK 01', label: 'Tool-room walk · scope' },
      { t: 'WK 04', label: 'CMM verification protocol' },
      { t: 'WK 08', label: 'EDM/grind FMEA closed' },
      { t: 'WK 10', label: 'Handoff · cycle-time atlas' },
    ],
    skills: ['HPDC', 'EDM', 'CMM', 'Grinding', 'pFMEA', 'SolidWorks'],
  },
];

function ExperienceSection() {
  return (
    <section id="experience" className="section section--experience">
      <div className="container">
        <SectionHeader
          kicker="03 / EXPERIENCE · 2022–2024"
          title="Experience"
          subtitle="Three engagements across aerospace MRB, university research, and tool-room manufacturing — each with a measurable handoff."
          accent="blue"
          count="03 ROLES"
        />
        <div className="exp-list">
          {ROLES.map((r, i) => <ExperienceRow key={i} {...r} idx={i + 1} />)}
        </div>
      </div>
    </section>
  );
}

function ExperienceRow({ type, title, company, dates, location, summary, metricBits, timeline, skills, idx, detailId }) {
  const [ref, seen] = useInView({ threshold: 0.2 });
  const [step, setStep] = useState(timeline.length - 1);
  return (
    <article ref={ref} className={`exp-card exp-card--${type.toLowerCase()} ${seen ? 'is-seen' : ''}`}>
      <header className="exp-card__head">
        <div className="exp-card__head-l">
          <span className="exp-card__idx mono">{String(idx).padStart(2, '0')} / 03</span>
          <span className={`chip chip--${type.toLowerCase()}`}>{type}</span>
          <span className="exp-card__dates mono">{dates}</span>
          <span className="exp-card__loc mono"><span className="hud__dim">◉</span> {location}</span>
        </div>
        <span className="exp-card__seal mono">
          <span className="dot dot--green"></span>
          ARCHIVED
        </span>
      </header>

      <div className="exp-card__body">
        <div className="exp-card__l">
          <h3 className="exp-card__title">{title}</h3>
          <p className="exp-card__company">{company}</p>
          <p className="exp-card__summary">{summary}</p>
          <div className="exp-card__skills">
            {skills.map((s) => <span key={s} className="stack-chip stack-chip--blue mono">{s}</span>)}
          </div>
          <button className="link link--blue link--btn exp-card__detail-btn" onClick={() => window.openDetail(detailId)}>
            View Full Story
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M3 6h6M9 6l-3-3M9 6l-3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="exp-card__r">
          <div className="exp-metrics-grid">
            {metricBits.map(([num, lbl], i) => (
              <div key={i} className="metric-tile">
                <span className="metric-tile__num">{num}</span>
                <span className="metric-tile__lbl mono">{lbl}</span>
              </div>
            ))}
          </div>
          <div className="exp-timeline" role="tablist">
            <div className="exp-timeline__head">
              <span className="mono hud__dim">▸ MILESTONE</span>
              <span className="mono">{timeline[step].t}</span>
            </div>
            <div className="exp-timeline__track">
              <div className="exp-timeline__fill" style={{ width: `${(step / (timeline.length - 1)) * 100}%` }}></div>
              {timeline.map((m, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={step === i}
                  className={`exp-timeline__node ${step >= i ? 'is-on' : ''} ${step === i ? 'is-active' : ''}`}
                  style={{ left: `${(i / (timeline.length - 1)) * 100}%` }}
                  onClick={() => setStep(i)}
                  onMouseEnter={() => setStep(i)}
                  aria-label={m.label}
                >
                  <span className="exp-timeline__dot"></span>
                  <span className="exp-timeline__t mono">{m.t}</span>
                </button>
              ))}
            </div>
            <p className="exp-timeline__label">{timeline[step].label}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────
// Skills & Credentials — featured Six Sigma badge
// ─────────────────────────────────────────────────────────
const SKILL_GROUPS = [
  { title: 'Quality Engineering', items: ['pFMEA (AIAG FMEA-4)', 'SPC', '8D Problem Solving', 'RCCA', 'CAPA', 'CMM Inspection', 'GD&T (ASME Y14.5)', 'First Article Inspection', 'MRB Disposition'] },
  { title: 'Process & Manufacturing', items: ['Lean Principles', 'Prepreg Layup & Autoclave', 'Cure Cycle Development', 'Out-of-Autoclave Methods', 'Powder Metallurgy', 'CNC Machining', 'Wire/Sinker EDM', 'HPDC Process'] },
  { title: 'Software & Simulation', items: ['Python', 'Streamlit', 'ABAQUS FEA', 'Classical Lamination Theory', 'ANSYS Fluent', 'SolidWorks', 'MATLAB', 'AutoCAD'] },
  { title: 'Standards', items: ['AIAG FMEA-4/VDA', 'AS9100', 'ASME Y14.5', 'ASTM E384', 'MIL-HDBK-17'] },
];

function SkillsSection({ medallionStyle }) {
  const [activeGroup, setActiveGroup] = useState(null);
  const [activePill, setActivePill] = useState(null);

  return (
    <section id="skills" className="section section--skills">
      <div className="container">
        <SectionHeader
          kicker="04 / CREDENTIALS"
          title="Skills & Credentials"
          accent="blue"
          count={`${SKILL_GROUPS.reduce((a,g)=>a+g.items.length,0)} CAPABILITIES`}
        />
        <div className="cred-block">
          <SixSigmaBadge medallionStyle={medallionStyle} />
          <SecondaryCert />
        </div>
        <div className="skills-grid">
          {SKILL_GROUPS.map((g, gi) => (
            <div
              key={g.title}
              className={`skill-group ${activeGroup !== null && activeGroup !== gi ? 'skill-group--dim' : ''}`}
              onMouseEnter={() => setActiveGroup(gi)}
              onMouseLeave={() => { setActiveGroup(null); }}
            >
              <h4 className="skill-group__title">
                <span className="skill-group__bullet" aria-hidden="true"></span>
                {g.title}
                <span className="skill-group__count mono">[{g.items.length}]</span>
              </h4>
              <ul className="skill-group__list">
                {g.items.map((s, si) => {
                  const key = `${gi}-${si}`;
                  const isActive = activePill === key;
                  return (
                    <li
                      key={s}
                      className={`skill-pill ${isActive ? 'skill-pill--active' : ''}`}
                      style={{ transitionDelay: `${si * 15}ms` }}
                      onClick={() => setActivePill(isActive ? null : key)}
                    >
                      {isActive && <span className="skill-pill__check" aria-hidden="true">✓ </span>}
                      {s}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SixSigmaBadge({ medallionStyle }) {
  return (
    <div className="cert-card cert-card--featured">
      <div className="cert-card__corner cert-card__corner--tl" aria-hidden="true"></div>
      <div className="cert-card__corner cert-card__corner--tr" aria-hidden="true"></div>
      <div className="cert-card__corner cert-card__corner--bl" aria-hidden="true"></div>
      <div className="cert-card__corner cert-card__corner--br" aria-hidden="true"></div>
      <div className="cert-card__head">
        <span className="cert-card__kicker mono">★ FEATURED CREDENTIAL</span>
        <span className="cert-card__id mono">CSSC · ID PENDING-VERIFY</span>
      </div>
      <div className="cert-card__main">
        <DMAICRing variant={medallionStyle} />
        <div className="cert-card__text">
          <p className="cert-card__org mono">Council for Six Sigma Certification</p>
          <h3 className="cert-card__title">Six Sigma Green Belt</h3>
          <p className="cert-card__desc">
            Certified in DMAIC project leadership, statistical process control, root-cause and
            corrective-action methodology, and the AIAG FMEA-4 framework. The methodology behind
            every metric on this page.
          </p>
          <ul className="cert-card__pillars">
            <li><span className="mono">D</span>efine</li>
            <li><span className="mono">M</span>easure</li>
            <li><span className="mono">A</span>nalyze</li>
            <li><span className="mono">I</span>mprove</li>
            <li><span className="mono">C</span>ontrol</li>
          </ul>
        </div>
      </div>
      <div className="cert-card__foot">
        <span className="mono">VERIFIED · CSSC ACCREDITED PROVIDER</span>
        <a className="cert-card__verify" href="#" onClick={(e) => e.preventDefault()}>
          Verify credential
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
            <path d="M4 7l3-3M7 4H4.5M7 4v2.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

function DMAICRing({ variant }) {
  // DMAIC outer ring + central CSSC seal lockup. Variant changes seal silhouette.
  const phases = ['DEFINE', 'MEASURE', 'ANALYZE', 'IMPROVE', 'CONTROL'];
  return (
    <div className="medallion medallion--ring" aria-hidden="true">
      <svg viewBox="0 0 200 200">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34d399"/>
            <stop offset="100%" stopColor="#047857"/>
          </linearGradient>
          <linearGradient id="beltGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399"/>
            <stop offset="100%" stopColor="#065f46"/>
          </linearGradient>
          <path id="ringPath" d="M 100 100 m -78 0 a 78 78 0 1 1 156 0 a 78 78 0 1 1 -156 0" fill="none"/>
          <path id="ringPathBot" d="M 100 100 m 80 0 a 80 80 0 1 1 -160 0" fill="none"/>
        </defs>

        {/* outer rotating ring with text */}
        <g className="dmaic-ring">
          <circle cx="100" cy="100" r="86" fill="none" stroke="rgba(16,185,129,0.4)" strokeWidth="1" strokeDasharray="2 4"/>
          {phases.map((p, i) => (
            <text key={p} className="dmaic-ring__txt"
                  fontFamily="JetBrains Mono" fontSize="8" fill="rgba(255,255,255,0.7)" letterSpacing="3">
              <textPath href="#ringPath" startOffset={`${i * 20 + 4}%`}>{p}</textPath>
            </text>
          ))}
          {phases.map((_, i) => {
            const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
            const x1 = 100 + Math.cos(a) * 80, y1 = 100 + Math.sin(a) * 80;
            const x2 = 100 + Math.cos(a) * 86, y2 = 100 + Math.sin(a) * 86;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#10b981" strokeWidth="1.2"/>;
          })}
        </g>

        {/* counter-rotating mid ring */}
        <g className="dmaic-mid">
          <circle cx="100" cy="100" r="68" fill="none" stroke="rgba(16,185,129,0.18)" strokeWidth="1"/>
          {Array.from({length: 36}).map((_, i) => {
            const a = (i / 36) * Math.PI * 2;
            const x1 = 100 + Math.cos(a) * 68, y1 = 100 + Math.sin(a) * 68;
            const x2 = 100 + Math.cos(a) * (i % 3 === 0 ? 60 : 64), y2 = 100 + Math.sin(a) * (i % 3 === 0 ? 60 : 64);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(16,185,129,0.4)" strokeWidth="0.7"/>;
          })}
        </g>

        {/* central seal silhouette */}
        {variant === 'shield' ? (
          <path d="M100 30 L154 50 V108 C154 134 130 152 100 158 C70 152 46 134 46 108 V50 Z"
                fill="rgba(16,185,129,0.08)" stroke="url(#ringGrad)" strokeWidth="2"/>
        ) : variant === 'seal' ? (
          <circle cx="100" cy="100" r="54" fill="rgba(16,185,129,0.08)" stroke="url(#ringGrad)" strokeWidth="2"/>
        ) : (
          <polygon points="100,38 146,64 146,118 100,144 54,118 54,64"
                   fill="rgba(16,185,129,0.08)" stroke="url(#ringGrad)" strokeWidth="2"/>
        )}

        {/* CSSC seal arc text — top */}
        <text fontFamily="Space Grotesk" fontWeight="700" fontSize="9" fill="#34d399" letterSpacing="2.5">
          <textPath href="#ringPath" startOffset="34%">SIX SIGMA CERTIFIED</textPath>
        </text>
        {/* bottom mirrored arc */}
        <text fontFamily="JetBrains Mono" fontSize="7" fill="rgba(52,211,153,0.7)" letterSpacing="3">
          <textPath href="#ringPathBot" startOffset="38%">★ COUNCIL · CSSC ★</textPath>
        </text>

        {/* belt graphic — green with knot/loop */}
        <g transform="translate(100 78)">
          <rect x="-26" y="-4" width="52" height="8" rx="1" fill="url(#beltGrad)" stroke="#065f46" strokeWidth="0.6"/>
          <rect x="-3" y="-6" width="6" height="12" fill="#065f46"/>
          <rect x="-2" y="-5" width="4" height="10" fill="#34d399" opacity="0.45"/>
        </g>

        {/* CSSC monogram lockup */}
        <text x="100" y="108" textAnchor="middle" fontFamily="Space Grotesk" fontWeight="700" fontSize="22" fill="#fafafa" letterSpacing="2">CSSC</text>
        <text x="100" y="122" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6.5" fill="rgba(255,255,255,0.6)" letterSpacing="2.5">GREEN BELT</text>

        {/* tiny 6σ in upper crest */}
        <text x="100" y="64" textAnchor="middle" fontFamily="Space Grotesk" fontWeight="700" fontSize="14" fill="#34d399"
              filter="drop-shadow(0 0 4px rgba(16,185,129,0.6))">6σ</text>

        {/* laurel hint */}
        <g stroke="rgba(52,211,153,0.6)" fill="none" strokeWidth="1" strokeLinecap="round">
          <path d="M64 134 q 8 8 16 6"/>
          <path d="M68 138 q 4 -3 8 -3"/>
          <path d="M72 142 q 4 -3 8 -3"/>
          <path d="M136 134 q -8 8 -16 6"/>
          <path d="M132 138 q -4 -3 -8 -3"/>
          <path d="M128 142 q -4 -3 -8 -3"/>
        </g>
      </svg>
    </div>
  );
}

function SecondaryCert() {
  return (
    <div className="cert-card cert-card--nptel">
      <div className="cert-card__corner cert-card__corner--tl cert-card__corner--orange" aria-hidden="true"></div>
      <div className="cert-card__corner cert-card__corner--tr cert-card__corner--orange" aria-hidden="true"></div>
      <div className="cert-card__corner cert-card__corner--bl cert-card__corner--orange" aria-hidden="true"></div>
      <div className="cert-card__corner cert-card__corner--br cert-card__corner--orange" aria-hidden="true"></div>

      <div className="cert-card__head cert-card__head--orange">
        <span className="cert-card__kicker mono cert-card__kicker--orange">★ SECONDARY CREDENTIAL</span>
        <span className="cert-card__id mono">NPTEL · ELITE</span>
      </div>

      <div className="cert-card__main cert-card__main--narrow">
        <NPTELMark />
        <div className="cert-card__text">
          <p className="cert-card__org mono cert-card__org--orange">NPTEL · IIT Roorkee</p>
          <h3 className="cert-card__title cert-card__title--orange">Inspection &amp; Quality Control in Manufacturing</h3>
          <p className="cert-card__desc">
            12-week graded online certification covering metrology fundamentals, statistical
            inspection, gauge R&amp;R, GD&amp;T verification, and ISO/ASTM testing standards.
          </p>
          <ul className="cert-card__pillars cert-card__pillars--orange">
            <li><span className="mono">12wk</span>course</li>
            <li><span className="mono">★</span>elite</li>
            <li><span className="mono">IIT</span>roorkee</li>
          </ul>
        </div>
      </div>

      <div className="cert-card__foot cert-card__foot--orange">
        <span className="mono">ENDORSED · MoE GOVT. OF INDIA</span>
        <a className="cert-card__verify cert-card__verify--orange" href="#" onClick={(e) => e.preventDefault()}>
          Verify credential
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
            <path d="M4 7l3-3M7 4H4.5M7 4v2.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

// Stylized NPTEL-inspired mark — orange/blue, no exact logo reproduction.
function NPTELMark() {
  return (
    <div className="medallion medallion--nptel" aria-hidden="true">
      <svg viewBox="0 0 200 200">
        <defs>
          <linearGradient id="nptelGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fb923c"/>
            <stop offset="100%" stopColor="#c2410c"/>
          </linearGradient>
          <path id="nptelArcTop" d="M 100 100 m -76 0 a 76 76 0 1 1 152 0" fill="none"/>
          <path id="nptelArcBot" d="M 100 100 m 76 0 a 76 76 0 1 1 -152 0" fill="none"/>
        </defs>

        {/* outer ring */}
        <circle cx="100" cy="100" r="88" fill="rgba(251,146,60,0.04)" stroke="rgba(251,146,60,0.45)" strokeWidth="1.2"/>
        <circle cx="100" cy="100" r="84" fill="none" stroke="rgba(251,146,60,0.18)" strokeWidth="1" strokeDasharray="2 3"/>

        {/* arc text */}
        <text fontFamily="Space Grotesk" fontWeight="700" fontSize="9" fill="#fb923c" letterSpacing="2.5">
          <textPath href="#nptelArcTop" startOffset="14%">NATIONAL PROGRAMME · TECHNOLOGY ENHANCED LEARNING</textPath>
        </text>
        <text fontFamily="JetBrains Mono" fontSize="7" fill="rgba(251,146,60,0.7)" letterSpacing="3">
          <textPath href="#nptelArcBot" startOffset="32%">★ ELITE · IIT ROORKEE ★</textPath>
        </text>

        {/* hexagonal book/learning glyph */}
        <polygon points="100,42 138,64 138,108 100,130 62,108 62,64"
                 fill="rgba(251,146,60,0.1)" stroke="url(#nptelGrad)" strokeWidth="1.6"/>

        {/* opened book inside */}
        <g transform="translate(100 86)">
          <path d="M-22 -8 Q -10 -14 0 -10 Q 10 -14 22 -8 L 22 12 Q 10 6 0 10 Q -10 6 -22 12 Z"
                fill="rgba(251,146,60,0.08)" stroke="#fb923c" strokeWidth="1.4"/>
          <line x1="0" y1="-10" x2="0" y2="10" stroke="#fb923c" strokeWidth="1"/>
          <line x1="-16" y1="-6" x2="-4" y2="-7" stroke="rgba(251,146,60,0.6)" strokeWidth="0.7"/>
          <line x1="-16" y1="-2" x2="-4" y2="-3" stroke="rgba(251,146,60,0.6)" strokeWidth="0.7"/>
          <line x1="-16" y1="2" x2="-4" y2="1" stroke="rgba(251,146,60,0.6)" strokeWidth="0.7"/>
          <line x1="4" y1="-7" x2="16" y2="-6" stroke="rgba(251,146,60,0.6)" strokeWidth="0.7"/>
          <line x1="4" y1="-3" x2="16" y2="-2" stroke="rgba(251,146,60,0.6)" strokeWidth="0.7"/>
          <line x1="4" y1="1" x2="16" y2="2" stroke="rgba(251,146,60,0.6)" strokeWidth="0.7"/>
        </g>

        {/* monogram */}
        <text x="100" y="118" textAnchor="middle" fontFamily="Space Grotesk" fontWeight="700" fontSize="20" fill="#fafafa" letterSpacing="3">NPTEL</text>

        {/* tick crest */}
        <g transform="translate(100 152)">
          <circle r="10" fill="#fb923c"/>
          <path d="M-4 0 l 3 3 l 5 -6" stroke="#0a0a0b" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </g>

        {/* tricolor accent stripes (suggestive, not the exact flag) */}
        <g>
          <rect x="44" y="166" width="14" height="3" fill="#fb923c"/>
          <rect x="58" y="166" width="14" height="3" fill="#f4f4f5"/>
          <rect x="72" y="166" width="14" height="3" fill="#16a34a"/>
        </g>
        <g transform="translate(100 0)">
          <rect x="44" y="166" width="14" height="3" fill="#fb923c"/>
          <rect x="58" y="166" width="14" height="3" fill="#f4f4f5"/>
          <rect x="72" y="166" width="14" height="3" fill="#16a34a"/>
        </g>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Contact
// ─────────────────────────────────────────────────────────
function RoleFitBar({ label, pct, color, seen }) {
  return (
    <div className="role-fit__row">
      <span className="role-fit__name mono">{label.toUpperCase()}</span>
      <div className="role-fit__bar">
        <div className="role-fit__fill" style={{ width: seen ? `${pct}%` : '0%', background: color }} />
      </div>
      <span className="role-fit__pct mono" style={{ color, opacity: seen ? 1 : 0 }}>{pct}%</span>
    </div>
  );
}

function ContactSection() {
  const [ref, seen] = useInView({ threshold: 0.15 });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [touched, setTouched] = useState({});
  const roleFits = [
    { label: 'Quality Engineer',       pct: 98, color: 'var(--blue-1)'  },
    { label: 'Manufacturing Engineer', pct: 85, color: 'var(--green-1)' },
    { label: 'Process / CI Engineer',  pct: 82, color: 'var(--amber-1)' },
    { label: 'NPI Engineer',           pct: 72, color: '#c084fc'        },
  ];
  const errors = {
    name: form.name.trim().length < 2 ? 'Required' : null,
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? 'Invalid email' : null,
    message: form.message.trim().length < 10 ? 'At least 10 chars' : null,
  };
  const valid = !errors.name && !errors.email && !errors.message;
  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!valid) return;
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:siddardth1524@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', message: '' });
      setTouched({});
    }, 3200);
  };
  return (
    <section id="contact" className="section section--contact" ref={ref}>
      <div className="container contact-grid">
        <div>
          <SectionHeader kicker="05 / CONTACT · INBOUND OPEN" title="Let's Connect" accent="blue" />
          <p className="contact__copy">
            Actively seeking full-time roles in Quality, Process, and Manufacturing Engineering.
            Open to aerospace, defense, and advanced manufacturing industries.
          </p>
          <ul className="contact-channels">
            <li><span className="mono contact-channels__lbl">EMAIL</span><a href="mailto:siddardth1524@gmail.com">siddardth1524@gmail.com</a></li>
            <li><span className="mono contact-channels__lbl">LINKEDIN</span><a href="https://linkedin.com/in/siddardth-pathipaka" target="_blank" rel="noreferrer">linkedin.com/in/siddardth-pathipaka</a></li>
            <li><span className="mono contact-channels__lbl">GITHUB</span><a href="https://github.com/Siddardth7" target="_blank" rel="noreferrer">github.com/Siddardth7</a></li>
          </ul>

          <div className="role-fit">
            <div className="role-fit__hd">
              <p className="role-fit__title mono">▸ ROLE FIT ANALYSIS</p>
              <span className="role-fit__sub mono">BASED ON SKILLS + EXPERIENCE</span>
            </div>
            {roleFits.map((r) => (
              <RoleFitBar key={r.label} label={r.label} pct={r.pct} color={r.color} seen={seen} />
            ))}
          </div>

          <div className="availability">
            <span className="availability__pulse" aria-hidden="true"></span>
            <div>
              <p className="mono availability__lbl">CURRENT STATUS</p>
              <p className="availability__txt">Available — replies within 24h</p>
            </div>
          </div>
        </div>
        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <div className="contact-form__head">
            <span className="mono">▸ NEW MESSAGE</span>
            <span className="mono">DRAFT_01</span>
          </div>
          <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} onBlur={() => setTouched({ ...touched, name: true })} error={touched.name && errors.name} />
          <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} onBlur={() => setTouched({ ...touched, email: true })} error={touched.email && errors.email} />
          <Field label="Message" multiline value={form.message} onChange={(v) => setForm({ ...form, message: v })} onBlur={() => setTouched({ ...touched, message: true })} error={touched.message && errors.message} />
          <button type="submit" className={`btn btn--primary btn--block ${sent ? 'btn--sent' : ''}`} disabled={sent}>
            {sent ? (
              <><svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7.5l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Message sent — I'll be in touch</>
            ) : (
              <>Send Message<svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M3 6.5h7M10 6.5l-3-3M10 6.5l-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, onBlur, error, type = 'text', multiline }) {
  const id = `f-${label.toLowerCase()}`;
  return (
    <label className={`field ${error ? 'field--err' : ''}`} htmlFor={id}>
      <span className="field__lbl mono">
        {label}
        {error && <span className="field__err">{error}</span>}
      </span>
      {multiline ? (
        <textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} onBlur={onBlur} rows={4} placeholder="Tell me about the role or project…" />
      ) : (
        <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} onBlur={onBlur} placeholder={type === 'email' ? 'you@company.com' : 'Your name'} />
      )}
    </label>
  );
}

// ─────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="mono">© 2026 Siddardth Pathipaka</span>
        <span className="footer__sep" aria-hidden="true">·</span>
        <span>Built with precision and purpose</span>
        <span className="footer__sep" aria-hidden="true">·</span>
        <a href="#contact">Get in touch</a>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Nav, Hero, LabSection, CodeSection, ExperienceSection, ContactSection, Footer, HUDOverlay,
});
