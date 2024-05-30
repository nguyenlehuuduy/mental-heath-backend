import { Test, TestingModule } from '@nestjs/testing';
import { TypeImageService } from './type-image.service';

describe('TypeImageService', () => {
  let service: TypeImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeImageService],
    }).compile();

    service = module.get<TypeImageService>(TypeImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
