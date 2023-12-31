import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {EmailTemplate} from "./entities"
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([EmailTemplate]),UsersModule],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
