import { Module } from '@nestjs/common';
import { AccidentUploadThirdPartyService } from './accident-upload-third-party.service';
import { AccidentUploadThirdPartyController } from './accident-upload-third-party.controller';
import { AccidentUpload } from 'src/accident-upload/accident-upload.entity';
import { AccidentUploadThirdParty } from './accident-upload-third-party.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([AccidentUploadThirdParty,AccidentUpload])],
  controllers: [AccidentUploadThirdPartyController],
  providers: [AccidentUploadThirdPartyService]
})
export class AccidentUploadThirdPartyModule {}
