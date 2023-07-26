import { Injectable } from '@nestjs/common';
import { UpdateCustomerSupportDto } from './update-customer-support.dto';
import { InquiryType } from './inquiry-type/inquiry-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerSupport } from './customer-support.entity';

@Injectable()
export class CustomerSupportService {
  constructor(
    @InjectRepository(CustomerSupport)
    private customerSupportRepository: Repository<CustomerSupport>,
    @InjectRepository(InquiryType)
    private readonly inquiryTypeRepository: Repository<InquiryType>,
  ) { }

  async create(customerSupportData) {
    try {
      const response = await this.customerSupportRepository.create(customerSupportData);
      const savedData = await this.customerSupportRepository.save(response);
  
      const successResponse = {
        success: true,
        data: savedData,
        message: 'success',
      };
  
      return successResponse;
    } catch (error) {
      const errorResponse = {
        success: false,
        message: 'failed',
        error: error.message,
      };
  
      return errorResponse;
    }
  }

  findAll() {
    return `This action returns all customerSupport`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerSupport`;
  }

  update(id: number, updateCustomerSupportDto: UpdateCustomerSupportDto) {
    return `This action updates a #${id} customerSupport`;
  }

  async getInquiryType() {
    const inquiryTypeList = await this.inquiryTypeRepository.find();
    return inquiryTypeList;
  }
}
