import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFhirDto {
  @IsNotEmpty()
  @IsString()
  serverUrl: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}
