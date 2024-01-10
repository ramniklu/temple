import { Body, Controller, Post, UseInterceptors, UploadedFiles, Get } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { EmailService } from './email.service';
import { UsersService } from '../users/users.service';

@Controller('email')
export class EmailController {
  
  
  constructor(private readonly emailService: EmailService,private readonly userService: UsersService,) {}

  @Post('send/bulk')
  @UseInterceptors(
    AnyFilesInterceptor( {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  async sendBulkEmail(
    @Body() data: any,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<void> {
    let users = [];
    let attachments=[];
   if(data.users !== undefined){
    data.users = (await this.userService.find(data.users)).map(x => x.email);
   }
   if (!data || !data.users || !Array.isArray(data.users) || data.users.length === 0) {
    users = (await this.userService.findAllUsers()).map(x => x.email);
    data.users = users;
  }
  
    

    if(files.length){

    
      for (const file of files) {
        attachments.push({
          filename:file.originalname,
          path:file.path,
          
        })
      }
    }
  
    try {
      await this.emailService.sendBulkEmail({...data,attachments,users:data.users});
      console.log('Email sent successfully');

    } catch (error) {
      console.error('Error sending email:', error);
   
    }
  }
  

 
}