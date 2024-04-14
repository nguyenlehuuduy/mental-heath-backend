import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TokenModule } from './token/token.module';
import { JwtModule } from '@nestjs/jwt';
import { CaslModule } from './casl/casl.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { FeatureModule } from './feature/feature.module';
import { HotContentModule } from './hot-content/hot-content.module';
import { TabMenuModule } from './tab-menu/tab-menu.module';
import { RoomMessageModule } from './room-message/room-message.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    TokenModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '5m',
      },
    }),
    CaslModule,
    PostModule,
    UserModule,
    RoleModule,
    FeatureModule,
    HotContentModule,
    TabMenuModule,
    RoomMessageModule,
    LikeModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
