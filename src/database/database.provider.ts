import { createConnection } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (configService: ConfigService) =>
      await createConnection(configService.get('database')),
    inject: [ConfigService],
  },
];
