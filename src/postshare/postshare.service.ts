import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostshareForCreate } from './dto/PostshareForCreate';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostshareForResponse } from './dto/PostshareForResponse';
import { PostshareForUpdate } from './dto/PostshareForUpdate';
import { AccountForToken } from 'src/auth/dto/AccountForToken';

@Injectable()
export class PostshareService {
  constructor(private prismaService: PrismaService) { }
  async createPostshare(
    postshareForCreate: PostshareForCreate,
    account: AccountForToken): Promise<PostshareForResponse> {
    try {
      return await this.prismaService.postShare.create({
        data: {
          content: postshareForCreate.content,
          postId: postshareForCreate.postId,
          accountId: account.id,
        },
        select: {
          id: true,
          content: true,
          postId: true,
          accountId: true,
          created_at: true,
          updated_at: true,
        }
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }


  async getPostshareByUserId(id: string) {
    try {
      return await this.prismaService.postShare.findMany({
        where: { accountId: id },
        select: {
          id: true,
          content: true,
          postId: true,
          accountId: true,
          created_at: true,
          updated_at: true,
        }
      })
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updatePostshare(postshareForUpdate: PostshareForUpdate, id)
    : Promise<PostshareForResponse> {
    try {
      return await this.prismaService.postShare.update({
        where: {
          id
        },
        data: {
          content: postshareForUpdate.content,
          postId: postshareForUpdate.postId,
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getDetailPostshare(id: string) {
    try {
      return await this.prismaService.postShare.findUnique({
        where: {
          id: id,
        },
        include: {
          account: true,
        },
      })
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deletePostshare(id: string) {
    try {
      return await this.prismaService.postShare.delete({
        where: { id }
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}