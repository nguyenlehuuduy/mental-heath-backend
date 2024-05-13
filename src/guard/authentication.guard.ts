import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('checking token....');
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization.split(' ')[1];
    try {
      const account = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user = account?.token;
      return account?.token.id ? true : false;
    } catch (error) {
      throw new UnauthorizedException('Token is not valid !');
    }
  }
}
