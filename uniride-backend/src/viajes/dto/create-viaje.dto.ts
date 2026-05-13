
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateViajeDto {

  @IsString()
  @IsNotEmpty()
  inicio!: string;

  @IsString()
  @IsNotEmpty()
  final!: string;

  @IsNumber()
  @IsNotEmpty()
  user_id!: number;

  @IsNumber()
  @IsNotEmpty()
  conductor_id!: number;

  @IsString()
  @IsNotEmpty()
  vehiculo_id!: string;

  @IsString()
  @IsNotEmpty()
  fecha!: string;

  @IsString()
  @IsNotEmpty()
  hora!: string;
}
