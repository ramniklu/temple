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
      type: 'mysql',
      host: 'monorail.proxy.rlwy.net',
      port: 33039,
      username: 'root',
      password: 'bHde521dEBcbFDbEF54fgfBhgG1D1af3',
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
