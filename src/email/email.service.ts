import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as nodemailer from 'nodemailer';
import { EmailTemplate } from './entities';
import { Repository } from 'typeorm';
// import { createReadStream, ReadStream } from 'fs';

@Injectable()
export class EmailService {
  private transporter;

  constructor(@InjectRepository(EmailTemplate) private readonly repository: Repository<EmailTemplate>) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'valleyhindutemple@gmail.com',
        pass: 'lmhl znja ajiv xamx',
      },
    });
  }

  async sendBulkEmail(dto: any): Promise<void> {
    // return new Promise((resolve, reject) => {
    //   const attachmentPromises = attachments.map((attachment) => {
    //     return {
    //       filename: attachment.originalname,
    //       content: attachment.buffer,
    //     };
    //   });
  
      this.transporter.sendMail(
        {
          from: 'valleyhindutemple@gmail.com',
          bcc: dto.users,
          subject: dto.subject,
          html: dto.message,
          attachments:dto.attachments,
          // attachments: attachmentPromises,
      //   },
      //   (error, info) => {
      //     if (error) {
      //       reject(error);
      //     } else {
      //       resolve();
      //     }
      //   },
      // );
    });
  }
}

  
