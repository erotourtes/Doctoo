import { IsString, IsInt, Min, Max, MaxLength, IsOptional } from 'class-validator';

export class PatchReviewDto {
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  text?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  rate?: number;
}
