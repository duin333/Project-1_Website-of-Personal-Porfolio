# Local music and UI audio

User-provided 30:18 lofi mix, encoded at 96 kbps to stay below Cloudflare Pages' 25 MiB asset limit. Source: the MP3 supplied in the conversation. Bundled at public/music/lofi-chill-30min.mp3. No YouTube requests or iframe.

The page attempts playback on every load at 25% volume and loops the mix. If the browser blocks audible autoplay, the first pointer or keyboard interaction retries playback. The sound button pauses immediately and prevents gesture retries for the current visit. Reload starts a new autoplay attempt as requested.

Hover and click pops are synthesized locally using Web Audio sine envelopes, with low volume and hover throttling. They unlock after a user gesture and have a separate navbar mute control; that preference is saved locally.
