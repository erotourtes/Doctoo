import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ClassicNestResponse {
  @ApiProperty({ example: 404, description: 'Error in numeric format.' })
  statusCode: number;

  @ApiProperty({
    description: 'Detailed description of the error.',
    oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
  })
  message: string | string[];

  @ApiPropertyOptional({ example: 'Not Found', description: 'Brief description of the error.' })
  error?: string;
}