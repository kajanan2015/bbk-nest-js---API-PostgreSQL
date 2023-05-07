import { PartialType } from '@nestjs/mapped-types';
import { CreateMobileAccidentImageDto } from './create-mobile-accident-image.dto';

export class UpdateMobileAccidentImageDto extends PartialType(CreateMobileAccidentImageDto) {}
