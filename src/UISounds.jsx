import { useEffect, useRef, useState } from 'react';
import { MousePointer2 } from 'lucide-react';
export default function UISounds({lang}) {
 const [enabled,setEnabled]=useState(()=>{try{return localStorage.getItem('duyen-ui-sounds')!=='off';}catch{return true;}});
 const context=useRef(null),last=useRef(0);
 useEffect(()=>{
  try{localStorage.setItem('duyen-ui-sounds',enabled?'on':'off');}catch{}
  if(!enabled)return;
  const unlock=()=>{
   try {context.current ||= new (window.AudioContext||window.webkitAudioContext)(); if(context.current.state==='suspended')context.current.resume().catch(()=>{});}catch{}
  };
  const pop=(click=false)=>{
   const ctx=context.current;
   if(!ctx||ctx.state!=='running'||document.hidden)return;
   const now=performance.now();if(now-last.current<(click?45:110))return;last.current=now;
   const osc=ctx.createOscillator(),gain=ctx.createGain(),t=ctx.currentTime;
   osc.type='sine';osc.frequency.setValueAtTime(click?620:850,t);osc.frequency.exponentialRampToValueAtTime(click?180:390,t+.065);
   gain.gain.setValueAtTime(.0001,t);gain.gain.exponentialRampToValueAtTime(click?.065:.025,t+.006);gain.gain.exponentialRampToValueAtTime(.0001,t+.085);
   osc.connect(gain);gain.connect(ctx.destination);osc.start(t);osc.stop(t+.09);osc.onended=()=>{osc.disconnect();gain.disconnect();};
  };
  const hover=e=>{
   if(e.pointerType==='touch')return;
   const target=e.target.closest?.('a,button,summary,input,select,textarea');
   if(!target||target.matches(':disabled')||target.contains(e.relatedTarget)||target.closest('[data-ui-sound-toggle]'))return;
   pop();
  };
  const click=e=>{if(!e.target.closest?.('[data-ui-sound-toggle]'))pop(true);};
  document.addEventListener('pointerdown',unlock,{passive:true});document.addEventListener('keydown',unlock);
  document.addEventListener('pointerover',hover,{passive:true});document.addEventListener('click',click);
  return()=>{document.removeEventListener('pointerdown',unlock);document.removeEventListener('keydown',unlock);document.removeEventListener('pointerover',hover);document.removeEventListener('click',click);};
 },[enabled]);
 useEffect(()=>()=>{context.current?.close().catch(()=>{});context.current=null;},[]);
 const label=lang==='vi'?(enabled?'Tắt tiếng póp':'Bật tiếng póp'):lang==='ja'?(enabled?'操作音をオフ':'操作音をオン'):(enabled?'Turn UI sounds off':'Turn UI sounds on');
 return <button type="button" className="icon-button ui-sound-toggle" data-ui-sound-toggle aria-label={label} title={label} aria-pressed={enabled} onClick={()=>setEnabled(v=>!v)}><MousePointer2 size={16}/><span aria-hidden="true">{enabled?'♪':'×'}</span></button>;
}
