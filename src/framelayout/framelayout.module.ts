import { Module } from '@nestjs/common';
import { FramelayoutService } from './framelayout.service';
import { FramelayoutController } from './framelayout.controller';

@Module({
  controllers: [FramelayoutController],
  providers: [FramelayoutService]
})
export class FramelayoutModule {}
