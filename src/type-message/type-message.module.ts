import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { TypeMessageController } from './type-message.controller';
import { TypeMessageService } from './type-message.service';


@Module({
  controllers: [TypeMessageController],
  providers: [TypeMessageService, PrismaService, JwtService],
})
export class TypeMessageModule {}
