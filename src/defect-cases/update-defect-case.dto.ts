import { PartialType } from '@nestjs/mapped-types';
import { CreateDefectCaseDto } from './create-defect-case.dto';

export class UpdateDefectCaseDto extends PartialType(CreateDefectCaseDto) {}
