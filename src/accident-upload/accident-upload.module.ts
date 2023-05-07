import { Module } from '@nestjs/common';
import { AccidentUploadService } from './accident-upload.service';
import { AccidentUploadController } from './accident-upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccidentUpload } from './accident-upload.entity';
import { AccidentUploadImage } from 'src/accident-upload-image/accident-upload-image.entity';
import { AccidentUploadThirdParty } from 'src/accident-upload-third-party/accident-upload-third-party.entity';
@Module({
  imports:[TypeOrmModule.forFeature([AccidentUpload,AccidentUploadImage,AccidentUploadThirdParty])],
  controllers: [AccidentUploadController],
  providers: [AccidentUploadService]
})
export class AccidentUploadModule {}
