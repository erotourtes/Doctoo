import { ApiProperty } from '@nestjs/swagger';
import { CreateDeclarationDto } from './create.dto';

export class ResponseDeclarationDto extends CreateDeclarationDto {
  @ApiProperty({ example: 123, description: 'A unique id in the database.' })
  readonly id: number;
}
