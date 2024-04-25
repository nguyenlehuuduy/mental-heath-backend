import { BadRequestException, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, storageConfig } from 'src/helpers/config';

@Controller('file')
export class FileController {

  @Post("/post/image")
  @UseInterceptors(FileInterceptor('image', {
    storage: storageConfig('post'),
    fileFilter: fileFilter
  }))
  async uploadPostImage(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    if (req.fileValidationErr) {
      throw new BadRequestException(req.fileValidationErr);
    }
    return file;
  }

  @Post("/avata/image")
  @UseInterceptors(FileInterceptor('image', {
    storage: storageConfig('avata'),
    fileFilter: fileFilter
  }))
  async uploadAvataImage(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    if (req.fileValidationErr) {
      throw new BadRequestException(req.fileValidationErr);
    }
    return file;
  }
}
