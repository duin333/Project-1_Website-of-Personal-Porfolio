import { useEffect, useRef, useState } from "react";
import { Music2, Volume2, VolumeX, LoaderCircle } from "lucide-react";
import { tracks } from "./music.js";
const copy = {
 vi:{next:'Đổi bài nhạc',on:'Bật nhạc nền',off:'Tắt nhạc nền',empty:'Chờ thêm nhạc',hint:'Bấm tên bài để đổi nhạc',playing:'Đang phát',paused:'Đang tắt',loading:'Đang tải',error:'Không phát được bài này',blocked:'Chạm để nghe'},
 en:{next:'Next track',on:'Play music',off:'Pause music',empty:'Music coming soon',hint:'Click the title for the next track',playing:'Playing',paused:'Off',loading:'Loading',error:'Unable to play this track',blocked:'Tap to listen'},
 ja:{next:'次の曲',on:'BGMをオン',off:'BGMをオフ',empty:'音楽を準備中',hint:'曲名を押すと次の曲になります',playing:'再生中',paused:'オフ',loading:'読み込み中',error:'再生できません',blocked:'タップして再生'},
};
export default function MusicPlayer({lang}) {
 const t=copy[lang], audio=useRef(null), intent=useRef(true);
 const [index,setIndex]=useState(()=>{try{return Math.max(0,tracks.findIndex(p=>p.id===localStorage.getItem('duyen-track')));}catch{return 0;}});
 const [playing,setPlaying]=useState(false),[pending,setPending]=useState(false),[error,setError]=useState(false);
 const [blocked,setBlocked]=useState(false);
 const track=tracks[index];
 async function play(){if(!audio.current||!track)return;intent.current=true;setPending(true);setError(false);setBlocked(false);try{await audio.current.play();}catch(e){setPending(false);if(e.name==='NotAllowedError')setBlocked(true);else{setError(true);intent.current=false;}}}
 function pause(){intent.current=false;audio.current?.pause();setPending(false);setBlocked(false);}
 function next(){if(tracks.length<2)return;setIndex(i=>(i+1)%tracks.length);}
 useEffect(()=>{
  if(!track)return;
  try{localStorage.setItem('duyen-track',track.id);}catch{}
  audio.current.volume=.25;
  if(intent.current)play();
 },[index]);
 useEffect(()=>{
  const resume=e=>{
   if(e.target.closest?.('.music-toggle'))return;
   if(intent.current&&audio.current?.paused)play();
  };
  document.addEventListener('pointerdown',resume,{passive:true});document.addEventListener('keydown',resume);
  return()=>{document.removeEventListener('pointerdown',resume);document.removeEventListener('keydown',resume);};
 },[]);
 const status=error?t.error:blocked?t.blocked:pending?t.loading:playing?t.playing:t.paused;
 return <div className="nav-music" data-playing={playing}>
  <button type="button" className="music-box" disabled={!track} onClick={next} aria-label={track?`${t.next}: ${track.title}`:t.empty} title={track?t.hint:t.empty}>
   <span className="music-record" aria-hidden="true"><Music2 size={16}/></span>
   <span className="music-caption"><strong>{track?.title||t.empty}</strong><small role="status">{track?status:'—'}</small></span>
   <span className="music-bars" aria-hidden="true"><i/><i/><i/></span>
  </button>
  <button type="button" className="icon-button music-toggle" disabled={!track} aria-label={playing||pending?t.off:t.on} aria-pressed={playing||pending} onClick={()=>playing||pending?pause():play()}>{pending?<LoaderCircle className="music-spinner" size={18}/>:playing?<Volume2 size={18}/>:<VolumeX size={18}/>}</button>
  {track&&<audio key={track.id} ref={audio} src={track.src} preload="auto" loop={tracks.length===1} onPlaying={()=>{setPlaying(true);setPending(false);}} onPause={()=>setPlaying(false)} onWaiting={()=>setPending(true)} onError={()=>{setError(true);setPending(false);setPlaying(false);}} onEnded={()=>{if(tracks.length>1)next();else if(intent.current){audio.current.currentTime=0;play();}}}/>}
 </div>;
}
