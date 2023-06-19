import { Module } from '@nestjs/common';
import { EmployeeDataHistoryService } from './employee-data-history.service';
import { EmployeeDataHistoryController } from './employee-data-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeDataHistory } from './employee-data-history.entity';

@Module({
  imports:[TypeOrmModule.forFeature([EmployeeDataHistory])],
  controllers: [EmployeeDataHistoryController],
  providers: [EmployeeDataHistoryService]
})
export class EmployeeDataHistoryModule {}
