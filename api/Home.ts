/// <reference path="../deploy.d.ts" />

export default (event: FetchEvent) => {
  const response = new Response("Hello Bolt!", {
    headers: { "content-type": "text/plain" },
  });
  event.respondWith(response);
};
