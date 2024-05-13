import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserForResponse } from 'src/user/dto/UserForResponse';
import { FollowForCreate } from './dto/FollowForCreate';
import { FollowForGet } from './dto/FollowForGet';
import { RequestFollowForResponse } from './dto/RequestFollowForResponse';

@Injectable()
export class FollowService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRequestFollow(
    follow: FollowForCreate,
  ): Promise<FollowForGet | undefined> {
    try {
      const existFollowShip = await this.prismaService.followShip.findFirst({
        where: {
          followerId: follow.senderId,
          followingId: follow.reciverId,
        },
      });
      if (existFollowShip) {
        return;
      }
      const existRequestFollow =
        await this.prismaService.requestFollow.findFirst({
          where: {
            senderId: follow.senderId,
            reciverId: follow.reciverId,
          },
        });
      if (existRequestFollow) {
        return;
      }
      return this.prismaService.requestFollow.create({
        data: {
          senderId: follow.senderId,
          reciverId: follow.reciverId,
        },
        select: {
          sender: {
            select: {
              fullName: true,
              id: true,
              phone: true,
              aboutMe: true,
              nickName: true,
              birth: true,
              address: true,
            },
          },
          senderId: true,
          reciver: {
            select: {
              fullName: true,
              id: true,
              phone: true,
              aboutMe: true,
              nickName: true,
              birth: true,
              address: true,
            },
          },
          reciverId: true,
          created_at: true,
          updated_at: true,
          id: true,
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteRequestFollow(id: string) {
    try {
      return this.prismaService.requestFollow.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async acceptRequestFollow(follow: FollowForCreate, idRequestFollow: string) {
    try {
      const existFollowShip = await this.prismaService.followShip.findFirst({
        where: {
          followerId: follow.senderId,
          followingId: follow.reciverId,
        },
      });
      if (existFollowShip) {
        return;
      }
      return await this.prismaService.followShip
        .create({
          data: {
            followerId: follow.senderId,
            followingId: follow.reciverId,
          },
          select: {
            id: true,
            followerId: true,
            followingId: true,
          },
        })
        .then(async (rs) => {
          if (rs) {
            await this.prismaService.requestFollow.delete({
              where: {
                id: idRequestFollow,
              },
            });
          }
        });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async unFollow(id: string) {
    try {
      return await this.prismaService.followShip.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async getAllFollowings(id: string): Promise<Array<UserForResponse>> {
    try {
      const result = await this.prismaService.followShip.findMany({
        where: { followerId: id },
        select: {
          following: {
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
        },
      });
      return result.map((item) => item.following);
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async getAllFollowers(id: string): Promise<Array<UserForResponse>> {
    try {
      const result = await this.prismaService.followShip.findMany({
        where: { followingId: id },
        select: {
          follower: {
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
        },
      });
      return result.map((item) => item.follower);
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async getAllRequestFollowers(
    id: string,
  ): Promise<Array<RequestFollowForResponse>> {
    try {
      return await this.prismaService.requestFollow.findMany({
        where: { reciverId: id },
        select: {
          id: true,
          sender: {
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
        },
      });
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
