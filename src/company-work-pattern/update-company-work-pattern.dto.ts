import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyWorkPatternDto } from './create-company-work-pattern.dto';

export class UpdateCompanyWorkPatternDto extends PartialType(CreateCompanyWorkPatternDto) {}
