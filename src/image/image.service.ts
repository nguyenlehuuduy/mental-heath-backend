import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountForToken } from 'src/auth/dto/AccountForToken';
import { PERMISSION_POST } from 'src/helpers/constant';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImageForResponse } from './dto/ImageForRespone';

@Injectable()
export class ImageService {
  constructor(private prismaService: PrismaService) { }

  async getAllImagePostByUserId(
    accountId: string,
    myself: AccountForToken,
  ): Promise<Array<ImageForResponse> | undefined> {
    try {
      const followShip = await this.prismaService.account.findMany({
        where: {
          id: myself.id,
        },
        select: {
          followings: {
            select: {
              followingId: true,
            },
          },
        },
      });

      const isFollowShip: boolean = !!followShip.find((item) =>
        !!item.followings.find((item) => item.followingId === accountId),
      );
      const select = {
        id: true,
        accountId: true,
        path: true,
        postId: true,
      }

      if (isFollowShip) {
        return await this.prismaService.image.findMany({
          where: {
            OR: [
              {
                post: {
                  permissionPostId: {
                    in: [PERMISSION_POST.PUBLIC, PERMISSION_POST.FOLLOW]
                  },
                }
              },
            ],
            accountId
          },
          select: select,
        });
      }
      return await this.prismaService.image.findMany({
        where: {
          OR: [
            {
              post: {
                permissionPostId: {
                  in: [PERMISSION_POST.PUBLIC]
                }
              }
            },

          ],
          accountId
        },
        select: select,
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllImagePostByMyself(
    myself: AccountForToken,
  ): Promise<Array<ImageForResponse> | undefined> {
    try {
      return await this.prismaService.image.findMany({
        where: { accountId: myself.id },
        select: {
          id: true,
          accountId: true,
          path: true,
          postId: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
