import { IsEmail, IsNotEmpty, IsString, IsDefined, IsArray, ValidateNested, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export enum ConsentType {
 email_notification = 'email_notification',
 sms_notification = 'sms_notification'
}

export class Consent {
 @IsDefined()
 @IsEnum(ConsentType)
	id: string;

 @IsDefined()
 @IsBoolean()
 enabled: boolean;
}

export class CreateEventDto {
 @IsDefined()
 @IsString()
 user: string;

 @ValidateNested({ each: true })
	@Type(() => Consent)
	@IsOptional()
 consents: Consent[] 
}
