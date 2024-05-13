import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorator/role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { SearchService } from './search.service';
import { AccountSearchForRespon } from './dto/AccountSearchForRespon';
import { ContentSearchForRespon } from './dto/ContentSearchForRespon';

@ApiTags('search')
@Controller('search')
@ApiBearerAuth('Authorization')
@Roles(Role.User)
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class SearchController {
  constructor(private searchService: SearchService) {}
  @Get('accounts')
  @ApiBody({ type: AccountSearchForRespon })
  async searchAccounts(@Query('keyword') keyword: string) {
    return await this.searchService.searchAccountsService(keyword);
  }

  @Get('posts')
  @ApiBody({ type: ContentSearchForRespon })
  async searchPosts(@Query('keyword') keyword: string) {
    return await this.searchService.searchPostsService(keyword);
  }
}
