const version = 1;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(`static-v${version}`)
      .then(cache => cache.addAll([
        '/',
        '/offline',
        '/404',
        '/img/robo_404.svg',
        'https://code.jquery.com/jquery-2.1.4.min.js',
        '/js/Basket.js',
        '/js/Currency.js',
        '/js/responsiveslides.js',
        '/css/styles.css'
      ])
      .then(() => console.log('Assets added to cache'))
      .catch(err => console.log('Error while fetching assets', err)))
  );
});

self.addEventListener('activate', event => {
  console.log('Activating new service worker...');

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(key => {
          if (key !== `static-v${version}` && key !=='dynamic' ) {
            console.log('[SW] deleted old cache version', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

 
  self.addEventListener('fetch', function(event) {
    if (event.request.method == "GET") {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        // if (response && response.headers && response.headers.get('content-type') == 'text/html') {
        //   return await fetch(event.request, {method: 'HEAD'})
        //   .then(head =>  head.headers.get('content-length') == response.headers.get('content-length'))
        //   .then(length => {
        //     if(length) { console.log('FROM CACHE'); return response;}  
        //     return fetch(event.request).then(function(response) {
        //       console.log('FROM NET');
        //       return response;}).catch(function(error) {
        //     console.error('Fetching HTML failed:', error);
        //     throw error;
        //   })})
        // }

        if(response) { return response; } 
        
        return fetch(event.request)
        .then((response) => {
          caches.open(`dynamic`).then(cache => cache.put(event.request.url, response.clone()));
          return fetch(event.request).then(res => res);
        })
        .catch(function(error) {
          if(!event.request.url.includes(".")){
            return caches.open(`static-v${version}`).then(cache => cache.match('/offline'));
          }
          console.error('Fetching failed:', error);
          //throw error;
        });
      })
    );}
    
    if (event.request.method == "POST") {
   

event.respondWith(
  
    // Try to get the response from the network
fetch(event.request).catch(function(e) {

var db;

var request = indexedDB.open("MyTestDatabase", 1);

request.onupgradeneeded = function (event) {
  db = event.target.result;
  var objectStore;
  if (!db.objectStoreNames.contains('offline')) {
    console.log('NEWWWW')
    objectStore = db.createObjectStore('offline', { keyPath: 'id', autoIncrement: true }); //
    objectStore.add({id:1, status:'offline'});
  }
  db.close();
}

// request.onsuccess = function (event) {
//   const db = request.result;
  
//   const transaction = db.transaction(['offline'], 'readwrite').transaction.objectStore('offline');
//   const request2 = transaction.put({id:1, status:'offline'});
//   //console.log(event.request.formData()); 
// };

request.onerror = function(event) {
  console.log('Error IndexedDB: ' + event.target.result);
};
;

  return caches.match(event.request.url);
})
);
}
});