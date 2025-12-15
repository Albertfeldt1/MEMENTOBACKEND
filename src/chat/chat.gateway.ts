import { UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsJwtAuthGuard } from '../auth/ws-jwt-auth.guard';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    return 'Hello world!';
  }

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    return { event: 'joinRoom', data: `Joined room ${room}` };
  }

  // @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('messageToServer')
  handleMessageToServer(
    client: Socket,
    payload: { room: string; message: string },
  ): void {
    // console.log(payload, '==>messageToServer');
    this.server.emit('messageToClient', payload);
  }

  // @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('broadcast')
  handleBroadcast(client: Socket, payload: { message: string }): void {
    this.server.emit('broadcastMessage', {
      sender: client.data.user.username,
      userId: client.data.user.userId,
      message: payload.message,
    });
  }

  // @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('privateMessage')
  handlePrivateMessage(
    client: Socket,
    payload: { targetId: string; message: string },
  ): void {
    const { targetId, message } = payload;
    this.server.to(targetId).emit('privateMessage', {
      sender: client.data.user.username,
      userId: client.data.user.userId,
      message: message,
    });
  }
}
