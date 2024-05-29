import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== "ws") {
      return true
    }
    const client: Socket = context.switchToWs().getClient()
    WsJwtGuard.validateToken(client)
    return true;
  }

  static validateToken(client: Socket) {
    const token = client.handshake.auth.token;
    const account = verify(token,
      process.env.JWT_SECRET,
    );
    return account;
  }
}
