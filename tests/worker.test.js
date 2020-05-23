const makeServiceWorkerEnv = require('service-worker-mock');

describe('Service Worker', function () {
  beforeEach(() => {
    const serviceWorkerEnv = makeServiceWorkerEnv();
    Object.defineProperty(
      serviceWorkerEnv,
      "addEventListener",
      {
        value: serviceWorkerEnv.addEventListener,
        enumerable: true
      });
    Object.assign(global, serviceWorkerEnv);
    jest.resetModules();
  });

  it('should add listeners', () => {
    require('../static/worker.js');

    expect(self.listeners.get('install')).toBeDefined();
    expect(self.listeners.get('activate')).toBeDefined();
    expect(self.listeners.get('fetch')).toBeDefined();
  });

  it('should create caches on install', async () => {
    require('../static/worker.js');

    expect(self.snapshot().caches[self.CACHE_NAME]).toBeUndefined();

    await self.trigger('install');
    expect(self.snapshot().caches[self.CACHE_NAME]).toBeDefined();
  });

  it('should delete old caches on activate', async () => {
    require('../static/worker.js');

    self.caches.open('OLD_CACHE');
    expect(self.snapshot().caches.OLD_CACHE).toBeDefined();

    await self.trigger('activate');
    expect(self.snapshot().caches.OLD_CACHE).toBeUndefined();
  });

  it('should fetch and cache an uncached request', async () => {
    const mockResponse = { clone: () => mockResponse };
    global.fetch = () => Promise.resolve(mockResponse);

    require('../static/worker.js');

    const request = new Request('/test');
    const response = await self.trigger('fetch', request);

    expect(response).toEqual(mockResponse);

    const runtimeCache = self.snapshot().caches[self.CACHE_NAME];

    expect(runtimeCache[request.url]).toEqual(mockResponse);
  });
});
