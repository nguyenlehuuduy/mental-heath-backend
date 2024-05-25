import { ConfigModule } from '@nestjs/config';
import { UploadFileServiceS3 } from './uploads3.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule],
  providers: [UploadFileServiceS3],
  exports: [UploadFileServiceS3],
})
export class UploadS3Module {}
