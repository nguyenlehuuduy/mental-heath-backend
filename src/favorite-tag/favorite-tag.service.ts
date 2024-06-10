import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoriteForResponse } from './dto/FavoriteTagForResponse';
import { FavoriteForCreate } from './dto/FavoriteTagForCreate';
import { FavoriteForUpdate } from './dto/FavoriteTagForUpdate';

@Injectable()
export class FavoriteTagService {
  constructor(private readonly prismaService: PrismaService) { }

  async getAllFavoriteTag(): Promise<FavoriteForResponse[]> {
    try {
      return await this.prismaService.favoriteTag.findMany({
        select: {
          id: true,
          descriptionFavorite: true,
          nameFavorite: true,
          created_at: true,
          updated_at: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async createNewFavoriteTag(
    favorite: FavoriteForCreate,
  ): Promise<FavoriteForResponse> {
    try {
      return await this.prismaService.favoriteTag.create({
        data: {
          descriptionFavorite: favorite.descriptionFavorite,
          nameFavorite: favorite.nameFavorite
        },
        select: {
          id: true,
          descriptionFavorite: true,
          nameFavorite: true,
          created_at: true,
          updated_at: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateFavoriteTag(
    id: string,
    favorite: FavoriteForUpdate,
  ): Promise<FavoriteForResponse> {
    try {
      return await this.prismaService.favoriteTag.update({
        where: {
          id: id,
        },
        data: {
          descriptionFavorite: favorite.descriptionFavorite,
          nameFavorite: favorite.nameFavorite
        },
        select: {
          id: true,
          descriptionFavorite: true,
          nameFavorite: true,
          created_at: true,
          updated_at: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteFavoriteTag(id: string): Promise<FavoriteForResponse> {
    try {
      return await this.prismaService.favoriteTag.delete({
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
