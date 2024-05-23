import { Injectable } from '@nestjs/common';
import { AccountForToken } from 'src/auth/dto/AccountForToken';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadFileServiceS3 } from 'src/uploads3/uploads3.service';
import { ImageForResponse } from './dto/ImageForResponse';

@Injectable()
export class FileService {
  constructor(
    private uploads3: UploadFileServiceS3,
    private prismaService: PrismaService,
  ) {}
  async uploadImageOfPost(
    file: Express.Multer.File,
    account: AccountForToken,
  ): Promise<ImageForResponse> {
    try {
      const image_path = await this.uploadImage(file, 'posts');
      await this.prismaService.image.create({
        data: {
          path: image_path,
          accountId: account.id,
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

  async uploadAvataUser(file: Express.Multer.File): Promise<ImageForResponse> {
    try {
      const image_path = await this.uploadImage(file, 'accounts/avata');
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
