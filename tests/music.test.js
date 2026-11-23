import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tracks } from '../src/music.js';
test('Ghibli playlist has unique performer video IDs and complete display metadata',()=>{
 assert.equal(new Set(tracks.map(t=>t.id)).size,tracks.length);
 assert.equal(new Set(tracks.map(t=>t.videoId)).size,tracks.length);
 for(const t of tracks){assert.match(t.videoId,/^[a-zA-Z0-9_-]{11}$/);assert.ok(t.title&&t.film);assert.ok(t.artist);assert.equal('src' in t,false);}
});
