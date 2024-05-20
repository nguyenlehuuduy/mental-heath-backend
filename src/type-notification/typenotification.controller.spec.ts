import { Test, TestingModule } from '@nestjs/testing';
import { TypenotificationController } from './typenotification.controller';

describe('TypenotificationController', () => {
  let controller: TypenotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypenotificationController],
    }).compile();

    controller = module.get<TypenotificationController>(
      TypenotificationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
