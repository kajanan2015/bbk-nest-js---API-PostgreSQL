import { Injectable } from '@nestjs/common';
import { CreateCompanyPaymentDto } from './create-company-payment.dto';
import { UpdateCompanyPaymentDto } from './update-company-payment.dto';

@Injectable()
export class CompanyPaymentService {
  create(createCompanyPaymentDto: CreateCompanyPaymentDto) {
    return 'This action adds a new companyPayment';
  }

  findAll() {
    return `This action returns all companyPayment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyPayment`;
  }

  update(id: number, updateCompanyPaymentDto: UpdateCompanyPaymentDto) {
    return `This action updates a #${id} companyPayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyPayment`;
  }
}
