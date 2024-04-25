import { ApiProperty } from '@nestjs/swagger';

export class ResponsePatientConditionDto {
  @ApiProperty({ description: 'The ID of the patient condition' })
  readonly id: string;

  @ApiProperty({ description: 'The ID of the patient' })
  readonly patientId: string;

  @ApiProperty({ description: 'The ID of the condition' })
  readonly conditionId: string;
}
