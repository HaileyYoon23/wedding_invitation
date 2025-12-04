// 서비스 워커 - 메모리 최적화 및 캐싱
const CACHE_NAME = 'wedding-gallery-v1';
const MAX_CACHE_SIZE = 50; // 최대 캐시 항목 수 (메모리 절약)

// 캐시할 핵심 리소스만 선별
const CORE_RESOURCES = [
  '/',
  '/favicon.png',
  // PhotoSwipe CSS는 캐시하되 이미지는 동적 관리
];

// 설치 이벤트
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_RESOURCES))
      .then(() => self.skipWaiting())
  );
});

// 활성화 이벤트
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 네트워크 요청 인터셉트
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // 이미지 요청 처리 (메모리 최적화)
  if (url.pathname.includes('/gallery/') && url.pathname.endsWith('.webp')) {
    event.respondWith(handleImageRequest(event.request));
    return;
  }
  
  // 기타 리소스는 네트워크 우선
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});

// 이미지 요청 최적화 처리
async function handleImageRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      // 캐시 크기 관리
      await manageCacheSize(cache);
      
      // 성공적인 응답만 캐시
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.warn('Image fetch failed:', error);
    // 네트워크 실패 시 기본 이미지 반환 (선택사항)
    return new Response('', { status: 404 });
  }
}

// 캐시 크기 관리 (메모리 절약)
async function manageCacheSize(cache) {
  const keys = await cache.keys();
  
  if (keys.length >= MAX_CACHE_SIZE) {
    // 가장 오래된 항목부터 삭제
    const oldestKeys = keys.slice(0, keys.length - MAX_CACHE_SIZE + 10);
    await Promise.all(oldestKeys.map(key => cache.delete(key)));
  }
}

// 메모리 압박 시 캐시 정리
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.delete(CACHE_NAME);
  }
});
