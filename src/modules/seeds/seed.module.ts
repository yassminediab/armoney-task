import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { SeedController } from './seed.controller';
import { userProviders } from '../user/user.provider';
import { chatProviders } from '../chat/chat.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [SeedController],
  providers: [...userProviders, ...chatProviders],
})
export class SeedModule {}
