import { IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsOptional()
  @MaxLength(2000)
  text?: string;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  rate: number;
}
