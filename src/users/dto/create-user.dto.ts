
import { IsNotEmpty, IsOptional } from 'class-validator'

import { Program } from "../../programs/entities";
import { Gender, Role } from "../enums";

export class CreateUserDto {
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
