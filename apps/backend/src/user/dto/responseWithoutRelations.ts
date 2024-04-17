import { OmitType } from '@nestjs/swagger';
import { ResponseUserDto } from './response.dto';

export class ResponseWithoutRelationsUserDto extends OmitType(ResponseUserDto, ['doctors', 'patients']) {}
