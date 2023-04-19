import { Module } from '@nestjs/common';
import { MobileAccidentImageService } from './mobile-accident-image.service';
import { MobileAccidentImageController } from './mobile-accident-image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MobileAccidentImage } from './mobile-accident-image.entity';
@Module({
  imports:[TypeOrmModule.forFeature([MobileAccidentImage])],
  controllers: [MobileAccidentImageController],
  providers: [MobileAccidentImageService]
})
export class MobileAccidentImageModule {}
