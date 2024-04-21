import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserForUpdate } from './dto/UserForUpdate';
import { UserForResponse } from './dto/UserForResponse';
import { AdminAccountForPut } from './dto/AdminAccountForPut';
import { AdminAccountForResponse } from './dto/AdminAccountForResponse';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async getDetailUserById(userId: string): Promise<UserForResponse> {
    try {
      const user = await this.prismaService.account.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateUser(userInfoRequest: UserForUpdate): Promise<UserForResponse> {
    try {
      return await this.prismaService.account.update({
        where: { id: userInfoRequest.id },
        data: {
          id: userInfoRequest.id,
          fullName: userInfoRequest.fullName,
          phone: userInfoRequest.phone,
          aboutMe: userInfoRequest.aboutMe,
          nickName: userInfoRequest.nickName,
          birth: userInfoRequest.birth,
          address: userInfoRequest.address,
        },
        select: {
          id: true,
          fullName: true,
          phone: true,
          aboutMe: true,
          nickName: true,
          birth: true,
          address: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateAdministratorAccount(
    accountForUpdateAdminRole: AdminAccountForPut,
  ): Promise<AdminAccountForResponse> {
    try {
      return this.prismaService.account.update({
        data: {
          roles: {
            connect: [
              {
                id: accountForUpdateAdminRole.idRoleAdmin,
              },
            ],
          },
        },
        where: {
          id: accountForUpdateAdminRole.idAccount,
        },
        select: {
          id: true,
          fullName: true,
          roles: true,
          phone: true,
          updated_at: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getSuggestedFollowAccounts(userId: string) {
    try {
      const followingAccount = await this.prismaService.account.findMany({
        where: {
          id: userId,
        },
        select: {
          following: {
            select: {
              followingId: true,
            },
            take: 3,
            orderBy: {
              followingId: Prisma.SortOrder.asc,
            },
          },
        },
      });

      const followingList = followingAccount.map((item) => item.following);
      const followingIdsList = followingList.flatMap((item) =>
        item.map((follow) => follow.followingId),
      );
      const suggestedAccountsRes = [];

      followingIdsList.forEach(async (followingId) => {
        const suggestedAccounts = await this.prismaService.account.findMany({
          where: {
            id: followingId,
          },
          select: {
            following: {
              select: {
                followingId: true,
              },
              take: 3,
              orderBy: {
                followingId: Prisma.SortOrder.asc,
              },
            },
          },
        });

        const suggestedAccountsId = suggestedAccounts.map(
          (item) => item.following,
        );
        const suggestedAccountsIdList = suggestedAccountsId.flatMap((item) =>
          item.map((follow) => follow.followingId),
        );
        suggestedAccountsIdList.forEach(async (followingId) => {
          const suggestedAccountInfo =
            await this.prismaService.account.findUnique({
              where: {
                id: followingId,
              },
              select: {
                id: true,
                fullName: true,
                phone: true,
                aboutMe: true,
                nickName: true,
                birth: true,
                address: true,
              },
            });
          suggestedAccountsRes.push(suggestedAccountInfo);
        });
        return suggestedAccountsRes;
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
