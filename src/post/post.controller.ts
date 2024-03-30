import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { PostDto } from './dto/post';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/createPost')
  @ApiBody({ type: PostDto })
  async createPost(@Body() postRequest: PostDto, @Res() response: Response) {
    const postCreate = await this.postService.createPost(postRequest);
    response.status(HttpStatus.CREATED).json({
      data: postCreate,
      message: 'Create post successfully',
      status: HttpStatus.CREATED,
    });
  }

  @Patch('/updatePost/:id')
  @ApiBody({ type: PostDto })
  async updatePost(
    @Param('id') id: string,
    @Body() postRequest: PostDto,
    @Res() response: Response,
  ) {
    const postUpdate = await this.postService.updatePost(id, postRequest);
    response.status(HttpStatus.OK).json({
      data: postUpdate,
      message: 'Update post successfully',
      status: HttpStatus.OK,
    });
  }

  @Delete('/deletePost/:id')
  @ApiParam({ name: 'id', type: String })
  async deletePost(
    @Param('id') id: string,
    @Body() accountId: string,
    @Res() response: Response,
  ) {
    await this.postService.deletePost(id, accountId);
    response.status(HttpStatus.OK).json({
      message: 'Delete post successfully',
      status: HttpStatus.OK,
    });
  }
}
