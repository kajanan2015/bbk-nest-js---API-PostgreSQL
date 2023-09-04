import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyWiseThemeCustomizeDto } from './create-company-wise-theme-customize.dto';

export class UpdateCompanyWiseThemeCustomizeDto extends PartialType(CreateCompanyWiseThemeCustomizeDto) {}
