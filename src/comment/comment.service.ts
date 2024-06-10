import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountForToken } from 'src/auth/dto/AccountForToken';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentForCreate } from './dto/CommentForCreate';
import { CommentForResponse } from './dto/CommentForResponse';
import { CommentForUpdate } from './dto/CommentForUpdate';
import { PERMISSION_POST } from 'src/helpers/constant';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) { }
  async createComment(
    commentRequest: CommentForCreate,
  ): Promise<CommentForResponse> {
    try {
      return await this.prismaService.comment.create({
        data: {
          postId: commentRequest.postId,
          contentCmt: commentRequest.contentCmt,
          accountId: commentRequest.accountId,
        },
        select: {
          id: true,
          accountId: true,
          postId: true,
          contentCmt: true,
          created_at: true,
          updated_at: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateComment(
    idComment: string,
    commentRequest: CommentForUpdate,
  ): Promise<CommentForResponse> {
    try {
      return await this.prismaService.comment.update({
        where: { id: idComment },
        data: {
          contentCmt: commentRequest.contentCmt,
        },
        select: {
          id: true,
          accountId: true,
          postId: true,
          contentCmt: true,
          created_at: true,
          updated_at: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteComment(id: string, account: AccountForToken) {
    try {
      return await this.prismaService.comment.delete({
        where: { accountId: account.id, id: id },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getDetailCommentById(id: string) {
    try {
      return await this.prismaService.comment.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllCommentByIdPost(postId: string, account: AccountForToken): Promise<Array<CommentForResponse>> {
    try {
      return await this.prismaService.comment.findMany({
        where: {
          AND: [
            {
              postId
            },
            {
              OR: [
                {
                  post: {
                    permissionPostId: PERMISSION_POST.PUBLIC
                  },
                },
                {
                  post: {
                    permissionPostId: PERMISSION_POST.FOLLOW,
                    account: {
                      followers: {
                        some: {
                          followerId: account.id
                        }
                      }
                    },
                  },
                },
                {
                  post: {
                    accountId: account.id
                  }
                }]
            }
          ]
        },
        orderBy: {
          created_at: 'desc',
        },
        select: {
          id: true,
          contentCmt: true,
          accountId: true,
          created_at: true,
          updated_at: true,
          account: {
            select: {
              id: true,
              fullName: true,
              avata: true,
              nickName: true
            }
          }
        },
      })
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
