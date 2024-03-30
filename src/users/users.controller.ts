import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { InfoUser } from './dto/infoUser';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  @ApiBody({ type: InfoUser })
  async getInfoUser(@Param('id') id: string, @Res() response) {
    const infoUser = await this.usersService.getInfoUser(id);
    response.status(HttpStatus.OK).json({
      data: infoUser,
      message: 'Get info user successfully',
      status: HttpStatus.OK,
    });
  }

  @Patch('/updateInfoUser/:id')
  @ApiBody({ type: InfoUser })
  async updateInfoUser(
    @Param('id') id: string,
    @Body() infoUserRequest: InfoUser,
    @Res() response,
  ) {
    await this.usersService.updateInfoUser(id, infoUserRequest);
    response.status(HttpStatus.OK).json({
      message: 'Update info user successfully',
      status: HttpStatus.OK,
    });
  }
}
