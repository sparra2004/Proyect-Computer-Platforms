import { IsBoolean, isNotEmpty, IsNotEmpty, IsNumber, IsString, IsEmail } from 'class-validator';

export class CreateConductorDto {

  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;
  
  @IsString()
  @IsNotEmpty()
  telefono!: string;

  @IsBoolean()
  @IsNotEmpty()
  licencia!: boolean;

  

}