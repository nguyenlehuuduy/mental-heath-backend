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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AccountForToken } from 'src/auth/dto/AccountForToken';
import {
  Action,
  CaslAbilityFactory,
} from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Role } from 'src/decorator/role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { FollowService } from 'src/follow/follow.service';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { PostService } from 'src/post/post.service';
import { CommentService } from './comment.service';
import { CommentForCreate } from './dto/CommentForCreate';
import { CommentForResponse } from './dto/CommentForResponse';
import { CommentForUpdate } from './dto/CommentForUpdate';

@Controller('comment')
@ApiTags('comment')
@ApiBearerAuth('Authorization')
@Roles(Role.User)
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private caslAbilityFactory: CaslAbilityFactory,
    private followService: FollowService,
    private postService: PostService,
  ) { }
  @Post()
  @ApiBody({ type: CommentForCreate })
  @ApiOkResponse({
    type: CommentForResponse,
  })
  async createComment(
    @Body() commentForCreate: CommentForCreate,
    @Request() req,
  ) {
    const followings = await this.followService.getAllFollowings(req?.user?.id);
    const authorPost = await this.postService.getDetailPostById(
      commentForCreate.postId,
    );
    if (
      !!followings.find((item) => item.id === authorPost.accountId) ||
      req?.user?.id === authorPost.accountId
    ) {
      return await this.commentService.createComment(commentForCreate);
    }
  }

  @Patch(':id')
  @ApiBody({ type: CommentForUpdate })
  @ApiOkResponse({
    type: CommentForResponse,
  })
  async updateComment(
    @Body() commentForUpdate: CommentForUpdate,
    @Param('id') idComment: string,
    @Request() req,
  ) {
    const comment = new CommentForResponse();
    const account = new AccountForToken();
    const commentDetail =
      await this.commentService.getDetailCommentById(idComment);
    comment.accountId = commentDetail.accountId;
    account.id = req?.user?.id;
    const ability = this.caslAbilityFactory.defineAbility(account);
    const permision = ability.can(Action.Update, comment);
    if (permision) {
      return await this.commentService.updateComment(
        idComment,
        commentForUpdate,
      );
    }
    throw new HttpException('you have not permision', HttpStatus.UNAUTHORIZED);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({
    type: CommentForResponse,
  })
  async deleteComment(@Param('id') id: string, @Request() req) {
    const comment = new CommentForResponse();
    const account = new AccountForToken();
    const commentDetail = await this.commentService.getDetailCommentById(id);
    comment.accountId = commentDetail.accountId;
    account.id = req?.user?.id;
    const ability = this.caslAbilityFactory.defineAbility(account);
    const permision = ability.can(Action.Delete, comment);
    if (permision) {
      return await this.commentService.deleteComment(id, req?.user);
    }
    throw new HttpException('you have not permision', HttpStatus.UNAUTHORIZED);
  }

  @Get("/posts/:id")
  async getAllCommentByIdPost(@Param("id") idPost: string, @Request() req) {
    return await this.commentService.getAllCommentByIdPost(idPost, req?.user)
  }
}
