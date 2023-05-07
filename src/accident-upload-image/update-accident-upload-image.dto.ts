import { PartialType } from '@nestjs/mapped-types';
import { CreateAccidentUploadImageDto } from './create-accident-upload-image.dto';

export class UpdateAccidentUploadImageDto extends PartialType(CreateAccidentUploadImageDto) {}
