import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, isBoolean } from 'class-validator';
import { CreatePatientDto } from './create.dto';

class PrePatchPatientDto extends OmitType(CreatePatientDto, ['userId']) {}

export class PatchPatientDto extends PartialType(PrePatchPatientDto) {
  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'The ID of declaration between the patient and the user' })
  readonly declarationId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Identity card key of the patient' })

  readonly identityCardKey: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: 'The email notification toggle of the patient' })
  readonly emailNotificationToggle: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: 'The sms notification toggle of the patient' })
  readonly twoFactorAuthToggle: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: 'The two factor authentication toggle of the patient' })
  readonly requestBillPaymentApproval: boolean;
  
}
