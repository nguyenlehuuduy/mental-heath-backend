import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorator/role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { SearchService } from './search.service';
import { AccountSearchForResponse } from './dto/AccountSearchForResponse';
import { ContentSearchForResponse } from './dto/ContentSearchForResponse';
import { AccountForToken } from 'src/auth/dto/AccountForToken';

@ApiTags('search')
@Controller('search')
@ApiBearerAuth('Authorization')
@Roles(Role.User)
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class SearchController {
  constructor(private searchService: SearchService) { }
  @Get('accounts')
  @ApiBody({ type: AccountSearchForResponse })
  async searchAccounts(@Query('keyword') keyword: string) {
    return await this.searchService.searchAccountsService(keyword);
  }

  @Get('posts')
  @ApiBody({ type: ContentSearchForResponse })
  async searchPosts(@Query('keyword') keyword: string, @Request() account: AccountForToken) {
    return await this.searchService.searchPostsService(keyword, account);
  }

  @Roles(Role.Admin)
  @Get('accounts-by-admin')
  @ApiBody({ type: AccountSearchForResponse })
  async searchAccountByAdmin(@Query('keyword') keyword: string) {
    return await this.searchService.searchAccountsByAdminService(keyword);
  }
}
