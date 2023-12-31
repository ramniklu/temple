/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BadRequestException,
  Injectable
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';



import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(

    private userService: UsersService,

    private jwtService: JwtService,
  ) { }


  async login(username: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(username);
    if (user && user.password === password) {
      return await this.assignToken(user);
    }
    throw new BadRequestException('Invalid credentials');
  }



  async assignToken(user: any) {
    const payload = {
      name: user.name,
      role: user.role,
      id: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }










}
