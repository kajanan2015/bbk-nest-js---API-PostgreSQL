import { Module } from '@nestjs/common';
import { CompanyUserRoleService } from './company-user-role.service';
import { CompanyUserRoleController } from './company-user-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyUserRole } from './company-user-role.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { UserService } from 'src/user/user.service';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { User } from 'src/user/user.entity';
import { PermissionRoleEntity } from 'src/permission-role/permission-role.entity';
@Module({
  imports: [TypeOrmModule.forFeature([CompanyUserRole,CompaniesEntity,User,PermissionRoleEntity])],
  controllers: [CompanyUserRoleController],
  providers: [CompanyUserRoleService,ImageUploadService,UserService]
})
export class CompanyUserRoleModule {}
