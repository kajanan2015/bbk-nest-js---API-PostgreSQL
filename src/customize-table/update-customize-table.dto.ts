import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomizeTableDto } from './create-customize-table.dto';

export class UpdateCustomizeTableDto extends PartialType(CreateCustomizeTableDto) {}
