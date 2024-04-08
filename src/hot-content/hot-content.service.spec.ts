import { Test, TestingModule } from '@nestjs/testing';
import { HotContentService } from './hot-content.service';

describe('HotContentService', () => {
  let service: HotContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotContentService],
    }).compile();

    service = module.get<HotContentService>(HotContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
