import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AccessToken, AuthService, ValidatedUser } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

export type GuardUserRequest = {
  user: ValidatedUser;
};

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  /**
   * ログイン（アクセストークンを取得）
   * @param req
   */
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: GuardUserRequest): Promise<AccessToken> {
    return this.authService.login(req.user);
  }

  /**
   * ユーザーのプロファイルを取得する
   * @param req
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: GuardUserRequest): Promise<ValidatedUser> {
    return req.user;
  }

  /**
   * ヘルスチェック
   */
  @Get('healthcheck')
  hello(): string {
    return this.appService.getHello();
  }
}
