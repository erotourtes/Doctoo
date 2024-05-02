import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

export class ResponseDoctorScheduleDto {
  @ApiProperty({ example: 9, description: 'Hour in UTC the doctor starts working from' })
  readonly startsWorkHourUTC: number;

  @ApiProperty({ example: 20, description: 'Hour in UTC the doctor works until' })
  readonly endsWorkHour: number;

  @Expose()
  @Transform(({ obj }) => obj.doctor?.appointments?.map(app => app.startedAt))
  @ApiPropertyOptional({
    required: false,
    example: ['2024-05-02T12:00:00.000Z'],
    description: 'Time slots in from of UTC time strings of slots that are not available to book',
  })
  readonly unavailableTimeSlotsUTC?: string[];

  @Exclude()
  readonly doctor: any;
}
