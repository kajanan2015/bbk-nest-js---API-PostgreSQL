import { Module } from '@nestjs/common';
import { CustomerSupportService } from './customer-support.service';
import { CustomerSupportController } from './customer-support.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerSupport, CustomerSupportDetails } from './customer-support.entity';
import { InquiryType } from './inquiry-type/inquiry-type.entity';
import { User } from 'src/user/user.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerSupportDetails, CustomerSupport, InquiryType, User, CompaniesEntity])],
  controllers: [CustomerSupportController],
  providers: [CustomerSupportService]
})
export class CustomerSupportModule {}
