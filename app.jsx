/* global React */
const { useState, useEffect, useRef } = React;

// ---------- Flask SVG (the recurring lab motif) ----------
function Flask({ liquid = '#4BAEC9', bubbles = true, label, accent = '#1F3A5C', tiltDeg = 0, size = 260 }) {
  // Erlenmeyer-style flask. Neck top, then trapezoid body.
  const id = React.useId();
  return (
    <svg viewBox="0 0 200 240" width={size} height={size} style={{ display: 'block', transform: `rotate(${tiltDeg}deg)` }} aria-hidden="true">
      <defs>
        <clipPath id={`liq-${id}`}>
          {/* Flask body interior */}
          <path d="M82 22 L82 78 L36 198 Q34 218 56 218 L144 218 Q166 218 164 198 L118 78 L118 22 Z" />
        </clipPath>
        <linearGradient id={`grad-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={liquid} stopOpacity="0.55" />
          <stop offset="100%" stopColor={liquid} stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Outline */}
      <path
        d="M82 22 L82 78 L36 198 Q34 218 56 218 L144 218 Q166 218 164 198 L118 78 L118 22"
        fill="none"
        stroke={accent}
        strokeWidth="3.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Neck rim */}
      <path d="M76 22 L124 22" stroke={accent} strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="100" cy="22" rx="22" ry="3.5" fill={accent} />

      {/* Liquid */}
      <g clipPath={`url(#liq-${id})`}>
        <rect x="0" y="120" width="200" height="140" fill={`url(#grad-${id})`} />
        {/* Wavy surface */}
        <path d="M0 120 Q 25 112, 50 120 T 100 120 T 150 120 T 200 120 L 200 140 L 0 140 Z" fill={liquid} opacity="0.9" />
        {bubbles && (
          <g fill="#fff" opacity="0.85">
            <circle cx="70" cy="170" r="3.5">
              <animate attributeName="cy" values="200;130;130" dur="3.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.9;0" dur="3.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="115" cy="190" r="2.5">
              <animate attributeName="cy" values="200;125;125" dur="4.1s" begin="0.6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.9;0" dur="4.1s" begin="0.6s" repeatCount="indefinite" />
            </circle>
            <circle cx="90" cy="180" r="2">
              <animate attributeName="cy" values="205;135;135" dur="3.8s" begin="1.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.9;0" dur="3.8s" begin="1.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="135" cy="175" r="2.8">
              <animate attributeName="cy" values="200;128;128" dur="4.6s" begin="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.9;0" dur="4.6s" begin="2s" repeatCount="indefinite" />
            </circle>
          </g>
        )}
      </g>

      {/* Measurement ticks on the side */}
      <g stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.45">
        <line x1="64" y1="140" x2="72" y2="140" />
        <line x1="58" y1="160" x2="66" y2="160" />
        <line x1="52" y1="180" x2="60" y2="180" />
        <line x1="46" y1="200" x2="54" y2="200" />
      </g>

      {/* Label sticker */}
      {label && (
        <g>
          <rect x="78" y="140" width="44" height="36" rx="3" fill="#FBF8EE" stroke={accent} strokeWidth="1.6" />
          <text x="100" y="156" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fill={accent} fontWeight="700">{label}</text>
          <line x1="84" y1="162" x2="116" y2="162" stroke={accent} strokeWidth="0.6" opacity="0.5" />
          <line x1="84" y1="168" x2="116" y2="168" stroke={accent} strokeWidth="0.6" opacity="0.5" />
          <line x1="84" y1="172" x2="106" y2="172" stroke={accent} strokeWidth="0.6" opacity="0.5" />
        </g>
      )}
    </svg>
  );
}

// ---------- Sleeping shiba mascot (uses uploaded logo) ----------
function Mascot({ showZzz = true }) {
  return (
    <div className="mascot">
      <img src="assets/logo.png" alt="Sleeping shiba in a flask — LazyDogLab mascot" className="mascot-img" />
      {showZzz && (
        <div className="zzz" aria-hidden="true">
          <span className="z z1">z</span>
          <span className="z z2">z</span>
          <span className="z z3">Z</span>
        </div>
      )}
    </div>
  );
}

// ---------- Theme toggle (cream / dark) ----------
function ThemeToggle({ theme, setTheme }) {
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      className={`theme-toggle ${isDark ? 'is-dark' : ''}`}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? 'cream' : 'dark')}
      title={isDark ? 'Light' : 'Dark'}
    >
      <span className="tt-track" aria-hidden="true">
        <span className="tt-icon tt-sun">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
          </svg>
        </span>
        <span className="tt-icon tt-moon">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M20.5 14.3A8 8 0 0 1 9.7 3.5a.5.5 0 0 0-.6-.6 9 9 0 1 0 12 12 .5.5 0 0 0-.6-.6z" />
          </svg>
        </span>
        <span className="tt-knob" />
      </span>
    </button>
  );
}

// ---------- Language switcher ----------
function LangSwitcher({ lang, setLang }) {
  const langs = ['zh', 'ja', 'en'];
  const labels = { zh: '中', ja: '日', en: 'EN' };
  return (
    <div className="lang-switcher" role="tablist" aria-label="Language">
      {langs.map((l) => (
        <button
          key={l}
          role="tab"
          aria-selected={lang === l}
          className={`lang-btn ${lang === l ? 'is-active' : ''}`}
          onClick={() => setLang(l)}
        >
          {labels[l]}
        </button>
      ))}
    </div>
  );
}

// ---------- Project card ----------
function ProjectCard({ exp, url, liquid, accent, label, idx }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      className={`project-card ${hover ? 'is-hover' : ''}`}
      href={url}
      target="_blank"
      rel="noopener"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ '--card-accent': liquid }}
    >
      <div className="card-flask">
        <Flask liquid={liquid} accent={accent} label={label} size={210} tiltDeg={hover ? -3 : 0} />
      </div>
      <div className="card-body">
        <div className="card-tag">{exp.tag}</div>
        <h3 className="card-name">{exp.name}</h3>
        <p className="card-desc">{exp.desc}</p>
        <div className="card-cta">
          <span>{exp.cta}</span>
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
            <path d="M1 7 H 19 M 14 2 L 20 7 L 14 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="card-host">{url.replace('https://', '')}</div>
    </a>
  );
}

// ---------- Contact section ----------
function ContactSection({ t }) {
  const [copied, setCopied] = useState(null);
  const copy = (val, key) => {
    try {
      navigator.clipboard.writeText(val);
      setCopied(key);
      setTimeout(() => setCopied(null), 1600);
    } catch (e) {}
  };
  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <div className="contact-head">
          <div className="section-eyebrow">
            <span className="eyebrow-bar" />
            {t.contact.label}
          </div>
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="section-sub">{t.contact.sub}</p>
        </div>

        <div className="contact-cards">
          {/* Email card */}
          <div className="contact-card">
            <div className="cc-icon cc-icon-mail" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2.5" />
                <path d="M3.5 7l8.5 6 8.5-6" />
              </svg>
            </div>
            <div className="cc-body">
              <div className="cc-label">{t.contact.emailLabel}</div>
              <a className="cc-value" href="mailto:jiu.yun@foxmail.com">jiu.yun@foxmail.com</a>
            </div>
            <button className="cc-copy" onClick={() => copy('jiu.yun@foxmail.com', 'email')}>
              {copied === 'email' ? t.contact.copied : t.contact.copy}
            </button>
          </div>

          {/* WeChat card */}
          <div className="contact-card">
            <div className="cc-icon cc-icon-wechat" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8.5 4C5 4 2.2 6.3 2.2 9.2c0 1.6.9 3 2.3 4l-.6 1.8 2.1-1.1c.8.2 1.6.3 2.5.3.3 0 .6 0 .9-.1" />
                <path d="M21.8 14.7c0-2.4-2.3-4.4-5.3-4.4S11.2 12.3 11.2 14.7s2.3 4.4 5.3 4.4c.7 0 1.4-.1 2.1-.3l1.8.9-.5-1.5c1.1-.8 1.9-2 1.9-3.5z" />
                <circle cx="6.5" cy="8.5" r=".8" fill="currentColor" />
                <circle cx="10.5" cy="8.5" r=".8" fill="currentColor" />
                <circle cx="14.5" cy="14" r=".7" fill="currentColor" />
                <circle cx="18" cy="14" r=".7" fill="currentColor" />
              </svg>
            </div>
            <div className="cc-body">
              <div className="cc-label">{t.contact.wechatLabel}</div>
              <span className="cc-value cc-value-mono">JIUYUNJIUYUN</span>
            </div>
            <button className="cc-copy" onClick={() => copy('JIUYUNJIUYUN', 'wechat')}>
              {copied === 'wechat' ? t.contact.copied : t.contact.copy}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Main app ----------
function App() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('ldl_lang') || 'en';
    } catch (e) { return 'en'; }
  });
  const initialTheme = (() => {
    try { return localStorage.getItem('ldl_theme') || 'cream'; } catch (e) { return 'cream'; }
  })();
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "theme": "cream",
    "showZzz": true,
    "showGrid": true,
    "accentLiquid": "shibaTeal",
    "heroLayout": "split"
  }/*EDITMODE-END*/;
  const [tweaks, setTweak] = window.useTweaks({ ...TWEAK_DEFAULTS, theme: initialTheme });
  const setTheme = (next) => {
    setTweak('theme', next);
    try { localStorage.setItem('ldl_theme', next); } catch (e) {}
  };

  useEffect(() => {
    try { localStorage.setItem('ldl_lang', lang); } catch (e) {}
    document.documentElement.lang = (window.I18N[lang] || {}).htmlLang || lang;
  }, [lang]);

  // Apply theme to root
  useEffect(() => {
    document.documentElement.dataset.theme = tweaks.theme;
  }, [tweaks.theme]);

  const t = window.I18N[lang];

  // Liquid palette options
  const liquidPalettes = {
    shibaTeal: { lingua: '#E89B3C', drive: '#4BAEC9', mic: '#7FBF7F' },
    classic:   { lingua: '#4BAEC9', drive: '#7FD0E3', mic: '#1F6F8B' },
    sunset:    { lingua: '#E89B3C', drive: '#D85D5D', mic: '#8C5BB0' },
  };
  const liquids = liquidPalettes[tweaks.accentLiquid] || liquidPalettes.shibaTeal;
  const accent = 'var(--ink)';

  const projects = [
    { key: 'lingua', exp: t.projects.lingua, url: 'https://linguabridge.lazydoglab.com/', liquid: liquids.lingua, label: 'L-01' },
    { key: 'drive',  exp: t.projects.drive,  url: 'https://drive.lazydoglab.com/',        liquid: liquids.drive,  label: 'D-02' },
    { key: 'mic',    exp: t.projects.mic,    url: 'https://mic.lazydoglab.com/',          liquid: liquids.mic,    label: 'M-03' },
  ];

  return (
    <div className={`page lang-${lang} layout-${tweaks.heroLayout}`}>
      {/* paper grid */}
      {tweaks.showGrid && <div className="paper-grid" aria-hidden="true" />}

      {/* TOP BAR */}
      <header className="topbar">
        <a className="brand" href="#top">
          <img src="assets/logo.png" alt="" className="brand-mark" />
          <span className="brand-text">
            <span className="brand-lazy">LazyDog</span><span className="brand-lab">Lab</span>
          </span>
        </a>
        <nav className="topnav">
          <a href="#projects">{t.nav.projects}</a>
          <a href="#contact">{t.nav.contact}</a>
        </nav>
        <div className="topbar-tools">
          <ThemeToggle theme={tweaks.theme} setTheme={setTheme} />
          <LangSwitcher lang={lang} setLang={setLang} />
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-left">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            {t.hero.eyebrow}
          </div>
          <h1 className="hero-title">
            <span>{t.hero.title}</span>
            <span className="hero-title-hl">
              {t.hero.titleHL}
              <svg className="underline" viewBox="0 0 320 14" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 10 Q 80 2, 160 8 T 318 6" stroke="var(--shiba)" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="hero-lede">{t.hero.lede}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              {t.hero.cta}
              <svg width="20" height="12" viewBox="0 0 22 14" fill="none"><path d="M1 7 H 19 M 14 2 L 20 7 L 14 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <span className="hero-meta">
              <span className="status-dot" />
              {t.hero.meta}
            </span>
          </div>
        </div>

        <div className="hero-right">
          <Mascot showZzz={tweaks.showZzz} />
          {/* Lab tape labels around the mascot */}
          <div className="tape tape-1">specimen #001</div>
          <div className="tape tape-2">do not disturb</div>
          {/* Hand-drawn dotted ring */}
          <svg className="hero-ring" viewBox="0 0 400 400" aria-hidden="true">
            <circle cx="200" cy="200" r="186" fill="none" stroke="var(--ink)" strokeWidth="1.4" strokeDasharray="2 7" opacity="0.45" />
          </svg>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="projects" id="projects">
        <div className="section-head">
          <div className="section-eyebrow">
            <span className="eyebrow-bar" />
            {t.sectionLabel}
          </div>
          <h2 className="section-title">{t.sectionTitle}</h2>
          <p className="section-sub">{t.sectionSub}</p>
        </div>

        <div className="project-grid">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.key}
              exp={p.exp}
              url={p.url}
              liquid={p.liquid}
              accent={accent}
              label={p.label}
              idx={i}
            />
          ))}
        </div>

        <div className="more-soon">
          <div className="more-flask">
            <Flask liquid="rgba(31,58,92,0.12)" accent="var(--ink)" label="?" size={90} bubbles={false} />
          </div>
          <p>{t.moreSoon}</p>
        </div>
      </section>

      {/* CONTACT */}
      <ContactSection t={t} />

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="status">
          <span className="status-dot status-dot-lg" />
          <span>{t.statusOk}</span>
        </div>
        <div className="footer-mid">{t.footer.built}</div>
        <div className="footer-right">{t.footer.rights}</div>
      </footer>

      {/* TWEAKS PANEL */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme">
          <TweakRadio label="Mode" value={tweaks.theme} options={[{value:'cream', label:'Cream'},{value:'dark', label:'Dark'}]} onChange={(v)=>setTweak('theme', v)} />
          <TweakSelect label="Liquid palette" value={tweaks.accentLiquid} options={[
            {value:'shibaTeal', label:'Shiba × Teal × Sage'},
            {value:'classic',   label:'Cool blues'},
            {value:'sunset',    label:'Sunset'},
          ]} onChange={(v)=>setTweak('accentLiquid', v)} />
        </TweakSection>
        <TweakSection label="Hero">
          <TweakRadio label="Layout" value={tweaks.heroLayout} options={[{value:'split', label:'Split'},{value:'centered', label:'Centered'}]} onChange={(v)=>setTweak('heroLayout', v)} />
          <TweakToggle label="Zzz on mascot" value={tweaks.showZzz} onChange={(v)=>setTweak('showZzz', v)} />
          <TweakToggle label="Lab paper grid" value={tweaks.showGrid} onChange={(v)=>setTweak('showGrid', v)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
