import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDataHistoryDto } from './create-employee-data-history.dto';

export class UpdateEmployeeDataHistoryDto extends PartialType(CreateEmployeeDataHistoryDto) {}
