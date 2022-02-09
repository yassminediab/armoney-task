import {
  Controller,
  Post,
  Body,
  Get,
  HttpException, UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto, LoginUserResDto } from './dto/loginUser.dto';
import { JwtAuthGuard } from '../../auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.userService.register(registerUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const result: LoginUserResDto | boolean = await this.userService.login(
      loginUserDto,
    );
    if (!result) {
      throw new HttpException('Invalid username or password', 404);
    }
    return result;
  }
}
