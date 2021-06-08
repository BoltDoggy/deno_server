/// <reference path="../deploy.d.ts" />

import { compose } from "./compose.ts";

export function React() {}

export type NextMiddleware = () => Response | Promise<Response>;
type UsedMiddleware = (
  event: Request,
  next: NextMiddleware
) => Response | Promise<Response>;

interface MiddlewareProps {
  use?: UsedMiddleware | UsedMiddleware[];
  children?: UsedMiddleware | UsedMiddleware[];
}

interface ApiProps extends MiddlewareProps {
  path: string;
}

export const Middleware = ({ use, children }: MiddlewareProps) => {
  return (event: Request, next: NextMiddleware) => {
    const _next = () => {
      if (!children) {
        return next();
      } else if (Array.isArray(children)) {
        const f = compose(children);
        return f(event, next);
      } else {
        return children(event, next);
      }
    };

    if (!use) {
      return _next();
    } else if (Array.isArray(use)) {
      const f = compose(use);
      return f(event, _next);
    } else {
      return use(event, _next);
    }
  };
};

export const Api = (props: ApiProps) => {
  const { path } = props;
  return (request: Request, next: NextMiddleware) => {
    const url = new URL(request.url);
    if (url.pathname === path) {
      return Middleware(props)(request, next);
    } else {
      return next();
    }
  };
};

export const render =
  (
    callback: (
      h: (f: Function, props: any, ...children: any) => UsedMiddleware
    ) => Promise<
      (event: Request, next: NextMiddleware) => Response | Promise<Response>
    >,
    next = (event: Request, error?: any) => {
      throw error;
    }
  ) =>
  async (event: FetchEvent) => {
    const { request } = event;
    try {
      event.respondWith(
        await (
          await callback((f, props, ...children) =>
            f({
              ...props,
              children,
            })
          )
        )(request, () => next(request))
      );
    } catch (error) {
      event.respondWith(next(request, error));
    }
  };
