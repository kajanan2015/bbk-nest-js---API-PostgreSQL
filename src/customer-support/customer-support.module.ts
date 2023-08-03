import { Module } from '@nestjs/common';
import { CustomerSupportService } from './customer-support.service';
import { CustomerSupportController } from './customer-support.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerSupport, CustomerSupportDetails, CustomerSupportHistory } from './customer-support.entity';
import { InquiryType } from './inquiry-type/inquiry-type.entity';
import { User } from 'src/user/user.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { Department } from 'src/departments/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerSupportDetails, CustomerSupport, InquiryType, User, CompaniesEntity, CustomerSupportHistory, Department])],
  controllers: [CustomerSupportController],
  providers: [CustomerSupportService]
})
export class CustomerSupportModule {}
