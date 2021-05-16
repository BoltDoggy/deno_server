import { defineMiddleware } from '../utils/defineApi.ts'

export const standardLog = defineMiddleware((request, next) => {
  console.log(`${request.method} ${request.url}`);
  next();
});
