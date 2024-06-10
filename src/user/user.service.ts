import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserForUpdate } from './dto/UserForUpdate';
import { UserForResponse } from './dto/UserForResponse';
import { AdminAccountForPut } from './dto/AdminAccountForPut';
import { AdminAccountForResponse } from './dto/AdminAccountForResponse';
import { UserDetailForResponse } from './dto/UserDetailForResponse';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async getDetailUserById(id: string): Promise<UserDetailForResponse> {
    try {
      const user = await this.prismaService.account.findUnique({
        where: { id: id },
        select: {
          _count: {
            select: {
              posts: true,
              followers: true,
              followings: true,
              postShares: true,
              images: true,
              RequestFollow: true,
            },
          },
          id: true,
          fullName: true,
          phone: true,
          aboutMe: true,
          nickName: true,
          birth: true,
          address: true,
          avata: true,
          email: true,
          banner: true,
          favorite: {
            select: {
              id: true,
              nameFavorite: true,
            },
          },
          images: {
            select: {
              path: true,
              postId: true,
              typeImage: {
                select: {
                  typeImageName: true,
                },
              },
            },
          },
          followers: {
            select: {
              follower: {
                select: {
                  id: true,
                  fullName: true,
                  avata: true,
                  nickName: true,
                },
              },
            },
          },
          followings: {
            select: {
              following: {
                select: {
                  id: true,
                  fullName: true,
                  avata: true,
                  nickName: true,
                },
              },
            },
          },
        },
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return {
        objectCount: user._count,
        user: {
          id: user.id,
          aboutMe: user.aboutMe,
          address: user.address,
          avata: user.avata,
          birth: user.birth,
          fullName: user.fullName,
          nickName: user.nickName,
          banner: user.banner,
          phone: user.phone,
          email: user.email,
          favorite: user.favorite.map((item) => ({
            id: item.id,
            nameFavorite: item.nameFavorite,
          })),
        },
        follower: user.followers.map((item) => item.follower),
        followings: user.followings.map((item) => item.following),
        image: user.images,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async checkFollowShip(id: string, otherAccountId: string): Promise<object> {
    try {
      const checkFollowing = await this.prismaService.followShip.findFirst({
        where: {
          followerId: id,
          followingId: otherAccountId,
        },
      });
      const checkFollower = await this.prismaService.followShip.findFirst({
        where: {
          followerId: otherAccountId,
          followingId: id,
        },
      });
      if (!checkFollowing && !checkFollower) {
        return {
          status: 0,
          message: 'Not follow',
        };
      }
      if (!checkFollowing && checkFollower) {
        return {
          status: 1,
          message: 'Follower',
          followShipId: checkFollower.id,
        };
      }
      if (checkFollowing && !checkFollower) {
        return {
          status: 2,
          message: 'Following',
          followShipId: checkFollowing.id,
        };
      }
      if (checkFollowing && checkFollower) {
        return {
          status: 3,
          message: 'Following and Follower',
          followShipIdOfFollowing: checkFollowing.id,
          followShipIdOfFollower: checkFollower.id,
        };
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateUser(
    id: string,
    userInfoRequest: UserForUpdate,
  ): Promise<UserForResponse> {
    try {
      userInfoRequest.favorite.map(async (item) => {
        await this.prismaService.account.update({
          where: { id },
          data: { favorite: { connect: { id: item } } },
        });
      });

      return await this.prismaService.account.update({
        where: { id: id },
        data: {
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

  async getSuggestedFollowAccounts(
    userId: string,
  ): Promise<Array<UserForResponse>> {
    try {
      const infoAccount = await this.prismaService.account.findUnique({
        where: {
          id: userId,
        },
        select: {
          followings: true,
        },
      });
      const followingOfMySelf = infoAccount.followings;
      const arrFriendRelative: Array<UserForResponse> = [];

      for (const following of followingOfMySelf) {
        const followingOfAccountSuggest =
          await this.prismaService.account.findUnique({
            where: {
              id: following.followingId,
            },
            select: {
              id: true,
              followings: {
                select: {
                  following: {
                    select: {
                      id: true,
                      fullName: true,
                      aboutMe: true,
                      address: true,
                      birth: true,
                      nickName: true,
                      phone: true,
                      avata: true,
                    },
                  },
                },
                take: 3,
              },
            },
          });
        const followingListId = followingOfMySelf.map((item) => item.id);
        for (const suggestAccount of followingOfAccountSuggest.followings) {
          if (
            suggestAccount.following.id !== userId &&
            followingListId.includes(suggestAccount.following.id) === false
          ) {
            arrFriendRelative.push({
              id: suggestAccount.following.id,
              fullName: suggestAccount.following.fullName,
              phone: suggestAccount.following.phone,
              aboutMe: suggestAccount.following.aboutMe,
              address: suggestAccount.following.address,
              birth: suggestAccount.following.birth,
              nickName: suggestAccount.following.nickName,
              avata: suggestAccount.following.avata,
            });
          }
        }
      }
      return arrFriendRelative;
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
