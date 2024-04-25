import { IsString } from 'class-validator';

export class CreateAllergyDto {
  @IsString()
  readonly name: string;
}
