import { Module } from '@nestjs/common';
import { EmployeeDataHistoryService } from './employee-data-history.service';
import { EmployeeDataHistoryController } from './employee-data-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeDataHistory } from './employee-data-history.entity';
import { EmployeeModule } from 'src/employee-module/employee-module.entity';
import { EmployeeModuleModule } from 'src/employee-module/employee-module.module';
import { EmployeeModuleService } from 'src/employee-module/employee-module.service';
import { EmployeeDocumentService } from 'src/employee-document/employee-document.service';
import { CompaniesService } from 'src/companies/companies.service';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { EmployeeDocument } from 'src/employee-document/employee-document.entity';
import { UserService } from 'src/user/user.service';
import { DrivingLicenceCategory } from 'src/employee-module/driving_licence_category/driving_licence_category.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { User } from 'src/user/user.entity';
import { PermissionRoleEntity } from 'src/permission-role/permission-role.entity';
import { PagePermissionEntity } from 'src/pagepermission/pagepermission.entity';
import { CompanyDocument } from 'src/company-document/company-document.entity';
import { SystemCodeService } from 'src/system-code/system-code.service';
import { CompanyDocumentService } from 'src/company-document/company-document.service';
import { Createmodule } from 'src/createmodule/createmodule.entity';
import { Createpackage } from 'src/createpackage/createpackage.entity';
import { Moduledetailsofpackage } from 'src/moduledetailsofpackage/moduledetailsofpackage.entity';
import { CompanypackagerowService } from 'src/companypackagerow/companypackagerow.service';
import { Companypackagerow } from 'src/companypackagerow/companypackagerow.entity';
import { SystemCode } from 'src/system-code/system-code.entity';

@Module({
  imports:[TypeOrmModule.forFeature([EmployeeDataHistory, Companypackagerow, SystemCode, Moduledetailsofpackage, EmployeeModule, EmployeeDocument, Createmodule, Createpackage, DrivingLicenceCategory, CompaniesEntity, User, PermissionRoleEntity, PagePermissionEntity, CompanyDocument], EmployeeModuleModule)],
  controllers: [EmployeeDataHistoryController],
  providers: [EmployeeDataHistoryService, CompanypackagerowService, EmployeeModuleService, EmployeeDocumentService, UserService, CompaniesService, ImageUploadService, EmployeeDocumentService, SystemCodeService, CompanyDocumentService]
})
export class EmployeeDataHistoryModule {}
