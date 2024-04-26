import { IsString } from 'class-validator';

export class CreatePatientConditionDto {
  @IsString()
  readonly allergyId: string;
}
