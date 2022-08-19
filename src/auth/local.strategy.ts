import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService, ValidatedUser } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  /**
   * ユーザーを認証する
   * @param email
   * @param password
   */
  async validate(email: string, password: string): Promise<ValidatedUser> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException(
        'ユーザーが存在しないか、パスワードが違います',
      );
    }
    return user;
  }
}
