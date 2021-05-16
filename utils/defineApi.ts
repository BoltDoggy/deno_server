/// <reference path="../deploy.d.ts" />

export const defineApi = (callback: (event: Request) => Response | Promise<Response>) => {
  return async (event: FetchEvent) => {
    const res = await callback(event.request);
    console.log(`<==`, res.status, res.statusText);
    event.respondWith(res);
  };
};

export const defineMiddleware = (callback: (event: Request, next: Function) => void) => {
  return (event: FetchEvent, next: Function) => {
    callback(event.request, next);
  };
};
