import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Role } from 'src/decorator/role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { FavoriteTagService } from './favorite-tag.service';
import { FavoriteForCreate } from './dto/FavoriteTagForCreate';
import { FavoriteForUpdate } from './dto/FavoriteTagForUpdate';

@Controller('favorite-tag')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Roles(Role.User)
export class FavoriteTagController {
  constructor(private readonly favoriteService: FavoriteTagService) { }
  @Post()
  @Roles(Role.Admin)
  async createFavoriteTag(@Body() favorite: FavoriteForCreate) {
    return await this.favoriteService.createNewFavoriteTag(favorite)
  }

  @Patch(':id')
  async updateFavoriteTag(@Param('id') id: string, @Body() favorite: FavoriteForUpdate) {
    return await this.favoriteService.updateFavoriteTag(id, favorite)
  }

  @Get()
  async getAllFavoriteTag() {
    return await this.favoriteService.getAllFavoriteTag()
  }

  @Delete("id")
  async deleteFavoriteTag(@Param('id') id: string) {
    return await this.favoriteService.deleteFavoriteTag(id);
  }

}
