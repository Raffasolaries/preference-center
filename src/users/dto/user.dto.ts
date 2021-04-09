import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { IsEmail, IsNotEmpty, IsString, IsDefined, IsArray, ValidateNested, IsOptional, IsEnum, IsBoolean, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from '../entities/user.entity';
import { Consent } from '../../events/entities/event.entity';
import { ConsentDTO } from '../../events/dto/event.dto';

export class SimplifiedUserDTO implements Readonly<SimplifiedUserDTO> {
 @IsUUID()
 @IsNotEmpty()
 id: string;
}

export class UserDTO implements Readonly<UserDTO> {
 @ApiProperty({ required: false })
 @IsUUID()
 @IsOptional()
 id?: string;

 @ApiProperty({ required: true })
 @IsEmail()
 @IsNotEmpty()
 email: string;

 @ApiProperty({ required: false })
 @IsArray()
 @ValidateNested({ each: true })
	@Type(() => ConsentDTO)
	@IsOptional()
 consents?: ConsentDTO[];

 public static from(dto: Partial<UserDTO>) {
  const usr = new UserDTO();
  usr.id = dto.id;
  usr.email = dto.email;
  usr.consents = dto.consents;
  return usr;
 }

 public static fromEntity(entity: User) {
  // console.log('arrived user entity', entity);
  return this.from({
   id: entity.id,
   email: entity.email,
   consents: entity.consents ? entity.consents.map(consent => { return { id: consent.name, enabled: consent.isActive } }) : []
  });
 }

 public static toEntity(dto: Partial<UserDTO>) {
  const usr = new User();
  let newUserId = uuidv4();
  usr.id = newUserId;
  usr.email = dto.email;
  usr.consents = dto.consents ? dto.consents.map(consent => {
   let cons = new Consent();
   cons.name =  consent.id;
   cons.userId = newUserId;
   cons.isActive = consent.enabled;
   cons.createDateTime = new Date();
   cons.createdBy = newUserId;
   cons.lastChangedBy = newUserId;
   return cons;
  }) : [];
   //return { name: consent.id, isActive: consent.enabled, user: usr.id, createDateTime: new Date(), createdBy: usr.id, lastChangedBy: usr.id, lastChangedDateTime: new Date(), id: uuidv4(), isArchived: false, internalComment: null } }) : [];
  usr.createDateTime = new Date();
  usr.createdBy = usr.id ? usr.id : null;
  usr.lastChangedBy = usr.id ? usr.id : null;
  // console.log('created user', usr);
  return usr;
 }

 // public static fromRepoToEntity(queryResult) {
 //  const usr = new User();
 //  usr.id = queryResult[0].id;
 //  usr.isActive = queryResult[0].isActive;
 //  usr.isArchived = queryResult[0].isArchived;
 //  usr.createDateTime = queryResult[0].createDateTime;
 //  return usr;
 // }

 // public toEntity(user: User = null) {
 //  const usr = new User();
 //  usr.email = this.email;
 //  usr.consents = this.consents;
 //  usr.createDateTime = new Date();
 //  usr.createdBy = usr.id ? usr.id : null;
 //  usr.lastChangedBy = usr.id ? usr.id : null;
 //  return usr;
 // }
}
