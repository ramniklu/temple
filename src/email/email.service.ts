import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as nodemailer from 'nodemailer';
import { EmailTemplate } from './entities';
import { Repository } from 'typeorm';
import { CreateEmailTemplateDto } from './dto';

@Injectable()
export class EmailService {
  private transporter;

  constructor(
    @InjectRepository(EmailTemplate) private readonly repository: Repository<EmailTemplate>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'valleyhindutemple@gmail.com',
        pass: 'lmhl znja ajiv xamx',
        
      },
    });
  }

  async sendBulkEmail(dto: any, attachments: Express.Multer.File[] = []): Promise<void> {
    const attachmentsConfig = Array.isArray(attachments) ? attachments.map(file => ({ path: file.path })) : [];

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(
        {
          from: 'valleyhindutemple@gmail.com',
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

  async findOneTemplate(id:number) {
    return await this.repository.findOne({
      where:{id}
    })
  }
}