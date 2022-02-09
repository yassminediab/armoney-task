import { Connection } from 'typeorm';
import { Chat } from './chat.entity';
import { Message } from './message.entity';

export const chatProviders = [
  {
    provide: 'CHAT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Chat),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'MESSAGE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Message),
    inject: ['DATABASE_CONNECTION'],
  },
];
