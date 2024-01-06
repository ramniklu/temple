import { Body, Controller, Post, UseInterceptors, UploadedFiles, Get } from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailTemplateDto } from './dto';
import { UsersService } from '../users/users.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly userService: UsersService,
  ) { }

  // @Post('send/bulk')
  // @UseInterceptors(FileInterceptor('attachments')) // Use FileInterceptor for handling attachments
  // async sendBulkEmail(
  //   @Body() data: any,
  //   @UploadedFiles() attachments: Express.Multer.File[], // Attachments from request
  // ): Promise<void> {
  //   let users = [];

  //   if (!data || !data.users || !Array.isArray(data.users) || data.users.length === 0) {
  //     users = (await this.userService.findAllUsers()).map(x => x.email);
  //     data.users = users;
  //   }

  //   await this.emailService.sendBulkEmail(data, attachments); // Pass attachments to the service
  // }
  @Post('send/bulk')
@UseInterceptors(FileInterceptor('attachments'))
async sendBulkEmail(
  @Body() data: any,
  @UploadedFiles() attachments: Express.Multer.File[],
): Promise<void> {
  let users = [];

  if (!data || !data.users || !Array.isArray(data.users) || data.users.length === 0) {
    users = (await this.userService.findAllUsers()).map(x => x.email);
    data.users = users;
  }

  if (!attachments) {
    // Handle the case when 'attachments' is undefined or empty
    // You can log an error, throw an exception, or handle it according to your requirements
    console.error('No attachments provided.');
    // Optionally, you can return a 400 Bad Request response
    throw new BadRequestException('No attachments provided.');
  }

  await this.emailService.sendBulkEmail(data, attachments);
}


  @Get('template/list')
  async listTemplate() {
    return await this.emailService.listTemplate();
  }

  // Other methods...
}


