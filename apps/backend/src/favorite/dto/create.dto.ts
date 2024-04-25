import { IsNotEmptyString } from '../../validators/IsNotEmptyString';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty({ description: 'The ID of the doctor', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @IsNotEmptyString()
  readonly doctorId: string;

  @ApiProperty({ description: 'The ID of the patient', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @IsNotEmptyString()
  readonly patientId: string;
}
