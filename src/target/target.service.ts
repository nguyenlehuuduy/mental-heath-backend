import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TargetForCreate } from './dto/TargetForCreate';
import { TargetForResponse } from './dto/TargetForResponse';
import { TargetForUpdate } from './dto/TargetForUpdate';

@Injectable()
export class TargetService {
  constructor(private prismaService: PrismaService) { }
  async createTarget(
    targetForCreate: TargetForCreate): Promise<TargetForResponse> {
    try {
      return await this.prismaService.target.create({
        data: {
          content: targetForCreate.content,
          actionUserId: targetForCreate.actionUserId,
          targetAccountId: targetForCreate.idTargetAccount
        },
        select: {
          id: true,
          content: true,
          actionUserId: true,
          targetAccountId: true,
        }
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }


  async getTarget(): Promise<Array<TargetForResponse>> {
    try {
      return await this.prismaService.target.findMany({
        select: {
          id: true,
          content: true,
          actionUserId: true,
          targetAccountId: true,
        }
      })
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateTarget(targetForUpdate: TargetForUpdate, id: string)
    : Promise<TargetForResponse> {
    try {
      return await this.prismaService.target.update({
        where: {
          id
        },
        data: {
          content: targetForUpdate.content,
          actionUserId: targetForUpdate.actionUserId,
          targetAccountId: targetForUpdate.idTargetAccountId
        },
        select: {
          id: true,
          content: true,
          actionUserId: true,
          targetAccountId: true,
        }
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