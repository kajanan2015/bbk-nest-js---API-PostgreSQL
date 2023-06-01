import { Module } from '@nestjs/common';
import { EmployeeDocumentService } from './employee-document.service';
import { EmployeeDocumentController } from './employee-document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeDocument } from './employee-document.entity';
import { EmployeeModule } from 'src/employee-module/employee-module.entity';
import { EmployeeModuleModule } from 'src/employee-module/employee-module.module';
import { EmployeeModuleService } from 'src/employee-module/employee-module.service';

@Module({
  imports:[TypeOrmModule.forFeature([EmployeeDocument, EmployeeModule])],
  controllers: [EmployeeDocumentController],
  providers: [EmployeeDocumentService, EmployeeModuleService]
})
export class EmployeeDocumentModule {}
