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
@Module({
  imports: [TypeOrmModule.forFeature([CompaniesEntity, PagePermissionEntity, SystemCode,CompanyDocument,User,country]), PagePermissionModule,SystemCodeModule, UserModule, MailModule],
  controllers: [CompaniesController],
  providers: [CompaniesService, ImageUploadService, PagePermissionService,SystemCodeService, UserService,MailService],
})
export class CompaniesModule {}