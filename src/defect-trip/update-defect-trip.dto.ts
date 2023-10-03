import { PartialType } from '@nestjs/mapped-types';
import { CreateDefectTripDto } from './create-defect-trip.dto';

export class UpdateDefectTripDto extends PartialType(CreateDefectTripDto) {}
