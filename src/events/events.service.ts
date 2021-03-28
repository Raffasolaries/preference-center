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
   const found = await this.repo.find({ where: { id: dto.user.id }});
   console.log('found user', found);
   const foundConsents = [];
   let foundEmailNotificationsConsent = found[0].consents && found[0].consents.length > 0 ? found[0].consents.filter(consent => consent.id === 'email_notifications') : [];
   let foundSmsNotificationsConsent = found[0].consents && found[0].consents.length > 0 ? found[0].consents.filter(consent => consent.id === 'sms_notifications') : [];
   let newEmailNotificationsConsent = dto.consents && dto.consents.length > 0 ? dto.consents.filter(consent => consent.id === 'email_notifications') : [];
   let newSmsNotificationsConsent = dto.consents && dto.consents.length > 0 ? dto.consents.filter(consent => consent.id === 'sms_notifications') : [];
   const newConsents = [];
   if (foundEmailNotificationsConsent.length > 0 && newEmailNotificationsConsent.length > 0) {
    newConsents.push(newEmailNotificationsConsent[0]);
   }
   if (foundEmailNotificationsConsent.length > 0 && newEmailNotificationsConsent.length === 0) {
    newConsents.push(foundEmailNotificationsConsent[0]);
   } 
   if (foundSmsNotificationsConsent.length > 0 && newSmsNotificationsConsent.length > 0) {
    newConsents.push(newSmsNotificationsConsent[0]);
   } 
   if (foundSmsNotificationsConsent.length > 0 && newSmsNotificationsConsent.length === 0) {
    newConsents.push(foundSmsNotificationsConsent[0]);
   }
   if (foundEmailNotificationsConsent.length === 0 && newEmailNotificationsConsent.length > 0) {
    newConsents.push(newEmailNotificationsConsent[0]);
   }
   if (foundSmsNotificationsConsent.length === 0 && newSmsNotificationsConsent.length > 0) {
    newConsents.push(newSmsNotificationsConsent[0]);
   }
   console.log('newConsents', newConsents);
   return await this.repo.update(dto.user.id, { consents: newConsents });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} event`;
  // }
}
