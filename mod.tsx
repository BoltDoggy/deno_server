import { React, render, Api, Middleware } from "./utils/JsxRouter.tsx";
import { standardLog } from "./middlewares/standardLog.ts";

import Home from "./api/Home.ts";
import WxConfig from "./api/wx/config.ts";
import NotFound from "./api/NotFound.ts";

addEventListener(
  "fetch",
  render(
    (h) => (
      <Middleware use={standardLog}>
        <Api path="/" use={Home}></Api>
        <Api path="/api/wx/config" use={WxConfig}></Api>
        <Middleware use={NotFound}></Middleware>
      </Middleware>
    ),
    (event: FetchEvent, error: Error) => {
      if (error) {
        return new Response(JSON.stringify({
          error: error.toString(),
          stack: error.stack
        }), {
          status: 500
        })
      } else {
        return new Response('NotFound!', {
          status: 404
        })
      }
    }
  )
);
