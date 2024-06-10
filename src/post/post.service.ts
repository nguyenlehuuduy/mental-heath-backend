import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccountForToken } from 'src/auth/dto/AccountForToken';
import { ImageUploadForPost, PostForCreate } from './dto/PostForCreate';
import { PostForFullResponse, PostForResponse } from './dto/PostForResponse';
import { PostForUpdate } from './dto/PostForUpdate';
import { PaginationAndFilter } from 'src/common/schema/pagination';
import { PostForQuery } from './dto/PostForQuery';
import { PostOfAccountForResponse } from './dto/PostForProfile';
import { PERMISSION_POST } from 'src/helpers/constant';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) { }
  async createPost(
    postRequest: PostForCreate,
    account: AccountForToken,
  ): Promise<PostForResponse> {
    try {
      const listImageUpload: Array<ImageUploadForPost> =
        postRequest?.imagePaths?.map((item) => {
          return {
            accountId: account.id,
            path: item,
            //TODO:130751_type image update latter
          };
        }) || [];
      return await this.prismaService.post.create({
        data: {
          contentText: postRequest.contentText,
          accountId: account.id,
          images: {
            createMany: {
              data: listImageUpload,
            },
          },
          permissionPostId: postRequest.permissionPostId
        },
        select: {
          id: true,
          contentText: true,
          accountId: true,
          account: {
            select: {
              id: true,
              fullName: true,
              phone: true,
              aboutMe: true,
              nickName: true,
              birth: true,
              address: true,
            },
          },
          created_at: true,
          updated_at: true,
          totalComment: true,
          totalReaction: true,
          totalShare: true,
          images: {
            select: {
              accountId: true,
              postId: true,
              path: true,
            },
          },
          permissionPost: {
            select: {
              code: true,
              description: true,
              id: true,
            }
          }
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
        select: {
          id: true,
          contentText: true,
          accountId: true,
          account: {
            select: {
              id: true,
              fullName: true,
              phone: true,
              aboutMe: true,
              nickName: true,
              birth: true,
              address: true,
            },
          },
          created_at: true,
          updated_at: true,
          totalComment: true,
          totalReaction: true,
          totalShare: true,
          images: {
            select: {
              accountId: true,
              postId: true,
              path: true,
            },
          },
          permissionPost: {
            select: {
              id: true,
              code: true,
              description: true
            }
          }
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

  async getValidPostByAccount(
    idAccount: string,
    query: PaginationAndFilter,
  ): Promise<PostForFullResponse> {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    try {
      const account = await this.prismaService.account.findUnique({
        where: { id: idAccount },
        select: {
          followings: true,
        },
      });
      const followings = account.followings.map((item) => item.followingId);
      const dataResponse: Array<PostForResponse> = [];
      const pagination: PaginationAndFilter = {
        limit: query.limit > 0 ? query.limit : 5,
        pageNo: query.pageNo > 0 ? query.pageNo : 1,
      };
      const take = Number(pagination.limit);
      const skip =
        pagination.pageNo <= 1 ? 0 : take * Number(pagination.pageNo - 1);
      const totalRecord = await this.prismaService.post.count({
        where: {
          accountId: {
            in: [...followings, idAccount],
          },
        },
      });
      const result = await this.prismaService.post.findMany({
        where: {
          OR: [
            {
              accountId: idAccount,
            },
            {
              AND: [{
                permissionPost: {
                  id: { equals: PERMISSION_POST.FOLLOW }
                },
                accountId: {
                  in: followings,
                },
              }]
            },
            {
              AND: [
                {
                  accountId: {
                    in: [...followings, idAccount],
                  },
                },
                {
                  permissionPost: {
                    id: { equals: PERMISSION_POST.PUBLIC }
                  }
                }
              ],
            }
          ],
          created_at: {
            gte: sevenDaysAgo,
            lte: today,
          }
        },
        orderBy: {
          created_at: 'desc',
        },
        select: {
          id: true,
          contentText: true,
          account: {
            select: {
              id: true,
              fullName: true,
              phone: true,
              aboutMe: true,
              nickName: true,
              birth: true,
              address: true,
              avata: true,
            },
          },
          created_at: true,
          updated_at: true,
          images: {
            select: {
              accountId: true,
              postId: true,
              path: true,
            },
          },
          totalComment: true,
          totalShare: true,
          totalReaction: true,
          reactions: true,
          postShares: true,
          comments: {
            select: {
              account: {
                select: {
                  id: true,
                  fullName: true,
                  nickName: true,
                  avata: true,
                },
              },
              created_at: true,
              contentCmt: true,
            },
            take: 3,
            orderBy: {
              created_at: 'desc',
            },
          },
          permissionPost: {
            select: {
              id: true,
              code: true,
              description: true
            }
          }
        },
        skip: skip,
        take: take,
      });

      for (const item of result) {
        dataResponse.push({
          account: item.account,
          accountId: item.account.id,
          contentText: item.contentText,
          created_at: item.created_at,
          id: item.id,
          images: item.images,
          is_liked: !!item.reactions.find(
            (item) => item.accountId === idAccount,
          ),
          totalComment: item.comments.length ?? 0,
          totalReaction: item.reactions.length ?? 0,
          totalShare: item.postShares.length ?? 0,
          updated_at: item.updated_at,
          permissionPost: {
            id: item.permissionPost?.id ?? PERMISSION_POST.PRIVATE,
            description: item.permissionPost?.description ?? "",
            code: item.permissionPost?.code ?? ""
          },
          comment_recent:
            item.comments.map((item) => {
              return {
                account: {
                  avata: item.account.avata,
                  id: item.account.id,
                  name: item.account.fullName,
                  nick_name: item.account.nickName,
                },
                content: item.contentCmt,
                created_at: String(item.created_at),
              };
            }) ?? [],
        });
      }
      return {
        data: dataResponse,
        pagination: {
          ...pagination,
          totalPage: Math.round(totalRecord / pagination.limit),
          totalRecord: totalRecord ?? 0,
        },
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error);
    }
  }

  async getAllPost(query: PostForQuery): Promise<PostForFullResponse> {
    try {
      const pagination: PaginationAndFilter = {
        limit: query.limit > 0 ? query.limit : 5,
        pageNo: query.pageNo > 0 ? query.pageNo : 1,
      };
      const dataResponse: Array<PostForResponse> = [];
      const take = Number(pagination.limit);
      const skip =
        pagination.pageNo <= 1 ? 0 : take * Number(pagination.pageNo - 1);
      const totalRecord = await this.prismaService.post.count();
      const result = await this.prismaService.post.findMany({
        select: {
          id: true,
          contentText: true,
          account: {
            select: {
              id: true,
              fullName: true,
              phone: true,
              aboutMe: true,
              nickName: true,
              birth: true,
              address: true,
              avata: true,
            },
          },
          created_at: true,
          updated_at: true,
          images: {
            select: {
              accountId: true,
              postId: true,
              path: true,
            },
          },
          totalComment: true,
          totalShare: true,
          totalReaction: true,
          reactions: true,
          postShares: true,
          comments: {
            select: {
              account: {
                select: {
                  id: true,
                  fullName: true,
                  nickName: true,
                  avata: true,
                },
              },
              created_at: true,
              contentCmt: true,
            },
            take: 3,
            orderBy: {
              created_at: 'desc',
            },
          },
          permissionPost: {
            select: {
              id: true,
              code: true,
              description: true
            }
          }
        },
        orderBy: {
          created_at: 'desc',
        },
        skip: skip,
        take: take,
      });
      for (const item of result) {
        dataResponse.push({
          account: item.account,
          accountId: item.account.id,
          contentText: item.contentText,
          created_at: item.created_at,
          id: item.id,
          images: item.images,
          totalComment: item.comments.length ?? 0,
          totalReaction: item.reactions.length ?? 0,
          totalShare: item.postShares.length ?? 0,
          updated_at: item.updated_at,
          permissionPost: {
            id: item.permissionPost.id,
            code: item.permissionPost.code,
            description: item.permissionPost.description
          },
          comment_recent:
            item.comments.map((item) => {
              return {
                account: {
                  avata: item.account.avata,
                  id: item.account.id,
                  name: item.account.fullName,
                  nick_name: item.account.nickName,
                },
                content: item.contentCmt,
                created_at: String(item.created_at),
              };
            }) ?? [],
        });
      }
      return {
        data: dataResponse,
        pagination: {
          ...pagination,
          totalPage: Math.round(totalRecord / pagination.limit),
          totalRecord: totalRecord ?? 0,
        },
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getPostDetail(
    account: AccountForToken,
    postId: string,
  ): Promise<PostForResponse> {
    try {
      const result = await this.prismaService.post.findUnique({
        where: {
          id: postId,
        },
        select: {
          id: true,
          contentText: true,
          accountId: true,
          account: {
            select: {
              avata: true,
              id: true,
              email: true,
              fullName: true,
              nickName: true,
              birth: true,
              address: true,
              aboutMe: true,
              phone: true,
            },
          },
          created_at: true,
          updated_at: true,
          reactions: {
            select: {
              account: {
                select: {
                  avata: true,
                  id: true,
                  fullName: true,
                  nickName: true,
                },
              },
              created_at: true,
              updated_at: true,
            },
          },
          comments: {
            select: {
              account: {
                select: {
                  avata: true,
                  id: true,
                  fullName: true,
                  nickName: true,
                },
              },
              contentCmt: true,
              created_at: true,
              updated_at: true,
            },
            orderBy: {
              created_at: 'desc',
            },
          },
          permissionPost: {
            select: {
              id: true,
              code: true,
              description: true
            }
          },
          postShares: {
            select: {
              account: {
                select: {
                  avata: true,
                  id: true,
                  fullName: true,
                  nickName: true,
                },
              },
              created_at: true,
              updated_at: true,
            },
          },
          images: {
            select: {
              accountId: true,
              postId: true,
              path: true,
            },
          },
        },
      });

      return {
        ...result,
        totalComment: result.comments.length ?? 0,
        totalShare: result.postShares.length ?? 0,
        totalReaction: result.reactions.length ?? 0,
        is_liked: !!result.reactions.find(
          (item) => item.account.id === account.id,
        ),
        all_comment: result.comments.map((item) => {
          return {
            account: {
              avata: item.account.avata,
              id: item.account.id,
              name: item.account.fullName,
              nick_name: item.account.nickName,
            },
            content: item.contentCmt,
            created_at: String(item.created_at),
            updated_at: String(item.updated_at),
          };
        }),
        all_like_info: result.reactions.map((item) => {
          return {
            account: {
              avata: item.account.avata,
              id: item.account.id,
              name: item.account.fullName,
              nick_name: item.account.nickName,
            },
            created_at: String(item.created_at),
            updated_at: String(item.updated_at),
          };
        }),
        all_share_info: result.postShares.map((item) => {
          return {
            account: {
              avata: item.account.avata,
              id: item.account.id,
              name: item.account.fullName,
              nick_name: item.account.nickName,
            },
            created_at: String(item.created_at),
            updated_at: String(item.updated_at),
          };
        }),
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getPostsByMyself(
    accountId: string,
    query: PaginationAndFilter,
  ): Promise<Array<PostOfAccountForResponse>> {
    try {
      const pagination: PaginationAndFilter = {
        limit: query.limit > 0 ? query.limit : 5,
        pageNo: query.pageNo > 0 ? query.pageNo : 1,
      };
      const take = Number(pagination.limit);
      const skip =
        pagination.pageNo <= 1 ? 0 : take * Number(pagination.pageNo - 1);
      const postOfAccount = await this.prismaService.post.findMany({
        where: {
          accountId
        },
        select: {
          id: true,
          contentText: true,
          account: {
            select: {
              id: true,
              fullName: true,
              avata: true,
            },
          },
          comments: {
            select: {
              id: true,
              account: {
                select: {
                  id: true,
                  avata: true,
                  fullName: true,
                },
              },
              contentCmt: true,
              created_at: true,
              updated_at: true,
            },
          },
          permissionPost: {
            select: {
              id: true,
              code: true,
              description: true
            }
          },
          totalComment: true,
          totalReaction: true,
          totalShare: true,
          images: {
            select: {
              accountId: true,
              postId: true,
              path: true,
            },
          },
          created_at: true,
          updated_at: true,
        },
        skip: skip,
        take: take,
        orderBy: {
          created_at: 'desc',
        },
      });

      return postOfAccount;
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getPostsByAccount(
    accountId: string,
    query: PaginationAndFilter,
    myself: AccountForToken
  ): Promise<Array<PostOfAccountForResponse>> {
    try {
      const pagination: PaginationAndFilter = {
        limit: query.limit > 0 ? query.limit : 5,
        pageNo: query.pageNo > 0 ? query.pageNo : 1,
      };
      const account = await this.prismaService.account.findUnique({
        where: { id: myself.id },
        select: {
          followings: true,
        },
      });
      const take = Number(pagination.limit);
      const skip =
        pagination.pageNo <= 1 ? 0 : take * Number(pagination.pageNo - 1);
      const postOfAccount = await this.prismaService.post.findMany({
        where: {
          OR: [
            {
              AND: [{
                permissionPost: {
                  id: PERMISSION_POST.FOLLOW
                },
                accountId: {
                  in: account.followings.map(item => item.followingId),
                },
              }]
            },
            {
              AND: [
                {
                  accountId: {
                    in: [...account.followings.map(item => item.followingId), accountId],
                  },
                },
                {
                  permissionPost: {
                    id: PERMISSION_POST.PUBLIC
                  }
                }
              ],
            }
          ],
          accountId
        },
        select: {
          id: true,
          contentText: true,
          account: {
            select: {
              id: true,
              fullName: true,
              avata: true,
            },
          },
          comments: {
            select: {
              id: true,
              account: {
                select: {
                  id: true,
                  avata: true,
                  fullName: true,
                },
              },
              contentCmt: true,
              created_at: true,
              updated_at: true,
            },
          },
          permissionPost: {
            select: {
              id: true,
              code: true,
              description: true
            }
          },
          totalComment: true,
          totalReaction: true,
          totalShare: true,
          images: {
            select: {
              accountId: true,
              postId: true,
              path: true,
            },
          },
          created_at: true,
          updated_at: true,
        },
        skip: skip,
        take: take,
        orderBy: {
          created_at: 'desc',
        },
      });

      return postOfAccount;
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
