import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { UploadS3Module } from 'src/uploads3/uploads3.module';
import { FileService } from './file.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UploadS3Module],
  controllers: [FileController],
  providers: [FileService, PrismaService, JwtService],
})
export class FileModule {}
