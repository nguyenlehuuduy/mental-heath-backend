import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TabMenuForPost } from './dto/TabMenuForPost';
import { PrismaService } from 'src/prisma/prisma.service';
import { TabMenuForGet } from './dto/TabMenuForGet';
import { TabMenuForUpdate } from './dto/TabMenuForUpdate';

@Injectable()
export class TabMenuService {
  constructor(private readonly prismaService: PrismaService) { }
  async createNewTabMenu(tabmenu: TabMenuForPost): Promise<TabMenuForGet> {
    try {
      return this.prismaService.tabMenu.create({
        data: {
          name: tabmenu.name,
          iconUrl: tabmenu.iconUrl,
          url: tabmenu.url,
        }
      })
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateTabMenu(id: string, tabMenuForUpdate: TabMenuForUpdate): Promise<TabMenuForGet> {
    try {
      return this.prismaService.tabMenu.update({
        where: { id },
        data: {
          name: tabMenuForUpdate.name,
          iconUrl: tabMenuForUpdate.iconUrl,
          url: tabMenuForUpdate.url
        }
      })
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllTabMenu(): Promise<Array<TabMenuForGet>> {
    try {
      return this.prismaService.tabMenu.findMany();
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteTabMenu(id: string): Promise<TabMenuForGet> {
    try {
      return this.prismaService.tabMenu.delete({
        where: {
          id
        }
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
