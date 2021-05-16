/// <reference path="../deploy.d.ts" />

import { compose } from './compose.ts'

export function React() {}

type Middleware = (event: FetchEvent, next: Function) => void;

interface MiddlewareProps {
  use?: Middleware | Middleware[];
  children?: Function | Function[];
}

interface ApiProps extends MiddlewareProps {
  path: string;
}

export const Middleware = ({ use, children }: MiddlewareProps) => {
  return (event: FetchEvent, next: Function) => {
    const _next = () => {
      if (!children) {
        return next();
      } else if (Array.isArray(children)) {
        const f = compose(children)
        return f(event, next);
      } else {
        return children(event, next);
      }
    };

    if (!use) {
      return _next();
    } else if (Array.isArray(use)) {
      const f = compose(use)
      return f(event, _next);
    } else {
      return use(event, _next);
    }
  };
};

export const Api = (props: ApiProps) => {
  const { path } = props;
  return (event: FetchEvent, next: Function) => {
    const { request } = event;
    const url = new URL(request.url);
    if (url.pathname === path) {
      return Middleware(props)(
        event,
        next
      );
    } else {
      return next();
    }
  };
};

export const render = (callback: (h: any) => any) => async (event: FetchEvent, next: Function = () => {}) =>
  (await callback((f: any, props: any, ...children: any) =>
    f({
      ...props,
      children,
    })
  ))(event, next);
