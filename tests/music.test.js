import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { tracks } from '../src/music.js';
test('local playlist references real bundled audio files with unique IDs',()=>{
 assert.equal(new Set(tracks.map(t=>t.id)).size,tracks.length);
 for(const t of tracks){assert.ok(t.title&&t.artist);assert.match(t.src,/^\/music\/[\w.-]+\.(mp3|ogg|wav|m4a)$/);assert.ok(existsSync(new URL(`../public${t.src}`,import.meta.url)));}
});
