import { PartialType } from '@nestjs/mapped-types';
import { CreateSubCompanyDto } from './create-sub-company.dto';

export class UpdateSubCompanyDto extends PartialType(CreateSubCompanyDto) {}
