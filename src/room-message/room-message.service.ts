import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountForToken } from 'src/auth/dto/AccountForToken';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomMessageForPost } from './dto/RoomMessageForPost';
import { RoomMessageForGet } from './dto/RoomMessageForGet';

@Injectable()
export class RoomMessageService {
  constructor(private prismaService: PrismaService) { }
  async postRoomMessage(room: RoomMessageForPost, account: AccountForToken): Promise<RoomMessageForGet> {
    try {
      const existRoom = await this.prismaService.roomMessage.findFirst({
        where: {
          accountInRoom: {
            every: {
              id: {
                in: room.accountInRoom
              },
            }
          }
        }
      })

      if (!existRoom) {
        const result = await this.prismaService.roomMessage.create({
          data: {
            accountInRoom: { connect: { id: account.id } },
          },
          select: {
            id: true,
            created_at: true,
            updated_at: true,
            accountInRoom: {
              select: { fullName: true, email: true, id: true }
            },
          }
        })
        room.accountInRoom.map(async (item) => {
          await this.prismaService.roomMessage.update({
            data: { accountInRoom: { connect: { id: item } } },
            where: { id: result.id }
          })
        })
        return result;
      } else {
        throw new HttpException('room id was exist', HttpStatus.BAD_REQUEST);
      }

    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getValidRoomMessage(account: AccountForToken): Promise<Array<RoomMessageForGet>> {
    try {
      const allRoomValid = await this.prismaService.roomMessage.findMany({
        where: {
          accountInRoom: {
            some: { id: account.id }
          }
        },
        select: {
          id: true,
          created_at: true,
          updated_at: true,
          accountInRoom: {
            select: { fullName: true, email: true, id: true }
          },
        }
      })
      return allRoomValid.map(item => { return { ...item, nameRoom: item.accountInRoom.map(item => (item.id !== account.id) && item.fullName).filter(Boolean).join(",") } })
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
