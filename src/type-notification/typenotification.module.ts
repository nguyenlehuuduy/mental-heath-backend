import { Module } from '@nestjs/common';
import { TypeNotificationController } from './typenotification.controller';
import { TypeNotificationService } from './typenotification.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [TypeNotificationController],
  providers: [TypeNotificationService, PrismaService, JwtService],
})
export class TypenotificationModule {}
