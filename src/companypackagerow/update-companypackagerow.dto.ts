import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanypackagerowDto } from './create-companypackagerow.dto';

export class UpdateCompanypackagerowDto extends PartialType(CreateCompanypackagerowDto) {}
