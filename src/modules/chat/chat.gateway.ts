import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsGuard } from '../../auth/ws.guard';
import { User } from '../user/user.entity';
import { SendMessageDto } from './dto/sendMessage.dto';
import { Message } from './message.entity';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send_message')
  @UseGuards(WsGuard)
  async listenForMessages(
    @ConnectedSocket() client: any,
    @MessageBody() data: SendMessageDto,
  ) {
    const user: User = client?.user;
    const chat: Chat = await this.chatService.getChat(data.chatId);
    const message: Message = await this.chatService.saveMessage(data, user);
    for (const user of chat?.users || []) {
      this.server.emit(`receive_message_${user.id}`, {
        message: message,
        user: user,
      });
    }
  }
}
