import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto, LoginUserResDto } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    registerUserDto.password = await bcrypt.hash(registerUserDto.password, 10);
    return this.userRepository.save(registerUserDto);
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginUserResDto | boolean> {
    const user: User = await this.userRepository.findOne({
      email: loginUserDto.email,
    });
    if (!user) {
      return false;
    }
    const compare: boolean = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!compare) {
      return false;
    }
    const token: string = this.jwtService.sign({
      id: user.id,
      email: user.email,
      phone: user.phone,
      name: user.name,
    });
    return {
      token: token,
      user: user,
    };
  }

  async findById(email: string): Promise<User> {
    return this.userRepository.findOne({
      email: email,
    });
  }
}
