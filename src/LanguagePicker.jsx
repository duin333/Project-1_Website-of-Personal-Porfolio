import { useEffect, useRef } from "react";
import { Languages, ChevronDown, Check } from "lucide-react";
export default function LanguagePicker({lang,onChange,label}) {
 const root=useRef(null);
 useEffect(()=>{
  const outside=e=>{if(!root.current?.contains(e.target)) root.current?.removeAttribute('open');};
  const escape=e=>{if(e.key==='Escape' && root.current?.open){root.current.removeAttribute('open');root.current.querySelector('summary').focus();}};
  document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape);
  return ()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape);};
 },[]);
 return <details ref={root} className="language-picker"><summary aria-label={label}><Languages size={17}/><span>{lang==='ja'?'JP':lang.toUpperCase()}</span><ChevronDown size={12}/></summary><div className="language-options" role="group" aria-label={label}>{[['vi','Tiếng Việt'],['en','English'],['ja','日本語']].map(([code,name])=><button key={code} type="button" lang={code} aria-pressed={lang===code} onClick={()=>{onChange(code);root.current.removeAttribute('open');root.current.querySelector('summary').focus();}}><span>{name}</span>{lang===code&&<Check size={15}/>}</button>)}</div></details>;
}
