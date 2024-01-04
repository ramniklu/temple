import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as nodemailer from 'nodemailer';
import { EmailTemplate } from './entities';
import { Repository } from 'typeorm';
import { CreateEmailTemplateDto } from './dto';

@Injectable()
export class EmailService {
  private transporter: {
    sendMail: (arg0: {
      from: string; // Replace with your email address
      to: any; subject: any; html: any; attachments: { path: string; }[];
    }, arg1: (error: any, info: any) => void) => void;
  };

  constructor(
    @InjectRepository(EmailTemplate) private readonly repository: Repository<EmailTemplate>,
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'mail.valleyhindutemple.org', // Replace with your hosting email server
      port: 465, // Replace with the appropriate port for your hosting provider
      secure: true, // Set to true if your hosting provider requires a secure connection
      auth: {
        user: 'support@valleyhindutemple.org', // Replace with your email address
        pass: 'QGZ3K3yJ98WdrPR', // Replace with your email password
      },
    });
  }

  async sendBulkEmail(dto: any, attachments: Express.Multer.File[] = []): Promise<void> {
    const attachmentsConfig = Array.isArray(attachments) ? attachments.map(file => ({ path: file.path })) : [];

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(
        {
          from: 'cPanel on valleyhindutemple.org', // Replace with your email address
          to: dto.users,
          subject: dto.subject,
          html: dto.message,
          attachments: attachmentsConfig,
        },
        (error, info) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }
      );
    });
  }

  async listTemplate() {
    return await this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOneTemplate(id: number) {
    return await this.repository.findOne({
      where: { id },
    });
  }
}
