import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { ImageService } from './image.service';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/decorator/role.enum';

@Controller('images')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Roles(Role.User)
export class ImageController {
  constructor(private imageService: ImageService) { }
  @Get("posts/myself")
  async getImagePostByMyself(@Request() req) {
    return await this.imageService.getAllImagePostByMyself(req?.user)
  }

  @Get("posts/:id")
  async getImagePostByAccountId(@Request() req, @Param("id") accountId: string) {
    return await this.imageService.getAllImagePostByUserId(accountId, req?.user)
  }
}
