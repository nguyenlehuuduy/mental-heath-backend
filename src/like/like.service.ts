import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LikeForPost } from './dto/LikeForPost';
import { LikeForGet } from './dto/LikeForGet';

@Injectable()
export class LikeService {
  constructor(private prismaService: PrismaService) { }
  async updateStatusLikes(likeForPost: LikeForPost): Promise<LikeForGet> {
    try {
      const likeStatus = await this.prismaService.reaction.findFirst({
        where: {
          accountId: likeForPost.accountId,
          postId: likeForPost.postId
        }
      })
      if (likeStatus) {
        return await this.prismaService.reaction.delete({
          where: {
            id: likeStatus.id,
            accountId: likeForPost.accountId,
            postId: likeForPost.postId
          },
          select: {
            id: true,
            accountId: true,
            postId: true,
            created_at: true,
            updated_at: true
          }
        });
      }
      return await this.prismaService.reaction.create({
        data: {
          
          accountId: likeForPost.accountId,
          postId: likeForPost.postId
        },
        select: {
          id: true,
          accountId: true,
          postId: true,
          created_at: true,
          updated_at: true
        }
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
