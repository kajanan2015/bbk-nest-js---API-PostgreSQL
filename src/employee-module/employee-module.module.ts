import { Module } from '@nestjs/common';
import { EmployeeModuleService } from './employee-module.service';
import { EmployeeModuleController } from './employee-module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee-module.entity';
import { EmployeeType } from './employee_type/employee-type.entity';
import { EmpDesignation } from './designation/employee-designation.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { CompaniesService } from 'src/companies/companies.service';
import { CompaniesModule } from 'src/companies/companies.module';
import { Gender} from './gender/gender.entity';
import { MaritalStatus } from './marital_status/maritalStatus.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { ImageUploadController } from 'src/imageupload/imageupload.controller';
import { EmployeeDocument } from 'src/employee-document/employee-document.entity';
import { EmployeeDocumentService } from 'src/employee-document/employee-document.service';
import { EmployeeDocumentModule } from 'src/employee-document/employee-document.module';
import { PagePermissionEntity } from 'src/pagepermission/pagepermission.entity';
import { CompanyDocument } from 'src/company-document/company-document.entity';
import { SystemCode } from 'src/system-code/system-code.entity';
import { SystemCodeService } from 'src/system-code/system-code.service';
import { UserService } from 'src/user/user.service';
import { CompanyDocumentService } from 'src/company-document/company-document.service';
import { User } from 'src/user/user.entity';
import { PermissionRoleEntity } from 'src/permission-role/permission-role.entity';
import { DrivingLicenceType } from './driving_licence_type/driving_licence_type.entity';
import { PaymentFrequency } from './payment_frequency/payment_frequency.entity';
import { Bank } from './bank/bank.entity';
import { Createmodule } from 'src/createmodule/createmodule.entity';
import { CreatemoduleService } from 'src/createmodule/createmodule.service';
import { CreatemoduleModule } from 'src/createmodule/createmodule.module';
import { Createpackage } from 'src/createpackage/createpackage.entity';
import { CreatepackageService } from 'src/createpackage/createpackage.service';
import { CreatepackageModule } from 'src/createpackage/createpackage.module';
import { Moduledetailsofpackage } from 'src/moduledetailsofpackage/moduledetailsofpackage.entity';
import { ModuledetailsofpackageService } from 'src/moduledetailsofpackage/moduledetailsofpackage.service';
import { Paymenttype } from 'src/createpackage/paymenttype.entity';
import { country } from 'src/companies/country.entity';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { EmployeeDataHistory } from 'src/employee-data-history/employee-data-history.entity';
import { EmployeeDataHistoryModule } from 'src/employee-data-history/employee-data-history.module';
import { EmployeeDataHistoryService } from 'src/employee-data-history/employee-data-history.service';

import { Companypackagerow } from 'src/companypackagerow/companypackagerow.entity';
import { CompanypackagerowService } from 'src/companypackagerow/companypackagerow.service';
import { CompanypackagerowModule } from 'src/companypackagerow/companypackagerow.module';
import { DrivingLicenceCategory } from './driving_licence_category/driving_licence_category.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Companypackagerow, EmployeeType, EmpDesignation, EmployeeModule, EmpDesignation, CompaniesEntity, Gender, MaritalStatus, EmployeeDocument, PagePermissionEntity, CompanyDocument, SystemCode, User, PermissionRoleEntity, DrivingLicenceType, Bank, PaymentFrequency, country, Createmodule, Createpackage, Paymenttype, Moduledetailsofpackage, EmployeeDataHistory, DrivingLicenceCategory]), CompaniesModule, CreatemoduleModule, MailModule, DrivingLicenceCategory],
  controllers: [EmployeeModuleController, ImageUploadController],
  providers: [CompanypackagerowService, EmployeeModuleService, ImageUploadService, EmployeeDocumentService, CompaniesService, SystemCodeService, UserService, CompanyDocumentService, CreatemoduleService, CreatepackageService, ModuledetailsofpackageService, MailService, EmployeeDataHistoryService, DrivingLicenceCategory]
})
export class EmployeeModuleModule {}
