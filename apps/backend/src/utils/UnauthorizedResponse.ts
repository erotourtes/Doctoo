import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedResponse {
  @ApiProperty({
    description: 'The error message associated with the response.',
    example: 'Unauthorized access',
  })
  message: string | string[];

  @ApiProperty({
    description: 'The error code or status of the response.',
    example: 401,
  })
  errorCode: number;
}
