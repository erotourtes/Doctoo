import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

const EXAMPLE_FILE_NAME = `${randomUUID()}.png`;

export class ResponseFileDto {
  @ApiProperty({ example: EXAMPLE_FILE_NAME, description: 'File Name.' })
  name: string;

  @ApiProperty({
    example: `https://storage.googleapis.com/bucket/${EXAMPLE_FILE_NAME}`,
    description: 'Full link in the S3 storage to get the file.',
  })
  url: string;
}
