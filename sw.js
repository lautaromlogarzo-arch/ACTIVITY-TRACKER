// CAMBIÉ A "v3" AQUÍ PARA QUE TU CELULAR SEPA QUE ES UNA ACTUALIZACIÓN GRANDE
const CACHE_NAME = "fsae-tracker-v3";

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./logo.png",
  "https://cdn.jsdelivr.net/npm/chart.js",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
];

// Instalar y guardar archivos
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activar y limpiar versiones viejas (ESTO BORRARÁ LA v2 Y PONDRÁ LA v3)
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Servir archivos
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});