import { Test, TestingModule } from '@nestjs/testing';
import { TypeImageController } from './type-image.controller';

describe('TypeImageController', () => {
  let controller: TypeImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeImageController],
    }).compile();

    controller = module.get<TypeImageController>(TypeImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
