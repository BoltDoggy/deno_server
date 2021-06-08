/// <reference path="../deploy.d.ts" />

import { compose } from "./compose.ts";

export function React() {}

export type NextMiddleware = () => Response | Promise<Response>;
type UsedMiddleware = (event: FetchEvent, next: NextMiddleware) => Response | Promise<Response>;

interface MiddlewareProps {
  use?: UsedMiddleware | UsedMiddleware[];
  children?: UsedMiddleware | UsedMiddleware[];
}

interface ApiProps extends MiddlewareProps {
  path: string;
}

export const Middleware = ({ use, children }: MiddlewareProps) => {
  return (event: FetchEvent, next: NextMiddleware) => {
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
  return (event: FetchEvent, next: NextMiddleware) => {
    const { request } = event;
    const url = new URL(request.url);
    if (url.pathname === path) {
      return Middleware(props)(event, next);
    } else {
      return next();
    }
  };
};

export const render =
  (
    callback: (
      h: (f: Function, props: any, ...children: any) => UsedMiddleware
    ) => (
      event: FetchEvent,
      next: NextMiddleware
    ) => Response | Promise<Response>,
    next = (event: FetchEvent, error?: any) => {
      throw error;
    }
  ) =>
  async (event: FetchEvent) => {
    try {
      event.respondWith(
        await (
          await callback((f: Function, props: any, ...children: any) =>
            f({
              ...props,
              children,
            })
          )
        )(event, () => next(event))
      );
    } catch (error) {
      event.respondWith(next(event, error));
    }
  };
