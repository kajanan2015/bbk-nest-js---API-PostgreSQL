import { Module } from '@nestjs/common';
import { MobileAccidentImageService } from './mobile-accident-image.service';
import { MobileAccidentImageController } from './mobile-accident-image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bodymark } from './mobile-accident-image.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
@Module({
  imports:[TypeOrmModule.forFeature([Bodymark])],
  controllers: [MobileAccidentImageController],
  providers: [MobileAccidentImageService,ImageUploadService]
})
export class MobileAccidentImageModule {}
