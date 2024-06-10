import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteTagController } from './favorite-tag.controller';

describe('FavoriteTagController', () => {
  let controller: FavoriteTagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteTagController],
    }).compile();

    controller = module.get<FavoriteTagController>(FavoriteTagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
