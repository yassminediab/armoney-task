import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/config';
import { ChatModule } from './modules/chat/chat.module';
import { SeedModule } from './modules/seeds/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => appConfig],
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    ChatModule,
    SeedModule,
  ],
})
export class AppModule {}
