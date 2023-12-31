/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Injectable, Req } from '@nestjs/common';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'token_secret_s_ec_r_t',
      passReqToCallback: true,
    });
  }

  validate(@Req() req: Request, payload: any) {
    const refreshToken = req['headers']['authorization']
      .replace('Bearer', '')
      .trim();
    return { ...payload, refreshToken };
  }
}
