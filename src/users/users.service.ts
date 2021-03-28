import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './dto/user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from './decorators/user.decorator';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { rejects } from 'node:assert';

@Injectable()
export class UsersService {
 constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}
 
 public async create(dto: UserDTO): Promise<UserDTO> {
  console.log('dto passed into user service', dto);
  const entity = UserDTO.toEntity(dto);
  console.log('dto entity service', entity);
  // return new Promise((reject, resolve) => resolve([]));
  return this.repo.save(entity)
   .then(e => UserDTO.fromEntity(e));
 }

 public async findAll(): Promise<UserDTO[]> {
  return await this.repo.find()
   .then(users => users.map(e => UserDTO.fromEntity(e)));
   // return `This action returns all users`;
 }

 findOne(id: number) {
  return `This action returns a #${id} user`;
 }

 // update(id: number, updateUserDto: UpdateUserDto) {
 //   return `This action updates a #${id} user`;
 // }

 remove(id: number) {
  return `This action removes a #${id} user`;
 }
}
