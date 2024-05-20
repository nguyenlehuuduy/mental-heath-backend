import { Module } from '@nestjs/common';
import { TabMenuController } from './tab-menu.controller';
import { TabMenuService } from './tab-menu.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [CaslModule],
  controllers: [TabMenuController],
  providers: [TabMenuService, JwtService, PrismaService],
})
export class TabMenuModule {}
