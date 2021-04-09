import { IsEmail, IsNotEmpty, IsString, IsDefined, IsArray, ValidateNested, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { Consent, ConsentType } from '../entities/event.entity';
import { UserDTO, SimplifiedUserDTO } from '../../users/dto/user.dto';

export class ConsentDTO implements Readonly<ConsentDTO> {
 @IsDefined()
 @IsEnum(ConsentType)
 id: ConsentType;

 @IsDefined()
 @IsBoolean()
 enabled: boolean;
}

export class EventDTO implements Readonly<EventDTO> {
 @IsDefined()
 @ValidateNested({ each: true })
	@Type(() => SimplifiedUserDTO)
 user: SimplifiedUserDTO;

 @ValidateNested({ each: true })
	@Type(() => ConsentDTO)
	@IsOptional()
 consents: ConsentDTO[];

 public static from(dto: Partial<EventDTO>) {
  const event = new EventDTO();
  event.user = dto.user;
  event.consents = dto.consents;
  return event;
 }

 public static fromEntities(entites: Consent[], userId) {
  let updatedConsents = entites.map(entity => {
   return {
    id: entity.name,
    enabled: entity.isActive
   }
  });
  return {
   user: {
    id: userId
   },
   updatedConsents: updatedConsents
  };
 }

 public static toEntity(dto: Partial<EventDTO>) {
  const consents = [];
  let cons;
  for (let consent of dto.consents) {
   cons = new Consent();
   cons.name =  consent.id;
   cons.userId = dto.user.id;
   cons.isActive = consent.enabled;
   cons.createDateTime = new Date();
   cons.createdBy = dto.user.id ? dto.user.id : null;
   cons.lastChangedBy = dto.user.id ? dto.user.id : null;
   consents.push(cons);
  }
  return consents;
 }
}
