import { Module } from '@nestjs/common';
import { EmployeeModuleService } from './employee-module.service';
import { EmployeeModuleController } from './employee-module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee-module.entity';
import { EmployeeType } from './employee_type/employee-type.entity';
import { EmpDesignation } from './designation/employee-designation.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { Gender} from './gender/gender.entity';
import { MaritalStatus } from './marital_status/maritalStatus.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { ImageUploadController } from 'src/imageupload/imageupload.controller';
import { EmployeeDocument } from 'src/employee-document/employee-document.entity';
import { EmployeeDocumentService } from 'src/employee-document/employee-document.service';
import { EmployeeDocumentModule } from 'src/employee-document/employee-document.module';
@Module({
  imports: [TypeOrmModule.forFeature([EmployeeType,EmployeeModule,EmpDesignation,CompaniesEntity, Gender, MaritalStatus,EmployeeDocument]), EmployeeDocumentModule],
  controllers: [EmployeeModuleController, ImageUploadController],
  providers: [EmployeeModuleService, ImageUploadService, EmployeeModuleService, EmployeeDocumentService]
})
export class EmployeeModuleModule {}
