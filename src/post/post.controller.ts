import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AccountForToken } from 'src/auth/dto/AccountForToken';
import {
  Action,
  CaslAbilityFactory,
} from 'src/casl/casl-ability.factory/casl-ability.factory';
import { PaginationAndFilter } from 'src/common/schema/pagination';
import { Role } from 'src/decorator/role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { PostForCreate } from './dto/PostForCreate';
import { PostForQuery } from './dto/PostForQuery';
import { PostForFullResponse, PostForResponse } from './dto/PostForResponse';
import { PostForUpdate } from './dto/PostForUpdate';
import { PostService } from './post.service';

@ApiTags('post')
@Controller('post')
@ApiBearerAuth('Authorization')
@Roles(Role.User)
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class PostController {
  constructor(
    private readonly postService: PostService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Post()
  @ApiBody({ type: PostForCreate })
  @ApiOkResponse({
    type: PostForResponse,
  })
  async createPost(@Body() postForCreate: PostForCreate, @Request() req) {
    return await this.postService.createPost(postForCreate, req?.user);
  }

  @Patch()
  @ApiBody({ type: PostForUpdate })
  @ApiOkResponse({
    type: PostForResponse,
  })
  async updatePost(@Body() postRequest: PostForUpdate, @Request() req) {
    const post = new PostForResponse();
    const account = new AccountForToken();
    const postDetail = await this.postService.getDetailPostById(postRequest.id);
    post.accountId = postDetail.accountId;
    account.id = req?.user?.id;
    const ability = this.caslAbilityFactory.defineAbility(account);
    const permision = ability.can(Action.Update, post);
    if (permision) {
      return await this.postService.updatePost(postRequest, req?.user);
    }
    throw new HttpException('you have not permision', HttpStatus.UNAUTHORIZED);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({
    description: 'delete ok',
    type: PostForResponse,
  })
  async deletePost(@Param('id') id: string, @Request() req) {
    const post = new PostForResponse();
    const account = new AccountForToken();
    const postDetail = await this.postService.getDetailPostById(id);
    post.accountId = postDetail.accountId;
    account.id = req?.user?.id;
    const ability = this.caslAbilityFactory.defineAbility(account);
    const permision = ability.can(Action.Delete, post);
    if (permision) {
      return await this.postService.deletePost(id, req?.user);
    }
    throw new HttpException('you have not permision', HttpStatus.UNAUTHORIZED);
  }

  @Get('/valid-post')
  @ApiBearerAuth('Authorization')
  @Roles(Role.User)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @ApiOkResponse({
    type: PostForFullResponse,
  })
  @ApiQuery({
    type: PaginationAndFilter,
  })
  async getValidPostByUser(
    @Request() req,
    @Query() query: PaginationAndFilter,
  ) {
    return await this.postService.getValidPostByAccount(req?.user?.id, query);
  }

  @Get('/get-all-post')
  @ApiOkResponse({
    type: PostForFullResponse,
  })
  @Roles(Role.Admin)
  async getAllPost(@Query() query: PostForQuery) {
    return this.postService.getAllPost(query);
  }
}
