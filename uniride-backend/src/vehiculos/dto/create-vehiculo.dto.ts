import { IsBoolean, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateVehiculoDto {

  @IsString()
  @IsNotEmpty()
  placa!: string;

  @IsString()
  @IsNotEmpty()
  modelo!: string;

  @IsBoolean()
  @IsNotEmpty()
  tarjetaDePropiedad!: boolean;

  @IsBoolean()
  @IsNotEmpty()
  soat!: boolean;

  @IsString()
  @IsNotEmpty()
  color!: string;

  @IsNumber()
  @IsNotEmpty()
  conductor_id!: number;

}
