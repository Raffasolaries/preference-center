import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsDefined, IsArray, ValidateNested, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { User, ConsentType } from '../entities/user.entity';

class Consent {
 @IsDefined()
 @IsEnum(ConsentType)
	id: ConsentType;

 @IsDefined()
 @IsBoolean()
 enabled: boolean;
}

export class UserDTO implements Readonly<UserDTO> {
 // @ApiModelProperty({ required: true })
 // @IsUUID()
 // id: string;

 @ApiProperty({ required: true })
 @IsEmail()
 @IsNotEmpty()
 email: string;

 @ApiProperty({ required: true })
 @IsArray()
 @ValidateNested({ each: true })
	@Type(() => Consent)
	@IsOptional()
 consents?: Consent[]

 public static from(dto: Partial<UserDTO>) {
  const usr = new UserDTO();
  usr.email = dto.email;
  usr.consents = dto.consents;
  return usr;
 }

 public static fromEntity(entity: User) {
  return this.from({
   email: entity.email,
   consents: entity.consents
  });
 }

 public toEntity(user: User = null) {
  const usr = new User();
  usr.email = this.email;
  usr.consents = this.consents;
  usr.createDateTime = new Date();
  usr.createdBy = user ? user.id : null;
  usr.lastChangedBy = user ? user.id : null;
  return usr;
 }
}
