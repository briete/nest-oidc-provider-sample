import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

export type ValidatedUser = Omit<User, 'hashedPassword'>;
export type AccessToken = {
  access_token: string;
};
export type JWTPayload = {
  username: string;
  email: string;
  sub: string;
};

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  /**
   * ユーザーを検証する
   * @param email
   * @param password
   */
  async validateUser(
    email: string,
    password: string,
  ): Promise<ValidatedUser | null> {
    // const user = await this.usersService.user({
    //   email,
    // });
    // const isMatch =
    //   user && (await bcrypt.compare(password, user.hashedPassword));
    // if (isMatch) {
    //   const { hashedPassword, ...result } = user;
    //   return result;
    // }
    return null;
  }

  /**
   * ログイン
   * @param user
   */
  async login(user: ValidatedUser): Promise<AccessToken> {
    const payload: JWTPayload = {
      username: user.name,
      email: user.email,
      sub: user.id.toString(),
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
