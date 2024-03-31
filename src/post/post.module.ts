import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CaslModule } from 'src/casl/casl.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [CaslModule],
  controllers: [PostController],
  providers: [PrismaService, PostService, JwtService],
})
export class PostModule { }
