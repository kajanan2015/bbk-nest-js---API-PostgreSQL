import { Module } from '@nestjs/common';
import { EmployeeDocumentService } from './employee-document.service';
import { EmployeeDocumentController } from './employee-document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeDocument } from './employee-document.entity';
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
import { EmployeeDataHistoryModule } from 'src/employee-data-history/employee-data-history.module';
import { EmployeeDataHistoryService } from 'src/employee-data-history/employee-data-history.service';
import { Bank } from 'src/employee-module/bank/bank.entity';
import { EmployeeType } from 'src/employee-module/employee_type/employee-type.entity';
import { Gender } from 'src/employee-module/gender/gender.entity';
import { EmpDesignation } from 'src/employee-module/designation/employee-designation.entity';
import { MaritalStatus } from 'src/employee-module/marital_status/maritalStatus.entity';
import { DrivingLicenceType } from 'src/employee-module/driving_licence_type/driving_licence_type.entity';
import { PaymentFrequency } from 'src/employee-module/payment_frequency/payment_frequency.entity';
import { country } from 'src/companies/country.entity';
import { companytype } from 'src/companies/companytype.entity';
import { Employee, EmployeeInfo } from 'src/employee-module/employee-module.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Companypackagerow, EmployeeDocument, DrivingLicenceType, PaymentFrequency, MaritalStatus, EmpDesignation, Gender, EmployeeType, PagePermissionEntity, EmployeeInfo, Employee, CompanyDocument, SystemCode, User, PermissionRoleEntity, CompaniesEntity, Createmodule, Createpackage, Bank, Moduledetailsofpackage, EmployeeDataHistory, DrivingLicenceCategory, country, companytype]), CompaniesModule, CreatemoduleModule, EmployeeDataHistoryModule],
  controllers: [EmployeeDocumentController],
  providers: [CompanypackagerowService, EmployeeDocumentService, EmployeeModuleService, CompaniesService, CompanyDocumentService, UserService, SystemCodeService, ImageUploadService, CreatemoduleService, EmployeeDataHistoryService]
})
export class EmployeeDocumentModule { }
