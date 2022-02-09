import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SendMessageDto } from './dto/sendMessage.dto';
import { Message } from './message.entity';
import { User } from '../user/user.entity';
import { Chat } from './chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @Inject('MESSAGE_REPOSITORY')
    private messageRepository: Repository<Message>,
    @Inject('CHAT_REPOSITORY')
    private chatRepository: Repository<Chat>,
  ) {}

  async saveMessage(
    sendMessageDto: SendMessageDto,
    user: User,
  ): Promise<Message> {
    return this.messageRepository.save({
      ...sendMessageDto,
      userId: user.id,
    });
  }

  async getChat(groupId: string): Promise<Chat | undefined> {
    return this.chatRepository.findOne({
      id: groupId,
    });
  }
}
