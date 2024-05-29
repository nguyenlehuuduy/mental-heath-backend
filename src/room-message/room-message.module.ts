import { Module } from '@nestjs/common';
import { RoomMessageController } from './room-message.controller';
import { RoomMessageService } from './room-message.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SocketIoModule } from 'src/socket-io/socket-io.module';

@Module({
  imports: [SocketIoModule],
  controllers: [RoomMessageController],
  providers: [RoomMessageService, PrismaService, JwtService],
})
export class RoomMessageModule { }
