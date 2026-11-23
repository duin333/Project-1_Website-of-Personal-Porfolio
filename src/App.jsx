import Experience from "./Experience.jsx";
import ContactSection from "./ContactSection.jsx";
import "./journey-contact.css";
import ArchiveLoader from "./ArchiveLoader.jsx";
import { linkedin } from "./profile.js";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import MotionEffects from "./MotionEffects.jsx";
import Mascot from "./Mascot.jsx";
import {
  ArrowUp,
  Download,
  Check,
  Code2,
  Copy,
  FolderOpen,
  Github,
  Globe2,
  Mail,
  Menu,
  Moon,
  MousePointer2,
  Plus,
  Sparkles,
  Sun,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Headphones,
  Utensils,
  Layers,
  MapPin,
} from "lucide-react";
import {
  copy,
  projects,
  languages,
  email,
  github,
  readRoute,
  projectRoute,
  roles,
} from "./content.js";

function saved(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}
function persist(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Private browsing still works without persistence. */
  }
}
const icons = {
  comichub: BookOpen,
  musicbox: Headphones,
  portfolio: Layers,
  foodgo: Utensils,
};

function ProjectArt({ id, compact = false }) {
  return (
    <div
      className={`project-art art-${id} ${compact ? "compact" : ""}`}
      aria-hidden="true"
    >
      {id === "comichub" && (
        <>
          <div className="comic-masthead">
            COMIC<span>HUB</span>
            <i>✦</i>
          </div>
          <div className="comic-covers">
            <div>
              <span>
                THE
                <br />
                NEXT
                <br />
                CHAPTER
              </span>
              <i>✳</i>
            </div>
            <div>
              <i>◎</i>
              <span>
                LOST IN
                <br />A STORY
              </span>
            </div>
            <div>
              <span>
                ONE
                <br />
                MORE
                <br />
                PAGE.
              </span>
              <i>✦</i>
            </div>
          </div>
          <div className="comic-bottom">
            <span>STORIES WORTH EXPLORING</span>
            <span>•••</span>
          </div>
          <div className="art-chat">
            <Sparkles size={15} />
            <span>Discover your next story</span>
          </div>
        </>
      )}
      {id === "musicbox" && (
        <>
          <div className="music-brand">
            <Headphones /> musicbox<span>ROOM STUDIO</span>
          </div>
          <div className="music-room">
            <span>NOW PLAYING</span>
            <strong>
              Good times.
              <br />
              Great company.
            </strong>
            <div className="sound-bars">
              {Array.from({ length: 18 }, (_, i) => (
                <i key={i} style={{ height: `${18 + ((i * 29) % 65)}%` }} />
              ))}
            </div>
            <div className="music-pills">
              <span>ROOMS</span>
              <span>ORDERS</span>
              <span>CHECKOUT</span>
            </div>
          </div>
          <span className="music-disc">♫</span>
        </>
      )}
      {id === "portfolio" && (
        <>
          <div className="mini-browser">
            <span>•••</span>
            <span>duyen / project archive</span>
            <Plus size={12} />
          </div>
          <div className="mini-portfolio">
            <span>CURIOUS BY NATURE</span>
            <strong>
              Things
              <br />
              <em>I build.</em>
            </strong>
            <div className="mini-folders">
              <i />
              <i />
              <i />
            </div>
            <span className="mini-star">✳</span>
          </div>
        </>
      )}
      {id === "foodgo" && (
        <>
          <div className="food-orbit" />
          <div className="food-wordmark">
            FoodGo<span>made to move.</span>
          </div>
          <div className="food-phone">
            <div className="phone-notch" />
            <div className="food-map">
              <i />
              <i />
              <i />
              <MapPin className="map-pin" size={27} />
              <div className="map-path" />
            </div>
            <div className="food-delivery">
              <span>DRIVER</span>
              <strong>Let’s get going.</strong>
              <div>
                <span>●</span>
                <i />
                <span>●</span>
              </div>
            </div>
          </div>
          <span className="food-sticker">
            ON THE
            <br />
            WAY!
          </span>
        </>
      )}
    </div>
  );
}

function Folder({ project, lang, t, hero = false, onOpen, index }) {
  const Icon = icons[project.id];
  const ref = useRef(null);
  function tilt(e) {
    if (
      (matchMedia("(prefers-reduced-motion: reduce)").matches &&
        document.documentElement.dataset.motion !== "full") ||
      matchMedia("(pointer: coarse)").matches ||
      document.documentElement.dataset.effects === "off"
    )
      return;
    const b = e.currentTarget.getBoundingClientRect();
    ref.current?.style.setProperty(
      "--tilt",
      `${((e.clientX - b.left) / b.width - 0.5) * 5}deg`,
    );
    ref.current?.style.setProperty(
      "--rx",
      `${-((e.clientY - b.top) / b.height - 0.5) * 9}deg`,
    );
    ref.current?.style.setProperty(
      "--ry",
      `${((e.clientX - b.left) / b.width - 0.5) * 12}deg`,
    );
    ref.current?.style.setProperty(
      "--shine-x",
      `${((e.clientX - b.left) / b.width) * 100}%`,
    );
    ref.current?.style.setProperty(
      "--shine-y",
      `${((e.clientY - b.top) / b.height) * 100}%`,
    );
  }
  return (
    <button
      ref={ref}
      className={`folder ${project.color} ${hero ? "hero-folder" : "project-folder"}`}
      style={{ "--i": index }}
      onClick={(e) => onOpen(project.id, e.currentTarget)}
      onPointerMove={tilt}
      onPointerLeave={() => {
        ["--tilt", "--rx", "--ry"].forEach((key) =>
          ref.current?.style.setProperty(key, "0deg"),
        );
      }}
      aria-label={`${t.open}: ${project.name}`}
    >
      <span className="folder-tab">
        <Icon size={16} />
        {project.name}
        <span className="tab-dot" />
      </span>
      <span className="folder-sheet">
        <span>{project.type}</span>
        <Code2 size={18} />
      </span>
      <span className="folder-body">
        {hero ? (
          <>
            <span className="folder-meta">{project.type}</span>
            <span className="folder-name">{project.name}</span>
            <span className="folder-small">
              {project.stack.slice(0, 3).join(" / ") || t.team}
            </span>
            <span className="folder-open">
              <Plus size={21} />
            </span>
          </>
        ) : (
          <>
            <ProjectArt id={project.id} />
            <span className="folder-caption">
              <span>
                <span className="folder-meta">{project.type}</span>
                <strong>{project.name}</strong>
              </span>
              <span className="folder-open">
                <Plus size={22} />
              </span>
            </span>
          </>
        )}
      </span>
    </button>
  );
}

function ProjectPage({ project, lang, t, close, navigate }) {
  const content = project[lang];
  const title = useRef(null);
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    title.current?.focus({ preventScroll: true });
  }, [project.id]);
  const index = projects.findIndex(p => p.id === project.id);
  const sections = [["overview",t.overview],["highlights",t.highlights], ...(content.challenge ? [["challenge",t.challenge]] : []), ...(content.outcome ? [["outcome",t.outcome]] : []), ["next",t.next]];
  return <main id="main" className={`project-page ${project.color}`}>
    <div className="case-breadcrumb"><a href={`${projectRoute(lang)}#projects`} onClick={e=>{if(!e.metaKey&&!e.ctrlKey){e.preventDefault();close();}}}><FolderOpen size={18}/>{t.back}</a><span>{project.name}</span></div>
    <header className="case-heading">
      <div className="case-kicker"><span>{project.type}</span><span>{project.period || "2026"}</span></div>
      <h1 ref={title} tabIndex={-1}>{project.name}<span aria-hidden="true">✳</span></h1>
      <p>{content.summary}</p>
      <div className="case-heading-actions"><span className="status"><span/>{t[project.status]}</span><a className="text-link" href={project.repo} target="_blank" rel="noopener noreferrer"><Github size={18}/>{t.source}</a></div>
    </header>
    <figure className="case-cover"><ProjectArt id={project.id}/><figcaption>{t.illustration}</figcaption></figure>
    <div className="case-layout">
      <aside className="case-sidebar">
        <div className="case-role"><Code2 size={20}/><p>{roles[project.id][lang]}</p></div>
        {project.period && <dl><dt>{t.scope}</dt><dd>{project.personal ? t.personal : t.teamSize}</dd></dl>}
        <h2>{t.technology}</h2><div className="tags">{project.stack.map(item=><span key={item}>{item}</span>)}</div>
        <nav aria-label={t.contents}><h2>{t.contents}</h2>{sections.map(([id,label])=><a key={id} href={`#${id}`}>{label}</a>)}</nav>
      </aside>
      <article className="case-story">
        <section id="overview"><h2>{t.overview}</h2><p>{content.description}</p></section>
        <section id="highlights"><h2>{t.highlights}</h2><ul>{content.highlights.map(item=><li key={item}>{item}</li>)}</ul></section>
        {content.challenge && <section id="challenge"><h2>{t.challenge}</h2><p>{content.challenge}</p></section>}
        {content.outcome && <section id="outcome"><h2>{t.outcome}</h2><p>{content.outcome}</p></section>}
        <section id="next"><h2>{t.next}</h2><p>{content.next}</p></section>
      </article>
    </div>
    <nav className="case-pagination" aria-label={t.nextProject}>
      {[[-1,t.prevProject],[1,t.nextProject]].map(([offset,label])=>{const p=projects[(index+offset+projects.length)%projects.length];return <a href={projectRoute(lang,p.id)} key={offset} onClick={e=>{if(!e.metaKey&&!e.ctrlKey){e.preventDefault();navigate(p.id);}}}><span>{label}</span><strong>{p.name}</strong></a>;})}
    </nav>
  </main>;
}

export default function App() {
  const initial = readRoute(location.hash) || readRoute(location.pathname);
  const [lang, setLang] = useState(
    initial?.lang ||
      (languages.includes(saved("duyen-lang", "vi"))
        ? saved("duyen-lang", "vi")
        : "vi"),
  );
  const [activeProject, setActiveProject] = useState(initial?.project || null);
  const [theme, setTheme] = useState(
    document.documentElement.dataset.theme || "light",
  );
  const [effectsMode, setEffectsMode] = useState(() => {
    const mode = saved("duyen-motion", "auto");
    return ["auto", "on", "off"].includes(mode) ? mode : "auto";
  });
  const effects = effectsMode !== "off";
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState("");
  const homeScroll = useRef(0);
  const [loading, setLoading] = useState(() => { try { return !sessionStorage.getItem("duyen-intro-seen"); } catch { return true; } });
  const finishLoading = useCallback(() => { try { sessionStorage.setItem("duyen-intro-seen", "1"); } catch {} setLoading(false); }, []);
  const toastTimer = useRef(null);
  const t = copy[lang];
  useEffect(() => {
    const legacy = readRoute(location.hash);
    if (legacy) history.replaceState(null, "", projectRoute(legacy.lang, legacy.project));
  }, []);
  useEffect(() => {
    const change = () => {
      const r = readRoute(location.hash) || readRoute(location.pathname);
      if (r) {
        setLang(r.lang);
        setActiveProject(r.project);
      } else setActiveProject(null);
    };
    addEventListener("hashchange", change);
    addEventListener("popstate", change);
    return () => {
      removeEventListener("hashchange", change);
      removeEventListener("popstate", change);
    };
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    persist("duyen-lang", lang);
    document.title = `${activeProject ? projects.find((p) => p.id === activeProject)?.name + " · " : ""}Duyên — Project Archive`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", activeProject ? projects.find(p=>p.id===activeProject)[lang].summary : t.heroDescription);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", `https://duin333.dpdns.org${projectRoute(lang,activeProject)}`);
  }, [lang, activeProject, t.heroDescription]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    persist("duyen-theme", theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#131c24" : "#f5f6f2");
  }, [theme]);
  useEffect(() => {
    document.documentElement.dataset.effects = effects ? "on" : "off";
    document.documentElement.dataset.motion =
      effectsMode === "on" ? "full" : effectsMode;
    persist("duyen-motion", effectsMode);
    if (!effects) return;
    const move = (e) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    addEventListener("pointermove", move, { passive: true });
    return () => removeEventListener("pointermove", move);
  }, [effects, effectsMode]);
  useEffect(() => () => clearTimeout(toastTimer.current), []);
  useEffect(() => {
    if (!menu) return;
    const esc = (e) => {
      if (e.key === "Escape") setMenu(false);
    };
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, [menu]);
  function openProject(id) {
    homeScroll.current = window.scrollY;
    setMenu(false);
    setActiveProject(id);
    history.pushState({ project: id }, "", projectRoute(lang, id));
  }
  function goHome(section = "home") {
    setActiveProject(null);
    setMenu(false);
    history.pushState(null, "", `${projectRoute(lang)}#${section}`);
    requestAnimationFrame(() => {
      if (section === "projects" && homeScroll.current) window.scrollTo({top: homeScroll.current, behavior:"instant"});
      else document.getElementById(section)?.scrollIntoView({behavior:"instant"});
    });
  }
  function closeProject() { goHome("projects"); }
  function changeLanguage(value) {
    setLang(value);
    history.replaceState(null, "", projectRoute(value, activeProject));
  }
  function navigateProject(id) {
    setActiveProject(id);
    history.pushState({ project: id }, "", projectRoute(lang, id));
  }
  async function copyEmail() {
    let message;
    try {
      await navigator.clipboard.writeText(email);
      message = t.copied;
    } catch {
      message = t.copyFailed;
    }
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 4500);
  }
  const filtered = projects.filter(
    (p) => filter === "all" || p.category === filter,
  );
  return (
    <>
      {loading && <ArchiveLoader lang={lang} done={finishLoading} reduced={effectsMode === "off" || (effectsMode !== "on" && matchMedia("(prefers-reduced-motion: reduce)").matches)}/>}
      <div inert={loading ? true : undefined}>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <div className="pointer-glow" aria-hidden="true" />
      <MotionEffects
        enabled={effects}
        force={effectsMode === "on"}
        lang={lang}
        key={activeProject || "home"}
        modalOpen={loading}
      />
      <Mascot
        lang={lang}
        mode={effectsMode}
        concealed={loading || menu}
      />
      <header className="site-header">
        <a className="wordmark" href={`${projectRoute(lang)}#home`} onClick={e=>{e.preventDefault();goHome("home");}} aria-label="Duyên — home">
          duyên<span className="logo-star">✳</span>
        </a>
        <nav
          id="mobile-nav"
          className={menu ? "main-nav is-open" : "main-nav"}
          aria-label={
            lang === "vi"
              ? "Điều hướng chính"
              : lang === "ja"
                ? "メインナビゲーション"
                : "Main navigation"
          }
        >
          {t.nav.map((n, i) => (
            <a
              key={i}
              href={`${projectRoute(lang)}#${["projects", "about", "skills", "experience", "contact"][i]}`}
              onClick={e=>{e.preventDefault();goHome(["projects", "about", "skills", "experience", "contact"][i]);}}
            >
              {n}
              <span>0{i + 1}</span>
            </a>
          ))}
        </nav>
        <div className="header-controls">
          <div className="language-switch" role="group" aria-label={t.language}>
            {languages.map((l) => (
              <button
                key={l}
                lang={l}
                aria-label={
                  { vi: "Tiếng Việt", en: "English", ja: "日本語" }[l]
                }
                aria-pressed={lang === l}
                onClick={() => changeLanguage(l)}
              >
                {l === "ja" ? "JP" : l.toUpperCase()}
              </button>
            ))}
          </div>
          <span className="control-divider" />
          <button
            className="icon-button theme-toggle"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label={theme === "light" ? t.themeDark : t.themeLight}
          >
            {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
          </button>
          <button
            className="icon-button motion-toggle"
            data-mode={effectsMode}
            title={`FX ${effectsMode.toUpperCase()}`}
            aria-label={
              effectsMode === "auto"
                ? {
                    vi: "Bật đầy đủ hiệu ứng",
                    en: "Enable full motion",
                    ja: "すべてのモーションをオン",
                  }[lang]
                : effectsMode === "on"
                  ? {
                      vi: "Tắt hiệu ứng",
                      en: "Turn motion off",
                      ja: "モーションをオフ",
                    }[lang]
                  : {
                      vi: "Hiệu ứng theo cài đặt hệ thống",
                      en: "Use system motion preference",
                      ja: "システムのモーション設定を使用",
                    }[lang]
            }
            onClick={() =>
              setEffectsMode(
                effectsMode === "auto"
                  ? "on"
                  : effectsMode === "on"
                    ? "off"
                    : "auto",
              )
            }
          >
            <Sparkles size={18} />
          </button>
          <button
            className="icon-button menu-toggle"
            aria-expanded={menu}
            aria-controls="mobile-nav"
            aria-label={menu ? t.menuClose : t.menuOpen}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </header>
      {activeProject ? <ProjectPage project={projects.find(p=>p.id===activeProject)} lang={lang} t={t} close={closeProject} navigate={navigateProject}/> : <main id="main">
        <section id="home" className="hero">
          <div className="hero-kicker">
            <span>
              <i />
              {t.archive}
            </span>
            <span>
              {t.location}
              <span className="tiny-star">✦</span>
            </span>
          </div>
          <div className="hero-heading">
            <span className="hero-prefix">
              Portfolio <span className="outline-star">✳</span>
            </span>
            <h1 key={lang}>
              <span className="hero-line">
                <span className="hero-line-inner">{t.heroTop}</span>
              </span>
              <span className="hero-line">
                <em className="hero-line-inner">{t.heroBottom}</em>
              </span>
            </h1>
            <div className="hero-description">
              <p>{t.heroDescription}</p>
              <div className="hero-actions">
                <a className="button primary" href="#projects">
                  <FolderOpen size={18} />
                  {t.explore}
                </a>
                <a className="button cv-download" href="/cv/Nguyen-Thai-Ky-Duyen-CV-EN.pdf" download="Nguyen-Thai-Ky-Duyen-CV-EN.pdf"><Download size={18}/>{t.downloadCv}</a>
                <a
                  className="text-link"
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={17} />
                  {t.github}
                </a>
              </div>
            </div>
            <span className="hero-scribble" aria-hidden="true">
              hello, world!
              <svg viewBox="0 0 140 45">
                <path d="M4 10Q45 37 125 12M25 24Q60 42 129 24" />
              </svg>
            </span>
          </div>
          <div className="folder-stage">
            <div className="stage-caption">
              <span>✳</span>
              {t.heroNote}
              <svg viewBox="0 0 100 60" aria-hidden="true">
                <path d="M5 8Q80 -2 84 48M74 39l10 10 8-12" />
              </svg>
            </div>
            <div className="hero-folders">
              {projects.map((p, i) => (
                <Folder
                  key={p.id}
                  project={p}
                  index={i}
                  lang={lang}
                  t={t}
                  hero
                  onOpen={openProject}
                />
              ))}
            </div>
            <div className="stage-baseline">
              <span>WEB · BACKEND · MOBILE</span>
              <span>
                {t.scroll}
                <span className="scroll-line" />
              </span>
            </div>
          </div>
        </section>
        <section id="projects" className="projects-section section-wrap">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <span className="cross">+</span>
                {t.selected}
              </span>
              <h2 id="projects-title" tabIndex={-1}>
                {t.workTitle}
                <br />
                <em>{t.workItalic}</em>
              </h2>
            </div>
            <p>{t.workDescription}</p>
          </div>
          <div className="project-toolbar">
            <div
              className="filters"
              role="group"
              aria-label={
                lang === "vi"
                  ? "Lọc dự án"
                  : lang === "ja"
                    ? "プロジェクトの絞り込み"
                    : "Filter projects"
              }
            >
              {["all", "web", "mobile"].map((f) => (
                <button
                  key={f}
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                >
                  {t[f]}
                  <span>
                    {f === "all"
                      ? projects.length
                      : projects.filter((p) => p.category === f).length}
                  </span>
                </button>
              ))}
            </div>
            <span className="archive-count" aria-live="polite">
              {String(filtered.length).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>
          <div className="projects-grid">
            {filtered.map((p, i) => (
              <article key={p.id} className={`project-item ${p.color}`}>
                <Folder
                  project={p}
                  index={i}
                  lang={lang}
                  t={t}
                  onOpen={openProject}
                />
                <div className="project-info">
                  <span className="status">
                    <span />
                    {t[p.status]}
                  </span>
                  <p>{p[lang].summary}</p>
                  <div className="tags">
                    {p.stack.length ? (
                      p.stack.slice(0, 4).map((s) => <span key={s}>{s}</span>)
                    ) : (
                      <span>{t.team}</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="archive-end">
            <span className="dashed-line" />
            <span>✳ {t.footerNote}</span>
            <span className="dashed-line" />
          </div>
        </section>
        <section id="about" className="about-section section-wrap">
          <div className="about-layout">
            <div className="identity-card">
              <div className="identity-top">
                <span>PERSONAL FILE</span>
                <span>DUIN333</span>
              </div>
              <div className="identity-art">
                <img className="identity-photo" src="/images/duyen-portrait.jpg" alt="Nguyễn Thái Kỳ Duyên" width="2113" height="2065" loading="lazy" />
                <span className="identity-photo-tag">FULLSTACK DEVELOPER</span>
              </div>
              <div className="identity-bottom">
                <strong>
                  Nguyễn Thái
                  <br />
                  Kỳ Duyên
                </strong>
                <span>
                  <MapPin size={14} /> Đà Nẵng, VN
                </span>
              </div>
              <span className="identity-sticker">{t.aboutSticker}</span>
            </div>
            <div className="about-copy">
              <span className="eyebrow">
                <span className="cross">+</span>
                {t.aboutLabel}
              </span>
              <h2>
                {t.aboutTitle}
                <br />
                <em>{t.aboutItalic}</em>
              </h2>
              <p>{t.aboutP}</p>
              <p>{t.aboutP2}</p>
              <div className="about-facts">
                <div>
                  <span>{t.education}</span>
                  <strong>{t.educationValue}</strong>
                </div>
                <div>
                  <span>{t.focus}</span>
                  <strong>{t.focusValue}</strong>
                </div>
              </div>
              <div className="profile-availability">{t.availability}</div>
              <div className="about-facts"><div><span>{t.gpaLabel}</span><strong>{t.gpaNote}</strong></div><div><span>LinkedIn</span><a href={linkedin} target="_blank" rel="noopener noreferrer">Duyên Nguyễn · Evelyn</a></div></div>
              <div className="languages-block">
                <h3>
                  <Globe2 size={17} />
                  {t.languageTitle}
                </h3>
                <div className="language-cards">
                  {[
                    [t.vietnamese, t.native, "VI"],
                    [t.english, t.b2, "EN"],
                    [t.japanese, t.n4, "JP"],
                  ].map(([name, level, code]) => (
                    <div key={code}>
                      <span>{code}</span>
                      <strong>{name}</strong>
                      <small>{level}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="skills" className="tools-section section-wrap" aria-labelledby="skills-title">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <span className="cross">+</span>
                {t.skillsLabel} / {t.toolsLabel}
              </span>
              <h2 id="skills-title">
                {t.toolsTitle}
                <br />
                <em>{t.toolsItalic}</em>
              </h2>
            </div>
            <p>{t.toolsDescription}</p>
          </div>
          <div className="tool-rows">
            {[
              [
                t.backend,
                [
                  "C# / ASP.NET Core",
                  "Java / Servlet",
                  "MySQL",
                  "Entity Framework Core",
                ],
              ],
              [t.frontend, ["HTML / CSS", "JavaScript", "React / Vite"]],
              [
                t.tooling,
                [
                  "Git / GitHub",
                  "Docker",
                  "Visual Studio",
                  "VS Code",
                  "NetBeans",
                ],
              ],
            ].map(([label, items]) => (
              <div className="tool-row" key={label}>
                <h3>{label}</h3>
                <div>
                  {items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <Code2 size={20} />
              </div>
            ))}
          </div>
          <p className="learning-note">
            <Sparkles size={17} />
            <span>
              {t.learning}
              <strong>{t.learningValue}</strong>
            </span>
          </p>
        </section>
        <Experience lang={lang} t={t} onOpen={openProject}/>
        <ContactSection lang={lang} t={t}/>
      </main>}
      <footer className="site-footer">
        <a className="wordmark" href={`${projectRoute(lang)}#home`} onClick={e=>{e.preventDefault();goHome("home");}}>
          duyên<span className="logo-star">✳</span>
        </a>
        <p>
          © {new Date().getFullYear()} Nguyễn Thái Kỳ Duyên
          <br />
          <span>{t.footer}</span>
        </p>
        <div className="footer-actions">
          <label className="effects-control">
            <MousePointer2 size={17} />
            <select
              value={effectsMode}
              onChange={(e) => setEffectsMode(e.target.value)}
              aria-label={
                {
                  vi: "Hiệu ứng chuyển động",
                  en: "Motion effects",
                  ja: "モーション効果",
                }[lang]
              }
            >
              <option value="auto">FX AUTO</option>
              <option value="on">FX ON</option>
              <option value="off">FX OFF</option>
            </select>
          </label>
          <a className="icon-button" href={`${projectRoute(lang)}#home`} onClick={e=>{e.preventDefault();goHome("home");}} aria-label={t.top}>
            <ArrowUp size={22} />
          </a>
        </div>
      </footer>
      <div className="toast" role="status" aria-live="polite">
        {toast && <span>{toast}</span>}
      </div>
      </div>
    </>
  );
}
