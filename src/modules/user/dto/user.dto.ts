import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Length(8, 24)
  readonly password: string;

  @IsNotEmpty()
  @Length(8, 24)
  readonly confirmPassword: string;
}
