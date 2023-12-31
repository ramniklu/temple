import { ConfigModule } from '@nestjs/config';

import { PassportModule } from '@nestjs/passport';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtStrategy, RefreshTokenStrategy } from './strategies';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWT_TOKEN_SECRET,
    }),
    PassportModule.register({ session: true }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule { }
