import { Module, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenService } from 'src/token/token.service';
import { TokenModule } from 'src/token/token.module';
import { CaslModule } from 'src/casl/casl.module';
import { UploadS3Module } from 'src/uploads3/uploads3.module';

@Module({
  imports: [forwardRef(() => TokenModule), CaslModule, UploadS3Module],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    PrismaService,
    JwtService,
    TokenService,
  ],
})
export class AuthModule {}
