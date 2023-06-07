import { IsString, IsEmail, MinLength, MaxLength, Matches } from 'class-validator';


export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;
  
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password must have a Upercase, lowercase letter and number' })
  password: string;
  
  @IsString()
  @MinLength(1)
  fullName: string;
}