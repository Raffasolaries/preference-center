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
   console.log('starting find it');
   const user = await this.usersRepo.find({ where: { id: dto.user.id }});
   if (user.length === 0) {
    throw new BadRequestException('Invalid user');
   }
   const found = await this.consentsRepo.find({ where: { userId: dto.user.id }, relations: ["user"] });
   console.log('data', {
    foundConsents: found,
    user: user,
    dto: dto
   });
   return found;
   let updates = {};
   if (found.length === 0) {
    const entities = EventDTO.toEntity(dto);
    console.log('entities built', entities);
    for (let entity of entities) {
     updates = await this.consentsRepo.save(entity);
     console.log(updates);
    }
    return updates;
   } else { 
    // you can't have the same on same user
   }
   
   return;
   // const foundConsents = [];
   // let foundEmailNotificationsConsent = found[0].consents && found[0].consents.length > 0 ? found[0].consents.filter(consent => consent.id === 'email_notifications') : [];
   // let foundSmsNotificationsConsent = found[0].consents && found[0].consents.length > 0 ? found[0].consents.filter(consent => consent.id === 'sms_notifications') : [];
   // let newEmailNotificationsConsent = dto.consents && dto.consents.length > 0 ? dto.consents.filter(consent => consent.id === 'email_notifications') : [];
   // let newSmsNotificationsConsent = dto.consents && dto.consents.length > 0 ? dto.consents.filter(consent => consent.id === 'sms_notifications') : [];
   // const newConsents = [];
   // if (foundEmailNotificationsConsent.length > 0 && newEmailNotificationsConsent.length > 0) {
   //  newConsents.push(newEmailNotificationsConsent[0]);
   // }
   // if (foundEmailNotificationsConsent.length > 0 && newEmailNotificationsConsent.length === 0) {
   //  newConsents.push(foundEmailNotificationsConsent[0]);
   // } 
   // if (foundSmsNotificationsConsent.length > 0 && newSmsNotificationsConsent.length > 0) {
   //  newConsents.push(newSmsNotificationsConsent[0]);
   // } 
   // if (foundSmsNotificationsConsent.length > 0 && newSmsNotificationsConsent.length === 0) {
   //  newConsents.push(foundSmsNotificationsConsent[0]);
   // }
   // if (foundEmailNotificationsConsent.length === 0 && newEmailNotificationsConsent.length > 0) {
   //  newConsents.push(newEmailNotificationsConsent[0]);
   // }
   // if (foundSmsNotificationsConsent.length === 0 && newSmsNotificationsConsent.length > 0) {
   //  newConsents.push(newSmsNotificationsConsent[0]);
   // }
   // // console.log('newConsents', newConsents);
   // return await this.repo.update(dto.user.id, { consents: newConsents });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} event`;
  // }
}
