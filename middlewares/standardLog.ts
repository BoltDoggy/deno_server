import { defineMiddleware } from '../utils/defineApi.ts'

export const standardLog = defineMiddleware((request, next) => {
  console.log(`${request.method} ${request.url}`);
  try {
    next();
  } catch (error) {
    console.error(error);
  }
});
