import { PartialType } from '@nestjs/mapped-types';
import { CreateAccidentUploadThirdPartyDto } from './create-accident-upload-third-party.dto';

export class UpdateAccidentUploadThirdPartyDto extends PartialType(CreateAccidentUploadThirdPartyDto) {}
