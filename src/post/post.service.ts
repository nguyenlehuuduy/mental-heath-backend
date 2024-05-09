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
    const today = new Date();
    const threeDaysAgo = new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    try {
      const account = await this.prismaService.account.findUnique({
        where: { id: idAccount },
        select: {
          followings: true,
        },
      });
      const followings = account.followings.map((item) => item.followingId);
      let dataResponse: Array<PostForResponse> = [];
      let pagination: PaginationAndFilter = {
        limit: query.limit > 0 ? query.limit : 5,
        pageNo: query.pageNo > 0 ? query.pageNo : 1,
      };
      const take = Number(pagination.limit) || 5;
      const skip = take * Number(pagination.pageNo);
      const select = {
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
        comments: true,
        postShares: true,
      };
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
        select: select,
      });
      if (pagination.pageNo < 2) {
        for (const item of currentPostOfAccount) {
          dataResponse.push({
            account: item.account,
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
          });
        }
      }
      const totalRecord = await this.prismaService.post.count({
        where: {
          accountId: {
            in: followings,
          },
        },
      });
      const result = await this.prismaService.post.findMany({
        where: {
          accountId: {
            in: followings,
          },
          created_at: {
            gte: sevenDaysAgo,
            lte: today,
          },
        },
        select: select,
        skip: skip,
        take: take,
      });

      for (const item of result) {
        dataResponse.push({
          account: item.account,
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
}
