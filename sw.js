// 安装service worker 
const CACHE_NAME = 'aquiver'
self.addEventListener('install', function(e) {
  e.waitUntil( // service work 会等到waitUntil里面的代码执行完之后才可以安装
    caches.open(CACHE_NAME).then(function(cache) { // caches是一种特殊的cacheStorage对象，他能在service worker指定的范围内提供数据缓存。在此中，web storage失效
      return cache.addAll([
        '/demo1/',
        '/demo1/index.html',
        '/demo1/index.js',
        '/demo1/style.css',
        '/demo1/images/1.jpg',
        '/demo1/images/2.jpg',
        '/demo1/images/3.jpg',
        '/demo1/images/4.jpg'
      ]);
    })
  );
 });
 
 self.addEventListener('fetch', function(e) {
   console.log(e.request.url);
   e.respondWith(
     caches.match(e.request).then(function(response) {
       return response || fetch(e.request);
     })
   );
 });
 /*
 * cacheStorage 接口表示cache对象的存储，配合service worker 来实现资源的缓存
 caches api类似于数据库的操作
 caches.open(cacheName).then(function(cache){})
 用于打开缓存，返回一个匹配cacheName的cache对象的promise.类似于连接数据库
 caches.keys()返回一个promise对象，包括所有的缓存的key（数据库名）
 caches.delete(key) 根据key删除对应的缓存（数据库）
 cache对象常用的方法（单条数据的操作）
   cache接口为缓存的request/response对象提供存储机制
   cache.put(req, res)把请求当成Key, 并且把对应的相应存储起来
   cache.add(url) 根据Url发起请求，并且把相应的结果存储起来
   cache.addAll(urls)抓取一个url数组，并且把结果都存储起来
   cache.match(req) 获取req对应的response
 
 */