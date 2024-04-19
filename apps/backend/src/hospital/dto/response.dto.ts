import { AdressDto } from '../../Adress.dto';

export class ResponseHospitalDto extends AdressDto {
  readonly id: string;
  readonly name: string;
}
