import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccountForToken } from 'src/auth/dto/AccountForToken';
import { PostForCreate } from './dto/PostForCreate';
import { PostForResponse } from './dto/PostForResponse';
import { PostForUpdate } from './dto/PostForUpdate';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}
  async createPost(
    postRequest: PostForCreate,
    account: AccountForToken,
  ): Promise<PostForResponse> {
    try {
      return await this.prismaService.post.create({
        data: {
          contentText: postRequest.contentText,
          accountId: account.id,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updatePost(
    postRequest: PostForUpdate,
    account: AccountForToken,
  ): Promise<PostForResponse> {
    try {
      return await this.prismaService.post.update({
        where: { id: postRequest.id, accountId: account.id },
        data: {
          contentText: postRequest.contentText,
          //TODO: update Image latter
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deletePost(id: string, account: AccountForToken) {
    try {
      return await this.prismaService.post.delete({
        where: { accountId: account.id, id: id },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getDetailPostById(id: string) {
    try {
      return await this.prismaService.post.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
