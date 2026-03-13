
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

  @IsNumber()
  @IsNotEmpty()
  vehiculo_id!: number;

}
