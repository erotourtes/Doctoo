import { IsString } from 'class-validator';

export class CreateConditionDto {
  @IsString()
  readonly name: string;
}
