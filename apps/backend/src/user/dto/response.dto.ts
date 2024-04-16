export class ResponseUserDto {
  readonly id: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly phone: string;
  readonly email: string;
  readonly email_verified: boolean;
  readonly password: string;
  readonly gogole_id: string;
  readonly avatar_key: string;
  readonly doctors: string[]; // TODO: Use Doctor dto
  readonly patients: string[]; // TODO: use Patient dto
}
