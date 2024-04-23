import { IsOptional, IsUUID } from 'class-validator';

export class GetDoctorsQuery {
  @IsOptional()
  @IsUUID(4, { message: 'hospitalId should be a UUID' })
  readonly hospitalId?: string;

  @IsOptional()
  readonly search?: string;
}
