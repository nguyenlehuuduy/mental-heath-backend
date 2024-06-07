import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActionUserForCreate } from './dto/ActionUserForCreate';
import { ActionUserForResponse } from './dto/ActionUserForResponse';
import { ActionUserForUpdate } from './dto/ActionUserForUpdate';
import { AccountForToken } from 'src/auth/dto/AccountForToken';

@Injectable()
export class ActionUserService {
  constructor(private prismaService: PrismaService) { }
  async createActionUser(
    actionUserForCreate: ActionUserForCreate,
    accountId: AccountForToken): Promise<ActionUserForResponse> {
    try {
      return await this.prismaService.actionUser.create({
        data: {
          actionCode: actionUserForCreate.actionCode,
          description: actionUserForCreate.description,
          accountId: accountId.id
        },
        select: {
          id: true,
          actionCode: true,
          description: true,
          accountId: true,
        }
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }


  async getActionUser(): Promise<Array<ActionUserForResponse>> {
    try {
      return await this.prismaService.actionUser.findMany({
        select: {
          id: true,
          actionCode: true,
          description: true,
          accountId: true,
        }
      })
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateActionUser(actionUserForUpdate: ActionUserForUpdate, id: string)
    : Promise<ActionUserForResponse> {
    try {
      return await this.prismaService.actionUser.update({
        where: {
          id
        },
        data: {
          actionCode: actionUserForUpdate.actionCode,
          description: actionUserForUpdate.description,
        },
        select: {
          id: true,
          actionCode: true,
          description: true,
          accountId: true,
        }
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteActionUser(id: string) {
    try {
      return await this.prismaService.actionUser.delete({
        where: { id }
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
