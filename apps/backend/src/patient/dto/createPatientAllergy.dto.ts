import { IsString } from 'class-validator';

export class CreatePatientAllergyDto {
  @IsString()
  readonly allergyId: string;
}
