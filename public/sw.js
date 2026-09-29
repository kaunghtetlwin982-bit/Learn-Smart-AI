const CACHE_NAME = 'learn-smart-ai-shell-v1'
const APP_SHELL = ['/', '/index.html', '/manifest.webmanifest', '/icons/icon.svg', '/icons/icon-192.png', '/icons/icon-512.png', '/icons/icon-maskable-512.png']

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      await cache.addAll(APP_SHELL)

      // Cache the built JS and CSS referenced by the shell for offline startup.
      const response = await cache.match('/index.html')
      const html = await response.text()
      const assets = [...html.matchAll(/(?:src|href)="([^"]+\.(?:js|css)(?:\?[^\"]*)?)"/g)]
        .map((match) => match[1])
        .filter((url) => url.startsWith('/') && !url.startsWith('//'))
      await Promise.allSettled(assets.map((url) => cache.add(url)))
      await self.skipWaiting()
    })(),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(keys.filter((key) => key.startsWith('learn-smart-ai-') && key !== CACHE_NAME).map((key) => caches.delete(key)))
      await self.clients.claim()
    })(),
  )
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)
  if (request.method !== 'GET' || url.origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put('/index.html', response.clone()))
          return response
        })
        .catch(async () => (await caches.match('/index.html')) || Response.error()),
    )
    return
  }

  // Only static shell files are cached. API-like requests are left to the browser.
  if (/\.(?:js|css|svg|png|ico|woff2?)$/i.test(url.pathname) || url.pathname === '/manifest.webmanifest') {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached
        return fetch(request).then((response) => {
          if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()))
          return response
        })
      }),
    )
  }
})
