import { Test, TestingModule } from '@nestjs/testing';
import { PostshareController } from './postshare.controller';

describe('PostshareController', () => {
  let controller: PostshareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostshareController],
    }).compile();

    controller = module.get<PostshareController>(PostshareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
