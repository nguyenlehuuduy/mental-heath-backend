import { Test, TestingModule } from '@nestjs/testing';
import { PermissionPostService } from './permission-post.service';

describe('PermissionPostService', () => {
  let service: PermissionPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionPostService],
    }).compile();

    service = module.get<PermissionPostService>(PermissionPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
