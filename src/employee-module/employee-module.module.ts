import { Module } from '@nestjs/common';
import { EmployeeModuleService } from './employee-module.service';
import { EmployeeModuleController } from './employee-module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee-module.entity';
import { EmployeeType } from './employee-type.entity';
import { EmpDesignation } from './employee-designation.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { Gender} from './gender/gender.entity';
import { MaritalStatus } from './marital_status/maritalStatus.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { ImageUploadController } from 'src/imageupload/imageupload.controller';
@Module({
  imports: [TypeOrmModule.forFeature([EmployeeType,EmployeeModule,EmpDesignation,CompaniesEntity, Gender, MaritalStatus, ])],
  controllers: [EmployeeModuleController, ImageUploadController],
  providers: [EmployeeModuleService, ImageUploadService]
})
export class EmployeeModuleModule {}
