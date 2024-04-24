import { IsString } from 'class-validator';

export class ResponseCondtionDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;
}
