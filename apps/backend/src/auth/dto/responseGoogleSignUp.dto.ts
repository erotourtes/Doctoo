import { OmitType } from '@nestjs/swagger';
import { ResponseWithoutRelationsUserDto } from '../../user/dto/responseWithoutRelations';

// TODO: Should we just return user object?
export class ResponseAuthSignUpUserDto extends OmitType(ResponseWithoutRelationsUserDto, ['googleId']) {}
