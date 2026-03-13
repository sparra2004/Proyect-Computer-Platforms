import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateConductorDto {

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