import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(
    private prismaService: PrismaService,
  ) { }
  private shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  private getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  async getValidPostByAccount(idAccount: string) {
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
      return key_num

    } catch (error) {
      console.error(error);
      throw new BadRequestException(error);
    }
  }
  async mockDataFaker() {
    // return Array.from({ length: 10 }).map(async (_, i) => {
    //   mock data
    //   await this.prismaService.post.create({
    //     data: {
    //       id: faker.string.uuid(),
    //       account: {
    //         create: {
    //           id: faker.string.uuid(),
    //           email: faker.internet.email(),
    //           fullName: faker.person.fullName(),
    //           password: faker.string.uuid(),
    //           phone: faker.number.bigInt({ min: 111111111, max: 9999999999 }).toString(),
    //           aboutMe: faker.airline.recordLocator(),
    //           nickName: faker.animal.bear(),
    //           birth: faker.date.anytime(),
    //           address: faker.company.name(),
    //         }
    //       },
    //       contentText: faker.airline.recordLocator(),
    //       created_at: faker.date.anytime(),
    //       updated_at: faker.date.anytime(),
    //     }
    //   })


    // })
    // return Array.from({ length: 10 }).map(async (_, i) => {
    //   console.log(i + "created")
    //   await this.prismaService.follower.create({
    //     data: {
    //       id: faker.string.uuid(),
    //       accountId: "63953da9-f4eb-4259-9f7f-e43888b9de23",
    //       follower: {
    //         create: {
    //           id: faker.string.uuid(),
    //           email: faker.internet.email(),
    //           fullName: faker.person.fullName(),
    //           password: faker.string.uuid(),
    //           phone: faker.number.bigInt({ min: 111111111, max: 9999999999 }).toString(),
    //           aboutMe: faker.airline.recordLocator(),
    //           nickName: faker.animal.bear(),
    //           birth: faker.date.anytime(),
    //           address: faker.company.name(),

    //         }
    //       },
    //       following: {
    //         create: {
    //           id: faker.string.uuid(),
    //           email: faker.internet.email(),
    //           fullName: faker.person.fullName(),
    //           password: faker.string.uuid(),
    //           phone: faker.number.bigInt({ min: 111111111, max: 9999999999 }).toString(),
    //           aboutMe: faker.airline.recordLocator(),
    //           nickName: faker.animal.bear(),
    //           birth: faker.date.anytime(),
    //           address: faker.company.name(),
    //           posts: {
    //             create: [{
    //               id: faker.string.uuid(),
    //               contentText: faker.airline.recordLocator() + "bài viết vừa có người reaction, cmt, hoặc share",
    //               created_at: faker.date.betweens(new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000)), new Date())[0],
    //               updated_at: faker.date.anytime(),
    //               totalComment: faker.number.int({ min: 111, max: 999 }),
    //               totalShare: faker.number.int({ min: 111, max: 999 }),
    //               totalReaction: faker.number.int({ min: 111, max: 999 }),
    //               reactions: {
    //                 create: [{
    //                   accountId: "4504d830-6059-4808-84b5-039a7ffd7630",
    //                 }]
    //               },
    //               comments: {
    //                 create: [{
    //                   accountId: "4504d830-6059-4808-84b5-039a7ffd7630",
    //                   contentCmt: "bài viét này thật bổ ích",
    //                 }]
    //               },
    //               postShares: {
    //                 create: [{
    //                   accountId: "4504d830-6059-4808-84b5-039a7ffd7630",
    //                   content: "tôi đã share bài viết này"
    //                 }]
    //               }
    //             }]
    //           }
    //         }
    //       },
    //       piority: faker.number.int({ min: 1111, max: 9999 }),
    //       created_at: faker.date.anytime(),
    //       updated_at: faker.date.anytime(),
    //     }
    //   })
    // })
  }

}
