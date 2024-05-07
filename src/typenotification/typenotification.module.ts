import { Module } from '@nestjs/common';
import { TypeNotificationController } from './typenotification.controller';
import { TypeNotificationService } from './typenotification.service';

@Module({
  controllers: [TypeNotificationController],
  providers: [TypeNotificationService]
})
export class TypenotificationModule {}
