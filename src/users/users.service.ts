import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './dto/user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from './decorators/user.decorator';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
 constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}
 
 public async create(dto: UserDTO): Promise<UserDTO> {
  // console.log('dto passed into user service', dto);
  const entity = UserDTO.toEntity(dto);
  // console.log('dto entity service', entity);
  return await this.repo.save(entity)
   .then(e => UserDTO.fromEntity(e));
 }

 public async findAll(): Promise<UserDTO[]> {
  return await this.repo.find()
   .then(users => users.map(e => UserDTO.fromEntity(e)));
   // return `This action returns all users`;
 }

 public async findOne(id: string): Promise<UserDTO>  {
  return await this.repo.find({ where: { id: id }})
   .then(users => users.map(e => UserDTO.fromEntity(e))[0]);
 }

 // update(id: number, updateUserDto: UpdateUserDto) {
 //   return `This action updates a #${id} user`;
 // }

 public async remove(id: string) {
  return await this.repo.delete(id);
 }
}
