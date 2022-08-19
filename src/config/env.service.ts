import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService) {}

  isProduction(): boolean {
    return this.configService.get('NODE_ENV') === 'production';
  }

  isDevelopment(): boolean {
    return this.configService.get('NODE_ENV') === 'development';
  }

  get service() {
    return this.configService;
  }

  get NodeEnv(): string {
    return this.configService.get('NODE_ENV');
  }

  get DBPort(): number {
    return this.configService.get('DB_PORT');
  }

  get DBUrl(): string {
    return this.configService.get('DB_HOST');
  }

  get JwtSecret(): string {
    return this.configService.get('JWT_SECRET');
  }
}
