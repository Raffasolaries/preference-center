import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventDTO } from './dto/event.dto';
// import { UserDTO } from '../users/dto/user.dto';
// import { UpdateEventDto } from './dto/update-event.dto';
import { User } from '../users/entities/user.entity';
import { Consent } from '../events/entities/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
 constructor(
  @InjectRepository(Consent) private readonly consentsRepo: Repository<Consent>,
  @InjectRepository(User) private readonly usersRepo: Repository<User>
 ) {}

  // public async findAll() {
  //   return await this.repo.find();
  // }
  // create(createEventDto: CreateEventDto) {
  //   return 'This action adds a new event';
  // }

  // findAll() {
  //   return `This action returns all events`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} event`;
  // }

  public async update(dto: EventDTO) {
   // console.log('starting find it');
   const user = await this.usersRepo.find({ where: { id: dto.user.id }});
   if (user.length === 0) {
    throw new BadRequestException('Invalid user');
   }
   const entities = EventDTO.toEntity(dto);
   // console.log('entities built', entities);
   return await this.consentsRepo.save(entities)
    .then(e => EventDTO.fromEntities(e, dto.user.id));
  }

  // remove(id: number) {
  //   return `This action removes a #${id} event`;
  // }
}
