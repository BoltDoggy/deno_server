/// <reference path="../deploy.d.ts" />

export const defineApi = (
  callback: (event: Request) => Response | Promise<Response>,
) => (event: FetchEvent) => Promise.resolve(callback(event.request));

export const defineMiddleware = (
  callback: (event: Request, next: Function) => Response | Promise<Response>,
) => (event: FetchEvent, next: Function) => callback(event.request, next);
