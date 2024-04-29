import { Module } from '@nestjs/common';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { JwtService } from '@nestjs/jwt';
import { CaslModule } from 'src/casl/casl.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [CaslModule],
  controllers: [FollowController],
  providers: [FollowService, JwtService, PrismaService],
})
export class FollowModule {}
