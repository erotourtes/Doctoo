import { IsOptional, IsString } from 'class-validator';

export class UpdateSpecializationDto {
  @IsOptional()
  @IsString({ message: 'name should be a string' })
  readonly name: string;
}
