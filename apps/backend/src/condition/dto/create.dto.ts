import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyString } from '../../validators/IsNotEmptyString';

export class CreateConditionDto {
  @ApiProperty({ example: 'Asthma', description: 'Unique condtion name.' })
  @IsNotEmptyString()
  readonly name: string;
}
