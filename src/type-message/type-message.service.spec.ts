import { Test, TestingModule } from '@nestjs/testing';
import { TypeMessageService } from './type-message.service';

describe('TypeMesssageService', () => {
  let service: TypeMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeMessageService],
    }).compile();

    service = module.get<TypeMessageService>(TypeMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
