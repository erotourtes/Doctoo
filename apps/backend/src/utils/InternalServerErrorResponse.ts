import { ApiProperty } from '@nestjs/swagger';

export class InternalServerErrorResponse {
  @ApiProperty({
    description: 'The error message associated with the response.',
    example: 'Internal server error',
  })
  message: string | string[];

  @ApiProperty({
    description: 'The error code or status of the response.',
    example: 500,
  })
  errorCode: number;
}
