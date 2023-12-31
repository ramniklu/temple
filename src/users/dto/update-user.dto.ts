import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Program } from 'src/programs/entities';
import { Gender, Role } from '../enums';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    name: string;


    @IsOptional()
    school: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    email: string;

    @IsOptional()
    password: string;

    @IsOptional()
    role: Role;

    @IsOptional()
    gender: Gender;

    @IsOptional()
    dob: Date;

    @IsOptional()
    address: string;

    @IsOptional()
    program: Program
}
