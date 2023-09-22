import { Injectable } from '@nestjs/common';
import { CreateCompanyPaymentDto } from './create-company-payment.dto';
import { UpdateCompanyPaymentDto } from './update-company-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyPayment } from './company-payment.entity';
import { Repository } from 'typeorm';
import { MailService } from 'src/mail/mail.service';
import { CompaniesEntity } from 'src/companies/companies.entity';
@Injectable()
export class CompanyPaymentService {

  constructor(
    @InjectRepository(CompanyPayment)
    private companyPaymentRepository: Repository<CompanyPayment>,
    private readonly mailservice: MailService,
    @InjectRepository(CompaniesEntity)
    private companyRepository: Repository<CompaniesEntity>
  ) { }
  async create(createCompanyPaymentDto) {
   
    const paymentlinkinsert=await this.companyPaymentRepository.create(createCompanyPaymentDto)
    const paymentlinksave=await this.companyPaymentRepository.save(paymentlinkinsert)
    // await this.companyRepository.update(createCompanyPaymentDto.companyId, {
    //   com: 3,
    // })
    // const response = this.companyPaymentRepository.create(createCompanyPaymentDto);
    // await this.companyPaymentRepository.save(response);
    return await this.mailservice.trialpackageadded(createCompanyPaymentDto.sendedContact, "adminemail", "adminname", "", createCompanyPaymentDto.paymentLink,createCompanyPaymentDto.company);
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
