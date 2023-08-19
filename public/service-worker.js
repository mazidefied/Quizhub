//serice worker.js

self.addEventListener("install", (event)=>{
    event.waitUntil(
        caches.open("my-cache").then((cache)=>{
            return cache.addAll([
                "/",
                "/index.html",
                "/static/js.bundle.js",
                "/static/css/index.scss",
            ])
        })
    )
})

self.addEventListener("fetch", (event)=>{
    event.respondWith(
        caches.match(event.request).then((response)=>{
            return response || fetch(event.request)
        })
    )
})