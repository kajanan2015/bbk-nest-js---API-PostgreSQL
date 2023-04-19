import { Module } from '@nestjs/common';
import { SubadminassignService } from './subadminassign.service';
import { SubadminassignController } from './subadminassign.controller';

@Module({
  controllers: [SubadminassignController],
  providers: [SubadminassignService]
})
export class SubadminassignModule {}
