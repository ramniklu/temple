import {
  Body,
  Controller,
  Post
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  @Post('login')
  async login(@Body() dto: CreateAuthDto) {
    console.log(dto)
    return await this.authService.login(dto.email, dto.password);
  }






}
