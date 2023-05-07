import { Module } from '@nestjs/common';
import { AccidentUploadImageService } from './accident-upload-image.service';
import { AccidentUploadImageController } from './accident-upload-image.controller';
import { AccidentUploadImage } from './accident-upload-image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccidentUpload } from 'src/accident-upload/accident-upload.entity';
@Module({
  imports:[TypeOrmModule.forFeature([AccidentUploadImage,AccidentUpload])],
  controllers: [AccidentUploadImageController],
  providers: [AccidentUploadImageService]
})
export class AccidentUploadImageModule {}
