import { IsString } from 'class-validator';

export class CreateSpecializationDto {
  @IsString({ message: 'name should be a string' })
  readonly name: string;
}
