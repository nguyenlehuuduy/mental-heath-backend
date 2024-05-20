import { Controller, Post } from '@nestjs/common';
import { MockDataService } from './mock-data.service';

@Controller('mock-data')
export class MockDataController {
  constructor(private mockdataService: MockDataService) {}
  @Post('/accounts')
  async MockDataAccount() {
    return this.mockdataService.createAccount();
  }

  @Post('/roles')
  async MockDataRole() {
    return this.mockdataService.createRole();
  }

  @Post('/posts')
  async MockDataPost() {
    return this.mockdataService.createPostForeachAccount();
  }

  @Post('/follows-ship')
  async MockFollowShip() {
    return this.mockdataService.createFollowShip();
  }

  @Post('/tab-menus')
  async MockTabMenu() {
    return this.mockdataService.createTabMenu();
  }

  @Post('/create-bot')
  async CreateBotInf() {
    return this.mockdataService.createBot();
  }

  @Post('/mock-message-in-room')
  async createMessageInRoom() {
    return this.mockdataService.createMessageInRoom();
  }
}
