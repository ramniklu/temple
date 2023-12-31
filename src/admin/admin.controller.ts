/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { ProgramsService } from 'src/programs/programs.service';

//dtos
import { CreateProgramDto } from '../programs/dto'
import { CreateUserDto } from 'src/users/dto';
import { Program } from '../programs/entities';

@Controller('admin')
export class AdminController {

  constructor(
    private readonly usersService: UsersService,
    private readonly ProgramsService: ProgramsService,
  ) {}



  //program management
  @Post('program/create')
  async createProgram(@Body() dto: CreateProgramDto) {
    return await this.ProgramsService.create(dto)
  }

  @Post('program/list')
  async listProgram() {
    return await this.ProgramsService.findAll()
  }

  @Post('program/view/:id')
  async viewProgram(@Param('id', ParseIntPipe) id: number) {
    return await this.ProgramsService.findOne(id)
  }


  //users management

  @Post('user/create')
  async createUser(@Body() createUserDto: CreateUserDto) {

    return await this.usersService.create({ ...createUserDto, program: { id: +createUserDto.program } as Program })
  }

  @Post('user/list')
  async listUser() {
    return await this.usersService.findAll()
  }

  @Post('user/view/:id')
  async viewUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOne(id)
  }

}
