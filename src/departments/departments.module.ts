import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { SystemCodeService } from 'src/system-code/system-code.service';
import { SystemCode } from 'src/system-code/system-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department,SystemCode])],
  controllers: [DepartmentsController],
  providers: [DepartmentsService,SystemCodeService]
})
export class DepartmentsModule {}
