import { IsString } from 'class-validator';
import { AdressDto } from '../../Adress.dto';

export class CreateHospitalDto {
  @IsString()
  readonly name: string;

  readonly adress: AdressDto;
}
