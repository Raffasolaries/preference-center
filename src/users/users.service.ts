import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
 constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}
 create(createUserDto: CreateUserDto) {
   return 'This action adds a new user';
 }

 public async findAll() {
  return await this.repo.find();
   // return `This action returns all users`;
 }

 findOne(id: number) {
   return `This action returns a #${id} user`;
 }

 update(id: number, updateUserDto: UpdateUserDto) {
   return `This action updates a #${id} user`;
 }

 remove(id: number) {
   return `This action removes a #${id} user`;
 }
}
