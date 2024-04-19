import { OmitType } from '@nestjs/swagger';
import { ResponseDoctorDto } from './response.dto';

export class PatchDoctorDto extends OmitType(ResponseDoctorDto, ['id', 'userId']) {}
