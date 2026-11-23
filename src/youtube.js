let apiPromise;
export function loadYouTubeApi() {
 if(window.YT?.Player) return Promise.resolve(window.YT);
 if(apiPromise) return apiPromise;
 apiPromise=new Promise((resolve,reject)=>{
  const previous=window.onYouTubeIframeAPIReady;
  const timeout=setTimeout(()=>{apiPromise=null;reject(new Error('YouTube API timeout'));},15000);
  window.onYouTubeIframeAPIReady=()=>{clearTimeout(timeout);previous?.();resolve(window.YT);};
  let script=document.querySelector('script[data-portfolio-youtube]');
  if(!script){script=document.createElement('script');script.src='https://www.youtube.com/iframe_api';script.dataset.portfolioYoutube='true';script.onerror=()=>{clearTimeout(timeout);script.remove();apiPromise=null;reject(new Error('YouTube API unavailable'));};document.head.appendChild(script);}
 });
 return apiPromise;
}
