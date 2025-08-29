const CACHE_NAME = 'valuecent-pwa-cache-v1';

// This list contains the essential app shell files.
// For a full production PWA, this list would be dynamically generated
// by the build tool (e.g., vite-plugin-pwa) to include hashed asset filenames.
const urlsToCache = [
  '/',
  '/index.html',
  '/icon.svg',
  '/manifest.json'
];

// Install the service worker and cache the app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache and caching app shell');
        return cache.addAll(urlsToCache).catch(err => {
            console.error('Failed to cache urls:', err);
        });
      })
  );
});

// Intercept network requests and serve from cache if available (cache-first strategy)
self.addEventListener('fetch', (event) => {
  // For navigation requests, use a network-first strategy to get latest content
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/index.html'))
    );
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Not in cache, go to network
        return fetch(event.request).then(
          (networkResponse) => {
            // Check if we received a valid response. We don't cache external resources by default in this strategy.
            if(!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // If it's a local asset, we could cache it here.
            // Example: if(event.request.url.startsWith(self.location.origin)) { ... }
            
            return networkResponse;
          }
        );
      })
  );
});

// Clean up old caches on activation
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});