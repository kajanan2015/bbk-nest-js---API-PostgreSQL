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
@Module({
  imports:[TypeOrmModule.forFeature([EmployeeDocument, PagePermissionEntity,EmployeeModule,CompanyDocument , SystemCode , User,PermissionRoleEntity ,CompaniesEntity]),EmployeeDocumentModule,CompaniesModule],
  controllers: [EmployeeDocumentController],
  providers: [EmployeeDocumentService, EmployeeModuleService, CompaniesService, CompanyDocumentService,UserService,SystemCodeService,ImageUploadService]
})
export class EmployeeDocumentModule {}
