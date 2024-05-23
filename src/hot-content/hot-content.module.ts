import { Module } from '@nestjs/common';
import { HotContentController } from './hot-content.controller';
import { HotContentService } from './hot-content.service';
import { CaslModule } from 'src/casl/casl.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [CaslModule],
  controllers: [HotContentController],
  providers: [HotContentService, PrismaService, JwtService],
})
export class HotContentModule {}
