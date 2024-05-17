import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadFileServiceS3 {
  private s3_client: S3Client;
  constructor(private readonly config_service: ConfigService) {
    this.s3_client = new S3Client({
      region: config_service.get('AWS_S3_REGION'),
      credentials: {
        accessKeyId: config_service.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: config_service.get('AWS_S3_SECRET_KEY'),
      },
    });
  }
  async uploadFileToPublicBucket(
    path: string,
    { file, file_name }: { file: Express.Multer.File; file_name: string },
  ) {
    const bucket_name = this.config_service.get('AWS_S3_BUCKET');
    const key = `${path}/${new Date().getTime().toString()}-${file_name.split(' ').join('-')}`;
    await this.s3_client.send(
      new PutObjectCommand({
        Bucket: bucket_name,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
        ContentLength: file.size, // calculate length of buffer
      }),
    );

    return key;
  }
}
