import { PartialType } from '@nestjs/mapped-types';
import { CreateSystemCodeDto } from './create-system-code.dto';

export class UpdateSystemCodeDto extends PartialType(CreateSystemCodeDto) {}
