import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";
import { AccountForPost } from "./dto/AccountForPost";

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService, private jwtService: JwtService) {}

  async register(accountForPost: AccountForPost) {
    try {
      const { email, password } = accountForPost;
      const accountExists = await this.prismaService.account.findFirst({
        where: { email: email },
      });
      if (accountExists) {
        throw new HttpException("Email đã tồn tại.", HttpStatus.CONFLICT);
      }
      const lenghHashPassword = 10;
      const hashPassword = await bcrypt.hash(password, lenghHashPassword);
      accountForPost.password = hashPassword;
      const account = await this.prismaService.account.create({
        data: accountForPost,
      });
      console.log("done !");
      return account;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const account = await this.prismaService.account.findFirst({ where: { email } });
    if (account && account.password) {
      const isMatch = await bcrypt.compare(password, account.password);
      if (isMatch) {
        const { password, ...result } = account;
        return result;
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
    const { password, ...result } = account;
    console.log("login successfully!");
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: "1d", secret: process.env.JWT_SECRET }),
      role: result,
    };
  }

  
}
