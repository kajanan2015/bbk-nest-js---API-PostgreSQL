import { Injectable } from '@nestjs/common';
import { CreateCompanyPaymentDto } from './create-company-payment.dto';
import { UpdateCompanyPaymentDto } from './update-company-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyPayment } from './company-payment.entity';
import { Repository } from 'typeorm';
import { MailService } from 'src/mail/mail.service';
@Injectable()
export class CompanyPaymentService {

  constructor(
    @InjectRepository(CompanyPayment)
    private companyPaymentRepository: Repository<CompanyPayment>,
    private readonly mailservice: MailService,
  ) { }
  async create(createCompanyPaymentDto: CreateCompanyPaymentDto) {
    const response = this.companyPaymentRepository.create(createCompanyPaymentDto);
    await this.companyPaymentRepository.save(response);
  return await this.mailservice.trialpackageadded(createCompanyPaymentDto.sendedContact,"adminemail","adminname","",createCompanyPaymentDto.paymentLink);
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
