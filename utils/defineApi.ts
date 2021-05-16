/// <reference path="../deploy.d.ts" />

export const defineApi = (callback: (event: Request) => Response | Promise<Response>) => {
  return (event: FetchEvent) => {
    const res = callback(event.request);
    event.respondWith(res);
  };
};

export const defineMiddleware = (callback: (event: Request, next: Function) => void) => {
  return (event: FetchEvent, next: Function) => {
    callback(event.request, next);
  };
};
