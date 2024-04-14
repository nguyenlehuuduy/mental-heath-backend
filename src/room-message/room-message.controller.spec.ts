import { Test, TestingModule } from '@nestjs/testing';
import { RoomMessageController } from './room-message.controller';

describe('RoomMessageController', () => {
  let controller: RoomMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomMessageController],
    }).compile();

    controller = module.get<RoomMessageController>(RoomMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
