const CACHE_NAME = 'webio-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/about.html',
    '/portfolio.html',
    '/blog.html',
    '/contact.html',
    '/styles.css',
    '/scripts.js',
    '/blog.js',
    '/portfolio.js',
    '/hero-bg.jpg',
    '/profile.jpg',
    '/project1.jpg',
    '/project2.jpg'
];

// Install the Service Worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Cache and return requests
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response; // If cache is available, return cached resource
                }
                return fetch(event.request); // Otherwise, fetch from the network
            })
    );
});

// Update the Service Worker
self.addEventListener('activate', function(event) {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
