import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccountSearchForRespon } from './dto/AccountSearchForRespon';
import { ContentSearchForRespon } from './dto/ContentSearchForRespon';

@Injectable()
export class SearchService {
  constructor(private prismaService: PrismaService) {}
  async searchAccountsService(
    keyword: string,
  ): Promise<Array<AccountSearchForRespon>> {
    try {
      const regex = new RegExp(keyword, 'i');
      const accounts = await this.prismaService.account.findMany({
        where: {
          OR: [
            {
              fullName: {
                contains: regex.source,
              },
            },
            {
              email: {
                contains: regex.source,
              },
            },
          ],
        },
        select: {
          id: true,
          fullName: true,
          aboutMe: true,
          nickName: true,
          address: true,
          images: {
            where: {
              typeImage: {
                typeImageName: 'avatar',
              },
            },
            select: {
              id: true,
              path: true,
              typeImage: {
                select: {
                  id: true,
                  typeImageName: true,
                },
              },
            },
          },
        },
      });
      if (accounts.length === 0) {
        throw new HttpException('No accounts found', HttpStatus.NOT_FOUND);
      }
      return accounts;
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async searchPostsService(
    keyword: string,
  ): Promise<Array<ContentSearchForRespon>> {
    try {
      const regex = new RegExp(keyword, 'i');
      const posts = await this.prismaService.post.findMany({
        where: {
          OR: [
            {
              contentText: {
                contains: regex.source,
              },
            },
          ],
        },
        select: {
          id: true,
          contentText: true,
          accountId: true,
          account: {
            select: {
              fullName: true,
              images: {
                where: {
                  typeImage: {
                    typeImageName: 'avatar',
                  },
                },
                select: {
                  id: true,
                  path: true,
                  typeImage: {
                    select: {
                      id: true,
                      typeImageName: true,
                    },
                  },
                },
              },
            },
          },
          totalReaction: true,
          totalComment: true,
          totalShare: true,
          images: {
            where: {
              typeImage: {
                typeImageName: 'post',
              },
            },
            select: {
              accountId: true,
              postId: true,
              path: true,
            },
          },
          created_at: true,
          updated_at: true,
        },
      });
      if (posts.length === 0) {
        throw new HttpException('No posts found', HttpStatus.NOT_FOUND);
      }
      return posts;
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
