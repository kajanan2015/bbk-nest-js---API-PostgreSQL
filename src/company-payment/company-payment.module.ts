import { Module } from '@nestjs/common';
import { CompanyPaymentService } from './company-payment.service';
import { CompanyPaymentController } from './company-payment.controller';
import { CompanyPayment } from './company-payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { CompaniesEntity } from 'src/companies/companies.entity';
@Module({
  imports:[TypeOrmModule.forFeature([CompanyPayment,User, CompaniesEntity]),MailModule],
  controllers: [CompanyPaymentController],
  providers: [CompanyPaymentService,MailService]
})
export class CompanyPaymentModule {}
