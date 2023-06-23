import { Module } from '@nestjs/common';
import { CompanyUserRoleService } from './company-user-role.service';
import { CompanyUserRoleController } from './company-user-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyUserRole } from './company-user-role.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyUserRole])],
  controllers: [CompanyUserRoleController],
  providers: [CompanyUserRoleService,ImageUploadService]
})
export class CompanyUserRoleModule {}
