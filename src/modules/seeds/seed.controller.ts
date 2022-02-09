import { Controller, Get } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { User } from '../user/user.entity';
import { Chat } from '../chat/chat.entity';
import * as bcrypt from 'bcrypt';

@Controller('seeds')
export class SeedController {
  @Get()
  async seed() {
    const users: User[] = [
      {
        name: 'User 1',
        email: 'user@gmail.com',
        phone: '+97162838289',
        password: await bcrypt.hash('12345678', 10),
        avatar: 'test.jpg',
      },
      {
        name: 'User 2',
        email: 'user2@gmail.com',
        phone: '+97162838281',
        password: await bcrypt.hash('12345678', 10),
        avatar: 'test.jpg',
      },
      {
        name: 'User 3',
        email: 'user3@gmail.com',
        phone: '+97162838289',
        password: await bcrypt.hash('12345678', 10),
        avatar: 'test.jpg',
      },
    ];
    const chatRepository = getRepository(Chat);
    const chat: Chat = await chatRepository.save({
      name: 'test chat',
    });
    const userRepository = getRepository(User);
    for (const user of users) {
      user.chats = [chat];
      await userRepository.save(user);
    }
  }
}
