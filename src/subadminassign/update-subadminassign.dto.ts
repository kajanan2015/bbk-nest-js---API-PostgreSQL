import { PartialType } from '@nestjs/mapped-types';
import { CreateSubadminassignDto } from './create-subadminassign.dto';

export class UpdateSubadminassignDto extends PartialType(CreateSubadminassignDto) {}
