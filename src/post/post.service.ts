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
import { faker } from '@faker-js/faker';
import { PaginationAndFilter } from 'src/common/schema/pagination';
import { PostForQuery } from './dto/PostForQuery';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}
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
    //TODO:  filter and pagination
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const threeDaysAgo = new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000);
    try {
      const account = await this.prismaService.account.findUnique({
        where: { id: idAccount },
        select: {
          followers: true,
          followings: true,
        },
      });
      const currentPostOfAccount = await this.prismaService.post.findMany({
        where: {
          accountId: idAccount,
          created_at: {
            gte: threeDaysAgo,
            lte: today,
          },
        },
        orderBy: {
          created_at: 'desc',
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
        },
      });
      const getFollowerAccount = account.followers;
      const key_num = this.getRandomIntInclusive(1, 10);
      if (key_num >= 1 && key_num <= 5) {
        let arr_post = currentPostOfAccount;
        for (let i = 0; i < getFollowerAccount.length; i++) {
          const postByAccount = await this.prismaService.post.findMany({
            where: {
              accountId: getFollowerAccount[i].followingId,
              created_at: {
                gte: sevenDaysAgo,
                lte: today,
              },
              reactions: {
                none: {
                  accountId: getFollowerAccount[i].followingId,
                },
              },
              comments: {
                none: {
                  accountId: getFollowerAccount[i].followingId,
                },
              },
              postShares: {
                none: {
                  accountId: getFollowerAccount[i].followingId,
                },
              },
            },
            orderBy: {
              created_at: 'desc',
            },
            take: 2,
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
            },
          });
          arr_post.push(...postByAccount);
        }
        return {
          data: arr_post,
          pagination: undefined,
        };
      }
      if (key_num > 5 && key_num <= 7) {
        let arr_post = currentPostOfAccount;
        const result = await this.prismaService.post.findMany({
          orderBy: {
            totalComment: 'desc',
          },
          where: {
            accountId: {
              in: getFollowerAccount.map((item) => item.followingId),
            },
          },
          take: 10,
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
          },
        });
        arr_post.push(...result);
        return {
          data: arr_post,
          pagination: undefined,
        };
      }
      if (key_num > 7) {
        let arr_post = currentPostOfAccount;
        const result = await this.prismaService.post.findMany({
          where: {
            accountId: {
              in: getFollowerAccount.map((item) => item.followingId),
            },
            OR: [
              {
                reactions: {
                  some: {
                    created_at: {
                      gte: sevenDaysAgo,
                      lte: today,
                    },
                  },
                },
                comments: {
                  some: {
                    created_at: {
                      gte: sevenDaysAgo,
                      lte: today,
                    },
                  },
                },
                postShares: {
                  some: {
                    created_at: {
                      gte: sevenDaysAgo,
                      lte: today,
                    },
                  },
                },
              },
            ],
          },
          take: 10,
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
          },
        });
        arr_post.push(...result);
        return {
          data: arr_post,
          pagination: undefined,
        };
      }
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error);
    }
  }

  async getAllPost(query: PostForQuery): Promise<Array<PostForResponse>> {
    const take = Number(query.limit ?? 5);
    const skip = take * Number(query.pageNo ? query.pageNo - 1 : 0);
    try {
      return this.prismaService.post.findMany({
        select: {
          id: true,
          contentText: true,
          accountId: true,
          account: {
            select: {
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
        },
        where: {
          contentText: {
            contains: query.contentTextKey,
          },
          AND: {
            account: {
              fullName: { contains: query.nameAccountKey },
              email: { contains: query.emailAccountKey },
              created_at: {
                lte: query.createdDateTo,
                gte: query.createdDateFrom,
              },
            },
          },
        },
        orderBy: {
          [query.sortBy]: query.orderBy,
        },
        skip: skip,
        take: take,
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  private shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  private getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
