import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Delete,
  Req,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { PostService } from './post.service';
import { PostModel } from './post.model';
import { Request } from 'express';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllPost(): Promise<PostModel[]> {
    return this.postService.getAllPost();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getPost(@Param('id') id: number): Promise<PostModel | null> {
    return this.postService.getPost(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() postData: PostModel) {
    return this.postService.createPost(postData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: number, @Req() req: Request) {
    return this.postService.deletePost(id, String(req.headers.authorization));
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updatePost(
    @Param('id') id: number,
    @Body() postData: PostModel,
    @Req() req: Request,
  ) {
    return this.postService.updatePost(
      id,
      postData,
      String(req.headers.authorization),
    );
  }
}
