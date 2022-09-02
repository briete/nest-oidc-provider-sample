import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { EnvService } from '../config/env.service';
import { EnvModule } from '../config/env.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      useFactory: async (envService: EnvService) => ({
        secret: envService.JwtSecret,
        signOptions: {
          expiresIn: '60s',
        },
      }),
      inject: [EnvService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
