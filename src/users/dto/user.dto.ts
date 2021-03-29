import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { IsEmail, IsNotEmpty, IsString, IsDefined, IsArray, ValidateNested, IsOptional, IsEnum, IsBoolean, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { ConsentType, User } from '../entities/user.entity';
// mport { User } from '../decorators/user.decorator';

export class Consent {
 @IsDefined()
 @IsEnum(ConsentType)
	id: ConsentType;

 @IsDefined()
 @IsBoolean()
 enabled: boolean;
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
	@Type(() => Consent)
	@IsOptional()
 consents?: Consent[]

 public static from(dto: Partial<UserDTO>) {
  const usr = new UserDTO();
  usr.id = dto.id;
  usr.email = dto.email;
  usr.consents = dto.consents;
  return usr;
 }

 public static fromEntity(entity: User) {
  return this.from({
   id: entity.id,
   email: entity.email,
   consents: entity.consents ? entity.consents : []
  });
 }

 public static toEntity(dto: Partial<UserDTO>) {
  const usr = new User();
  usr.id = uuidv4();
  usr.email = dto.email;
  usr.consents = dto.consents ? dto.consents : [];
  usr.createDateTime = new Date();
  usr.createdBy = usr.id ? usr.id : null;
  usr.lastChangedBy = usr.id ? usr.id : null;
  return usr;
 }

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
