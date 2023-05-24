import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeModuleDto } from './create-employee-module.dto';

export class UpdateEmployeeModuleDto extends PartialType(CreateEmployeeModuleDto) {}
