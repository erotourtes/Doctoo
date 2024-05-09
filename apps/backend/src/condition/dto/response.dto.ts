import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyString } from '../../validators/IsNotEmptyString';

export class ResponseCondtionDto {
  @ApiProperty({ example: 'f95dad68-4d01-4e9e-b944-6a45ec494502', description: 'Unique condition id.' })
  @IsNotEmptyString()
  readonly id: string;

  @ApiProperty({ example: 'Asthma', description: 'Unique condtion name.' })
  @IsNotEmptyString()
  readonly name: string;
}
