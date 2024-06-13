import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccountSearchForResponse } from './dto/AccountSearchForResponse';
import { ContentSearchForResponse } from './dto/ContentSearchForResponse';
import { AccountForToken } from 'src/auth/dto/AccountForToken';
import { PERMISSION_POST } from 'src/helpers/constant';

@Injectable()
export class SearchService {
  constructor(private prismaService: PrismaService) {}
  async searchAccountsService(
    keyword: string,
  ): Promise<Array<AccountSearchForResponse>> {
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
          avata: true,
        },
      });
      return accounts;
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async searchPostsService(
    keyword: string,
    account: AccountForToken,
  ): Promise<Array<ContentSearchForResponse>> {
    try {
      const regex = new RegExp(keyword, 'i');
      const posts = await this.prismaService.post.findMany({
        where: {
          OR: [
            {
              account: {
                followers: {
                  some: {
                    followerId: account.id,
                  },
                },
              },
              permissionPostId: PERMISSION_POST.FOLLOW,
            },
            { permissionPostId: PERMISSION_POST.PUBLIC },
          ],
          contentText: {
            contains: regex.source,
          },
        },
        select: {
          id: true,
          contentText: true,
          account: {
            select: {
              fullName: true,
              id: true,
              avata: true,
            },
          },
          images: {
            select: {
              path: true,
            },
            take: 1,
          },
          created_at: true,
          updated_at: true,
        },
      });
      return posts;
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async searchAccountsByAdminService(
    keyword: string,
  ): Promise<Array<AccountSearchForResponse>> {
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
            {
              id: {
                contains: regex.source,
              },
            },
            {
              phone: {
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
          avata: true,
        },
      });
      return accounts;
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}