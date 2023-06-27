import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CompaniesEntity } from './companies.entity';
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
import { country } from './country.entity';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { CompanyDocumentModule } from 'src/company-document/company-document.module';
import { CompanyDocumentService } from 'src/company-document/company-document.service';
import { companytype } from './companytype.entity';
import { EmployeeModule } from 'src/employee-module/employee-module.entity';
import { Createmodule } from 'src/createmodule/createmodule.entity';
import { CreatemoduleService } from 'src/createmodule/createmodule.service';
import { CreatemoduleModule } from 'src/createmodule/createmodule.module';
import { Createpackage } from 'src/createpackage/createpackage.entity';
import { Moduledetailsofpackage } from 'src/moduledetailsofpackage/moduledetailsofpackage.entity';
import { Paymenttype } from 'src/createpackage/paymenttype.entity';
import { Companypackagerow } from 'src/companypackagerow/companypackagerow.entity';
@Module({
  imports: [TypeOrmModule.forFeature([CompaniesEntity, PagePermissionEntity, SystemCode,CompanyDocument,User,country, companytype, EmployeeModule,Createmodule, Createpackage,Moduledetailsofpackage, Paymenttype,Companypackagerow]), PagePermissionModule,SystemCodeModule, UserModule, MailModule, CompanyDocumentModule, CreatemoduleModule],
  controllers: [CompaniesController],
  providers: [CompaniesService, ImageUploadService, PagePermissionService,SystemCodeService, UserService,MailService, CompanyDocumentService,CreatemoduleService],
})
export class CompaniesModule {}