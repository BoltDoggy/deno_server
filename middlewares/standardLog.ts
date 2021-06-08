import { defineMiddleware } from "../utils/defineApi.ts";

export const standardLog = defineMiddleware(async (request, next) => {
  console.log(`${request.method} ${request.url}`);
  const res = await next();
  console.log(`<==`, res.status, res.statusText);
  return res;
});
