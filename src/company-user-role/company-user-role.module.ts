import { Module } from '@nestjs/common';
import { CompanyUserRoleService } from './company-user-role.service';
import { CompanyUserRoleController } from './company-user-role.controller';

@Module({
  controllers: [CompanyUserRoleController],
  providers: [CompanyUserRoleService]
})
export class CompanyUserRoleModule {}
