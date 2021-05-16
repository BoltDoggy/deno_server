import { defineApi } from '../../utils/defineApi.ts'

export default defineApi(() => {
    return new Response(JSON.stringify({
        a: 'b'
    }));
})
