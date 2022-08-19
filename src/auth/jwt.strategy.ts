import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { EnvService } from '../config/env.service';
import { JWTPayload } from './auth.service';
import { User } from '@prisma/client';

export type UserProfile = Pick<User, 'id' | 'name' | 'email'>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(envService: EnvService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envService.JwtSecret,
    });
  }

  async validate(payload: JWTPayload): Promise<UserProfile> {
    return {
      id: Number(payload.sub),
      name: payload.username,
      email: payload.email,
    };
  }
}
