import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccountForPost } from './dto/AccountForPost';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(accountForPost: AccountForPost) {
    try {
      const { email, password } = accountForPost;
      const accountExists = await this.prismaService.account.findFirst({
        where: { email: email },
      });
      if (accountExists) {
        throw new HttpException('Email đã tồn tại.', HttpStatus.CONFLICT);
      }
      const lenghHashPassword = 10;
      const hashPassword = await bcrypt.hash(password, lenghHashPassword);
      accountForPost.password = hashPassword;
      const account = await this.prismaService.account.create({
        data: accountForPost,
      });
      console.log('step2: done !');
      return account;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const account = await this.prismaService.account.findFirst({
      where: { email },
    });
    if (account && account.password) {
      const isMatch = await bcrypt.compare(password, account.password);
      if (isMatch) {
        delete account.password;
        return account;
      }
      return null;
    }

    return null;
  }

  async login(id: number, email: string) {
    const payload = { email, id };
    const account = await this.prismaService.account.findUnique({
      where: { id },
    });
    delete account.password;
    console.log('login successfully!');
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '1d',
        secret: process.env.JWT_SECRET,
      }),
      role: account,
    };
  }

  async checkIsLogin(req: Request): Promise<any> {
    try {
      if (!req.headers) {
        throw new BadRequestException('Cookie not found');
      }
      const access_token = req.headers['authorization'].split(' ')[1];
      const decodedToken = this.jwtService.verify(access_token, {
        secret: process.env.JWT_SECRET,
      });
      const { id } = decodedToken;
      return await this.prismaService.account.findUnique({
        where: { id },
      });
    } catch (error) {
      console.log(error);

      throw new BadRequestException('Cookie has expired');
    }
  }
}
