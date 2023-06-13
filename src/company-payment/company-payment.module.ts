import { Module } from '@nestjs/common';
import { CompanyPaymentService } from './company-payment.service';
import { CompanyPaymentController } from './company-payment.controller';
import { CompanyPayment } from './company-payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
@Module({
  imports:[TypeOrmModule.forFeature([CompanyPayment,User])],
  controllers: [CompanyPaymentController],
  providers: [CompanyPaymentService]
})
export class CompanyPaymentModule {}
