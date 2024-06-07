import { Test, TestingModule } from '@nestjs/testing';
import { ActionUserService } from './action-user.service';

describe('ActionUserService', () => {
  let service: ActionUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActionUserService],
    }).compile();

    service = module.get<ActionUserService>(ActionUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
