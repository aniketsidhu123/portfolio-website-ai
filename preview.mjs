// Local frontend preview. For Gemini and contact delivery, use server.py.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const allowed = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
  ['/script.js', ['script.js', 'text/javascript; charset=utf-8']],
  ['/projects.js', ['projects.js', 'text/javascript; charset=utf-8']],
  ['/github-data.js', ['github-data.js', 'text/javascript; charset=utf-8']],
  ['/details.js', ['details.js', 'text/javascript; charset=utf-8']],
  ['/assets/favicon.svg', ['assets/favicon.svg', 'image/svg+xml']],
  ['/assets/aniket-github.png', ['assets/aniket-github.png', 'image/png']],
  ['/assets/signal-scene.mp4', ['assets/signal-scene.mp4', 'video/mp4']],
  ['/assets/signal-scene-poster.jpg', ['assets/signal-scene-poster.jpg', 'image/jpeg']],
  ['/assets/space-grotesk-latin.woff2', ['assets/space-grotesk-latin.woff2', 'font/woff2']],
  ['/assets/unbounded-latin.woff2', ['assets/unbounded-latin.woff2', 'font/woff2']],
  ['/assets/key-press.mp3', ['assets/key-press.mp3', 'audio/mpeg']],
  ['/assets/key-release.mp3', ['assets/key-release.mp3', 'audio/mpeg']],
]);

// A single byte range is sufficient for the local hero video's browser playback.
function byteRange(header, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!match || (!match[1] && !match[2]) || size === 0) return null;
  const first = match[1] ? Number(match[1]) : null;
  const last = match[2] ? Number(match[2]) : null;
  if ((first !== null && !Number.isSafeInteger(first)) || (last !== null && !Number.isSafeInteger(last))) return null;
  if (first === null) {
    if (last === 0) return null;
    return { start: Math.max(0, size - last), end: size - 1 };
  }
  if (first >= size || (last !== null && last < first)) return null;
  return { start: first, end: Math.min(last ?? size - 1, size - 1) };
}

const port = Number(process.env.PORT || 4173);
createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405); response.end(); return; }
  if (pathname === '/api/health' || pathname === '/api/config') {
    response.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    response.end(request.method === 'HEAD' ? undefined : JSON.stringify(pathname === '/api/health' ? { status: 'preview', gemini_ready: false } : { formspree_endpoint: '' }));
    return;
  }
  const file = allowed.get(pathname);
  if (!file) { response.writeHead(404); response.end('Not found'); return; }
  try {
    const data = await readFile(path.join(root, file[0]));
    const headers = { 'Content-Type': file[1], 'Content-Length': data.length, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };
    if (file[1] === 'video/mp4') {
      headers['Accept-Ranges'] = 'bytes';
      if (request.headers.range) {
        const range = byteRange(request.headers.range, data.length);
        if (!range) {
          response.writeHead(416, { ...headers, 'Content-Range': `bytes */${data.length}`, 'Content-Length': 0 });
          response.end(); return;
        }
        headers['Content-Range'] = `bytes ${range.start}-${range.end}/${data.length}`;
        headers['Content-Length'] = range.end - range.start + 1;
        response.writeHead(206, headers);
        response.end(request.method === 'HEAD' ? undefined : data.subarray(range.start, range.end + 1));
        return;
      }
    }
    response.writeHead(200, headers);
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch { response.writeHead(500); response.end('Unable to load file'); }
}).listen(port, '127.0.0.1', () => console.log(`Portfolio preview: http://127.0.0.1:${port}`));
