/// <reference path="../deploy.d.ts" />

import type { NextMiddleware } from "./JsxRouter.tsx";

export const defineApi = (
  callback: (event: Request) => Response | Promise<Response>,
) => (event: FetchEvent) => callback(event.request);

export const defineMiddleware = (
  callback: (event: Request, next: NextMiddleware) => Response | Promise<Response>,
) => (event: FetchEvent, next: NextMiddleware) => callback(event.request, next);
