import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';
import { ProgramsModule } from '../programs/programs.module'
import { UsersModule } from '../users/users.module'


@Module({
  imports: [
    ProgramsModule,
    UsersModule
  ],
  controllers: [AdminController],
})
export class AdminModule { }
