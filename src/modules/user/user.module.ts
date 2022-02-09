import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProviders } from './user.provider';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get('JWT_SECRET'),
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
})
export class UserModule {}
