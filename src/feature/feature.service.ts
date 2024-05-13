import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FeatureForGet } from './dto/FeatureForGet';
import { FeatureForPost } from './dto/FeatureForPost';
import { FeatureForUpdate } from './dto/FeatureForUpdate';

@Injectable()
export class FeatureService {
  constructor(private prismaService: PrismaService) {}

  async getAllFeaturesSevice(): Promise<FeatureForGet[]> {
    try {
      return await this.prismaService.feature.findMany({
        select: {
          id: true,
          name: true,
          thumbnailFileName: true,
          url: true,
          created_at: true,
          updated_at: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async createNewFeatureService(
    featureForPost: FeatureForPost,
  ): Promise<FeatureForGet> {
    try {
      return await this.prismaService.feature.create({
        data: {
          name: featureForPost.name,
          thumbnailFileName: featureForPost.thumbnailFileName,
          url: featureForPost.url,
        },
        select: {
          name: true,
          id: true,
          thumbnailFileName: true,
          url: true,
          created_at: true,
          updated_at: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateFeatureService(
    id: string,
    featureForUpdate: FeatureForUpdate,
  ): Promise<FeatureForGet> {
    try {
      return await this.prismaService.feature.update({
        where: {
          id: id,
        },
        data: {
          name: featureForUpdate.name,
          thumbnailFileName: featureForUpdate.thumbnailFileName,
          url: featureForUpdate.url,
        },
        select: {
          id: true,
          name: true,
          thumbnailFileName: true,
          url: true,
          created_at: true,
          updated_at: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteFeatureService(id: string): Promise<FeatureForGet> {
    try {
      return await this.prismaService.feature.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
