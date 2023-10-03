import { PartialType } from '@nestjs/mapped-types';
import { CreateModuledetailsofpackageDto } from './create-moduledetailsofpackage.dto';

export class UpdateModuledetailsofpackageDto extends PartialType(CreateModuledetailsofpackageDto) {}
