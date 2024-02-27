import { Prisma } from '@prisma/client';

export class PostModel implements Prisma.postCreateInput {
  name: string;
  post: string;
  image?: string | null | undefined;
}
