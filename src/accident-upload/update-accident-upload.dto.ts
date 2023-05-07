import { PartialType } from '@nestjs/mapped-types';
import { CreateAccidentUploadDto } from './create-accident-upload.dto';

export class UpdateAccidentUploadDto extends PartialType(CreateAccidentUploadDto) {}
