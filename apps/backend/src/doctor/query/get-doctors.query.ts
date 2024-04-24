import { IsOptional, IsUUID } from 'class-validator';

export class GetDoctorsQuery {
  @IsOptional()
  @IsUUID(4, { message: 'hospitalId should be a UUID' })
  readonly hospitalId?: string;

  @IsOptional()
  @IsUUID(4, { message: 'specializationId should be a UUID' })
  readonly specializationId?: string;

  @IsOptional()
  readonly search?: string;
}
