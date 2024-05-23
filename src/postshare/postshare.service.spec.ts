import { Test, TestingModule } from '@nestjs/testing';
import { PostshareService } from './postshare.service';

describe('PostshareService', () => {
  let service: PostshareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostshareService],
    }).compile();

    service = module.get<PostshareService>(PostshareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
