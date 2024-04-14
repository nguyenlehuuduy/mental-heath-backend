import { Test, TestingModule } from '@nestjs/testing';
import { TabMenuService } from './tab-menu.service';

describe('TabMenuService', () => {
  let service: TabMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TabMenuService],
    }).compile();

    service = module.get<TabMenuService>(TabMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
