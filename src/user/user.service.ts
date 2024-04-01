import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserForUpdate } from './dto/UserForUpdate';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async getDetailUserById(userId: string) {
    try {
      const user = await this.prismaService.account.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async updateUser(userInfoRequest: UserForUpdate) {
    try {
      return await this.prismaService.account.update({
        where: { id: userInfoRequest.id },
        data: {
          id: userInfoRequest.id,
          fullName: userInfoRequest.fullName,
          phone: userInfoRequest.phone,
          aboutMe: userInfoRequest.aboutMe,
          nickName: userInfoRequest.nickName,
          birth: userInfoRequest.birth,
          address: userInfoRequest.address,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
