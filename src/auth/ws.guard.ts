import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    const bearerToken =
      context.args[0].handshake.headers.authorization.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(
        bearerToken,
        this.configService.get('JWT_SECRET'),
      ) as any;
      context.args[0].user = decoded;
      return new Promise((resolve, reject) => {
        resolve(decoded);
      });
    } catch (ex) {
      return false;
    }
  }
}
