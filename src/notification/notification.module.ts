import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SocketIoModule } from 'src/socket-io/socket-io.module';

@Module({
  imports: [SocketIoModule],
  controllers: [NotificationController],
  providers: [NotificationService, PrismaService, JwtService],
})
export class NotificationModule { }
