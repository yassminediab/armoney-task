import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';
import { User } from '../user.entity';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class LoginUserResDto {
  token: string;
  user: User;
}
