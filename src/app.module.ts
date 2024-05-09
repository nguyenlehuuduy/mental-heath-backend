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
import { FileModule } from './file/file.module';
import { FollowModule } from './follow/follow.module';
import { MockDataController } from './mock-data/mock-data.controller';
import { MockDataModule } from './mock-data/mock-data.module';
import { NotificationModule } from './notification/notification.module';
import { TypenotificationModule } from './typenotification/typenotification.module';

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
    FileModule,
    FollowModule,
    MockDataModule,
    NotificationModule,
    TypenotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
