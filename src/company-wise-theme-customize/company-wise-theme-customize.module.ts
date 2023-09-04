import { Module } from '@nestjs/common';
import { CompanyWiseThemeCustomizeService } from './company-wise-theme-customize.service';
import { CompanyWiseThemeCustomizeController } from './company-wise-theme-customize.controller';
import { CompanyWiseThemeCustomize } from './company-wise-theme-customize.entity';
import { User } from 'src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesEntity } from 'src/companies/companies.entity';
@Module({
  imports:[TypeOrmModule.forFeature([CompanyWiseThemeCustomize,User,CompaniesEntity])],
  controllers: [CompanyWiseThemeCustomizeController],
  providers: [CompanyWiseThemeCustomizeService]
})
export class CompanyWiseThemeCustomizeModule {}
