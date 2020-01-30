const currentCacheVersion = 'birthday-themed-dot-game-v1';
const imagesToCache = [
  '/img/icons/clock.svg',
  '/img/icons/chevron-right.svg',
  '/img/icons/pause.svg',
  '/img/icons/play.svg',
  '/img/balloon.svg',
  '/img/cupcake.svg',
  '/img/dots_logo.svg',
  '/img/gift.svg',
  '/img/hat.svg',
  '/img/favicon.ico',
  '/img/icons/balloon_256.png',
  '/img/icons/balloon_512.png',
];

const filesToCache = [
  '/',
  '/styles/components/_all.scss',
  '/styles/components/_button.scss',
  '/styles/components/_dot.scss',
  '/styles/components/_game.scss',
  '/styles/components/_modal.scss',
  '/styles/components/_slider.scss',
  '/styles/global/_all.scss',
  '/styles/global/_animations.scss',
  '/styles/global/_base.scss',
  '/styles/global/_layout.scss',
  '/styles/global/_utilities.scss',
  '/styles/global/_variables.scss',
  '/styles/_all.scss',
  '/app.js',
  '/app.scss',
  '/app.css',
  '/Components.js',
  '/GameController.js',
  '/Helpers.js',
  '/ServiceWorkerInstall.js',
  '/sw.js',
  '/manifest.webmanifest',
  'https://fonts.googleapis.com/css?family=Limelight',
  ...imagesToCache,
];

const staticCacheName = 'birthday-themed-dot-game-v1';

self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName).then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(currentCacheVersion).then(cache =>
      cache.match(event.request).then(response => {
        // Return response from cache if one exists
        if (response) return response;

        // Otherwise hit the network
        return fetch(event.request).then(netResponse => {
          // Only cache images from the app
          if (
            netResponse.url.includes('.svg') ||
            netResponse.url.includes('.ico') ||
            netResponse.url.includes('.png')
          ) {
            if (netResponse.url.includes(window.location.origin)) {
              cache.put(event.request.url, netResponse.clone());
              return netResponse;
            }
            return;
          }
          console.log(netResponse);
          cache.put(event.request.url, netResponse.clone());
          return netResponse;
        });
      })
    )
  );
});
