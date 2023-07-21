import { Module } from '@nestjs/common';
import { CustomizeTableService } from './customize-table.service';
import { CustomizeTableController } from './customize-table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomizeTable } from './customize-table.entity';
import { User } from 'src/user/user.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { UserService } from 'src/user/user.service';
import { CompaniesService } from 'src/companies/companies.service';
import { PermissionRoleEntity } from 'src/permission-role/permission-role.entity';
import { PermissionRoleService } from 'src/permission-role/permission-role.service';
import { PagePermissionService } from 'src/pagepermission/pagepermission.service';
import { PagePermissionEntity } from 'src/pagepermission/pagepermission.entity';
import { CompanyDocument } from 'src/company-document/company-document.entity';
import { CompanyDocumentService } from 'src/company-document/company-document.service';
import { SystemCodeService } from 'src/system-code/system-code.service';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { CreatemoduleService } from 'src/createmodule/createmodule.service';
import { Createmodule } from 'src/createmodule/createmodule.entity';
import { Createpackage } from 'src/createpackage/createpackage.entity';
import { CreatepackageService } from 'src/createpackage/createpackage.service';
import { Moduledetailsofpackage } from 'src/moduledetailsofpackage/moduledetailsofpackage.entity';
import { SystemCode } from 'src/system-code/system-code.entity';
import { Paymenttype } from 'src/createpackage/paymenttype.entity';
import { ModuledetailsofpackageService } from 'src/moduledetailsofpackage/moduledetailsofpackage.service';
import { CompanypackagerowService } from 'src/companypackagerow/companypackagerow.service';
import { Companypackagerow } from 'src/companypackagerow/companypackagerow.entity';
import { EmployeeDataHistory } from 'src/employee-data-history/employee-data-history.entity';
import { EmployeeDataHistoryModule } from 'src/employee-data-history/employee-data-history.module';
import { EmployeeDataHistoryService } from 'src/employee-data-history/employee-data-history.service';
import { EmployeeModuleModule } from 'src/employee-module/employee-module.module';
import { Employee, EmployeeInfo } from 'src/employee-module/employee-module.entity';
import { country } from 'src/companies/country/country.entity';
import { companytype } from 'src/companies/company Type/companytype.entity';
import { CompaniesEntityinfo } from 'src/companies/companies.entity';
import { CompaniesHistorydata } from 'src/companies/companies.entity';
import { HistoryTransactionservicedb } from 'src/Transaction-query/transaction.service';
@Module({
  imports:[TypeOrmModule.forFeature([Companypackagerow,CompaniesEntityinfo,CompaniesHistorydata,CustomizeTable, User, CompaniesEntity, PermissionRoleEntity, PagePermissionEntity, CompanyDocument, Createmodule, Createpackage, Moduledetailsofpackage, SystemCode, Paymenttype,EmployeeDataHistory,Employee, EmployeeInfo,country,companytype]),EmployeeDataHistoryModule,EmployeeModuleModule],
  controllers: [CustomizeTableController],
  providers: [CustomizeTableService, UserService, CompaniesService, PermissionRoleService, PagePermissionService, CompanyDocumentService, SystemCodeService, ImageUploadService, CreatemoduleService, CreatepackageService, ModuledetailsofpackageService, CompanypackagerowService, EmployeeDataHistoryService,HistoryTransactionservicedb]
})
export class CustomizeTableModule { }
