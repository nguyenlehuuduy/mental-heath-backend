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
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/decorator/role.enum';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import {
  Action,
  CaslAbilityFactory,
} from 'src/casl/casl-ability.factory/casl-ability.factory';
import { AccountForToken } from 'src/auth/dto/AccountForToken';
import { PostForCreate } from './dto/PostForCreate';
import { PostForUpdate } from './dto/PostForUpdate';
import { PostForResponse } from './dto/PostForResponse';

@ApiTags('post')
@Controller('post')
@ApiBearerAuth('Authorization')
@Roles(Role.User)
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class PostController {
  constructor(
    private readonly postService: PostService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) { }

  @Post()
  @ApiBody({ type: PostForCreate })
  async createPost(@Body() postForCreate: PostForCreate, @Request() req) {
    return await this.postService.createPost(postForCreate, req?.user);
  }

  @Patch()
  @ApiBody({ type: PostForUpdate })
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

  @Get("/mock-data")
  async getMockDataNormalPost() {
    console.log("loading to mock...")
    return await this.postService.mockDataFaker();
  }

  @Get("/valid-post")
  @ApiBearerAuth('Authorization')
  @Roles(Role.User)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  async getValidPostByUser(@Request() req) {
    return await this.postService.getValidPostByAccount(req?.user?.id)
  }
}
