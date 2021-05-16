import { Classes } from '../utils/db.ts'

interface IPost {
  content: string;
  pubUser: string;
  pubTimestamp: number;
}

export default new Classes<IPost>("Post");
