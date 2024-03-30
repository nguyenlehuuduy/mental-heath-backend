import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto/post';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}
  async createPost(postRequest: PostDto) {
    try {
      const { contentText, accountId } = postRequest;
      const post = await this.prismaService.post.create({
        data: {
          contentText: contentText,
          accountId: accountId,
        },
      });
      return post;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updatePost(id: string, postRequest: PostDto) {
    try {
      const { contentText, accountId } = postRequest;
      const post = await this.prismaService.post.update({
        where: { id: id, accountId: accountId },
        data: {
          contentText: contentText,
        },
      });
      return post;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deletePost(id: string, accountId: string) {
    try {
      await this.prismaService.post.delete({
        where: { accountId: accountId, id: id },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
