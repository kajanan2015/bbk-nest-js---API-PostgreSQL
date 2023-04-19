import { Module } from '@nestjs/common';
import { MobileAccidentImageService } from './mobile-accident-image.service';
import { MobileAccidentImageController } from './mobile-accident-image.controller';

@Module({
  controllers: [MobileAccidentImageController],
  providers: [MobileAccidentImageService]
})
export class MobileAccidentImageModule {}
