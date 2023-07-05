import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';

import { UserService } from './user.service';
import { User } from './user.entity';
import { PermissionRoleEntity } from 'src/permission-role/permission-role.entity';
import { PermissionRoleModule } from 'src/permission-role/permission-role.module';
import { TripEntity } from 'src/trip/trip.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { Createmodule } from 'src/createmodule/createmodule.entity';
import { Createpackage } from 'src/createpackage/createpackage.entity';
import { CompanyPayment } from 'src/company-payment/company-payment.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { CompanyWorkPattern } from 'src/company-work-pattern/company-work-pattern.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, PermissionRoleEntity,TripEntity, CompaniesEntity,Createmodule,Createpackage,CompanyPayment,CompanyWorkPattern]), PermissionRoleModule],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
  providers: [UserService,ImageUploadService],
})
export class UserModule { }
