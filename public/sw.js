const VERSION = 'linux-kid-lab-v6';
const SHELL = ['/', '/index.html', '/demo', '/settings', '/privacy', '/terms', '/print', '/hero-cassette.avif', '/hero-cassette-640.avif', '/hero-cassette.webp', '/hero-cassette-640.webp', '/hero-cassette.jpg', '/favicon.svg', '/manifest.webmanifest', '/offline.html', '/offline.css'];

async function appAssets() {
  const page = await fetch(new Request('/index.html', { cache: 'reload' }));
  if (!page.ok) throw new Error('Could not read the app shell');
  const markup = await page.text();
  return [...markup.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)].map(match => match[1]);
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    const urls = [...SHELL, ...await appAssets()];
    await Promise.all(urls.map(async url => {
      const response = await fetch(new Request(url, { cache: 'reload' }));
      if (!response.ok) throw new Error(`Could not cache ${url}`);
      await cache.put(url, response);
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== VERSION).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).then(response => {
      const copy = response.clone(); caches.open(VERSION).then(cache => cache.put(event.request, copy)); return response;
    }).catch(async () => (await caches.match(event.request, { ignoreVary: true })) || (await caches.match('/', { ignoreVary: true })) || caches.match('/offline.html', { ignoreVary: true })));
    return;
  }
  event.respondWith(caches.match(event.request, { ignoreVary: true }).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok) caches.open(VERSION).then(cache => cache.put(event.request, response.clone()));
    return response;
  })));
});
