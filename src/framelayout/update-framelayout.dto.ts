import { PartialType } from '@nestjs/mapped-types';
import { CreateFramelayoutDto } from './create-framelayout.dto';

export class UpdateFramelayoutDto extends PartialType(CreateFramelayoutDto) {}
