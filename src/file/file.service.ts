import { Injectable } from '@nestjs/common';
import { AccountForToken } from 'src/auth/dto/AccountForToken';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadFileServiceS3 } from 'src/uploads3/uploads3.service';
import { ImageForResponse } from './dto/ImageForResponse';
import { TYPE_IMAGE } from 'src/helpers/constant';

@Injectable()
export class FileService {
  constructor(
    private uploads3: UploadFileServiceS3,
    private prismaService: PrismaService,
  ) { }
  async uploadImageOfPost(
    file: Express.Multer.File,
    account: AccountForToken,
    permissionPostId: string
  ): Promise<ImageForResponse> {
    try {
      const image_path = await this.uploadImage(file, 'posts');
      await this.prismaService.image.create({
        data: {
          path: image_path,
          accountId: account.id,
          typeImageId: TYPE_IMAGE.POST,
          postId: permissionPostId
        },
      });
      return {
        fieldname: 'image',
        filename: image_path,
        mimetype: file.mimetype,
        originalname: file.originalname,
        size: file.size,
      };
    } catch (error) {
      console.error(error);
    }
  }

  async uploadAvataUser(file: Express.Multer.File, account: AccountForToken): Promise<ImageForResponse> {
    try {
      const image_path = await this.uploadImage(file, 'accounts/avata');
      await this.prismaService.account.update({
        where: { id: account.id },
        data: { avata: image_path }
      })
      await this.prismaService.image.create({
        data: {
          path: image_path,
          accountId: account.id,
          typeImageId: TYPE_IMAGE.AVATAR_USER,
        },
      });
      return {
        fieldname: 'image',
        filename: image_path,
        mimetype: file.mimetype,
        originalname: file.originalname,
        size: file.size,
      };
    } catch (error) {
      console.error(error);
    }
  }

  async uploadBannerImageUser(file: Express.Multer.File, account: AccountForToken): Promise<ImageForResponse> {
    try {
      const image_path = await this.uploadImage(file, 'accounts/banners');
      await this.prismaService.account.update({
        where: { id: account.id },
        data: { banner: image_path }
      })
      await this.prismaService.image.create({
        data: {
          path: image_path,
          accountId: account.id,
          typeImageId: TYPE_IMAGE.BANNER_USER,
        },
      });
      return {
        fieldname: 'image',
        filename: image_path,
        mimetype: file.mimetype,
        originalname: file.originalname,
        size: file.size,
      };
    } catch (error) {
      console.error(error);
    }
  }

  private async uploadImage(
    file: Express.Multer.File,
    source: string,
  ): Promise<string> {
    const image_path = await this.uploads3.uploadFileToPublicBucket(source, {
      file,
      file_name: file.originalname,
    });
    return image_path;
  }
}
