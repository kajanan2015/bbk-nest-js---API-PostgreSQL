import { Module } from '@nestjs/common';
import { EmployeeDocumentService } from './employee-document.service';
import { EmployeeDocumentController } from './employee-document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeDocument } from './employee-document.entity';
import { EmployeeModule } from 'src/employee-module/employee-module.entity';
import { EmployeeModuleModule } from 'src/employee-module/employee-module.module';
import { EmployeeModuleService } from 'src/employee-module/employee-module.service';
import { CompaniesService } from 'src/companies/companies.service';
import { PagePermissionEntity } from 'src/pagepermission/pagepermission.entity';
import { CompanyDocument } from 'src/company-document/company-document.entity';
import { SystemCode } from 'src/system-code/system-code.entity';
import { SystemCodeService } from 'src/system-code/system-code.service';
import { UserService } from 'src/user/user.service';
import { CompanyDocumentService } from 'src/company-document/company-document.service';
import { User } from 'src/user/user.entity';
import { PermissionRoleEntity } from 'src/permission-role/permission-role.entity';
import { CompaniesModule } from 'src/companies/companies.module';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { Createmodule } from 'src/createmodule/createmodule.entity';
import { CreatemoduleModule } from 'src/createmodule/createmodule.module';
import { CreatemoduleService } from 'src/createmodule/createmodule.service';
import { Createpackage } from 'src/createpackage/createpackage.entity';
import { CreatepackageService } from 'src/createpackage/createpackage.service';
import { Moduledetailsofpackage } from 'src/moduledetailsofpackage/moduledetailsofpackage.entity';
import { EmployeeDataHistory } from 'src/employee-data-history/employee-data-history.entity';
import { Companypackagerow } from 'src/companypackagerow/companypackagerow.entity';
import { CompanypackagerowService } from 'src/companypackagerow/companypackagerow.service';
import { CompanypackagerowModule } from 'src/companypackagerow/companypackagerow.module';
import { DrivingLicenceCategory } from 'src/employee-module/driving_licence_category/driving_licence_category.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Companypackagerow,EmployeeDocument, PagePermissionEntity,EmployeeModule,CompanyDocument , SystemCode , User,PermissionRoleEntity ,CompaniesEntity,Createmodule,Createpackage, Moduledetailsofpackage,EmployeeDataHistory, DrivingLicenceCategory]),EmployeeDocumentModule,CompaniesModule, CreatemoduleModule],
  controllers: [EmployeeDocumentController],
  providers: [CompanypackagerowService,EmployeeDocumentService, EmployeeModuleService, CompaniesService, CompanyDocumentService,UserService,SystemCodeService,ImageUploadService,CreatemoduleService]
})
export class EmployeeDocumentModule {}
