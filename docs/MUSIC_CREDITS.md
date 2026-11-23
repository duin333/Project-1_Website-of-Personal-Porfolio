# Local music

The player uses HTML audio only, with no YouTube API, iframe or external music request. It starts only after a click and pauses using the navbar sound button. Clicking the title changes tracks; playback continues to the next track on completion.

Waiting for the owner's audio files. Add the files to public/music and metadata to src/music.js. Until files arrive, the controls show an unavailable state rather than pretending to play.
