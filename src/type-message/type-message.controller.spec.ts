import { Test, TestingModule } from '@nestjs/testing';
import { TypeMessageController } from './type-message.controller';

describe('TypeMessageController', () => {
  let controller: TypeMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeMessageController],
    }).compile();

    controller = module.get<TypeMessageController>(TypeMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
