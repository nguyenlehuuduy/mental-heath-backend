import {
  BadRequestException,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { fileFilter, storageConfig } from 'src/helpers/config';
import { ImageForResponse } from './dto/ImageForResponse';

@Controller('file')
@ApiTags('file')
export class FileController {
  @Post('/post/image')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({
    type: ImageForResponse,
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: storageConfig('post'),
      fileFilter: fileFilter,
    }),
  )
  async uploadPostImage(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ImageForResponse> {
    if (req.fileValidationErr) {
      throw new BadRequestException(req.fileValidationErr);
    }
    return {
      fieldname: file.fieldname,
      filename: file.filename,
      mimetype: file.mimetype,
      originalname: file.originalname,
      size: file.size.toString(),
    };
  }

  @Post('/avata/image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: storageConfig('avata'),
      fileFilter: fileFilter,
    }),
  )
  async uploadAvataImage(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationErr) {
      throw new BadRequestException(req.fileValidationErr);
    }
    return file;
  }
}
