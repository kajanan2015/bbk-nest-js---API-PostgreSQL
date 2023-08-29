import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CompaniesEntity } from './companies.entity';
import { CompaniesEntityinfo } from './companies.entity';
import { CompaniesHistorydata } from './companies.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { PagePermissionEntity } from 'src/pagepermission/pagepermission.entity';
import { PagePermissionModule } from 'src/pagepermission/pagepermission.module';
import { PagePermissionService } from 'src/pagepermission/pagepermission.service';
import { SystemCodeModule } from 'src/system-code/system-code.module';
import { SystemCodeService } from 'src/system-code/system-code.service';
import { SystemCode } from 'src/system-code/system-code.entity';
import { CompanyDocument } from 'src/company-document/company-document.entity';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { country } from './country/country.entity';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { CompanyDocumentModule } from 'src/company-document/company-document.module';
import { CompanyDocumentService } from 'src/company-document/company-document.service';
import { companytype } from './company Type/companytype.entity';
import { Createmodule } from 'src/createmodule/createmodule.entity';
import { CreatemoduleService } from 'src/createmodule/createmodule.service';
import { CreatemoduleModule } from 'src/createmodule/createmodule.module';
import { Createpackage } from 'src/createpackage/createpackage.entity';
import { Moduledetailsofpackage } from 'src/moduledetailsofpackage/moduledetailsofpackage.entity';
import { Paymenttype } from 'src/createpackage/paymenttype.entity';
import { Companypackagerow } from 'src/companypackagerow/companypackagerow.entity';
import { CompanypackagerowService } from 'src/companypackagerow/companypackagerow.service';
import { CompanypackagerowModule } from 'src/companypackagerow/companypackagerow.module';
import { CompanyWorkPattern } from 'src/company-work-pattern/company-work-pattern.entity';
import { EmployeeDataHistory } from 'src/employee-data-history/employee-data-history.entity';
import { EmployeeDataHistoryModule } from 'src/employee-data-history/employee-data-history.module';
import { EmployeeDataHistoryService } from 'src/employee-data-history/employee-data-history.service';
import { VehicleTypeEntity } from 'src/vehicle-type/vehicle-type.entity';
import { Employee, EmployeeInfo } from 'src/employee-module/employee-module.entity';
import { Transactionservicedb } from 'src/Transaction-query/transaction.service';
import { Companypackageassignhistory } from 'src/companypackagerow/companypackagerow.entity';
import { State } from './country/states/states.entity';
import { City } from './country/cities/city.entity';
import { PaymentLinkData } from 'src/payment/payment_link_otp/payment_link.entity';
import { Department } from 'src/departments/department.entity';
@Module({
  imports: [TypeOrmModule.forFeature([CompaniesEntity, CompaniesEntityinfo, CompaniesHistorydata, PagePermissionEntity, SystemCode, CompanyDocument, User, country, companytype, Employee, EmployeeInfo, Createmodule, Createpackage, Moduledetailsofpackage, Paymenttype, Companypackagerow, CompanyWorkPattern, EmployeeDataHistory, VehicleTypeEntity,Companypackageassignhistory, State, City,PaymentLinkData,Department]), PagePermissionModule, SystemCodeModule, UserModule, MailModule, CompanyDocumentModule, CreatemoduleModule],
  controllers: [CompaniesController],
  providers: [CompanypackagerowService, CompaniesService, ImageUploadService, PagePermissionService, SystemCodeService, UserService, MailService, CompanyDocumentService, CreatemoduleService, EmployeeDataHistoryService, Transactionservicedb],
})
export class CompaniesModule { }