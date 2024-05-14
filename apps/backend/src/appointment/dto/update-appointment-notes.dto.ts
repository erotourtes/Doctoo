import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyString } from '../../validators/IsNotEmptyString';

export class UpdateAppointmentNotesDto {
  @IsNotEmptyString()
  @ApiProperty({ description: 'Clinical notes about the appointment.' })
  readonly notes: string;
}
