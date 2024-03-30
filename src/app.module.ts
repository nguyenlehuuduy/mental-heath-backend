import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TokenModule } from './token/token.module';
import { JwtModule } from '@nestjs/jwt';
import { CaslModule } from './casl/casl.module';
import { UsersModule } from './users/users.module';

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
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
