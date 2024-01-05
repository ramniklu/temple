import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProgramsModule } from './programs/programs.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AdminModule } from './admin/admin.module';
import { EmailService } from './email/email.service';
import { EmailController } from './email/email.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module'
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    UsersModule,
    ProgramsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'monorail.proxy.rlwy.net',
      port: 42068,
      username: 'postgres',
      password: 'Dbf1FBEf*aEcC2eEAAG1BagadCg*-521',
      database: 'railway',
      autoLoadEntities: true,
      synchronize: true,
      ...(process.env.NODE_ENV === 'prod'
        ? {
          ssl: {
            rejectUnauthorized: false,
          },
        }
        : {}),
    }),

    AdminModule,

    EmailModule,
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
