import { Test, TestingModule } from '@nestjs/testing';
import { TypenotificationService } from './typenotification.service';

describe('TypenotificationService', () => {
  let service: TypenotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypenotificationService],
    }).compile();

    service = module.get<TypenotificationService>(TypenotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
