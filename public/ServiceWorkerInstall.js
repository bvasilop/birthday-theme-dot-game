/**
 * Register ServiceWorker Section.
 */

// Register service worker after the page has been completely loaded
export const ServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker
        .register('sw.js')
        .then(() => console.log('SW is registered!'));
    });
  }
};
