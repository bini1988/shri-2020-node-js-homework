/**
 * @description
 *
 * Стратегия кэширования:
 *
 * 1. При install добавляем в кэш css и js
 * 2. При activate удаляем устаревший кэш если изменили CACHE_NAME
 * 3. При fetch игнорируем не GET запросы и запросы к /api, пытаемся вернуть запрос из кэша
 * 4. Если результат в кэше найден возвращаем его, иначе делаем запрос, а полученный результат кладем в кэш и возвращаем
 *
 * Данная стратегия кэширует статику (html, js, css, fonts), что позволяет укорить загрузку страницы, без потери актуальности отображаемых данных. Сохраненные в кэше данные можно принудительно обновить изменив CACHE_NAME.
 *
 */

self.CACHE_NAME = 'SHRI-2020-APP-CACHE-0.0.3';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(self.CACHE_NAME).then((cache) =>
      cache.addAll([
        '/main.style.min.css',
        '/manifest.bundle.min.js',
        '/vendors.chunk.min.js',
        '/main.chunk.min.js'
      ])
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        if (key !== self.CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    })
  );
});

self.addEventListener('fetch', function(event) {
  if (
    event.request.method !== 'GET' ||
    event.request.url.includes('/api/') ||
    event.request.destination === 'document'
  ) {
    return;
  }

  event.respondWith(fromCache(event.request));
});

function fromCache(request) {
  return caches.open(self.CACHE_NAME).then((cache) =>
    cache.match(request).then((matching) => {
      if (matching && matching.ok) {
        return matching;
      }
      return fetch(request).then((response) =>
        cache.put(request, response.clone()).then(() => response)
      );
    }));
}
