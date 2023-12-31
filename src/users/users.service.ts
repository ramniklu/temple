import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto, UpdateUserDto } from './dto';

import { User } from './entities'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {
    return await this.repository.save(createUserDto)
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.findOne(id);

    if (!existingUser) {
      throw new Error('User not found');
    }

    // Update the user fields
    const updatedUser = { ...existingUser, ...updateUserDto };

    return await this.repository.save(updatedUser);
  }

  async findAll() {
    return await this.repository.find()
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } })
  }

  async findByEmail(email: string) {
    return await this.repository.findOne({ where: { email } })
  }

  async remove(id: number) {
    return await this.repository.delete(id)

  }

  async findAllUsers() {
    return await this.repository.find()

  }


}
