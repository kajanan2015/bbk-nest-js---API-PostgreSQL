import { PartialType } from '@nestjs/mapped-types';
import { CreateDefectCasesResultDto } from './create-defect-cases-result.dto';

export class UpdateDefectCasesResultDto extends PartialType(CreateDefectCasesResultDto) {}
