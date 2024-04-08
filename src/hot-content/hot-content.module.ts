import { Module } from '@nestjs/common';
import { HotContentController } from './hot-content.controller';
import { HotContentService } from './hot-content.service';

@Module({
  controllers: [HotContentController],
  providers: [HotContentService]
})
export class HotContentModule {}
