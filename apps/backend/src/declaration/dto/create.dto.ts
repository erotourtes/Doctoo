import { IsNotEmpty } from 'class-validator';

export class CreateDeclarationDto {
  @IsNotEmpty()
  readonly doctorId: string;

  @IsNotEmpty()
  readonly patientId: string;
}
