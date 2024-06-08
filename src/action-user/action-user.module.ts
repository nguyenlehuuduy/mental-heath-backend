import { Module } from '@nestjs/common';
import { ActionUserController } from './action-user.controller';
import { ActionUserService } from './action-user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ActionUserController],
  providers: [ActionUserService, PrismaService, JwtService]
})
export class ActionUserModule {}
