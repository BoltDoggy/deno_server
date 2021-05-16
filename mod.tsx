/// <reference path="./deploy.d.ts" />

import { React, render, Api, Middleware } from "./utils/JsxRouter.tsx";
import { standardLog } from './middlewares/standardLog.ts'

addEventListener(
  "fetch",
  render(async (h) => (
    <Middleware use={standardLog}>
      <Api path="/" use={(await import('./api/Home.ts')).default}></Api>
      <Api path="/api/wx/config" use={(await import('./api/wx/config.ts')).default}></Api>
      <Middleware use={(await import('./api/NotFount.ts')).default}></Middleware>
    </Middleware>
  ))
);
