import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyvehicleDto } from './create-companyvehicle.dto';

export class UpdateCompanyvehicleDto extends PartialType(CreateCompanyvehicleDto) {}
