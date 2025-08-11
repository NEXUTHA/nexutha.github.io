self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    try {
      // 自分自身をアンレジスター
      await self.registration.unregister();
      // すべてのキャッシュを削除
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
      // 開いている全タブをリロード相当（同じURLへナビゲート）
      const cs = await self.clients.matchAll({type: 'window', includeUncontrolled: true});
      cs.forEach(c => c.navigate(c.url));
    } catch (_) {}
  })());
});
