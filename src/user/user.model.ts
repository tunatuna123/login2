import { Prisma } from '@prisma/client';

export class User implements Prisma.userCreateInput {
  username: string;
  email: string;
  password: string;
  name?: string | null | undefined;
  id: number;
}
