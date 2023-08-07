import { Module } from '@nestjs/common';
import { EmployeeDataHistoryService } from './employee-data-history.service';
import { EmployeeDataHistoryController } from './employee-data-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeDataHistory } from './employee-data-history.entity';
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
import { CompanyWorkPattern } from 'src/company-work-pattern/company-work-pattern.entity';
import { Bank } from 'src/employee-module/bank/bank.entity';
import { EmployeeType } from 'src/employee-module/employee_type/employee-type.entity';
import { Gender } from 'src/employee-module/gender/gender.entity';
import { EmpDesignation } from 'src/employee-module/designation/employee-designation.entity';
import { MaritalStatus } from 'src/employee-module/marital_status/maritalStatus.entity';
import { DrivingLicenceType } from 'src/employee-module/driving_licence_type/driving_licence_type.entity';
import { PaymentFrequency } from 'src/employee-module/payment_frequency/payment_frequency.entity';

import { country } from 'src/companies/country/country.entity';
import { companytype } from 'src/companies/company Type/companytype.entity';
import { CompaniesEntityinfo } from 'src/companies/companies.entity';
import { CompaniesHistorydata } from 'src/companies/companies.entity';
import { Employee, EmployeeInfo, EmployeePayrollInfo } from 'src/employee-module/employee-module.entity';
import { HistoryTransactionservicedb } from 'src/Transaction-query/transaction.service';
import { VisaType } from 'src/employee-module/visa_type/visaType.entity';
import { Companypackageassignhistory } from 'src/companypackagerow/companypackagerow.entity';
@Module({
  imports: [TypeOrmModule.forFeature([EmployeeDataHistory, CompaniesHistorydata, CompaniesEntityinfo, VisaType, EmployeePayrollInfo, Bank, DrivingLicenceType, PaymentFrequency, Gender, MaritalStatus, EmpDesignation, Companypackagerow, SystemCode, Moduledetailsofpackage, Employee, EmployeeInfo, EmployeeDocument, Createmodule, Createpackage, DrivingLicenceCategory, CompaniesEntity, User, PermissionRoleEntity, PagePermissionEntity, Bank, EmployeeType, CompanyDocument, CompanyWorkPattern, country, companytype,Companypackageassignhistory])],

  controllers: [EmployeeDataHistoryController],
  providers: [EmployeeDataHistoryService, CompanypackagerowService, EmployeeModuleService, EmployeeDocumentService, UserService, CompaniesService, ImageUploadService, EmployeeDocumentService, SystemCodeService, CompanyDocumentService,HistoryTransactionservicedb]
})
export class EmployeeDataHistoryModule {}
