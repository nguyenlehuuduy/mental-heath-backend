import {
  Controller,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/decorator/role.enum';

@Controller('file')
@ApiTags('file')
@ApiBearerAuth('Authorization')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Roles(Role.User)
export class FileController {
  constructor(private fileService: FileService) {}
  @Post('/upload-posts')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImageOfPost(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    return this.fileService.uploadImageOfPost(file, req?.user);
  }

  @Post('/upload-avata')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadAvataUser(file);
  }
}
