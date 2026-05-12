import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNumber()
  @IsNotEmpty()
  age!: number;
  
  @IsString()
  @IsNotEmpty()
  telefono!: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  id!: number;

}
