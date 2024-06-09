import { Module } from '@nestjs/common';
import { FavoriteTagController } from './favorite-tag.controller';
import { FavoriteTagService } from './favorite-tag.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [FavoriteTagController],
  providers: [FavoriteTagService, PrismaService, JwtService]
})
export class FavoriteTagModule { }
