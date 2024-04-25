import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowService {
  constructor(private readonly prismaService: PrismaService) { }

  async requestFollows(userId: string) {
    const data = await this.prismaService.requestFollow.findMany({
      where: {
        reciverId: userId,
      },
      include: {
        sender: {
          select: {
            id: true,
            fullName: true,
          },
        },
      }
    });
    return data
  }

  async createRequestFollow(senderId: string, reciverId: string) {
    return this.prismaService.requestFollow.create({
      data: {
        senderId,
        reciverId,
      },
      select: {
        id: true,
        senderId: true,
        reciverId: true,
      },
    });
  }

  async unAcceptRequestFollow(id: string) {
    return this.prismaService.requestFollow.delete({
      where: {
        id,
      },
    });
  }

  async acceptRequestFollow(senderId: string, reciverId: string, id: string) {

    await this.prismaService.requestFollow.delete({
      where: {
        id,
      },
    });
    return await this.prismaService.follower.create({
      data: {
        followerId: senderId,
        followingId: reciverId,
        accountId: reciverId,
      },
      select: {
        id: true,
        followerId: true,
        followingId: true,
        accountId: true,
      },
    });
  }

  async follows(userId: string) {
    const data = await this.prismaService.follower.findMany({
      where: {
        accountId: userId,
      },
      include: {
        following: {
          select: {
            id: true,
            fullName: true,
          },
        },
      }
    });
    return data
  }

  async unFollow(id: string) {
    try {
      return await this.prismaService.follower.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}