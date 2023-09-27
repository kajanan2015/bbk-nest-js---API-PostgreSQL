import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDutyTypeDto } from './create-company-duty-type.dto';

export class UpdateCompanyDutyTypeDto extends PartialType(CreateCompanyDutyTypeDto) {}
