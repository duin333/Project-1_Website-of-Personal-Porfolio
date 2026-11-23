import { useEffect, useRef, useState } from "react";
import { Music2, Volume2, VolumeX, ChevronDown, Check, LoaderCircle, X, ExternalLink } from "lucide-react";
import { tracks } from "./music.js";
import { loadYouTubeApi } from "./youtube.js";
const copy={
 vi:{next:'Đổi bài nhạc',list:'Chọn nhạc Ghibli',on:'Bật nhạc nền',off:'Tắt nhạc nền',volume:'Âm lượng',error:'YouTube chưa phát được. Thử bài khác hoặc mở trên YouTube.',hint:'Bấm hộp nhạc để đổi bài',source:'Mở trên YouTube',paused:'Đang tắt',playing:'Đang phát',loading:'Đang tải',close:'Đóng và dừng nhạc',blocked:'Bấm nút phát trong player để bắt đầu.',note:'Ghibli · Piano covers'},
 en:{next:'Next track',list:'Ghibli music',on:'Turn background music on',off:'Turn background music off',volume:'Volume',error:'YouTube cannot play this track. Try another or open YouTube.',hint:'Click the music box to change tracks',source:'Open on YouTube',paused:'Off',playing:'Playing',loading:'Loading',close:'Close and stop music',blocked:'Press play in the player to begin.',note:'Ghibli · Piano covers'},
 ja:{next:'次の曲',list:'ジブリの音楽',on:'BGMをオン',off:'BGMをオフ',volume:'音量',error:'再生できません。別の曲を選ぶか、YouTubeで開いてください。',hint:'曲名を押すと次の曲になります',source:'YouTubeで開く',paused:'オフ',playing:'再生中',loading:'読み込み中',close:'閉じて音楽を停止',blocked:'プレーヤーの再生ボタンを押してください。',note:'Ghibli · Piano covers'},
};
function saved(key,fallback){try{return localStorage.getItem(key)??fallback;}catch{return fallback;}}
export default function MusicPlayer({lang}) {
 const t=copy[lang];
 const [index,setIndex]=useState(()=>Math.max(0,tracks.findIndex(p=>p.id===saved('duyen-track','howl-piano'))));
 const [playing,setPlaying]=useState(false),[pending,setPending]=useState(false),[error,setError]=useState(false),[blocked,setBlocked]=useState(false);
 const [open,setOpen]=useState(false),[enabled,setEnabled]=useState(false);
 const [volume,setVolume]=useState(()=>{const n=Number(saved('duyen-volume','0.25'));return Number.isFinite(n)?Math.min(.7,Math.max(.05,n)):.25;});
 const player=useRef(null),host=useRef(null),root=useRef(null),trigger=useRef(null);
 const ready=useRef(false);
 const active=useRef(index),volumeRef=useRef(volume),intent=useRef(false),selectRef=useRef(null),position=useRef({});
 const track=tracks[index];
 function stop() {
  intent.current=false;
  try {if(player.current?.getCurrentTime)position.current[active.current]=player.current.getCurrentTime();player.current?.destroy();}catch{}
  player.current=null;ready.current=false;setPlaying(false);setPending(false);setEnabled(false);setOpen(false);setBlocked(false);
 }
 function start(){intent.current=true;setError(false);setBlocked(false);setPending(true);setOpen(true);setEnabled(true);}
 function select(next,shouldPlay=false) {
  active.current=next;setIndex(next);setError(false);setBlocked(false);
  try{localStorage.setItem('duyen-track',tracks[next].id);}catch{}
  if(ready.current && player.current?.loadVideoById && intent.current){setPending(true);setPlaying(false);player.current.loadVideoById(tracks[next].videoId);}
  else if(shouldPlay)start();
 }
 selectRef.current=select;
 useEffect(()=>{
  volumeRef.current=volume;player.current?.setVolume?.(Math.round(volume*100));
  try{localStorage.setItem('duyen-volume',String(volume));}catch{}
 },[volume]);
 useEffect(()=>{
  if(!enabled)return;
  let disposed=false;
  loadYouTubeApi().then(YT=>{
   if(disposed||!host.current||!intent.current)return;
   const mount=document.createElement('div');host.current.replaceChildren(mount);
   player.current=new YT.Player(mount,{
    width:'100%',height:'200',videoId:tracks[active.current].videoId,
    playerVars:{autoplay:0,playsinline:1,controls:1,enablejsapi:1,origin:location.origin,start:Math.floor(position.current[active.current]||0)},
    events:{
     onReady:e=>{if(disposed)return;ready.current=true;e.target.setVolume(Math.round(volumeRef.current*100));if(intent.current)e.target.loadVideoById({videoId:tracks[active.current].videoId,startSeconds:Math.floor(position.current[active.current]||0)});},
     onStateChange:e=>{if(disposed)return;setPlaying(e.data===1);if(e.data===1||e.data===2)setPending(false);if(e.data===3)setPending(true);if(e.data===0&&intent.current)selectRef.current((active.current+1)%tracks.length);},
     onError:e=>{if(disposed)return;console.warn("YouTube player error",e.data);setError(true);setPending(false);setPlaying(false);},
     onAutoplayBlocked:()=>{if(disposed)return;setBlocked(true);setPending(false);setPlaying(false);},
    },
   });
  }).catch(()=>{if(!disposed){setError(true);setPending(false);}});
  return()=>{disposed=true;try{player.current?.destroy();}catch{}player.current=null;ready.current=false;};
 },[enabled]);
 useEffect(()=>{
  const outside=e=>{if(open&&!root.current?.contains(e.target)&&!enabled)setOpen(false);};
  const esc=e=>{if(e.key==='Escape'&&open){stop();trigger.current?.focus();}};
  document.addEventListener('pointerdown',outside);document.addEventListener('keydown',esc);
  return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',esc);};
 },[open,enabled]);
 return <div className="nav-music" data-playing={playing} ref={root}>
  <button type="button" className="music-box" onClick={()=>select((index+1)%tracks.length)} aria-label={`${t.next}: ${track.title}`} title={t.hint}><span className="music-record" aria-hidden="true"><Music2 size={16}/></span><span className="music-caption"><strong>{track.title}</strong><small>{pending?t.loading:playing?t.playing:t.paused}</small></span><span className="music-bars" aria-hidden="true"><i/><i/><i/></span></button>
  <button type="button" ref={trigger} className="music-list-toggle" aria-label={t.list} aria-expanded={open} aria-controls="ghibli-player" onClick={()=>open?stop():setOpen(true)}><ChevronDown size={14}/></button>
  <button type="button" className="icon-button music-toggle" aria-label={enabled?t.off:t.on} aria-pressed={enabled} onClick={()=>enabled?stop():start()}>{pending?<LoaderCircle className="music-spinner" size={18}/>:enabled?<Volume2 size={18}/>:<VolumeX size={18}/>}</button>
  {open&&<section className="ghibli-panel" id="ghibli-player" aria-label={t.list}>
   <div className="ghibli-panel-top"><strong>{t.list}</strong><button type="button" className="icon-button" onClick={stop} aria-label={t.close}><X size={18}/></button></div>
   {enabled&&<div className="youtube-host" ref={host}/>}
   {(error||blocked)&&<p className="youtube-notice" role="status">{error?t.error:t.blocked}</p>}
   <div className="ghibli-tracks">{tracks.map((p,i)=><button type="button" key={p.id} aria-pressed={index===i} onClick={()=>select(i,true)}><span><strong>{p.title}</strong><small>{p.artist} · {p.film}</small></span>{i===index&&<Check size={16}/>}</button>)}</div>
   <label className="music-volume">{t.volume}<input type="range" min="0.05" max="0.7" step="0.05" value={volume} onChange={e=>setVolume(Number(e.target.value))}/></label>
   <div className="music-credit"><small>{t.note}</small><a href={`https://www.youtube.com/watch?v=${track.videoId}`} target="_blank" rel="noopener noreferrer">{t.source}<ExternalLink size={12}/></a></div>
  </section>}
 </div>;
}
