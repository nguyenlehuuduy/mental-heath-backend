import { Module } from '@nestjs/common';
import { PermissionPostController } from './permission-post.controller';
import { PermissionPostService } from './permission-post.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PermissionPostController],
  providers: [PermissionPostService, JwtService, PrismaService]
})
export class PermissionPostModule { }
