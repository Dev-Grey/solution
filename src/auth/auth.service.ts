import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pw: string): Promise<any> {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.password !== pw) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
