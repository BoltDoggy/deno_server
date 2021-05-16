import { defineApi } from '../utils/defineApi.ts'

export default defineApi(() => {
    return new Response("Hello Bolt!", {
      headers: { "content-type": "text/plain" },
    });
})
