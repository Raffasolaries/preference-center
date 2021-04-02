import { IsEmail, IsNotEmpty, IsString, IsDefined, IsArray, ValidateNested, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { Consent } from '../entities/event.entity';
import { UserDTO } from '../../users/dto/user.dto';
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

 public static fromEntity(entity: User) {
  return this.from({
   user: entity,
   consents: entity.consents ? entity.consents : []
  });
 }

 public static toEntity(dto: Partial<EventDTO>) {
  const consents = [];
  let cons;
  for (let consent of dto.consents) {
   if (consent['enabled']) {
    cons = new Consent();
    cons.id =  consent.id;
    cons.user = dto.user.id;
    cons.createDateTime = new Date();
    cons.createdBy = dto.user.id ? dto.user.id : null;
    cons.lastChangedBy = dto.user.id ? dto.user.id : null;
    consents.push(cons);
   }
  }
  return consents;
 }
}
