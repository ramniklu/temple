import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../base.entity';
import { Gender, Role } from '../enums';
import { Program } from 'src/programs/entities';

@Entity({ name: 'users' })
export class User extends BaseEntity {

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  school: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: Role.STUDENT })
  role: Role;

  @Column({ default: Gender.MALE })
  gender: Gender;

  @Column({ nullable: true })
  dob: Date;

  @Column({ nullable: true })
  address: string;

  @ManyToOne(() => Program, { onDelete: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'id', name: 'programId' })
  program: Program
}
