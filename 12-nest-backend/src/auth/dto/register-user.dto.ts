import { IsString, MinLength, IsEmail } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @MinLength(6)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
