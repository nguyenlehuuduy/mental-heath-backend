import { Module } from '@nestjs/common';
import { TypeImageController } from './type-image.controller';
import { TypeImageService } from './type-image.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TypeImageController],
  providers: [TypeImageService, JwtService, PrismaService]
})
export class TypeImageModule {}
