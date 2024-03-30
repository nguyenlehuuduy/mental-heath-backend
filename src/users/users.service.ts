import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InfoUser } from './dto/infoUser';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  async getInfoUser(id: string) {
    try {
      const infoUser = await this.prismaService.account.findFirst({
        where: { id },
      });
      return infoUser;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateInfoUser(id: string, infoUserRequest: InfoUser) {
    try {
      if (!id) {
        throw new HttpException(
          'Không tìm thấy tài khoản.',
          HttpStatus.BAD_REQUEST,
        );
      }
      const { fullName, phone, aboutMe, nickName, birth, address } =
        infoUserRequest;
      await this.prismaService.account.update({
        where: { id },
        data: {
          fullName,
          phone,
          aboutMe,
          nickName,
          birth,
          address,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
