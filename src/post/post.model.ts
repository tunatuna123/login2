import { Prisma } from '@prisma/client';

export class Post implements Prisma.postCreateInput {
  name: string;
  post: string;
  image?: string | null | undefined;
}
