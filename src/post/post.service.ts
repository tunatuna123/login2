import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PostModel } from './post.model';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getAllPost(): Promise<PostModel[]> {
    return this.prisma.post.findMany();
  }

  async getPost(id: number): Promise<PostModel | null> {
    return this.prisma.post.findUnique({ where: { id: Number(id) } });
  }

  async createPost(data: PostModel): Promise<PostModel> {
    return this.prisma.post.create({
      data,
    });
  }

  async deletePost(id: number, username: string) {
    username = JSON.parse(atob(username.split('.', 3)[1])).username;
    const targetPost = await this.prisma.post.findUniqueOrThrow({
      where: { id: Number(id) },
    });
    if (username === JSON.parse(JSON.stringify(targetPost)).name) {
      return this.prisma.post.delete({ where: { id: Number(id) } });
    } else {
      throw new HttpException("Don't have Authorization", 403);
    }
  }

  async updatePost(id: number, data: PostModel, username: string) {
    username = JSON.parse(atob(username.split('.', 3)[1])).username;
    if (username === data.name) {
      return this.prisma.post.update({
        where: { id: Number(id) },
        data: {
          name: username,
          post: data.post,
          image: data.image,
        },
      });
    } else {
      throw new HttpException("Don't have Authorization", 403);
    }
  }
}
