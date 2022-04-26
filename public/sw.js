//sw.js
const CACHE_STATIC = 'static-v1';


self.addEventListener('install', function(event){
    console.log("Service Worker Installing!");
    event.waitUntil(
        caches.open(CACHE_STATIC)
        .then(cache => {
            // cache.addAll([
            //     '/',
            //     '/img/favicon.ico'
            // ]);
        })
    )
    
});

self.addEventListener('activate', function(){
    console.log("Service Worker Activating!");
    //return self.clients.claim();
});

self.addEventListener('fetch', function(event){
    console.log("Fetching Something!!", event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then( res => {
            if(res){
                return res;
            }else{
                return fetch(event.request);
            }
        })
    );
});

self.addEventListener('message', function(event){
    // console.log("PostMessage!!");
    // console.log(event.data);

    if(event.data.command === "push"){
        var t = new PushEvent("push",{
            data : event.data.payload
        });
        console.log("postMessage로 받은 Data로 Push 보내기", t);
        this.self.dispatchEvent(t);
    }
});

self.addEventListener("push", function(event){
    const data = JSON.parse(event.data.text());
    console.log("PUSH로 전달 받은 데이터" + data);


    // event.waitUntil(async function(){
        
    // });
});



self.addEventListener('notificationclick', event => {
    if(event.action === 'confirm') {
      console.log("######## Confirm was chosen");
    } else {
      console.log("######## Not Confirm button clicked");
    }
    event.notification.close();
  });

function displayNoti(title, message) {
    const options = {
      body : message,
      icon : '/img/icons/android-icon-48x48.png',
      image : '/img/icons/android-icon-48x48.png',
      dir : 'ltr',
      lang : 'ko-KR',
      vibrate : [100, 50, 200],
      badge : '/img/icons/android-icon-48x48.png',
      tag : 'confirm-notificaction',
      renotify : true,
      actions : [
        { action : 'confirm', title : '확인하기', icon : '/img/icons/android-icon-48x48.png' },
        { action : 'cancel', title : '취소', icon : '/img/icons/android-icon-48x48.png' },
      ]
    };
    self.registration.showNotification(title, options);
  }