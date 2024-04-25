import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { FollowForCreate } from "./dto/FollowForCreate";
import { FollowForGet } from "./dto/FollowForGet";

@Injectable()
export class FollowService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRequestFollow(follow: FollowForCreate): Promise<FollowForGet> {
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
        reciver: true,
        reciverId: true,
        created_at: true,
        updated_at: true,
        id: true,
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

  async acceptRequestFollow(follow: FollowForCreate, idRequestFollow: string) {
    return await this.prismaService.followShip.create({
      data: {
        followerId: follow.senderId,
        followingId: follow.reciverId,
      },
      select: {
        id: true,
        followerId: true,
        followingId: true,
      },
    }).then(async (rs) => {
      if (rs) {
        await this.prismaService.requestFollow.delete({
          where: {
            id: idRequestFollow,
          },
        });
      }
    });
  }

  async unFollow(id: string) {
    try {
      return await this.prismaService.followShip.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    }
  }
}
