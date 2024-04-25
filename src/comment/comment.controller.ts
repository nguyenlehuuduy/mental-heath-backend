import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorator/role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { CommentService } from './comment.service';
import { Action, CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { AccountForToken } from 'src/auth/dto/AccountForToken';
import { CommentForCreate } from './dto/CommentForCreate';
import { CommentForResponse } from './dto/CommentForResponse';
import { CommentForUpdate } from './dto/CommentForUpdate';
import { PostService } from 'src/post/post.service';


@Controller('comment')
@ApiTags('comment')
@ApiBearerAuth('Authorization')
@Roles(Role.User)
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly postService: PostService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) { }
  @Post()
  @ApiBody({ type: CommentForCreate })
  async createComment(
    @Body() commentForCreate: CommentForCreate,
    @Request() req) {
    //TODO: follow module later
    return await this.commentService.createComment(commentForCreate);
  }

  @Patch(":id")
  @ApiBody({ type: CommentForUpdate })
  async updateComment(
    @Body() commentForUpdate: CommentForUpdate,
    @Param('id') idComment: string,
    @Request() req) {
    const comment = new CommentForResponse();
    const account = new AccountForToken();
    const commentDetail = await this.commentService.getDetailCommentById(idComment);
    comment.accountId = commentDetail.accountId;
    account.id = req?.user?.id;
    const ability = this.caslAbilityFactory.defineAbility(account);
    const permision = ability.can(Action.Update, comment);
    if (permision) {
      return await this.commentService.updateComment(idComment, commentForUpdate);
    }
    throw new HttpException('you have not permision', HttpStatus.UNAUTHORIZED)
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  async deleteComment(
    @Param('id') id: string,
    @Request() req) {
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
}
