import { Test, TestingModule } from '@nestjs/testing';
import { HotContentController } from './hot-content.controller';

describe('HotContentController', () => {
  let controller: HotContentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotContentController],
    }).compile();

    controller = module.get<HotContentController>(HotContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
