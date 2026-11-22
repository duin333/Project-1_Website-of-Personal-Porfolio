import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUp, Check, Code2, Copy, FolderOpen, Github, Globe2, Mail, Menu, Moon, MousePointer2, Plus, Sparkles, Sun, X, ChevronLeft, ChevronRight, BookOpen, Headphones, Utensils, Layers, MapPin } from 'lucide-react';
import { copy, projects, languages, email, github, readRoute, projectRoute, roles } from './content.js';

function saved(key, fallback) { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } }
function persist(key, value) { try { localStorage.setItem(key, value); } catch { /* Private browsing still works without persistence. */ } }
const icons = { comichub: BookOpen, musicbox: Headphones, portfolio: Layers, foodgo: Utensils };

function ProjectArt({ id, compact = false }) {
  return <div className={`project-art art-${id} ${compact ? 'compact' : ''}`} aria-hidden="true">
    {id === 'comichub' && <><div className="comic-masthead">COMIC<span>HUB</span><i>✦</i></div><div className="comic-covers"><div><span>THE<br/>NEXT<br/>CHAPTER</span><i>✳</i></div><div><i>◎</i><span>LOST IN<br/>A STORY</span></div><div><span>ONE<br/>MORE<br/>PAGE.</span><i>✦</i></div></div><div className="comic-bottom"><span>STORIES WORTH EXPLORING</span><span>•••</span></div><div className="art-chat"><Sparkles size={15}/><span>Discover your next story</span></div></>}
    {id === 'musicbox' && <><div className="music-brand"><Headphones/> musicbox<span>ROOM STUDIO</span></div><div className="music-room"><span>NOW PLAYING</span><strong>Good times.<br/>Great company.</strong><div className="sound-bars">{Array.from({length:18},(_,i)=><i key={i} style={{height:`${18+(i*29%65)}%`}}/>)}</div><div className="music-pills"><span>ROOMS</span><span>ORDERS</span><span>CHECKOUT</span></div></div><span className="music-disc">♫</span></>}
    {id === 'portfolio' && <><div className="mini-browser"><span>•••</span><span>duyen / project archive</span><Plus size={12}/></div><div className="mini-portfolio"><span>CURIOUS BY NATURE</span><strong>Things<br/><em>I build.</em></strong><div className="mini-folders"><i/><i/><i/></div><span className="mini-star">✳</span></div></>}
    {id === 'foodgo' && <><div className="food-orbit"/><div className="food-wordmark">FoodGo<span>made to move.</span></div><div className="food-phone"><div className="phone-notch"/><div className="food-map"><i/><i/><i/><MapPin className="map-pin" size={27}/><div className="map-path"/></div><div className="food-delivery"><span>DRIVER</span><strong>Let’s get going.</strong><div><span>●</span><i/><span>●</span></div></div></div><span className="food-sticker">ON THE<br/>WAY!</span></>}
  </div>;
}

function Folder({ project, lang, t, hero = false, onOpen, index }) {
  const Icon = icons[project.id];
  const ref = useRef(null);
  function tilt(e) {
    if (matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches || document.documentElement.dataset.effects === 'off') return;
    const b = e.currentTarget.getBoundingClientRect();
    ref.current?.style.setProperty('--tilt', `${((e.clientX - b.left) / b.width - .5) * 5}deg`);
  }
  return <button ref={ref} className={`folder ${project.color} ${hero ? 'hero-folder' : 'project-folder'}`} style={{'--i':index}} onClick={e=>onOpen(project.id,e.currentTarget)} onPointerMove={tilt} onPointerLeave={()=>ref.current?.style.setProperty('--tilt','0deg')} aria-label={`${t.open}: ${project.name}`}>
    <span className="folder-tab"><Icon size={16}/>{project.name}<span className="tab-dot"/></span>
    <span className="folder-sheet"><span>{project.type}</span><Code2 size={18}/></span>
    <span className="folder-body">
      {hero ? <><span className="folder-meta">{project.type}</span><span className="folder-name">{project.name}</span><span className="folder-small">{project.stack.slice(0,3).join(' / ') || t.team}</span><span className="folder-open"><Plus size={21}/></span></> : <><ProjectArt id={project.id}/><span className="folder-caption"><span><span className="folder-meta">{project.type}</span><strong>{project.name}</strong></span><span className="folder-open"><Plus size={22}/></span></span></>}
    </span>
  </button>;
}

function ProjectDialog({ project, lang, t, close, navigate, theme }) {
  const dialogRef = useRef(null);
  const content = project[lang];
  useLayoutEffect(()=>{
    const d=dialogRef.current;
    d.showModal();
    const before=document.body.style.overflow;
    document.body.style.overflow='hidden';
    return ()=>{document.body.style.overflow=before;d.close();};
  },[]);
  useEffect(()=>{dialogRef.current?.querySelector('.dialog-scroll')?.scrollTo(0,0);},[project.id]);
  const index=projects.findIndex(p=>p.id===project.id);
  return <dialog className={`project-dialog ${project.color}`} ref={dialogRef} onCancel={e=>{e.preventDefault();close();}} onClick={e=>{if(e.target===e.currentTarget)close();}} aria-labelledby="project-dialog-title" data-theme={theme}>
    <div className="dialog-top"><span><FolderOpen size={17}/> archive / {project.id}</span><button className="icon-button" onClick={close} aria-label={t.close} autoFocus><X size={23}/></button></div>
    <div className="dialog-scroll" key={project.id}>
      <div className="dialog-title"><span className="eyebrow">{project.type}</span><h2 id="project-dialog-title">{project.name}</h2><p>{content.subtitle}</p><span className="status"><span/>{t[project.status]}</span></div>
      <ProjectArt id={project.id}/><p className="art-caption">{t.illustration}</p>
      <div className="dialog-content"><div className="project-role"><Code2 size={18}/><span>{roles[project.id][lang]}</span></div><section><h3>{t.overview}</h3><p>{content.description}</p></section><section><h3>{t.technology}</h3><div className="tags">{project.stack.length ? project.stack.map(s=><span key={s}>{s}</span>) : <span>Kotlin / Android *</span>}</div>{project.id==='foodgo'&&<p className="small-note">{lang==='vi'?'* Theo README profile; chờ xác nhận từ repo nhóm.':lang==='ja'?'* プロフィールの記載に基づく情報。ソース確認待ち。':'* Based on the profile README; awaiting source verification.'}</p>}</section><section><h3>{t.highlights}</h3><ul>{content.highlights.map(item=><li key={item}>{item}</li>)}</ul></section><section><h3>{t.next}</h3><p>{content.next}</p></section>
      {project.repo && <a className="button primary" href={project.repo} target="_blank" rel="noopener noreferrer"><Github size={18}/>{t.source}</a>}
      <div className="dialog-pagination"><button onClick={()=>navigate(projects[(index+projects.length-1)%projects.length].id)} aria-label={t.prevProject}><ChevronLeft size={18}/>{projects[(index+projects.length-1)%projects.length].name}</button><button onClick={()=>navigate(projects[(index+1)%projects.length].id)} aria-label={t.nextProject}>{projects[(index+1)%projects.length].name}<ChevronRight size={18}/></button></div></div>
    </div>
  </dialog>;
}

export default function App() {
  const initial=readRoute(location.hash);
  const [lang,setLang]=useState(initial?.lang || (languages.includes(saved('duyen-lang','vi')) ? saved('duyen-lang','vi') : 'vi'));
  const [activeProject,setActiveProject]=useState(initial?.project || null);
  const [theme,setTheme]=useState(document.documentElement.dataset.theme || 'light');
  const [effects,setEffects]=useState(saved('duyen-effects','on')!=='off');
  const [menu,setMenu]=useState(false);
  const [filter,setFilter]=useState('all');
  const [toast,setToast]=useState('');
  const opener=useRef(null); const toastTimer=useRef(null);
  const t=copy[lang];
  useEffect(()=>{const change=()=>{const r=readRoute(location.hash);if(r){setLang(r.lang);setActiveProject(r.project);}else setActiveProject(null);};addEventListener('hashchange',change);addEventListener('popstate',change);return()=>{removeEventListener('hashchange',change);removeEventListener('popstate',change);};},[]);
  useEffect(()=>{document.documentElement.lang=lang;persist('duyen-lang',lang);document.title=`${activeProject?projects.find(p=>p.id===activeProject)?.name+' · ':''}Duyên — Project Archive`;document.querySelector('meta[name="description"]')?.setAttribute('content',t.heroDescription);},[lang,activeProject,t.heroDescription]);
  useEffect(()=>{document.documentElement.dataset.theme=theme;persist('duyen-theme',theme);document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='dark'?'#131c24':'#f5f6f2');},[theme]);
  useEffect(()=>{document.documentElement.dataset.effects=effects?'on':'off';persist('duyen-effects',effects?'on':'off');if(!effects)return;const move=e=>{document.documentElement.style.setProperty('--mouse-x',`${e.clientX}px`);document.documentElement.style.setProperty('--mouse-y',`${e.clientY}px`);};addEventListener('pointermove',move,{passive:true});return()=>removeEventListener('pointermove',move);},[effects]);
  useEffect(()=>()=>clearTimeout(toastTimer.current),[]);
  useEffect(()=>{if(!menu)return;const esc=e=>{if(e.key==='Escape')setMenu(false);};addEventListener('keydown',esc);return()=>removeEventListener('keydown',esc);},[menu]);
  function openProject(id,element){opener.current=element || document.activeElement;setMenu(false);setActiveProject(id);history.pushState({project:id},'',projectRoute(lang,id));}
  function closeProject(){setActiveProject(null);history.replaceState(null,'',projectRoute(lang));requestAnimationFrame(()=>opener.current?.isConnected?opener.current.focus():document.getElementById('projects-title')?.focus());}
  function changeLanguage(value){setLang(value);history.replaceState(null,'',projectRoute(value,activeProject));}
  function navigateProject(id){setActiveProject(id);history.replaceState({project:id},'',projectRoute(lang,id));}
  async function copyEmail(){let message;try{await navigator.clipboard.writeText(email);message=t.copied;}catch{message=t.copyFailed;}setToast(message);clearTimeout(toastTimer.current);toastTimer.current=setTimeout(()=>setToast(''),4500);}
  const filtered=projects.filter(p=>filter==='all'||p.category===filter);
  return <>
    <a className="skip-link" href="#main">{t.skip}</a>
    <div className="pointer-glow" aria-hidden="true"/>
    <header className="site-header"><a className="wordmark" href="#home" aria-label="Duyên — home">duyên<span className="logo-star">✳</span></a><nav id="mobile-nav" className={menu?'main-nav is-open':'main-nav'} aria-label={lang==='vi'?'Điều hướng chính':lang==='ja'?'メインナビゲーション':'Main navigation'}>{t.nav.map((n,i)=><a key={i} href={`#${['projects','about','contact'][i]}`} onClick={()=>setMenu(false)}>{n}<span>0{i+1}</span></a>)}</nav><div className="header-controls"><div className="language-switch" role="group" aria-label={t.language}>{languages.map(l=><button key={l} lang={l} aria-label={{vi:'Tiếng Việt',en:'English',ja:'日本語'}[l]} aria-pressed={lang===l} onClick={()=>changeLanguage(l)}>{l==='ja'?'JP':l.toUpperCase()}</button>)}</div><span className="control-divider"/><button className="icon-button theme-toggle" onClick={()=>setTheme(theme==='light'?'dark':'light')} aria-label={theme==='light'?t.themeDark:t.themeLight}>{theme==='light'?<Moon size={19}/>:<Sun size={19}/>}</button><button className="icon-button menu-toggle" aria-expanded={menu} aria-controls="mobile-nav" aria-label={menu?t.menuClose:t.menuOpen} onClick={()=>setMenu(!menu)}>{menu?<X size={23}/>:<Menu size={23}/>}</button></div></header>
    <main id="main"><section id="home" className="hero"><div className="hero-kicker"><span><i/>{t.archive}</span><span>{t.location}<span className="tiny-star">✦</span></span></div><div className="hero-heading"><span className="hero-prefix">Portfolio <span className="outline-star">✳</span></span><h1>{t.heroTop}<br/><em>{t.heroBottom}</em></h1><div className="hero-description"><p>{t.heroDescription}</p><div className="hero-actions"><a className="button primary" href="#projects"><FolderOpen size={18}/>{t.explore}</a><a className="text-link" href={github} target="_blank" rel="noopener noreferrer"><Github size={17}/>{t.github}</a></div></div><span className="hero-scribble" aria-hidden="true">hello, world!<svg viewBox="0 0 140 45"><path d="M4 10Q45 37 125 12M25 24Q60 42 129 24"/></svg></span></div><div className="folder-stage"><div className="stage-caption"><span>✳</span>{t.heroNote}<svg viewBox="0 0 100 60" aria-hidden="true"><path d="M5 8Q80 -2 84 48M74 39l10 10 8-12"/></svg></div><div className="hero-folders">{projects.map((p,i)=><Folder key={p.id} project={p} index={i} lang={lang} t={t} hero onOpen={openProject}/>)}</div><div className="stage-baseline"><span>WEB · BACKEND · MOBILE</span><span>{t.scroll}<span className="scroll-line"/></span></div></div></section>
    <section id="projects" className="projects-section section-wrap"><div className="section-heading"><div><span className="eyebrow"><span className="cross">+</span>{t.selected}</span><h2 id="projects-title" tabIndex={-1}>{t.workTitle}<br/><em>{t.workItalic}</em></h2></div><p>{t.workDescription}</p></div><div className="project-toolbar"><div className="filters" role="group" aria-label={lang==='vi'?'Lọc dự án':lang==='ja'?'プロジェクトの絞り込み':'Filter projects'}>{['all','web','mobile'].map(f=><button key={f} aria-pressed={filter===f} onClick={()=>setFilter(f)}>{t[f]}<span>{f==='all'?projects.length:projects.filter(p=>p.category===f).length}</span></button>)}</div><span className="archive-count" aria-live="polite">{String(filtered.length).padStart(2,'0')} / {String(projects.length).padStart(2,'0')}</span></div><div className="projects-grid">{filtered.map((p,i)=><article key={p.id} className={`project-item ${p.color}`}><Folder project={p} index={i} lang={lang} t={t} onOpen={openProject}/><div className="project-info"><span className="status"><span/>{t[p.status]}</span><p>{p[lang].summary}</p><div className="tags">{p.stack.length?p.stack.slice(0,4).map(s=><span key={s}>{s}</span>):<span>{t.team}</span>}</div></div></article>)}</div><div className="archive-end"><span className="dashed-line"/><span>✳ {t.footerNote}</span><span className="dashed-line"/></div></section>
    <section id="about" className="about-section section-wrap"><div className="about-layout"><div className="identity-card"><div className="identity-top"><span>PERSONAL FILE</span><span>DUIN333</span></div><div className="identity-art"><div className="identity-grid"/><span className="identity-monogram">d<span>✳</span></span><span className="identity-art-note">curious mind,<br/>builder at heart.</span><span className="identity-badge"><Code2 size={18}/> WEB & MOBILE</span></div><div className="identity-bottom"><strong>Nguyễn Thái<br/>Kỳ Duyên</strong><span><MapPin size={14}/> Đà Nẵng, VN</span></div><span className="identity-sticker">{t.aboutSticker}</span></div><div className="about-copy"><span className="eyebrow"><span className="cross">+</span>{t.aboutLabel}</span><h2>{t.aboutTitle}<br/><em>{t.aboutItalic}</em></h2><p>{t.aboutP}</p><p>{t.aboutP2}</p><div className="about-facts"><div><span>{t.education}</span><strong>{t.educationValue}</strong></div><div><span>{t.focus}</span><strong>{t.focusValue}</strong></div></div><div className="languages-block"><h3><Globe2 size={17}/>{t.languageTitle}</h3><div className="language-cards">{[[t.vietnamese,t.native,'VI'],[t.english,t.b2,'EN'],[t.japanese,t.n4,'JP']].map(([name,level,code])=><div key={code}><span>{code}</span><strong>{name}</strong><small>{level}</small></div>)}</div></div></div></div></section>
    <section className="tools-section section-wrap"><div className="section-heading"><div><span className="eyebrow"><span className="cross">+</span>{t.toolsLabel}</span><h2>{t.toolsTitle}<br/><em>{t.toolsItalic}</em></h2></div><p>{t.toolsDescription}</p></div><div className="tool-rows">{[[t.backend,['C# / ASP.NET Core','Java / Servlet','MySQL','Entity Framework Core']],[t.frontend,['HTML / CSS','JavaScript','React / Vite']],[t.tooling,['Git / GitHub','Docker','Visual Studio','VS Code','NetBeans']]].map(([label,items])=><div className="tool-row" key={label}><h3>{label}</h3><div>{items.map(item=><span key={item}>{item}</span>)}</div><Code2 size={20}/></div>)}</div><p className="learning-note"><Sparkles size={17}/><span>{t.learning}<strong>{t.learningValue}</strong></span></p></section>
    <section id="contact" className="contact-section"><div className="contact-inner"><span className="eyebrow">{t.contactLabel}</span><h2>{t.contactTitle}<br/><em>{t.contactItalic}</em><span className="contact-star" aria-hidden="true">✳</span></h2><div className="contact-bottom"><p>{t.contactP}</p><div><a className="contact-email" href={`mailto:${email}`}>{email}</a><div className="contact-actions"><a className="button dark-button" href={`mailto:${email}`}><Mail size={18}/>{t.mail}</a><button className="icon-button copy-button" onClick={copyEmail} aria-label={t.copyMail}>{toast===t.copied?<Check size={20}/>:<Copy size={20}/>}</button><a className="icon-button github-button" href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={21}/></a></div></div></div></div></section>
    </main><footer className="site-footer"><a className="wordmark" href="#home">duyên<span className="logo-star">✳</span></a><p>© {new Date().getFullYear()} Nguyễn Thái Kỳ Duyên<br/><span>{t.footer}</span></p><div className="footer-actions"><button className="icon-button effects-toggle" onClick={()=>setEffects(!effects)} aria-pressed={effects} aria-label={effects?t.effectOn:t.effectOff}><MousePointer2 size={17}/><span>FX {effects?'ON':'OFF'}</span></button><a className="icon-button" href="#home" aria-label={t.top}><ArrowUp size={22}/></a></div></footer>
    <div className="toast" role="status" aria-live="polite">{toast&&<span>{toast}</span>}</div>
    {activeProject&&<ProjectDialog project={projects.find(p=>p.id===activeProject)} lang={lang} t={t} close={closeProject} navigate={navigateProject} theme={theme}/>}
  </>;
}
