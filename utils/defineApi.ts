/// <reference path="../deploy.d.ts" />

import { useDefine } from "./useDefine.ts";
import type { NextMiddleware } from "./JsxRouter.tsx";

export const defineApi = useDefine<
  (request: Request) => Response | Promise<Response>
>();

export const defineMiddleware = useDefine<
  (request: Request, next: NextMiddleware) => Response | Promise<Response>
>();
