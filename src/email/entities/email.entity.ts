// email/entities/email-template.entity.ts

import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../base.entity';

@Entity({ name: 'email_templates' })
export class EmailTemplate extends BaseEntity {
  @Column({ nullable: false })
  subject: string;

  @Column({ nullable: false })
  message: string;

  @Column('simple-array', { nullable: true })
  attachments: string[]; // Array of file paths for attachments
}