// Service Worker for profile page caching
const CACHE_NAME = 'kf13-profiles-v1';
const PROFILE_CACHE = 'kf13-profile-data-v1';

// Cache profile pages and assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/offline',
        '/assets/profile-fallback.svg'
      ]);
    })
  );
});

// Intercept profile requests
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Cache profile pages
  if (url.pathname.match(/^\/[a-zA-Z0-9_]+$/)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          // Serve from cache, update in background
          fetch(event.request).then((fetchResponse) => {
            if (fetchResponse.ok) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, fetchResponse.clone());
              });
            }
          });
          return response;
        }
        
        // Fetch and cache
        return fetch(event.request).then((fetchResponse) => {
          if (fetchResponse.ok) {
            const responseClone = fetchResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return fetchResponse;
        }).catch(() => {
          // Offline fallback
          return caches.match('/offline');
        });
      })
    );
  }
});
