import { IsEmail, IsNotEmpty, IsString, IsDefined, IsArray, ValidateNested, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

enum ConsentType {
 email_notification = 'email_notification',
 sms_notification = 'sms_notification'
}

class Consent {
 @IsDefined()
 @IsEnum(ConsentType)
	id: string;

 @IsDefined()
 @IsBoolean()
 enabled: boolean;
}

export class CreateUserDto {
 @IsEmail()
 @IsNotEmpty()
 email: string;

 @IsArray()
 @ValidateNested({ each: true })
	@Type(() => Consent)
	@IsOptional()
 consents?: Consent[]
}
