import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../base.entity';

@Entity({ name: 'programs' })
export class Program extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  code: string;
}
