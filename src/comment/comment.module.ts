import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CaslModule } from 'src/casl/casl.module';
import { PostService } from 'src/post/post.service';

@Module({
  imports: [CaslModule],
  controllers: [CommentController],
  providers: [CommentService, PrismaService, JwtService, PostService]
})
export class CommentModule {}
