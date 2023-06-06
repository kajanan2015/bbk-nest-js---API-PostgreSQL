import { PartialType } from '@nestjs/mapped-types';
import { CreateCreatemoduleDto } from './create-createmodule.dto';

export class UpdateCreatemoduleDto extends PartialType(CreateCreatemoduleDto) {}
