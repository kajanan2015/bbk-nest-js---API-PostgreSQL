import { Module } from '@nestjs/common';
import { JobTypeService } from './job-type.service';
import { JobTypeController } from './job-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobType } from './job-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobType])],
  controllers: [JobTypeController],
  providers: [JobTypeService]
})
export class JobTypeModule {}
