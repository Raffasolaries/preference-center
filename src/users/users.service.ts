import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './dto/user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from './decorators/user.decorator';
import { Consent } from '../events/entities/event.entity';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
 constructor(
  @InjectRepository(Consent) private readonly consentsRepo: Repository<Consent>,
  @InjectRepository(User) private readonly usersRepo: Repository<User>
 ) {}
 
 public async create(dto: UserDTO): Promise<UserDTO> {
  // console.log('dto passed into user service', dto);
  const entity = UserDTO.toEntity(dto);
  console.log('dto entity service', entity);
  return await this.usersRepo.save(entity).then(e => UserDTO.fromEntity(e));
  //  .then(async e => {
  //   await this.consentsRepo.save(entity.consents);
  //   return UserDTO.fromEntity(e);
  // });
 }

 public async findAll(): Promise<UserDTO[]> {
  return await this.usersRepo.find({ relations: ["consents"] })
   .then(users => users.map(e => UserDTO.fromEntity(e)));
   // return `This action returns all users`;
 }

 public async findOne(id: string): Promise<UserDTO>  {
  return await this.usersRepo.find({ where: { id: id }, relations: ["consents"] })
   .then(users => users.map(e => UserDTO.fromEntity(e))[0]);
 }

 // update(id: number, updateUserDto: UpdateUserDto) {
 //   return `This action updates a #${id} user`;
 // }

 public async remove(id: string) {
  return await this.usersRepo.delete(id);
 }
}
