import { defineApi } from "../../utils/defineApi.ts";
import Post from '../../dbs/Post.ts';

export default defineApi(async (request) => {
  const url = new URL(request.url);
  const a = url.searchParams.get('a');
  if (a) {
    const res = await Post.getById(a);
    console.log(res);
  }
  return new Response(JSON.stringify({
    a: "b",
  }));
});
