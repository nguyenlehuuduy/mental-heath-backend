import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CaslModule } from "src/casl/casl.module";
import { FollowService } from "src/follow/follow.service";
import { PostService } from "src/post/post.service";
import { PrismaService } from "src/prisma/prisma.service";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";

@Module({
  imports: [CaslModule],
  controllers: [CommentController],
  providers: [CommentService, PrismaService, JwtService, PostService, FollowService],
})
export class CommentModule {}
