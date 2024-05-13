import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleForGet } from './dto/RoleForGet';
import { RoleForPost } from './dto/RoleForPost';

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAllRoles(): Promise<Array<RoleForGet>> {
    try {
      return this.prismaService.role.findMany({
        select: {
          id: true,
          nameRole: true,
          created_at: true,
          updated_at: true,
          descriptionRole: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error);
    }
  }

  async addNewRole(roleForPost: RoleForPost): Promise<RoleForGet> {
    try {
      return this.prismaService.role.create({
        data: {
          nameRole: roleForPost.nameRole ?? '',
          descriptionRole: roleForPost.descriptionRole ?? '',
        },
        select: {
          id: true,
          nameRole: true,
          created_at: true,
          updated_at: true,
          descriptionRole: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error);
    }
  }

  async deleteOneRule(idRole: string): Promise<RoleForGet> {
    try {
      return this.prismaService.role.delete({
        where: {
          id: idRole,
        },
        select: {
          id: true,
          nameRole: true,
          created_at: true,
          updated_at: true,
          descriptionRole: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error);
    }
  }

  async updateOneRole(
    idRole: string,
    roleForUpdate: RoleForPost,
  ): Promise<RoleForGet> {
    try {
      console.log('idROle', idRole);
      return this.prismaService.role.update({
        where: { id: idRole },
        data: {
          nameRole: roleForUpdate.nameRole ?? '',
          descriptionRole: roleForUpdate.descriptionRole ?? '',
        },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error);
    }
  }
}
