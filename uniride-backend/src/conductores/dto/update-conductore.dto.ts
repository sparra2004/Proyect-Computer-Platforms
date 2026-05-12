import { PartialType } from '@nestjs/mapped-types';
import { CreateConductorDto } from './create-conductore.dto';


export class UpdateConductoreDto extends PartialType(CreateConductorDto) {}
