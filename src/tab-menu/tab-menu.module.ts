import { Module } from '@nestjs/common';
import { TabMenuController } from './tab-menu.controller';
import { TabMenuService } from './tab-menu.service';

@Module({
  controllers: [TabMenuController],
  providers: [TabMenuService]
})
export class TabMenuModule {}
