import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccountForToken } from 'src/auth/dto/AccountForToken';
import { TargetForCreate } from './dto/TargetForCreate';
import { TargetForResponse } from './dto/TargetForResponse';
import { TargetForUpdate } from './dto/TargetForUpdate';

@Injectable()
export class TargetService {
  constructor(private prismaService: PrismaService) { }
  async createTarget(
    targetForCreate: TargetForCreate,
    account: AccountForToken): Promise<TargetForResponse> {
    try {
      return await this.prismaService.target.create({
        data: {
          content: targetForCreate.content,
          idTargetAccount: targetForCreate.idTargetAccount,
          accountId: account.id,
        },
        select: {
          id: true,
          content: true,
          idTargetAccount: true,
          accountId: true,
        }
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }


  async getTarget() {
    try {
      return await this.prismaService.target.findMany()
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateTarget(targetForUpdate: TargetForUpdate, id)
    : Promise<TargetForResponse> {
    try {
      return await this.prismaService.target.update({
        where: {
          id
        },
        data: {
          content: targetForUpdate.content,
          idTargetAccount: targetForUpdate.idTargetAccount,
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteTarget(id: string) {
    try {
      return await this.prismaService.target.delete({
        where: { id }
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}