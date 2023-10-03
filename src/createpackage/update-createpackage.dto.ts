import { PartialType } from '@nestjs/mapped-types';
import { CreateCreatepackageDto } from './create-createpackage.dto';

export class UpdateCreatepackageDto extends PartialType(CreateCreatepackageDto) {}
