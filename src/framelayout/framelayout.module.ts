import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FramelayoutService } from './framelayout.service';
import { FramelayoutController } from './framelayout.controller';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { Framelayout } from './framelayout.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Framelayout])],
  controllers: [FramelayoutController],
  providers: [FramelayoutService, ImageUploadService]
})
export class FramelayoutModule {}
