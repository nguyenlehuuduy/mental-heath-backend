import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserForUpdate } from './dto/UserForUpdate';
import { UserForResponse } from './dto/UserForResponse';
import { AdminAccountForPut } from './dto/AdminAccountForPut';
import { AdminAccountForResponse } from './dto/AdminAccountForResponse';
import { Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) { }
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

  async getSuggestedFollowAccounts(userId: string): Promise<Array<UserForResponse>> {
    const infoAccount = await this.prismaService.account.findUnique({
      where: {
        id: userId,
      },
      select: {
        followings: true
      },
    });
    const followingOfMySelf = infoAccount.followings;
    const arrFriendRelative: Array<UserForResponse> = [];
    for (const following of followingOfMySelf) {
      const followingOfAccountSuggest = await this.prismaService.account.findUnique({
        where: {
          id: following.followingId,
        },
        select: {
          id: true,
          followings: {
            select: {
              following: {
                select: {
                  fullName: true,
                  id: true,
                  aboutMe: true,
                  address: true,
                  birth: true,
                  nickName: true,
                  phone: true
                }
              }
            },
            take: 3
          }
        }
      })
      for (const suggestAccount of followingOfAccountSuggest.followings) {
        arrFriendRelative.push({
          aboutMe: suggestAccount.following.aboutMe,
          address: suggestAccount.following.address,
          birth: suggestAccount.following.birth,
          fullName: suggestAccount.following.fullName,
          id: suggestAccount.following.id,
          nickName: suggestAccount.following.nickName,
          phone: suggestAccount.following.phone
        })
      }
    }
    return arrFriendRelative;
  } catch(error) {
    console.error(error);
    throw new HttpException(error, HttpStatus.BAD_REQUEST);
  }
}
