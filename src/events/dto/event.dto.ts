import { IsEmail, IsNotEmpty, IsString, IsDefined, IsArray, ValidateNested, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { Event } from '../entities/event.entity';
import { Consent, UserDTO } from '../../users/dto/user.dto';
import { User } from '../../users/entities/user.entity';

export class EventDTO {
 @IsDefined()
 @ValidateNested({ each: true })
	@Type(() => UserDTO)
 user: UserDTO;

 @ValidateNested({ each: true })
	@Type(() => Consent)
	@IsOptional()
 consents: Consent[];

 public static from(dto: Partial<EventDTO>) {
  const event = new EventDTO();
  event.user = dto.user;
  event.consents = dto.consents;
  return event;
 }

 public static fromEntity(entity: Event) {
  return this.from({
   user: entity.user,
   consents: entity.consents ? entity.consents : []
  });
 }

 // public static toEntity(dto: Partial<EventDTO>) {
 //  const usr = new User();
 //  usr.email = dto.email;
 //  usr.consents = dto.consents;
 //  usr.createDateTime = new Date();
 //  usr.createdBy = usr.id ? usr.id : null;
 //  usr.lastChangedBy = usr.id ? usr.id : null;
 //  return usr;
 // }
}
