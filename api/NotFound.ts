import { defineApi } from '../utils/defineApi.ts'

export default defineApi(() => {
    return new Response('Not Found!', {
        status: 404
    });
})
