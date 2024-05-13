import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CaslModule } from 'src/casl/casl.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [CaslModule],
  controllers: [RoleController],
  providers: [RoleService, PrismaService, JwtService],
})
export class RoleModule {}
