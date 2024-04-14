import { Test, TestingModule } from '@nestjs/testing';
import { TabMenuController } from './tab-menu.controller';

describe('TabMenuController', () => {
  let controller: TabMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TabMenuController],
    }).compile();

    controller = module.get<TabMenuController>(TabMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
