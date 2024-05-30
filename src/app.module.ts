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
import { PostshareModule } from './postshare/postshare.module';
import { MockDataModule } from './mock-data/mock-data.module';
import { ChatBotModule } from './chat-bot/chat-bot.module';
import { NotificationModule } from './notification/notification.module';
import { TypenotificationModule } from './type-notification/typenotification.module';
import { ConfigModule } from '@nestjs/config';
import { UploadS3Module } from './uploads3/uploads3.module';
import { SearchModule } from './search/search.module';
import { PermissionPostModule } from './permission-post/permission-post.module';
import { TypeMessageModule } from './type-message/type-message.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UploadS3Module,
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
    PostshareModule,
    MockDataModule,
    ChatBotModule,
    NotificationModule,
    TypenotificationModule,
    SearchModule,
    PermissionPostModule,
    TypeMessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
