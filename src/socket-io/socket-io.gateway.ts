import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'
import { Message } from './dto/message';
import { Logger, UseGuards } from '@nestjs/common';
import { WsJwtGuard } from 'src/auth/ws-jwt/ws-jwt.guard';
import { SocketAuthMiddleWare } from 'src/auth/ws-jwt/ws.mw';
import { MessageForResponse } from 'src/room-message/dto/MessageForResponse';
export const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
    SEND_ROOM_MESSAGE: "SEND_MESSAGE",
    JOIN_ROOM: "JOIN_ROOM",
  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
    ROOM_MESSAGE: "ROOM_MESSAGE",
  },
};

@WebSocketGateway(8005, {
  cors: {
    origin: "http://localhost:3000"
  }
})
@UseGuards(WsJwtGuard)

export class SocketIoGateway {
  @WebSocketServer()
  server: Server<any, any>;

  afterInit(client: Socket) {
    client.use(SocketAuthMiddleWare() as any)
    Logger.log("after init")
  }

  @SubscribeMessage(EVENTS.CLIENT.SEND_ROOM_MESSAGE)
  handleMessage(@MessageBody() data: MessageForResponse) {
    this.server.to(data.roomId).emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, data)
    return 'Hello world!';
  }

  @SubscribeMessage(EVENTS.CLIENT.JOIN_ROOM)
  handleJoinRoom(@MessageBody() idRoom: string, @ConnectedSocket() client: Socket) {
    client.join(idRoom);
  }

  sendMessage(roomId: string, message: Message) {
    this.server.to(roomId).emit('newMessage', message)
  }
}
