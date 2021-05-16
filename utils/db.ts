const LeanCloudOrigin = Deno.env.get("LeanCloudOrigin");
const LeanCloudAppId = Deno.env.get("LeanCloudAppId");
const LeanCloudAppKey = Deno.env.get("LeanCloudAppKey");

export const db = async (
  path: string,
  method: string = "get",
  data: any = {},
): Promise<any> => {
  const res = await fetch(new URL(path, LeanCloudOrigin), {
    method,
    headers: {
      "X-LC-Id": LeanCloudAppId || "",
      "X-LC-Key": LeanCloudAppKey || "",
      "Content-Type": "application/json",
    },
    body: method === "get" ? undefined : JSON.stringify(data),
  });
  return await res.json();
};

interface DataBase {
  createdAt: string;
  updatedAt: string;
  objectId: string;
}

export class Classes<T> {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  post = (data: any) => db(`/1.1/classes/${this.name}`, "post", data);
  getById = (id: string): Promise<
    T & DataBase
  > => db(`/1.1/classes/${this.name}/${id}`);
  putById = (id: string, data: any) =>
    db(`/1.1/classes/${this.name}/${id}`, "put", data);
  delete = (id: string) => db(`/1.1/classes/${this.name}/${id}`, "delete");
  cloudQuery() {
  }
  scan() {
  }
}
