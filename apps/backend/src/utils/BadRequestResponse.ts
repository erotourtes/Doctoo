import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ClassicNestResponse } from './ClassicNestResponse';

class ErrorObject {
  @ApiProperty({ example: 'name', description: 'Property name' })
  proparty: string;

  @ApiProperty({ example: 'Name is too short', description: 'Detailed error message' })
  message: string;
}

export class BadRequestResponse extends OmitType(ClassicNestResponse, ['error']) {
  @ApiProperty({ type: ErrorObject, isArray: true, description: 'List of errors' })
  errors: ErrorObject[];
}
