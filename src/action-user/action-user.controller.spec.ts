import { Test, TestingModule } from '@nestjs/testing';
import { ActionUserController } from './action-user.controller';

describe('ActionUserController', () => {
  let controller: ActionUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActionUserController],
    }).compile();

    controller = module.get<ActionUserController>(ActionUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
