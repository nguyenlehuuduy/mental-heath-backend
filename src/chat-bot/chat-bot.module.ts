import { Module } from '@nestjs/common';
import { ChatBotController } from './chat-bot.controller';
import { ChatBotService } from './chat-bot.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ChatBotController],
  providers: [ChatBotService, JwtService, PrismaService],
})
export class ChatBotModule {}
