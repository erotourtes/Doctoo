import { ApiProperty } from '@nestjs/swagger';

export class NotFoundResponse {
  @ApiProperty({
    description: 'The error message associated with the response.',
    example: 'User not found',
  })
  message: string | string[];

  @ApiProperty({
    description: 'The error code or status of the response.',
    example: 404,
  })
  errorCode: number;
}

export class BadRequestResponse {
  @ApiProperty({
    description: 'The error message associated with the response.',
    example: 'Invalid request',
  })
  message: string | string[];

  @ApiProperty({
    description: 'The error code or status of the response.',
    example: 400,
  })
  errorCode: number;
}

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