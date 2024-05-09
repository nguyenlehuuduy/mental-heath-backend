import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";
import { TokenService } from "src/token/token.service";
import { AccountForLoginResponse } from "./dto/AccountForLoginResponse";
import { AccountForPost } from "./dto/AccountForPost";
import { AccountForToken } from "./dto/AccountForToken";
import { AccountForFull } from "./dto/AccountFull";

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    @Inject(forwardRef(() => TokenService)) private tokenService: TokenService,
  ) {}

  async register(accountForPost: AccountForPost): Promise<AccountForFull> {
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
        select: {
          id: true,
          email: true,
          fullName: true,
          roles: true,
        },
      });
      console.log("step2: done !");
      return account;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async validateUser(email: string, password: string): Promise<AccountForFull> {
    const account = await this.prismaService.account.findFirst({
      where: { email },
      select: {
        roles: true,
        password: true,
        email: true,
        id: true,
        fullName: true,
        refreshTokenJWT: true,
      },
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

  async login(account: AccountForFull): Promise<AccountForLoginResponse> {
    if (!account.refreshTokenJWT) {
      // create a new refreshToken
      const refreshToken = await this.tokenService.generateRefreshToken(account);
      // save in account db
      refreshToken
        && (await this.prismaService.account.update({
          where: { id: account.id },
          data: {
            refreshTokenJWT: refreshToken,
          },
        }));
      // create a new AT by RT and save in sessionAccount.db
      const accessToken = await this.tokenService.generateAccessToken(account);
      accessToken
        && (await this.prismaService.sessionAccount.create({
          data: {
            accessTokenJWT: accessToken,
            refreshTokenJWT: refreshToken,
          },
        }));
      console.log("first login in one RT, login successfully!");
      return {
        access_token: accessToken,
        idAccount: account.id,
      };
    } else {
      // generate AT by RT
      const accessToken = await this.tokenService.createAccessTokenFromRefreshToken(
        account.refreshTokenJWT,
      );
      // save AT by RT in db
      accessToken
        && (await this.prismaService.sessionAccount.create({
          data: {
            accessTokenJWT: accessToken.token,
            refreshTokenJWT: account.refreshTokenJWT,
          },
        }));
      console.log("another session login, login successfully!");
      return {
        access_token: accessToken.token,
        idAccount: account.id,
      };
    }
  }

  async updateRefreshToken(rtold: string, rtnew: string, idAccount: string) {
    try {
      const result = await this.prismaService.account.update({
        data: {
          refreshTokenJWT: rtnew,
        },
        where: {
          id: idAccount,
          refreshTokenJWT: rtold,
        },
        select: {
          id: true,
          refreshTokenJWT: true,
        },
      });
      return result;
    } catch (error) {
      throw new BadRequestException("Request Failure");
    }
  }

  async checkIsLogin(req: Request): Promise<any> {
    try {
      if (!req.headers) {
        throw new BadRequestException("Cookie not found");
      }
      const access_token = req.headers["authorization"].split(" ")[1];
      const decodedToken = this.jwtService.verify(access_token, {
        secret: process.env.JWT_SECRET,
      });
      const { id } = decodedToken;
      return await this.prismaService.account.findUnique({
        where: { id },
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Cookie has expired");
    }
  }

  async findAccountByRT(refreshToken: string): Promise<AccountForFull> {
    try {
      return await this.prismaService.account.findFirst({
        where: { refreshTokenJWT: refreshToken },
        select: {
          fullName: true,
          email: true,
          id: true,
          roles: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException("request failure");
    }
  }

  async getProfileAccount(account: AccountForToken): Promise<AccountForFull> {
    try {
      return await this.prismaService.account.findUnique({
        where: { id: account.id },
        select: {
          fullName: true,
          email: true,
          id: true,
          roles: true,
          birth: true,
          address: true,
          nickName: true,
          phone: true,
        },
      });
    } catch (error) {
      console.error();
      throw new BadRequestException("Cookie has expired");
    }
  }
}
