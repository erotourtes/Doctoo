import { ApiProperty } from '@nestjs/swagger';

export class ResponsePatientAllergyDto {
  @ApiProperty({ description: 'The ID of the patient allergy' })
  readonly id: string;

  @ApiProperty({ description: 'The ID of the patient associated with the patient allergy' })
  readonly patientId: string;

  @ApiProperty({ description: 'The ID of the allergy associated with the patient allergy' })
  readonly allergyId: string;
}
