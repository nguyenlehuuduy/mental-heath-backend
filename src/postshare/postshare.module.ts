import { Module } from '@nestjs/common';
import { PostshareController } from './postshare.controller';
import { PostshareService } from './postshare.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PostshareController],
  providers: [PostshareService, PrismaService, JwtService],
})
export class PostshareModule {}
