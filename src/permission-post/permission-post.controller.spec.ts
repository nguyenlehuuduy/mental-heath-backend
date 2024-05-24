import { Test, TestingModule } from '@nestjs/testing';
import { PermissionPostController } from './permission-post.controller';

describe('PermissionPostController', () => {
  let controller: PermissionPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionPostController],
    }).compile();

    controller = module.get<PermissionPostController>(PermissionPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
