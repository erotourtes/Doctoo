import { IsNotEmptyString } from '../../validators/IsNotEmptyString';

export class CreateFavoriteDto {
  @IsNotEmptyString()
  readonly doctorId: string;

  @IsNotEmptyString()
  readonly patientId: string;
}
