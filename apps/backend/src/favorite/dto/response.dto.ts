import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { CreateFavoriteDto } from './create.dto';

export class ResponseFavoriteDto extends CreateFavoriteDto {
  @ApiProperty({ example: randomUUID(), description: 'Unique favorite id.' })
  id: string;
}
