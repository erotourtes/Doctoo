import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { randomUUID } from 'crypto';
import { CreatePatientDto } from './create.dto';

export class PatchPatientDto extends PartialType(OmitType(CreatePatientDto, ['userId'])) {
  @ApiProperty({ example: '12234', description: 'Unique declaration id.' })
  @IsOptional()
  @IsNumber()
  readonly declarationId?: string;

  @ApiProperty({ example: randomUUID(), description: 'A unique key to the patient identification file.' })
  @IsOptional()
  @IsUUID(4)
  readonly identityCardKey: string;

  @ApiProperty({ default: false, description: "Status of alerts to the patient's email." })
  @IsOptional()
  @IsBoolean()
  readonly emailNotificationToggle: boolean;

  @ApiProperty({ example: true, description: "Status of alerts on the patient's text messages." })
  @IsOptional()
  @IsBoolean()
  readonly twoFactorAuthToggle: boolean;

  @ApiProperty({ example: false, description: 'Whether to request a two-factor confirmation when making a payment.' })
  @IsOptional()
  @IsBoolean()
  readonly requestBillPaymentApproval: boolean;
}
