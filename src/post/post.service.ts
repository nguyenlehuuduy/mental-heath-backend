import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccountForToken } from 'src/auth/dto/AccountForToken';
import { PostForCreate } from './dto/PostForCreate';
import { PostForResponse } from './dto/PostForResponse';
import { PostForUpdate } from './dto/PostForUpdate';
import { faker } from '@faker-js/faker';
import { PaginationAndFilter } from 'src/common/schema/pagination';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) { }
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
              address: true
            }
          },
          created_at: true,
          updated_at: true,
          totalComment: true,
          totalReaction: true,
          totalShare: true,
        }
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
              address: true
            }
          },
          created_at: true,
          updated_at: true,
          totalComment: true,
          totalReaction: true,
          totalShare: true,
        }
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

  async getValidPostByAccount(idAccount: string, query: PaginationAndFilter): Promise<PostForResponse> {
    //TODO:  filter and pagination
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
    try {
      const account = await this.prismaService.account.findUnique({
        where: { id: idAccount }
      })
      const getFollowerAccount = await this.prismaService.follower.findMany({
        where: { accountId: account.id },
      })
      const key_num = this.getRandomIntInclusive(1, 10);
      if (key_num >= 1 && key_num <= 5) {
        const getFollowerAccount = await this.prismaService.follower.findMany({
          where: { accountId: account.id },
          orderBy: {
            piority: 'desc'
          },
          take: 10
        })
        let arr_post = []
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
                  accountId: getFollowerAccount[i].accountId
                }
              },
              comments: {
                none: {
                  accountId: getFollowerAccount[i].accountId
                }
              },
              postShares: {
                none: {
                  accountId: getFollowerAccount[i].accountId
                }
              }
            },
            orderBy: {
              created_at: 'desc'
            },
            take: 2,
          })
          arr_post.push(...postByAccount);
        }
        return this.shuffle(arr_post)
      }
      if (key_num > 5 && key_num <= 7) {
        return this.shuffle(await this.prismaService.post.findMany({
          orderBy: {
            totalComment: "desc",
          },
          where: {
            accountId: {
              in: getFollowerAccount.map(item => item.followingId)
            }
          },
          take: 10
        }))
      }
      if (key_num > 7) {
        return this.shuffle(await this.prismaService.post.findMany({
          where: {
            accountId: {
              in: getFollowerAccount.map(item => item.followingId)
            },
            OR: [
              {
                reactions: {
                  some: {
                    created_at: {
                      gte: sevenDaysAgo,
                      lte: today,
                    }
                  }
                },
                comments: {
                  some: {
                    created_at: {
                      gte: sevenDaysAgo,
                      lte: today,
                    }
                  }
                },
                postShares: {
                  some: {
                    created_at: {
                      gte: sevenDaysAgo,
                      lte: today,
                    }
                  }
                }
              }
            ]
          },
          take: 10
        }))
      }

    } catch (error) {
      console.error(error);
      throw new BadRequestException(error);
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
