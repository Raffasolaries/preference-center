import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventDTO } from './dto/event.dto';
// import { UpdateEventDto } from './dto/update-event.dto';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
 constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

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
   return await this.repo.update(dto.user.id, { consents: [...dto.consents] });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} event`;
  // }
}
