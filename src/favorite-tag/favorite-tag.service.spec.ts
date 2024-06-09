import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteTagService } from './favorite-tag.service';

describe('FavoriteTagService', () => {
  let service: FavoriteTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteTagService],
    }).compile();

    service = module.get<FavoriteTagService>(FavoriteTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
