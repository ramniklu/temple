import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

//custom imports
import { CreateProgramDto } from './dto/create-program.dto';
import { Program } from './entities';

@Injectable()
export class ProgramsService {
  constructor(@InjectRepository(Program) private readonly repository: Repository<Program>) { }

  async create(createProgramDto: CreateProgramDto) {
    return await this.repository.save(createProgramDto)
  }

  async findAll() {
    return await this.repository.find()
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } })

  }

  // update(id: number, updateProgramDto: UpdateProgramDto) {
  //   return `This action updates a #${id} program`;
  // }

  remove(id: number) {
    return `This action removes a #${id} program`;
  }
}
